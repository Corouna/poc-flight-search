import { useState, useEffect } from 'react';
import './index.css';
import { SearchForm } from './components/SearchForm/SearchForm';
import { FlightResults } from './components/FlightResults/FlightResults';
import { FilterPanel } from './components/Filters/FilterPanel';
import { PriceChart } from './components/PriceGraph/PriceChart';
import { PriceByDateScroller } from './components/PriceByDate/PriceByDateScroller';
import { useFlightSearch } from './hooks/useFlightSearch';
import { useFlightFilters } from './hooks/useFlightFilters';
import { useUrlState } from './hooks/useUrlState';
import { useDatePriceCache } from './hooks/useDatePriceCache';
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
  const { saveToUrl, clearUrl } = useUrlState();
  const { cache: priceCache, fetchPriceForDate } = useDatePriceCache();

  const [activeTab, setActiveTab] = useState<'list' | 'graph'>('list');
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
    } else {
      // Clear URL when no flights (showing search form)
      clearUrl();
    }
  }, [filters, sortBy, flights.length, saveToUrl, clearUrl]);

  // Handle search submission
  const handleSearch = async (origin: string, destination: string, departureDate: string) => {
    setSearchOrigin(origin);
    setSearchDestination(destination);
    setSearchDepartureDate(departureDate);
    await search(origin, destination, departureDate);
  };

  return (
    <div className="h-screen w-screen overflow-hidden bg-linear-to-br from-blue-50 to-indigo-100 flex flex-col">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 z-40 shrink-0">
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
              {/* Minified Search Row with Tab Buttons */}
              <div className="flex gap-3 py-3 border-t border-gray-200 bg-white -mx-4 px-4 items-center justify-between">
                {/* Search Controls - Left side */}
                <div className="flex gap-3 items-center flex-1">
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

                {/* Tab Buttons - Right side with icons and tooltips */}
                <div className="flex gap-2 items-center ml-auto pl-4 border-l border-gray-300">
                  <div className="group relative">
                    <button
                      onClick={() => setActiveTab('list')}
                      className={`h-8 w-8 rounded-md flex items-center justify-center text-lg transition-all duration-200 ${
                        activeTab === 'list'
                          ? 'bg-blue-600 text-white shadow-md'
                          : 'bg-white text-gray-700 border border-gray-300 hover:border-blue-400 hover:bg-blue-50'
                      }`}
                      title="Flight List"
                    >
                      📋
                    </button>
                    <div className="absolute right-0 bottom-full mb-2 hidden group-hover:block bg-gray-900 text-white text-xs rounded px-2 py-1 whitespace-nowrap z-50">
                      Flight List ({filteredFlights.length})
                      <div className="absolute left-1/2 top-full -translate-x-1/2 border-4 border-transparent border-t-gray-900"></div>
                    </div>
                  </div>

                  <div className="group relative">
                    <button
                      onClick={() => setActiveTab('graph')}
                      className={`h-8 w-8 rounded-md flex items-center justify-center text-lg transition-all duration-200 ${
                        activeTab === 'graph'
                          ? 'bg-blue-600 text-white shadow-md'
                          : 'bg-white text-gray-700 border border-gray-300 hover:border-blue-400 hover:bg-blue-50'
                      }`}
                      title="Price Chart"
                    >
                      📊
                    </button>
                    <div className="absolute right-0 bottom-full mb-2 hidden group-hover:block bg-gray-900 text-white text-xs rounded px-2 py-1 whitespace-nowrap z-50">
                      Price Chart
                      <div className="absolute left-1/2 top-full -translate-x-1/2 border-4 border-transparent border-t-gray-900"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </header>

      {/* Main Content Container */}
      {flights.length === 0 && !loading ? (
        // Search form view - full page scrollable
        <main className="flex-1 overflow-y-auto">
          <div className="max-w-7xl mx-auto px-4 py-8">
            <SearchForm 
              onSearch={handleSearch} 
              loading={loading}
            />
          </div>
        </main>
      ) : (
        // Results view - fixed price scroller + independent scrollable areas
        <>
          {/* Price by Date Scroller - Fixed, non-scrolling */}
          {flights.length > 0 && (
            <div className="bg-white border-b border-gray-200 px-4 py-2 shrink-0">
              <div className="max-w-7xl mx-auto">
                <PriceByDateScroller
                  selectedDate={searchDepartureDate}
                  onDateSelect={async (date) => {
                    setSearchDepartureDate(date);
                    await search(searchOrigin, searchDestination, date);
                  }}
                  priceCache={priceCache}
                  onFetchDate={async (date) => {
                    await fetchPriceForDate(searchOrigin, searchDestination, date);
                  }}
                />
              </div>
            </div>
          )}

          {/* Results Area - Independent scrollable sections */}
          <main className="flex-1 overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 py-8 h-full flex flex-col">
              <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 flex-1 overflow-hidden">
                {/* Filters Sidebar - Left scrollable */}
                {flights.length > 0 && (
                  <div className="lg:col-span-1 overflow-y-auto scrollbar-hide">
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

                {/* Flight Results - Right scrollable */}
                <div className={`${flights.length > 0 ? 'lg:col-span-3' : 'lg:col-span-4'} overflow-y-auto scrollbar-hide`}>
                  {activeTab === 'list' ? (
                    <FlightResults
                      flights={filteredFlights}
                      loading={loading}
                      error={error}
                      sortBy={sortBy}
                      onSortChange={updateSortBy}
                    />
                  ) : (
                    <PriceChart data={priceDistribution} loading={loading} />
                  )}
                </div>
              </div>
            </div>
          </main>
        </>
      )}
    </div>
  );
}

export default App;
