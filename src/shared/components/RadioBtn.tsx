interface RadioBtnProps {
  id: string;
  groupName: string;
  value: string | number;
  name: string;
}

export const RadioBtn: React.FC<RadioBtnProps> = ({
  name,
  value,
  id,
  groupName,
}) => {
  return (
    <div>
      <input type="radio" id={id} name={groupName} value={value} />
      <label>{name}</label>
    </div>
  );
};
