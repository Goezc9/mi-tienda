const Label = ({ children, className = '', ...props }) => {
  return (
    <label className={`block text-[11px] font-bold text-slate-700 uppercase tracking-widest mb-2 ${className}`} {...props}>
      {children}
    </label>
  );
};

export default Label;
