const Input = ({ className = '', iconSpacer = false, ...props }) => {
  return (
    <input
      className={`w-full h-12 pr-4 bg-white border border-slate-200 rounded-md focus:border-[#002878] focus:ring-1 focus:ring-[#002878] outline-none transition-all ${
        iconSpacer ? 'pl-12' : 'pl-4'
      } ${className}`}
      {...props}
    />
  );
};

export default Input;
