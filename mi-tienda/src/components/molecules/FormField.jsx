import Label from '../atoms/Label';
import Input from '../atoms/Input';
import Icon from '../atoms/Icon';

const FormField = ({ label, icon, id, rightElement, ...inputProps }) => {
  return (
    <div>
      {label && <Label htmlFor={id}>{label}</Label>}
      <div className="relative">
        {icon && (
          <Icon 
            name={icon} 
            className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-xl" 
          />
        )}
        <Input id={id} iconSpacer={!!icon} className={rightElement ? 'pr-10' : ''} {...inputProps} />
        {rightElement && (
          <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center justify-center">
            {rightElement}
          </div>
        )}
      </div>
    </div>
  );
};

export default FormField;
