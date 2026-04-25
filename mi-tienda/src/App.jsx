import { Routes, Route } from 'react-router-dom'
import Navbar from './components/organisms/Navbar'
import Home from './pages/Home'
import About from './pages/About'
import Auth from './pages/Auth'

function App() {
  return (
    <>
      <Navbar />
      <main className="w-screen">
        <Routes>
          <Route path="/inicio" element={<Home />} />
          <Route path="/sobre-nosotros" element={<About />} />
          <Route path="/iniciar-sesion" element={<Auth />} />
        </Routes>
      </main>
    </>
  )
}




export default App