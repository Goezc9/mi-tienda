import { Link, NavLink, useNavigate } from 'react-router-dom';
import { signOut } from 'firebase/auth';
import { auth } from '../../back/firebase';
import { useAuth } from '../../context/AuthContext';

function Navbar() {
  const { user, loading } = useAuth();
  const navigate = useNavigate();

  const linkClass = ({ isActive }) =>
    `text-sm font-medium transition-colors ${
      isActive
        ? 'text-[#002878] font-semibold'
        : 'text-slate-600 hover:text-[#002878]'
    }`;

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate('/iniciar-sesion');
    } catch (err) {
      console.error('Error al cerrar sesión:', err);
    }
  };

  // Mientras Firebase verifica la sesión, no mostramos nada en el nav
  if (loading) return null;

  return (
    <nav className="bg-white border-b border-slate-100 sticky top-0 z-50 shadow-sm">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">

        {/* Logo / Brand — siempre visible */}
        <Link
          to={user ? '/inicio' : '/iniciar-sesion'}
          className="flex items-center gap-2 font-bold text-[#002878]"
        >
          <span
            className="material-symbols-outlined text-[22px]"
            style={{ fontVariationSettings: "'FILL' 1" }}
          >
            storefront
          </span>
          <span className="text-base hidden sm:inline">Mi Tienda</span>
        </Link>

        {/* ── Solo visible cuando hay sesión activa ── */}
        {user && (
          <>
            {/* Links de navegación (escritorio) */}
            <div className="hidden md:flex items-center gap-6">
              <NavLink to="/inicio" className={linkClass}>Inicio</NavLink>
              <NavLink to="/sobre-nosotros" className={linkClass}>Acerca de</NavLink>
            </div>

            {/* Iconos de acción */}
            <div className="flex items-center gap-1">

              {/* Buscar */}
              <button
                className="w-10 h-10 flex items-center justify-center rounded-full text-slate-500 hover:bg-slate-100 hover:text-[#002878] transition-colors"
                aria-label="Buscar"
              >
                <span className="material-symbols-outlined text-[20px]">search</span>
              </button>

              {/* Carrito con badge */}
              <Link
                to="/carrito"
                className="relative w-10 h-10 flex items-center justify-center rounded-full text-slate-500 hover:bg-blue-50 hover:text-[#002878] transition-colors"
                aria-label="Ver carrito"
              >
                <span className="material-symbols-outlined text-[20px]">shopping_cart</span>
                {/* Badge — en producción este número vendría del contexto del carrito */}
                <span className="absolute -top-0.5 -right-0.5 min-w-[1.1rem] min-h-[1.1rem] bg-[#002878] text-white text-[9px] font-bold rounded-full flex items-center justify-center leading-none px-1">
                  4
                </span>
              </Link>

              {/* Avatar / Cerrar sesión */}
              <div className="flex items-center gap-2 ml-2 pl-2 border-l border-slate-200">
                {/* Avatar inicial */}
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#002878] to-[#0057ff] text-white flex items-center justify-center text-xs font-bold select-none">
                  {user.email?.charAt(0).toUpperCase() ?? 'U'}
                </div>

                {/* Botón cerrar sesión (escritorio) */}
                <button
                  onClick={handleLogout}
                  className="hidden md:flex items-center gap-1 text-sm text-slate-500 hover:text-red-500 transition-colors"
                  title="Cerrar sesión"
                >
                  <span className="material-symbols-outlined text-[18px]">logout</span>
                  <span className="text-xs font-medium">Salir</span>
                </button>
              </div>

              {/* Menú hamburguesa – móvil */}
              <button
                className="md:hidden w-10 h-10 flex items-center justify-center rounded-full text-slate-500 hover:bg-slate-100 transition-colors"
                aria-label="Menú"
              >
                <span className="material-symbols-outlined text-[20px]">menu</span>
              </button>
            </div>
          </>
        )}

        {/* Si NO hay sesión: solo botón de "Iniciar Sesión" */}
        {!user && (
          <Link
            to="/iniciar-sesion"
            className="h-9 px-4 flex items-center gap-1.5 text-sm font-semibold text-white bg-[#002878] rounded-lg hover:bg-[#001a4d] transition-colors"
          >
            <span className="material-symbols-outlined text-[16px]">login</span>
            Iniciar Sesión
          </Link>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
