const Button = ({ children, variant = 'primary', className = '', ...props }) => {
  const baseClasses = 'flex items-center justify-center font-bold rounded-md transition-all uppercase tracking-widest text-[11px] w-full h-12 gap-2';
  
  const variants = {
    primary: 'bg-[#002878] text-white hover:bg-[#001a4d]',
    ghost: 'bg-transparent text-primary hover:bg-surface-container',
  };

  return (
    <button className={`${baseClasses} ${variants[variant]} ${className}`} {...props}>
      {children}
    </button>
  );
};

export default Button;
