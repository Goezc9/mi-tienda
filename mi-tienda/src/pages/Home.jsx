import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';

// ── Catálogo de productos (basado en diseño Stitch "Inicio - Productos Azul") ──
const PRODUCTS = [
  {
    id: 1,
    name: 'Auriculares Studio Pro',
    description: 'Cancelación de ruido activa con acústica de precisión para profesionales.',
    price: 189.99,
    originalPrice: 249.99,
    category: 'Audio',
    badge: 'Más vendido',
    rating: 4.8,
    reviews: 312,
    img: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&q=80',
  },
  {
    id: 2,
    name: 'Cámara Mirrorless X-T4',
    description: 'Sensor APS-C de 26.1MP y estabilización de imagen integrada.',
    price: 1299.00,
    originalPrice: null,
    category: 'Fotografía',
    badge: 'Nuevo',
    rating: 4.9,
    reviews: 87,
    img: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=400&q=80',
  },
  {
    id: 3,
    name: 'Ultrabook Elite 14"',
    description: 'Procesador de 12a gen, 16GB RAM, chasis de aluminio ultrafino.',
    price: 1149.00,
    originalPrice: 1349.00,
    category: 'Computadoras',
    badge: 'Oferta',
    rating: 4.7,
    reviews: 204,
    img: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=400&q=80',
  },
  {
    id: 4,
    name: 'Smartwatch Series 7',
    description: 'Pantalla retina siempre activa, monitor de oxígeno en sangre.',
    price: 349.99,
    originalPrice: null,
    category: 'Wearables',
    badge: null,
    rating: 4.6,
    reviews: 511,
    img: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&q=80',
  },
  {
    id: 5,
    name: 'Teclado Mecánico RGB',
    description: 'Switches Cherry MX, retroiluminación RGB por zona, layout español.',
    price: 94.50,
    originalPrice: 119.00,
    category: 'Periféricos',
    badge: 'Oferta',
    rating: 4.5,
    reviews: 178,
    img: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=400&q=80',
  },
  {
    id: 6,
    name: 'Monitor 4K UltraWide',
    description: 'Panel IPS 34" 144Hz, compatible con HDR10 y FreeSync Premium.',
    price: 699.00,
    originalPrice: null,
    category: 'Monitores',
    badge: null,
    rating: 4.8,
    reviews: 93,
    img: 'https://images.unsplash.com/photo-1527443224154-c4a573d78f4d?w=400&q=80',
  },
  {
    id: 7,
    name: 'Altavoz Bluetooth Portátil',
    description: 'Resistente al agua IPX7, 30h de batería, sonido envolvente 360°.',
    price: 79.99,
    originalPrice: 99.99,
    category: 'Audio',
    badge: null,
    rating: 4.4,
    reviews: 430,
    img: 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=400&q=80',
  },
  {
    id: 8,
    name: 'Mouse Ergonómico Pro',
    description: 'Sensor óptico 25K DPI, 7 botones programables, carga inalámbrica.',
    price: 59.99,
    originalPrice: null,
    category: 'Periféricos',
    badge: 'Nuevo',
    rating: 4.6,
    reviews: 265,
    img: 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=400&q=80',
  },
];

const CATEGORIES = ['Todos', 'Audio', 'Fotografía', 'Computadoras', 'Wearables', 'Periféricos', 'Monitores'];

// ── Componente: Tarjeta de producto ─────────────────────────────────────────
const ProductCard = ({ product }) => {
  const [inCart, setInCart] = useState(false);
  const discount = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : null;

  const badgeColors = {
    'Más vendido': 'bg-amber-100 text-amber-700',
    'Nuevo':       'bg-emerald-100 text-emerald-700',
    'Oferta':      'bg-red-100 text-red-600',
  };

  return (
    <div className="group bg-white rounded-2xl border border-slate-100 shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden flex flex-col">
      {/* Imagen */}
      <div className="relative aspect-square overflow-hidden bg-slate-50">
        <img
          src={product.img}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        {/* Badge */}
        {product.badge && (
          <span className={`absolute top-3 left-3 text-[10px] font-bold uppercase tracking-widest px-2 py-1 rounded-full ${badgeColors[product.badge]}`}>
            {product.badge}
          </span>
        )}
        {/* Descuento */}
        {discount && (
          <span className="absolute top-3 right-3 text-[10px] font-bold bg-[#002878] text-white px-2 py-1 rounded-full">
            -{discount}%
          </span>
        )}
        {/* Quick-add overlay */}
        <button
          onClick={() => setInCart(true)}
          className="absolute inset-x-0 bottom-0 py-3 bg-[#002878]/90 text-white text-xs font-bold uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center gap-1.5"
        >
          <span className="material-symbols-outlined text-sm">add_shopping_cart</span>
          Agregar al carrito
        </button>
      </div>

      {/* Info */}
      <div className="p-4 flex flex-col flex-1">
        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">
          {product.category}
        </p>
        <h3 className="text-sm font-semibold text-slate-800 leading-snug mb-1 line-clamp-2">
          {product.name}
        </h3>
        <p className="text-xs text-slate-500 line-clamp-2 mb-3 flex-1">
          {product.description}
        </p>

        {/* Estrellas */}
        <div className="flex items-center gap-1 mb-3">
          <div className="flex text-amber-400">
            {Array.from({ length: 5 }).map((_, i) => (
              <span key={i} className="material-symbols-outlined text-sm" style={{ fontVariationSettings: `'FILL' ${i < Math.floor(product.rating) ? 1 : 0}` }}>
                star
              </span>
            ))}
          </div>
          <span className="text-[10px] text-slate-400">({product.reviews})</span>
        </div>

        {/* Precio + botón */}
        <div className="flex items-center justify-between mt-auto">
          <div>
            <span className="text-base font-bold text-[#002878]">
              ${product.price.toFixed(2)}
            </span>
            {product.originalPrice && (
              <span className="text-xs text-slate-400 line-through ml-1.5">
                ${product.originalPrice.toFixed(2)}
              </span>
            )}
          </div>
          <button
            onClick={() => setInCart(!inCart)}
            className={`w-9 h-9 rounded-full flex items-center justify-center transition-all ${
              inCart
                ? 'bg-emerald-500 text-white'
                : 'bg-slate-100 text-slate-600 hover:bg-[#002878] hover:text-white'
            }`}
            aria-label="Agregar al carrito"
          >
            <span className="material-symbols-outlined text-[18px]">
              {inCart ? 'check' : 'add'}
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};

// ── Página principal ─────────────────────────────────────────────────────────
const Home = () => {
  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState('Todos');
  const [sortBy, setSortBy] = useState('relevancia');

  const filtered = useMemo(() => {
    let list = PRODUCTS;

    if (activeCategory !== 'Todos') {
      list = list.filter((p) => p.category === activeCategory);
    }

    if (search.trim()) {
      const q = search.toLowerCase();
      list = list.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q)
      );
    }

    switch (sortBy) {
      case 'precio-asc':  return [...list].sort((a, b) => a.price - b.price);
      case 'precio-desc': return [...list].sort((a, b) => b.price - a.price);
      case 'rating':      return [...list].sort((a, b) => b.rating - a.rating);
      default:            return list;
    }
  }, [search, activeCategory, sortBy]);

  return (
    <div className="min-h-screen bg-[#f7f9fb]">

      {/* ── Hero Banner ────────────────────────────────────────────────────── */}
      <div className="relative bg-[#002878] overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/60 to-[#002878]" />
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(ellipse_at_top_right,_#60a5fa,_transparent_60%)]" />
        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20 flex flex-col lg:flex-row items-center gap-8">
          <div className="flex-1 text-center lg:text-left">
            <span className="inline-block text-[10px] font-bold text-blue-300 uppercase tracking-widest bg-blue-300/10 border border-blue-300/20 rounded-full px-3 py-1 mb-4">
              Nueva Colección 2025
            </span>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight mb-4">
              Rendimiento<br />
              <span className="text-blue-300">Profesional</span>
            </h1>
            <p className="text-blue-100/80 text-base sm:text-lg max-w-lg mx-auto lg:mx-0 mb-8">
              Equipamiento diseñado para la excelencia. Descubre la nueva línea de productos con tecnología avanzada.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center lg:justify-start">
              <Link
                to="/carrito"
                className="inline-flex items-center justify-center gap-2 h-12 px-6 bg-white text-[#002878] font-bold rounded-xl hover:bg-blue-50 transition-colors text-sm"
              >
                <span className="material-symbols-outlined text-base">shopping_bag</span>
                Ver Carrito
              </Link>
              <button className="inline-flex items-center justify-center gap-2 h-12 px-6 bg-transparent border border-white/30 text-white font-semibold rounded-xl hover:bg-white/10 transition-colors text-sm">
                <span className="material-symbols-outlined text-base">local_shipping</span>
                Envío gratis +$500
              </button>
            </div>
          </div>
          {/* Imagen hero — solo desktop */}
          <div className="hidden lg:block w-72 xl:w-80 flex-shrink-0">
            <img
              src="https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&q=90"
              alt="Producto destacado"
              className="w-full aspect-square object-cover rounded-3xl shadow-2xl shadow-black/30 ring-1 ring-white/10"
            />
          </div>
        </div>
      </div>

      {/* ── Contenido principal ──────────────────────────────────────────────── */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10">

        {/* Buscador + Ordenar */}
        <div className="flex flex-col sm:flex-row gap-3 mb-6">
          <div className="relative flex-1">
            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-[20px]">search</span>
            <input
              type="text"
              placeholder="Buscar productos..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full h-11 pl-10 pr-4 bg-white border border-slate-200 rounded-xl focus:border-[#002878] focus:ring-1 focus:ring-[#002878] outline-none text-sm transition-all"
            />
          </div>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="h-11 px-4 bg-white border border-slate-200 rounded-xl focus:border-[#002878] outline-none text-sm text-slate-700 cursor-pointer"
          >
            <option value="relevancia">Relevancia</option>
            <option value="precio-asc">Precio: menor a mayor</option>
            <option value="precio-desc">Precio: mayor a menor</option>
            <option value="rating">Mejor valorados</option>
          </select>
        </div>

        {/* Filtros de categoría */}
        <div className="flex gap-2 flex-wrap mb-8">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`h-8 px-4 rounded-full text-xs font-semibold transition-all ${
                activeCategory === cat
                  ? 'bg-[#002878] text-white shadow-md shadow-[#002878]/20'
                  : 'bg-white text-slate-600 border border-slate-200 hover:border-[#002878] hover:text-[#002878]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Contador de resultados */}
        <div className="flex items-center justify-between mb-5">
          <p className="text-sm text-slate-500">
            {filtered.length === 0
              ? 'Sin resultados'
              : `${filtered.length} producto${filtered.length !== 1 ? 's' : ''} encontrado${filtered.length !== 1 ? 's' : ''}`}
          </p>
          {search && (
            <button
              onClick={() => setSearch('')}
              className="text-xs text-[#002878] font-semibold hover:underline flex items-center gap-1"
            >
              <span className="material-symbols-outlined text-sm">close</span>
              Limpiar búsqueda
            </button>
          )}
        </div>

        {/* Grid de productos */}
        {filtered.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-5">
            {filtered.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          /* Estado vacío */
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center mb-4">
              <span className="material-symbols-outlined text-4xl text-slate-400">search_off</span>
            </div>
            <h3 className="text-lg font-bold text-slate-700 mb-2">Sin resultados</h3>
            <p className="text-sm text-slate-500 mb-6">
              No encontramos productos para "{search}"
            </p>
            <button
              onClick={() => { setSearch(''); setActiveCategory('Todos'); }}
              className="h-10 px-6 bg-[#002878] text-white text-sm font-bold rounded-xl hover:bg-[#001a4d] transition-colors"
            >
              Ver todos los productos
            </button>
          </div>
        )}

        {/* Banner inferior: envío gratis */}
        {filtered.length > 0 && (
          <div className="mt-12 bg-gradient-to-r from-[#002878] to-[#0057ff] rounded-2xl p-6 sm:p-8 flex flex-col sm:flex-row items-center gap-4 text-center sm:text-left">
            <div className="w-14 h-14 bg-white/10 rounded-xl flex items-center justify-center flex-shrink-0">
              <span className="material-symbols-outlined text-3xl text-white" style={{ fontVariationSettings: "'FILL' 1" }}>local_shipping</span>
            </div>
            <div className="flex-1">
              <h3 className="text-white font-bold text-lg">Envío Gratis</h3>
              <p className="text-blue-200 text-sm">En todos los pedidos superiores a $500. Entrega en 2-5 días hábiles.</p>
            </div>
            <Link
              to="/carrito"
              className="flex-shrink-0 h-10 px-5 bg-white text-[#002878] font-bold text-sm rounded-xl hover:bg-blue-50 transition-colors flex items-center gap-2"
            >
              <span className="material-symbols-outlined text-base">shopping_cart</span>
              Mi Carrito
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
