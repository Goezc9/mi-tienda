import { Routes, Route, Navigate, useLocation } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import ProtectedRoute from './components/ProtectedRoute'
import Navbar from './components/organisms/Navbar'
import Home from './pages/Home'
import About from './pages/About'
import Auth from './pages/Auth'
import Cart from './pages/Cart'

// Componente interno que accede a useLocation (debe estar dentro de Router)
function AppLayout() {
  const { pathname } = useLocation();
  const hideNavbar = pathname === '/iniciar-sesion';

  return (
    <>
      {!hideNavbar && <Navbar />}
      <main className="w-screen">
        <Routes>
          {/* Ruta pública: inicio de sesión / registro */}
          <Route path="/iniciar-sesion" element={<Auth />} />

          {/* Ruta raíz → redirige a la página de inicio de sesión */}
          <Route path="/" element={<Navigate to="/iniciar-sesion" replace />} />

          {/* Rutas protegidas — solo accesibles con sesión activa */}
          <Route path="/inicio" element={<ProtectedRoute element={<Home />} />} />
          <Route path="/sobre-nosotros" element={<ProtectedRoute element={<About />} />} />
          <Route path="/carrito" element={<ProtectedRoute element={<Cart />} />} />

          {/* Cualquier ruta desconocida → inicio de sesión */}
          <Route path="*" element={<Navigate to="/iniciar-sesion" replace />} />
        </Routes>
      </main>
    </>
  );
}

function App() {
  return (
    <AuthProvider>
      <AppLayout />
    </AuthProvider>
  )
}

export default App