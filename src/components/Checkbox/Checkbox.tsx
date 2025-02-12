const Checkbox: React.FC<{ checked: boolean; onClick: () => void; disabled?: boolean }> = ({ checked, onClick, disabled }) => {
  return (
    <input
      type="checkbox"
      className="w-6 h-6 cursor-pointer appearance-none border border-gray-400 rounded-md checked:bg-blue-500 checked:border-blue-500 focus:outline-none"
      checked={checked}
      onChange={onClick}
      disabled={disabled}
    />
  );
};

export default Checkbox;
