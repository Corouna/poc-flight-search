interface SearchSummaryProps {
  origin: string;
  destination: string;
  departureDate: string;
  onEditClick: () => void;
}

export const SearchSummary = ({
  origin,
  destination,
  departureDate,
  onEditClick,
}: SearchSummaryProps) => {
  // Format date for display
  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr + 'T00:00:00');
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  return (
    <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 mb-6 flex items-center justify-between">
      <div className="flex items-center gap-4 flex-1">
        {/* From → To */}
        <div className="flex items-center gap-2 min-w-max">
          <span className="text-sm font-semibold text-gray-900">{origin}</span>
          <span className="text-gray-400">→</span>
          <span className="text-sm font-semibold text-gray-900">{destination}</span>
        </div>

        {/* Divider */}
        <div className="h-6 w-px bg-gray-300"></div>

        {/* Departure Date */}
        <div className="text-sm text-gray-600">
          <span className="font-medium">{formatDate(departureDate)}</span>
        </div>
      </div>

      {/* Edit Button */}
      <button
        onClick={onEditClick}
        className="ml-4 px-4 py-2 text-sm font-semibold text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 hover:border-gray-400 transition-all duration-200"
      >
        Edit search
      </button>
    </div>
  );
};
