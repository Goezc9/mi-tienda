import React from 'react';

const Auth = () => {
  return (
    <div className="bg-white text-slate-900 font-body min-h-screen w-screen flex flex-col lg:flex-row antialiased">

      {/* PANEL IZQUIERDO - Azul Oscuro Corporativo */}
      {/* Usamos bg-[#002878] para forzar el color de la imagen original */}
      <div className="hidden lg:flex lg:w-1/2 relative bg-[#002878] items-center justify-center p-16 overflow-hidden">

        {/* Capa de brillo sutil para que no sea un azul plano */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 to-transparent"></div>

        <div className="relative z-10 max-w-xl text-white">
          <div className="flex items-center gap-3 mb-12">
            <span className="material-symbols-outlined text-[36px]" style={{ fontVariationSettings: "'FILL' 1" }}>
              storefront
            </span>
            <span className="text-2xl font-bold tracking-tight">Mi Tienda</span>
          </div>

          <h1 className="text-5xl font-bold mb-8 leading-[1.1]">
            Plataforma líder en comercio corporativo
          </h1>

          <p className="text-lg text-blue-100/80 leading-relaxed max-w-md">
            Acceda a un ecosistema de compras diseñado para la eficiencia, con control total sobre sus transacciones y gestión de inventario en tiempo real.
          </p>
        </div>
      </div>

      {/* PANEL DERECHO - Formulario */}
      <div className="w-full lg:w-1/2 flex bg-white items-center justify-center p-8 sm:p-12 lg:p-20">
        <div className="w-full max-w-md">
          <h2 className="text-4xl font-bold text-[#001a4d] mb-3 tracking-tight">
            Registro y Acceso
          </h2>
          <p className="text-slate-500 mb-10">
            Ingrese sus credenciales para acceder a su panel de control.
          </p>

          {/* Formulario */}
          <form className="space-y-6">
            <div>
              <label className="block text-[11px] font-bold text-slate-700 uppercase tracking-widest mb-2">
                Correo Electrónico
              </label>
              <div className="relative">
                <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-xl">
                  mail
                </span>
                <input
                  type="email"
                  placeholder="ejemplo@empresa.com"
                  className="w-full h-12 pl-12 pr-4 bg-white border border-slate-200 rounded-md focus:border-[#002878] focus:ring-1 focus:ring-[#002878] outline-none transition-all"
                />
              </div>
            </div>

            <div>
              <label className="block text-[11px] font-bold text-slate-700 uppercase tracking-widest mb-2">
                Contraseña
              </label>
              <div className="relative">
                <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-xl">
                  lock
                </span>
                <input
                  type="password"
                  placeholder="••••••••"
                  className="w-full h-12 pl-12 pr-4 bg-white border border-slate-200 rounded-md focus:border-[#002878] focus:ring-1 focus:ring-[#002878] outline-none transition-all"
                />
              </div>
            </div>

            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center gap-2 cursor-pointer text-slate-600">
                <input type="checkbox" className="w-4 h-4 rounded border-slate-300 text-[#002878]" />
                Recordarme
              </label>
              <a href="#" className="font-bold text-[#002878] hover:underline">
                ¿Olvidó su contraseña?
              </a>
            </div>

            <button className="w-full h-12 bg-[#002878] text-white font-bold rounded-md hover:bg-[#001a4d] transition-all uppercase text-[11px] tracking-widest">
              Acceder a la plataforma
            </button>
          </form>

          {/* Divisor */}
          <div className="relative my-10 text-center">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-slate-100"></div>
            </div>
            <span className="relative px-4 bg-white text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em]">
              o continuar con
            </span>
          </div>

          <div className="space-y-3">
            <button className="w-full h-12 flex items-center justify-center gap-3 border border-slate-200 text-slate-700 font-semibold text-sm rounded-md hover:bg-slate-50 transition-colors">
              <img alt="Google" className="w-4 h-4" src="https://www.gstatic.com/images/branding/product/1x/googleg_48dp.png" />
              Acceder con Google
            </button>
            <button className="w-full h-12 flex items-center justify-center gap-3 border border-slate-200 text-slate-700 font-semibold text-sm rounded-md hover:bg-slate-50 transition-colors">
              <span className="material-symbols-outlined text-xl text-slate-600">business_center</span>
              Acceder con SSO Corporativo
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;