import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

/**
 * Envuelve rutas que requieren sesión activa.
 * - Si Firebase aún está verificando → muestra pantalla de carga.
 * - Si no hay usuario  → redirige a /iniciar-sesion.
 * - Si hay usuario     → renderiza los children normalmente.
 */
const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#f7f9fb]">
        <div className="flex flex-col items-center gap-3 text-slate-500">
          {/* Spinner simple */}
          <div className="w-10 h-10 rounded-full border-4 border-slate-200 border-t-[#002878] animate-spin" />
          <p className="text-sm font-medium">Verificando sesión...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/iniciar-sesion" replace />;
  }

  return children;
};

export default ProtectedRoute;
