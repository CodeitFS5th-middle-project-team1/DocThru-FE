import { Tab, TabActive, TextPosition } from './Tab';

interface TabItem<T = string> {
  key: T;
  label: string;
}

interface TabGroupProps<T = string> {
  items: TabItem<T>[];
  activeKey: T;
  onTabChange: (key: T) => void;
  position?: TextPosition;
}

export const TabGroup = <T extends string>({
  items,
  activeKey,
  onTabChange,
  position = TextPosition.MIDDLE,
}: TabGroupProps<T>) => {
  return (
    <div className="flex gap-4">
      {items.map((tab) => (
        <Tab
          key={tab.key}
          position={position}
          isActive={activeKey === tab.key ? TabActive.ON : TabActive.OFF}
          onClick={() => onTabChange(tab.key)}
        >
          {tab.label}
        </Tab>
      ))}
    </div>
  );
};
