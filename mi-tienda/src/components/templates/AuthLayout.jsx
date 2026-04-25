const AuthLayout = ({ hero, form }) => {
  return (
    <div className="bg-white text-slate-900 font-body min-h-screen w-screen flex flex-col lg:flex-row antialiased">
      {/* PANEL IZQUIERDO */}
      {hero}

      {/* PANEL DERECHO */}
      <div className="w-full lg:w-1/2 flex bg-white items-center justify-center p-8 sm:p-12 lg:p-20">
        {form}
      </div>
    </div>
  );
};

export default AuthLayout;
