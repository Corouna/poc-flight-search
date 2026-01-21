import { useState } from 'react';
import './index.css';
import { SearchForm } from './components/SearchForm/SearchForm';
import { FlightResults } from './components/FlightResults/FlightResults';
import { FilterPanel } from './components/Filters/FilterPanel';
import { PriceChart } from './components/PriceGraph/PriceChart';
import { useFlightSearch } from './hooks/useFlightSearch';
import { useFlightFilters } from './hooks/useFlightFilters';
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

  const [activeTab, setActiveTab] = useState<'list' | 'graph'>('list');
  const priceDistribution = getPriceDistribution(filteredFlights);

  return (
    <div className="min-h-screen bg-linear-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <h1 className="text-2xl font-bold text-gray-900">
            ✈️ Flight Search Engine
          </h1>
          <p className="text-sm text-gray-600 mt-1">
            Find and filter the best flights for your next trip
          </p>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-8">
        {/* Search Form */}
        <SearchForm onSearch={search} loading={loading} />

        {/* Results Section */}
        {flights.length > 0 && (
          <div className="mb-6">
            <div className="flex gap-2 mb-4">
              <button
                onClick={() => setActiveTab('list')}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  activeTab === 'list'
                    ? 'bg-blue-600 text-white'
                    : 'bg-white text-gray-700 border border-gray-200 hover:border-gray-300'
                }`}
              >
                📋 Flight List ({filteredFlights.length})
              </button>
              <button
                onClick={() => setActiveTab('graph')}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  activeTab === 'graph'
                    ? 'bg-blue-600 text-white'
                    : 'bg-white text-gray-700 border border-gray-200 hover:border-gray-300'
                }`}
              >
                📊 Price Chart
              </button>
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
              />
            ) : (
              <PriceChart data={priceDistribution} />
            )}
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 mt-16">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <p className="text-sm text-gray-600 text-center">
            Powered by Amadeus Flight Search API | One-way flights only
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;
