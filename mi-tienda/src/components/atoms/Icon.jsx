const Icon = ({ name, className = '', filled = false, ...props }) => {
  return (
    <span 
      className={`material-symbols-outlined ${className}`} 
      style={filled ? { fontVariationSettings: "'FILL' 1" } : {}}
      {...props}
    >
      {name}
    </span>
  );
};

export default Icon;
