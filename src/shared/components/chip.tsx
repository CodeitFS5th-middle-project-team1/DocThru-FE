import { ChipType } from '@/types';

interface ChipProps {
  label?: ChipType | string;
  onClick?: () => void;
}

export const Chip: React.FC<ChipProps> = ({ label }) => {
  return (
    <div className="w-100% h-100% justify-center bg-sky-600">
      {typeof label === 'string' ? label : String(label)}
    </div>
  );
};
