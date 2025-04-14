interface RadioBtnProps {
  id: string;
  groupName: string;
  value: string;
  name: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  checked: boolean;
}

export const RadioBtn: React.FC<RadioBtnProps> = ({
  name,
  value,
  id,
  groupName,
  onChange,
  checked,
}) => {
  return (
    <div className="gap-1">
      <input
        type="radio"
        id={id}
        name={groupName}
        value={value}
        onChange={onChange}
        checked={checked}
      />
      <label>{name}</label>
    </div>
  );
};
