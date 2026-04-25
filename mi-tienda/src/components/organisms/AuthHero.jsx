import Icon from '../atoms/Icon';

const AuthHero = () => {
  return (
    <div className="hidden lg:flex lg:w-1/2 relative bg-[#002878] items-center justify-center p-16 overflow-hidden">
      {/* Capa de brillo sutil para que no sea un azul plano */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 to-transparent"></div>

      <div className="relative z-10 max-w-xl text-white">
        <div className="flex items-center gap-3 mb-12">
          <Icon name="storefront" filled className="text-[36px]" />
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
  );
};

export default AuthHero;
