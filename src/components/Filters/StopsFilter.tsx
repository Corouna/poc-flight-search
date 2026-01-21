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
    <div>
      <h3 className="font-semibold text-gray-900 mb-4">✈️ Stops</h3>
      <div className="space-y-3">
        {STOP_OPTIONS.map((option) => (
          <label
            key={option.value}
            className="flex items-center cursor-pointer hover:bg-gray-50 p-2 rounded"
          >
            <input
              type="checkbox"
              checked={selectedStops.includes(option.value)}
              onChange={(e) => onChange(option.value, e.target.checked)}
              className="w-4 h-4 text-blue-600 rounded focus:ring-2 focus:ring-blue-500"
            />
            <span className="ml-3 text-sm text-gray-700">{option.label}</span>
          </label>
        ))}
      </div>
    </div>
  );
};
