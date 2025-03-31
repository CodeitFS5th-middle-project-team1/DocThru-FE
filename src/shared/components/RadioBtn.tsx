interface RadioBtnProps {
  id: string;
  groupName: string;
  value: string;
  name: string;
  onClick: (e) => void;
  checked: boolean;
}

export const RadioBtn: React.FC<RadioBtnProps> = ({
  name,
  value,
  id,
  groupName,
  onClick,
  checked,
}) => {
  return (
    <div className="gap-1">
      <input
        type="radio"
        id={id}
        name={groupName}
        value={value}
        onClick={onClick}
        checked={checked}
      />
      <label>{name}</label>
    </div>
  );
};
