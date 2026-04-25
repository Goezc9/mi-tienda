import { Link } from 'react-router-dom'

function Navbar() {
  return (
    <nav className="bg-white border-b border-gray-100 sticky top-0 z-50">
      <div className="container mx-auto px-4 h-16 flex justify-start items-center">
        <div className="flex gap-8">
          <Link to="/" className="text-gray-600 hover:text-blue-600 font-medium transition-colors">
            Inicio
          </Link>
          <Link to="/acerca-de" className="text-gray-600 hover:text-blue-600 font-medium transition-colors">
            Acerca de
          </Link>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
