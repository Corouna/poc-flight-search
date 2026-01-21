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
    <div>
      <h3 className="font-semibold text-gray-900 mb-4">🏢 Airlines</h3>
      <div className="space-y-2 max-h-64 overflow-y-auto">
        {airlines.length === 0 ? (
          <p className="text-sm text-gray-500">No airlines available</p>
        ) : (
          airlines.map((airline) => (
            <label
              key={airline.code}
              className="flex items-center cursor-pointer hover:bg-gray-50 p-2 rounded"
            >
              <input
                type="checkbox"
                checked={selectedAirlines.includes(airline.code)}
                onChange={(e) => onChange(airline.code, e.target.checked)}
                className="w-4 h-4 text-blue-600 rounded focus:ring-2 focus:ring-blue-500"
              />
              <span className="ml-3 text-sm text-gray-700 flex-1">
                {airline.code} ({airline.count})
              </span>
            </label>
          ))
        )}
      </div>
    </div>
  );
};
