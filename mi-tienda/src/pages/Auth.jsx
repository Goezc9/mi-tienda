import React from 'react';

const Auth = () => {
  return (
    <div className="bg-background text-on-background font-body-md antialiased min-h-screen w-screen flex">
      {/* Left Visual Panel (Hidden on Mobile) */}
      <div className="hidden lg:flex lg:w-1/2 relative bg-primary items-center justify-center overflow-hidden">
        <img
          alt=""
          className="absolute inset-0 w-full h-full object-cover opacity-20 mix-blend-overlay"
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuBjtEKp85uzMzNOcdQElXD5yK7D1iHvTZ2PTlj2AOJMd7Zh4R2aUHvJfSNT2hEF5jDq2OZJeDIdkqwmogDg7Q5O6vVPffU4MzvsTmQeSgWz5Bkd4zutjySiTIimasXBK6equm8O4x1uoVaK5rFzHeGiLvsTVXZjs6Qs88lJevRIgck4dJCI0EZUntrtyT6GLKs0MmLcAFzdtTNAoO9Iqt3OsYINANW8AoVXp-WyNnsOq3C3QDLoRsMCqJag6NzRavtgYYo8kyhj_6pv"
        />
        {/* Gradient Overlay for depth */}
        <div className="absolute inset-0 bg-gradient-to-t from-primary via-primary/80 to-transparent"></div>
        <div className="relative z-10 p-16 max-w-2xl text-on-primary">
          <div className="flex items-center gap-3 mb-8">
            <span className="material-symbols-outlined text-[40px]" style={{ fontVariationSettings: "'FILL' 1" }}>
              storefront
            </span>
            <span className="font-h2 text-h2 font-bold tracking-tight">Mi Tienda</span>
          </div>
          <h1 className="font-h1 text-h1 mb-6">Plataforma líder en comercio corporativo</h1>
          <p className="font-body-lg text-body-lg text-primary-fixed opacity-90">
            Acceda a un ecosistema de compras diseñado para la eficiencia, con control total sobre sus transacciones y gestión de inventario en tiempo real.
          </p>
        </div>
      </div>

      {/* Right Interaction Panel (Form Canvas) */}
      <div className="w-full lg:w-1/2 flex bg-background relative">
        <div className="m-auto w-full">
          {/* Mobile Brand Identity (Suppressed Navigation, so brand anchors here) */}
          <div className="absolute top-8 left-8 lg:hidden flex items-center gap-2 text-primary">
            <span className="material-symbols-outlined text-[28px]" style={{ fontVariationSettings: "'FILL' 1" }}>
              storefront
            </span>
            <span className="font-h3 text-h3 font-bold tracking-tight">Mi Tienda</span>
          </div>

          <div className="m-auto w-full max-w-md p-6 sm:p-10 bg-surface-container-lowest rounded-xl shadow-[0_4px_20px_rgba(30,58,138,0.04)] border border-surface-container">
            <h2 className="font-h2 text-h2 text-on-background mb-2">Registro y Acceso</h2>
            <p className="font-body-md text-body-md text-on-surface-variant mb-8">
              Ingrese sus credenciales para acceder a su panel de control.
            </p>

            {/* Tabs / Segmented Control */}
            <div className="flex p-1 mb-8 bg-surface-container rounded-lg">
              <button className="flex-1 py-2.5 font-label-md text-label-md bg-surface-container-lowest text-primary rounded-md shadow-sm border border-outline-variant/30 text-center transition-all">
                Iniciar Sesión
              </button>
              <button className="flex-1 py-2.5 font-label-md text-label-md text-on-surface-variant hover:text-on-background text-center transition-all">
                Crear Cuenta
              </button>
            </div>

            {/* Auth Form */}
            <form action="#" className="space-y-5">
              {/* Email Field */}
              <div>
                <label className="block font-label-sm text-label-sm text-on-surface-variant mb-2" htmlFor="email">
                  Correo Electrónico
                </label>
                <div className="relative">
                  <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-outline">
                    mail
                  </span>
                  <input
                    className="w-full h-12 pl-10 pr-4 bg-surface-container-lowest border border-outline-variant rounded focus:border-primary focus:ring-2 focus:ring-primary-fixed outline-none transition-all font-body-md text-body-md text-on-background placeholder-outline/60"
                    id="email"
                    placeholder="ejemplo@empresa.com"
                    type="email"
                  />
                </div>
              </div>

              {/* Password Field */}
              <div>
                <label className="block font-label-sm text-label-sm text-on-surface-variant mb-2" htmlFor="password">
                  Contraseña
                </label>
                <div className="relative">
                  <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-outline">
                    lock
                  </span>
                  <input
                    className="w-full h-12 pl-10 pr-4 bg-surface-container-lowest border border-outline-variant rounded focus:border-primary focus:ring-2 focus:ring-primary-fixed outline-none transition-all font-body-md text-body-md text-on-background placeholder-outline/60"
                    id="password"
                    placeholder="••••••••"
                    type="password"
                  />
                </div>
              </div>

              {/* Extras Row */}
              <div className="flex items-center justify-between mt-4">
                <label className="flex items-center gap-2 cursor-pointer group">
                  <input
                    className="w-5 h-5 rounded-sm border-outline-variant text-primary focus:ring-primary-fixed transition-all cursor-pointer"
                    type="checkbox"
                  />
                  <span className="font-body-sm text-body-sm text-on-surface-variant group-hover:text-on-background transition-colors">
                    Recordarme
                  </span>
                </label>
                <a className="font-label-sm text-label-sm text-primary hover:text-on-primary-fixed-variant transition-colors" href="#">
                  ¿Olvidó su contraseña?
                </a>
              </div>

              {/* Submit Action */}
              <button
                className="w-full h-12 mt-6 bg-primary-container text-on-primary font-label-md text-label-md rounded hover:bg-primary transition-colors flex items-center justify-center gap-2"
                type="submit"
              >
                Acceder a la plataforma
                <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
              </button>
            </form>

            {/* Divider */}
            <div className="flex items-center gap-4 my-8">
              <div className="flex-1 h-px bg-outline-variant/40"></div>
              <span className="font-label-sm text-label-sm text-outline uppercase tracking-wider">
                o continuar con
              </span>
              <div className="flex-1 h-px bg-outline-variant/40"></div>
            </div>

            {/* Alternate Login Methods */}
            <div className="space-y-3">
              <button
                className="w-full h-12 flex items-center justify-center gap-3 bg-transparent border border-outline-variant text-on-surface-variant font-label-md text-label-md rounded hover:bg-surface-container hover:text-on-background transition-colors"
                type="button"
              >
                <img
                  alt="Google Logo"
                  className="w-5 h-5"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuA7dpmprlSRYCJQsKTPMga5kg-gTqlD--S8ydAFGVEbKo0FalVxOO-CI6tc6Fj7NDm-XkUjrPiJoBQA4tJwrcALCUJ5kLpagiyUKBNvVtKIzpuYYJFT1oROxgIMQPih8hPymtBjkzWCrYiKXB3ORa60sgf7hBI4gYdOVwqddgeBgfqMV705zf3s9j3TV09T9NynSHnUhvATuCSlqkKWGTJtaSlQ2AQTqmiHlW-oN7RBDNI9KjwO70Kdt02JcB2_MugS3XkxyABHTywa"
                />
                Acceder con Google
              </button>
              <button
                className="w-full h-12 flex items-center justify-center gap-3 bg-transparent border border-outline-variant text-on-surface-variant font-label-md text-label-md rounded hover:bg-surface-container hover:text-on-background transition-colors"
                type="button"
              >
                <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>
                  business_center
                </span>
                Acceder con SSO Corporativo
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;
