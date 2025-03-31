interface DividerProps {
  className?: string;
}

export const Divider: React.FC<DividerProps> = ({ className }) => {
  return <div className={`w-full h-[1px] bg-custom-gray-300 ${className}`} />;
};
