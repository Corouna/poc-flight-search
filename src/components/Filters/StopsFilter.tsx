interface StopsFilterProps {
  selectedStops: string[];
  onChange: (stops: string, checked: boolean) => void;
}

const STOP_OPTIONS = [
  { value: '0', label: 'Nonstop' },
  { value: '1', label: '1 Stop' },
  { value: '2+', label: '2+ Stops' },
];

export const StopsFilter = ({ selectedStops, onChange }: StopsFilterProps) => {
  return (
    <div className="space-y-2">
      {STOP_OPTIONS.map((option) => {
        const isChecked = selectedStops.includes(option.value);
        return (
          <label
            key={option.value}
            className={`flex items-center cursor-pointer p-2 rounded transition-colors ${
              isChecked
                ? 'bg-blue-50 border border-blue-200'
                : 'hover:bg-gray-50 border border-transparent'
            }`}
          >
            <input
              type="checkbox"
              checked={isChecked}
              onChange={(e) => onChange(option.value, e.target.checked)}
              className="w-4 h-4 text-blue-600 rounded focus:ring-2 focus:ring-blue-500"
              aria-label={`Filter by ${option.label}`}
            />
            <span className={`ml-3 text-sm ${isChecked ? 'text-blue-700 font-semibold' : 'text-gray-700'}`}>
              {option.label}
            </span>
            {isChecked && <span className="ml-auto text-blue-600">✓</span>}
          </label>
        );
      })}
    </div>
  );
};
