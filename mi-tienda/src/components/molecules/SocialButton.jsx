import Icon from '../atoms/Icon';

const SocialButton = ({ children, imgSrc, iconName, ...props }) => {
  return (
    <button 
      className="w-full h-12 flex items-center justify-center gap-3 border border-slate-200 text-slate-700 font-semibold text-sm rounded-md hover:bg-slate-50 transition-colors"
      {...props}
    >
      {imgSrc && <img alt="" className="w-4 h-4" src={imgSrc} />}
      {iconName && <Icon name={iconName} className="text-xl text-slate-600" />}
      {children}
    </button>
  );
};

export default SocialButton;
