interface CheckBoxProps {
  name: string;
  value: string;
  checked?: boolean;
  className?: string;
  hendleChange: (value: string) => void;
}

export const CheckBox: React.FC<CheckBoxProps> = ({
  name,
  value,
  checked,
  className,
  hendleChange,
}) => {
  return (
    <div className={`flex gap-1 ${className} `}>
      <input
        type="checkbox"
        id={name}
        name={name}
        value={value}
        checked={checked}
        onChange={() => {
          hendleChange(value);
        }}
      />
      <label htmlFor={name}>{name}</label>
    </div>
  );
};
