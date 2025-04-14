interface CheckBoxProps {
  name: string;
  value: string;
  checked?: boolean;
  className?: string;
  handleChange: (value: string) => void;
}

export const CheckBox: React.FC<CheckBoxProps> = ({
  name,
  value,
  checked,
  className,
  handleChange,
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
          handleChange(value);
        }}
      />
      <label htmlFor={name}>{name}</label>
    </div>
  );
};
