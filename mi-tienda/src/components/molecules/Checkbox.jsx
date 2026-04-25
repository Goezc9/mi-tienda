const Checkbox = ({ label, id, ...props }) => {
  return (
    <label htmlFor={id} className="flex items-center gap-2 cursor-pointer text-slate-600">
      <input 
        id={id}
        type="checkbox" 
        className="w-4 h-4 rounded border-slate-300 text-[#002878] focus:ring-[#002878]" 
        {...props} 
      />
      {label}
    </label>
  );
};

export default Checkbox;
