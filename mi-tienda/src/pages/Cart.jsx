import { useState } from 'react';
import { Link } from 'react-router-dom';

// ── Datos iniciales de demostración ──────────────────────────────────────────
const INITIAL_ITEMS = [
  {
    id: 1,
    name: 'Auriculares Inalámbricos Premium',
    variant: 'Color: Midnight Black',
    price: 189.99,
    qty: 1,
    img: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=300&q=80',
  },
  {
    id: 2,
    name: 'Smartwatch Serie 7',
    variant: 'Tamaño: 44mm',
    price: 349.99,
    qty: 2,
    img: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=300&q=80',
  },
  {
    id: 3,
    name: 'Teclado Mecánico RGB',
    variant: 'Idioma: Español',
    price: 94.50,
    qty: 1,
    img: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=300&q=80',
  },
];

const SHIPPING_FREE_THRESHOLD = 500;
const SHIPPING_COST = 12.99;

// ── Subcomponentes locales ────────────────────────────────────────────────────

/** Tarjeta de un producto en el carrito */
const CartItem = ({ item, onQtyChange, onRemove }) => {
  return (
    <div className="flex gap-4 py-5 border-b border-slate-100 last:border-0 group">
      {/* Imagen */}
      <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-lg overflow-hidden flex-shrink-0 bg-slate-100">
        <img
          src={item.img}
          alt={item.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
      </div>

      {/* Info */}
      <div className="flex-1 min-w-0">
        <div className="flex justify-between items-start gap-2">
          <div className="min-w-0">
            <h3 className="text-sm sm:text-base font-semibold text-slate-800 truncate">
              {item.name}
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">{item.variant}</p>
          </div>
          {/* Precio total del ítem */}
          <span className="text-sm sm:text-base font-bold text-[#002878] whitespace-nowrap flex-shrink-0">
            ${(item.price * item.qty).toFixed(2)}
          </span>
        </div>

        {/* Precio unitario */}
        <p className="text-xs text-slate-400 mt-1">${item.price.toFixed(2)} c/u</p>

        {/* Controles: cantidad + eliminar */}
        <div className="flex items-center justify-between mt-3">
          {/* Selector de cantidad */}
          <div className="flex items-center border border-slate-200 rounded-lg overflow-hidden">
            <button
              onClick={() => onQtyChange(item.id, item.qty - 1)}
              className="w-8 h-8 flex items-center justify-center text-slate-500 hover:bg-slate-100 transition-colors disabled:opacity-30"
              disabled={item.qty <= 1}
              aria-label="Reducir cantidad"
            >
              <span className="material-symbols-outlined text-base">remove</span>
            </button>
            <span className="w-8 text-center text-sm font-semibold text-slate-700">
              {item.qty}
            </span>
            <button
              onClick={() => onQtyChange(item.id, item.qty + 1)}
              className="w-8 h-8 flex items-center justify-center text-slate-500 hover:bg-slate-100 transition-colors"
              aria-label="Aumentar cantidad"
            >
              <span className="material-symbols-outlined text-base">add</span>
            </button>
          </div>

          {/* Eliminar */}
          <button
            onClick={() => onRemove(item.id)}
            className="flex items-center gap-1 text-xs text-slate-400 hover:text-red-500 transition-colors"
            aria-label="Eliminar producto"
          >
            <span className="material-symbols-outlined text-sm">delete_outline</span>
            <span className="hidden sm:inline">Eliminar</span>
          </button>
        </div>
      </div>
    </div>
  );
};

/** Barra de progreso de envío gratuito */
const FreeShippingBar = ({ subtotal }) => {
  const progress = Math.min((subtotal / SHIPPING_FREE_THRESHOLD) * 100, 100);
  const remaining = SHIPPING_FREE_THRESHOLD - subtotal;

  return (
    <div className="bg-blue-50 border border-blue-100 rounded-xl p-4 mb-5">
      <div className="flex items-center gap-2 mb-2">
        <span className="material-symbols-outlined text-[#002878] text-lg">local_shipping</span>
        {remaining > 0 ? (
          <p className="text-xs text-slate-600">
            Agrega{' '}
            <span className="font-bold text-[#002878]">${remaining.toFixed(2)}</span>{' '}
            más para obtener <span className="font-bold">envío gratis</span>
          </p>
        ) : (
          <p className="text-xs font-bold text-emerald-600">
            🎉 ¡Tienes envío gratis!
          </p>
        )}
      </div>
      <div className="h-1.5 bg-blue-100 rounded-full overflow-hidden">
        <div
          className="h-full bg-[#002878] rounded-full transition-all duration-500"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
};

/** Resumen de precios a la derecha */
const OrderSummary = ({ subtotal, shipping, discount, total, itemCount }) => {
  const [coupon, setCoupon] = useState('');
  const [couponApplied, setCouponApplied] = useState(false);

  const handleCoupon = () => {
    if (coupon.trim().toUpperCase() === 'TIENDA10') {
      setCouponApplied(true);
    }
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5 sm:p-6 sticky top-20">
      <h2 className="text-lg font-bold text-slate-800 mb-5">Resumen del Pedido</h2>

      {/* Filas de precios */}
      <div className="space-y-3 text-sm">
        <div className="flex justify-between text-slate-600">
          <span>Subtotal ({itemCount} artículos)</span>
          <span className="font-medium text-slate-800">${subtotal.toFixed(2)}</span>
        </div>

        <div className="flex justify-between text-slate-600">
          <span>Envío</span>
          {shipping === 0 ? (
            <span className="font-semibold text-emerald-600">Gratis</span>
          ) : (
            <span className="font-medium text-slate-800">${shipping.toFixed(2)}</span>
          )}
        </div>

        {discount > 0 && (
          <div className="flex justify-between text-emerald-600">
            <span className="flex items-center gap-1">
              <span className="material-symbols-outlined text-sm">local_offer</span>
              Cupón TIENDA10
            </span>
            <span className="font-semibold">-${discount.toFixed(2)}</span>
          </div>
        )}
      </div>

      <div className="my-4 border-t border-slate-100" />

      {/* Total */}
      <div className="flex justify-between items-center mb-5">
        <span className="text-base font-bold text-slate-800">Total</span>
        <span className="text-xl font-bold text-[#002878]">${total.toFixed(2)}</span>
      </div>

      {/* Campo de cupón */}
      {!couponApplied ? (
        <div className="flex gap-2 mb-5">
          <input
            type="text"
            placeholder="Código de cupón"
            value={coupon}
            onChange={(e) => setCoupon(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleCoupon()}
            className="flex-1 h-10 px-3 text-sm border border-slate-200 rounded-lg focus:border-[#002878] focus:ring-1 focus:ring-[#002878] outline-none transition-all"
          />
          <button
            onClick={handleCoupon}
            className="h-10 px-3 text-sm font-semibold text-[#002878] border border-[#002878] rounded-lg hover:bg-[#002878] hover:text-white transition-all"
          >
            Aplicar
          </button>
        </div>
      ) : (
        <div className="flex items-center gap-2 text-sm text-emerald-600 bg-emerald-50 border border-emerald-200 rounded-lg px-3 py-2 mb-5">
          <span className="material-symbols-outlined text-sm">check_circle</span>
          Cupón TIENDA10 aplicado (10%)
        </div>
      )}

      {/* Botón principal */}
      <Link to="/checkout">
        <button className="w-full h-12 bg-[#002878] text-white font-bold rounded-xl hover:bg-[#001a4d] active:scale-95 transition-all flex items-center justify-center gap-2 text-sm uppercase tracking-widest shadow-md shadow-[#002878]/20">
          Proceder al Pago
          <span className="material-symbols-outlined text-base">arrow_forward</span>
        </button>
      </Link>

      {/* Métodos de pago */}
      <div className="mt-4 flex items-center justify-center gap-1 flex-wrap">
        {['visa', 'mastercard', 'paypal', 'apple_pay'].map((m) => (
          <span
            key={m}
            className="text-[10px] text-slate-400 border border-slate-200 rounded px-1.5 py-0.5 font-mono uppercase"
          >
            {m.replace('_', ' ')}
          </span>
        ))}
      </div>

      {/* Seguridad */}
      <p className="text-center text-[10px] text-slate-400 mt-3 flex items-center justify-center gap-1">
        <span className="material-symbols-outlined text-xs">lock</span>
        Pago 100% seguro y encriptado
      </p>
    </div>
  );
};

// ── Página principal ──────────────────────────────────────────────────────────

const Cart = () => {
  const [items, setItems] = useState(INITIAL_ITEMS);

  const handleQtyChange = (id, newQty) => {
    if (newQty < 1) return;
    setItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, qty: newQty } : item))
    );
  };

  const handleRemove = (id) => {
    setItems((prev) => prev.filter((item) => item.id !== id));
  };

  const subtotal = items.reduce((acc, i) => acc + i.price * i.qty, 0);
  const shipping = subtotal >= SHIPPING_FREE_THRESHOLD ? 0 : SHIPPING_COST;
  const itemCount = items.reduce((acc, i) => acc + i.qty, 0);

  // Cupón hardcodeado como estado para propósitos de demo
  // (en producción esto vendría del backend)
  const [couponApplied] = useState(false);
  const discount = couponApplied ? subtotal * 0.1 : 0;
  const total = subtotal + shipping - discount;

  // ── Carrito vacío ──────────────────────────────────────────────────────────
  if (items.length === 0) {
    return (
      <div className="min-h-[calc(100vh-64px)] bg-[#f7f9fb] flex flex-col items-center justify-center text-center px-6 py-16">
        <div className="w-24 h-24 bg-blue-50 rounded-full flex items-center justify-center mb-6">
          <span className="material-symbols-outlined text-5xl text-[#002878]">shopping_cart</span>
        </div>
        <h2 className="text-2xl font-bold text-slate-800 mb-2">Tu carrito está vacío</h2>
        <p className="text-slate-500 mb-8 max-w-sm">
          Explora nuestra tienda y añade productos increíbles a tu carrito.
        </p>
        <Link
          to="/inicio"
          className="inline-flex items-center gap-2 h-12 px-8 bg-[#002878] text-white font-bold rounded-xl hover:bg-[#001a4d] transition-all text-sm uppercase tracking-widest"
        >
          <span className="material-symbols-outlined text-base">storefront</span>
          Ver Productos
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-[calc(100vh-64px)] bg-[#f7f9fb]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10">

        {/* ── Encabezado ─────────────────────────────────────────────────── */}
        <div className="flex items-center justify-between mb-6 sm:mb-8">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
              Carrito de Compras
            </h1>
            <p className="text-sm text-slate-500 mt-1">
              {itemCount} {itemCount === 1 ? 'artículo' : 'artículos'}
            </p>
          </div>
          <Link
            to="/inicio"
            className="hidden sm:flex items-center gap-1 text-sm font-semibold text-[#002878] hover:underline"
          >
            <span className="material-symbols-outlined text-sm">arrow_back</span>
            Seguir comprando
          </Link>
        </div>

        {/* ── Grid principal (Lista + Resumen) ───────────────────────────── */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">

          {/* COLUMNA IZQUIERDA – Lista de productos */}
          <div className="lg:col-span-2 space-y-5">

            {/* Barra envío gratis */}
            <FreeShippingBar subtotal={subtotal} />

            {/* Tarjeta de artículos */}
            <div className="bg-white rounded-2xl border border-slate-100 shadow-sm px-5 sm:px-6 py-2">
              {items.map((item) => (
                <CartItem
                  key={item.id}
                  item={item}
                  onQtyChange={handleQtyChange}
                  onRemove={handleRemove}
                />
              ))}
            </div>

            {/* Guardar carrito / Vaciar */}
            <div className="flex items-center justify-between flex-wrap gap-3">
              <button className="flex items-center gap-1.5 text-sm text-slate-500 hover:text-slate-700 transition-colors">
                <span className="material-symbols-outlined text-sm">bookmark_border</span>
                Guardar para después
              </button>
              <button
                onClick={() => setItems([])}
                className="flex items-center gap-1.5 text-sm text-red-400 hover:text-red-600 transition-colors"
              >
                <span className="material-symbols-outlined text-sm">delete_sweep</span>
                Vaciar carrito
              </button>
            </div>

            {/* Productos recomendados – solo en móvil aparece al final en escritorio */}
            <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5 sm:p-6">
              <h3 className="text-sm font-bold text-slate-700 uppercase tracking-widest mb-4">
                También te puede interesar
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {[
                  { name: 'Mouse Ergonómico', price: 59.99, img: 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=200&q=80' },
                  { name: 'Webcam 4K Pro', price: 129.00, img: 'https://images.unsplash.com/photo-1587825140708-dfaf72ae4b04?w=200&q=80' },
                  { name: 'Hub USB-C 7en1', price: 44.99, img: 'https://images.unsplash.com/photo-1625842268584-8f3296236761?w=200&q=80' },
                ].map((rec) => (
                  <div
                    key={rec.name}
                    className="group rounded-xl border border-slate-100 overflow-hidden hover:shadow-md transition-shadow cursor-pointer"
                  >
                    <div className="aspect-square bg-slate-50 overflow-hidden">
                      <img
                        src={rec.img}
                        alt={rec.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    <div className="p-2.5">
                      <p className="text-xs font-semibold text-slate-700 leading-tight">{rec.name}</p>
                      <p className="text-xs font-bold text-[#002878] mt-1">${rec.price.toFixed(2)}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Link volver – móvil */}
            <Link
              to="/inicio"
              className="flex sm:hidden items-center gap-1 text-sm font-semibold text-[#002878]"
            >
              <span className="material-symbols-outlined text-sm">arrow_back</span>
              Seguir comprando
            </Link>
          </div>

          {/* COLUMNA DERECHA – Resumen */}
          <div className="lg:col-span-1">
            <OrderSummary
              subtotal={subtotal}
              shipping={shipping}
              discount={discount}
              total={total}
              itemCount={itemCount}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
