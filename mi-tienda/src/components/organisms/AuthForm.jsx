import FormField from '../molecules/FormField';
import Checkbox from '../molecules/Checkbox';
import Button from '../atoms/Button';
import SocialButton from '../molecules/SocialButton';

const AuthForm = () => {
  return (
    <div className="w-full max-w-md">
      <h2 className="text-4xl font-bold text-[#001a4d] mb-3 tracking-tight">
        Registro y Acceso
      </h2>
      <p className="text-slate-500 mb-10">
        Ingrese sus credenciales para acceder a su panel de control.
      </p>

      {/* Formulario */}
      <form className="space-y-6">
        <FormField 
          id="email"
          label="Correo Electrónico"
          icon="mail"
          type="email"
          placeholder="ejemplo@empresa.com"
        />

        <FormField 
          id="password"
          label="Contraseña"
          icon="lock"
          type="password"
          placeholder="••••••••"
        />

        <div className="flex items-center justify-between text-sm">
          <Checkbox id="remember" label="Recordarme" />
          <a href="#" className="font-bold text-[#002878] hover:underline">
            ¿Olvidó su contraseña?
          </a>
        </div>

        <Button type="submit">
          Acceder a la plataforma
        </Button>
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
        <SocialButton imgSrc="https://www.gstatic.com/images/branding/product/1x/googleg_48dp.png">
          Acceder con Google
        </SocialButton>
        <SocialButton iconName="business_center">
          Acceder con SSO Corporativo
        </SocialButton>
      </div>
    </div>
  );
};

export default AuthForm;
