import { useCallback } from 'react';

const ListItem = ({ itemId, active, name, toggleActive, color }) => {
  const handleChange = useCallback(() => toggleActive(itemId), [itemId, toggleActive]);
  return (
    <li
      className="flex items-stretch justify-items-stretch text-sm"
      style={{ background: color }}
    >
      {/* I think the linter is wrong here — the input is a child of the label and that should
      be fine. */}
      {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
      <label className="flex-1 px-2 py-0.5 whitespace-nowrap cursor-pointer">
        <input
          type="checkbox"
          className="mr-2"
          checked={active}
          onChange={handleChange}
        />
        {name}
      </label>
    </li>
  );
};

export default function ItemList({
  items,
  toggleActive,
}) {
  return (
    <div className="space-y-1">
      <ul className="divide-y divide-white bg-gray-100 shadow-lg">
        {Object.values(items).map(({ itemId, name, active, color }, i) => (
          <ListItem
            key={itemId}
            itemId={itemId}
            name={name}
            active={active}
            toggleActive={toggleActive}
            color={active ? color : undefined}
          />
        ))}
      </ul>
    </div>
  );
}
