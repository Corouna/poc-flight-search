interface AirlineFilterProps {
  airlines: Array<{ code: string; name: string; count: number }>;
  selectedAirlines: string[];
  onChange: (airline: string, checked: boolean) => void;
}

export const AirlineFilter = ({
  airlines,
  selectedAirlines,
  onChange,
}: AirlineFilterProps) => {
  return (
    <div className="space-y-1.5 max-h-64 overflow-y-auto">
      {airlines.length === 0 ? (
        <p className="text-sm text-gray-500 italic">No airlines available</p>
      ) : (
        airlines.map((airline) => {
          const isChecked = selectedAirlines.includes(airline.code);
          return (
            <label
              key={airline.code}
              className={`flex items-center cursor-pointer p-2 rounded transition-colors ${
                isChecked
                  ? 'bg-blue-50 border border-blue-200'
                  : 'hover:bg-gray-50 border border-transparent'
              }`}
            >
              <input
                type="checkbox"
                checked={isChecked}
                onChange={(e) => onChange(airline.code, e.target.checked)}
                className="w-4 h-4 text-blue-600 rounded focus:ring-2 focus:ring-blue-500"
                aria-label={`Filter by ${airline.name}`}
              />
              <span className={`ml-3 text-sm flex-1 ${isChecked ? 'text-blue-700 font-semibold' : 'text-gray-700'}`}>
                {airline.code}
              </span>
              <span className={`text-xs ${isChecked ? 'text-blue-600 font-semibold' : 'text-gray-500'}`}>
                {airline.count}
              </span>
              {isChecked && <span className="ml-2 text-blue-600">✓</span>}
            </label>
          );
        })
      )}
    </div>
  );
};
