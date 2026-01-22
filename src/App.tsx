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
  const [searchOrigin, setSearchOrigin] = useState('');
  const [searchDestination, setSearchDestination] = useState('');
  const [searchDepartureDate, setSearchDepartureDate] = useState('');
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
    }
  }, [filters, sortBy, flights.length, saveToUrl]);

  // Handle search submission
  const handleSearch = async (origin: string, destination: string, departureDate: string) => {
    setSearchOrigin(origin);
    setSearchDestination(destination);
    setSearchDepartureDate(departureDate);
    await search(origin, destination, departureDate);
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <h1 className="text-3xl font-bold text-gray-950 tracking-tight">
            ✈️ Flight Search Engine
          </h1>
          <p className="text-gray-600 text-sm mt-1 font-normal">Find the best flights for your trip</p>
        </div>

        {/* Editor Row - Shows when search is successful */}
        {flights.length > 0 && (
          <div className="bg-white border-t border-gray-200 shadow-sm">
            <div className="max-w-7xl mx-auto px-4">
              {/* Tab Buttons */}
              <div className="flex gap-3 py-3">
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

              {/* Minified Search Row */}
              <div className="flex gap-3 py-3 border-t border-gray-200 bg-gray-50 -mx-4 px-4">
                <span className="text-xs font-semibold text-gray-600 uppercase tracking-wider whitespace-nowrap">Modify search:</span>
                
                <input
                  type="text"
                  placeholder="From"
                  value={searchOrigin}
                  onChange={(e) => setSearchOrigin(e.target.value.toUpperCase())}
                  maxLength={3}
                  disabled={loading}
                  className="h-8 px-3 py-1 text-xs border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-100 shrink-0"
                />

                <input
                  type="text"
                  placeholder="To"
                  value={searchDestination}
                  onChange={(e) => setSearchDestination(e.target.value.toUpperCase())}
                  maxLength={3}
                  disabled={loading}
                  className="h-8 px-3 py-1 text-xs border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-100 shrink-0"
                />

                <input
                  type="date"
                  value={searchDepartureDate}
                  onChange={(e) => setSearchDepartureDate(e.target.value)}
                  disabled={loading}
                  min={new Date().toISOString().split('T')[0]}
                  className="h-8 px-3 py-1 text-xs border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-100 shrink-0"
                />

                <button
                  type="button"
                  onClick={async () => {
                    if (searchOrigin && searchDestination && searchDepartureDate) {
                      await handleSearch(searchOrigin, searchDestination, searchDepartureDate);
                    }
                  }}
                  disabled={loading || !searchOrigin || !searchDestination || !searchDepartureDate}
                  className="h-8 px-4 py-1 text-xs font-semibold text-white bg-blue-600 rounded-md hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-all duration-200 whitespace-nowrap shrink-0"
                >
                  {loading ? 'Searching...' : 'Search'}
                </button>
              </div>
            </div>
          </div>
        )}
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-8">
        {/* Search Form - Show only when no results */}
        {flights.length === 0 && (
          <SearchForm 
            onSearch={handleSearch} 
            loading={loading}
            onUrlStateLoaded={(_origin, _destination, departureDate) => setSelectedDate(departureDate)}
          />
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
