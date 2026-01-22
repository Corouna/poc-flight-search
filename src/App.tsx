import { useState, useEffect } from 'react';
import './index.css';
import { SearchForm } from './components/SearchForm/SearchForm';
import { FlightResults } from './components/FlightResults/FlightResults';
import { FilterPanel } from './components/Filters/FilterPanel';
import { PriceChart } from './components/PriceGraph/PriceChart';
import { useFlightSearch } from './hooks/useFlightSearch';
import { useFlightFilters } from './hooks/useFlightFilters';
import { useUrlState } from './hooks/useUrlState';
import { getPriceDistribution } from './utils/filterHelpers';

function App() {
  const { flights, loading, error, search } = useFlightSearch();
  const {
    filters,
    filteredFlights,
    availableAirlines,
    priceRange,
    sortBy,
    updateAirlineFilter,
    updateStopsFilter,
    updatePriceFilter,
    updateSortBy,
    resetFilters,
  } = useFlightFilters(flights);
  const { saveToUrl } = useUrlState();

  const [activeTab, setActiveTab] = useState<'list' | 'graph'>('list');
  const [selectedDate, setSelectedDate] = useState('');
  const [showSearchCard, setShowSearchCard] = useState(true);
  const [searchParams, setSearchParams] = useState({ origin: '', destination: '', departureDate: '' });
  const priceDistribution = getPriceDistribution(filteredFlights);

  // Save filter and sort state to URL whenever they change
  useEffect(() => {
    if (flights.length > 0) {
      saveToUrl({
        origin: '',
        destination: '',
        departureDate: '',
        filters,
        sortBy,
      });
      // Hide search card when results are loaded
      setShowSearchCard(false);
    }
  }, [filters, sortBy, flights.length, saveToUrl]);

  // Handle search submission
  const handleSearch = async (origin: string, destination: string, departureDate: string) => {
    setSearchParams({ origin, destination, departureDate });
    await search(origin, destination, departureDate);
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <h1 className="text-3xl font-bold text-gray-950 tracking-tight">
            ✈️ Flight Search Engine
          </h1>
          <p className="text-gray-600 text-sm mt-1 font-normal">Find the best flights for your trip</p>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-8">
        {/* Search Form - Show when no results or when user clicks "Edit search" */}
        {showSearchCard && (
          <SearchForm 
            onSearch={handleSearch} 
            loading={loading}
            onUrlStateLoaded={(_origin, _destination, departureDate) => setSelectedDate(departureDate)}
          />
        )}

        {/* Results Section */}
        {flights.length > 0 && (
          <div className="sticky top-16 z-30 bg-white py-4 -mx-4 px-4 mb-6 border-b border-gray-200 shadow-sm">
            <div className="flex gap-3 items-center justify-between">
              <div className="flex gap-3">
                <button
                  onClick={() => setActiveTab('list')}
                  className={`px-5 py-3 rounded-lg font-semibold text-sm transition-all duration-200 ${
                    activeTab === 'list'
                      ? 'bg-blue-600 text-white shadow-md hover:shadow-lg hover:bg-blue-700'
                      : 'bg-white text-gray-700 border-2 border-gray-200 hover:border-blue-400 hover:text-blue-600'
                  }`}
                >
                  📋 Flight List ({filteredFlights.length})
                </button>
                <button
                  onClick={() => setActiveTab('graph')}
                  className={`px-5 py-3 rounded-lg font-semibold text-sm transition-all duration-200 ${
                    activeTab === 'graph'
                      ? 'bg-blue-600 text-white shadow-md hover:shadow-lg hover:bg-blue-700'
                      : 'bg-white text-gray-700 border-2 border-gray-200 hover:border-blue-400 hover:text-blue-600'
                  }`}
                >
                  📊 Price Chart
                </button>
              </div>

              {/* Search Summary Info - Right side */}
              {!showSearchCard && (
                <div className="flex items-center gap-4 ml-auto pl-4 border-l border-gray-300">
                  <div className="flex items-center gap-3">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-semibold text-gray-900">{searchParams.origin}</span>
                      <span className="text-gray-400">→</span>
                      <span className="text-sm font-semibold text-gray-900">{searchParams.destination}</span>
                    </div>
                    <div className="h-4 w-px bg-gray-300"></div>
                    <span className="text-sm text-gray-600 font-medium">
                      {new Date(searchParams.departureDate + 'T00:00:00').toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                    </span>
                  </div>
                  <button
                    onClick={() => setShowSearchCard(true)}
                    className="px-3 py-1.5 text-xs font-semibold text-gray-700 bg-gray-100 border border-gray-300 rounded hover:bg-gray-200 hover:border-gray-400 transition-all duration-200 whitespace-nowrap"
                  >
                    Edit
                  </button>
                </div>
              )}
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Filters Sidebar */}
          {flights.length > 0 && (
            <div className="lg:col-span-1">
              <FilterPanel
                filters={filters}
                priceRange={priceRange}
                airlines={availableAirlines}
                onAirlineChange={updateAirlineFilter}
                onStopsChange={updateStopsFilter}
                onPriceChange={updatePriceFilter}
                onReset={resetFilters}
              />
            </div>
          )}

          {/* Main Content */}
          <div className={flights.length > 0 ? 'lg:col-span-3' : 'lg:col-span-4'}>
            {activeTab === 'list' ? (
              <FlightResults
                flights={filteredFlights}
                loading={loading}
                error={error}
                sortBy={sortBy}
                onSortChange={updateSortBy}
                selectedDate={selectedDate}
              />
            ) : (
              <PriceChart data={priceDistribution} />
            )}
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;
