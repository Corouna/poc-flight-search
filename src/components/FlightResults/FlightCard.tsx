import type { FlightOffer } from '../../types/flight';
import { formatTime, formatDuration, getNumberOfStopsLabel } from '../../utils/formatHelpers';
import { getNumberOfStops } from '../../utils/filterHelpers';

interface FlightCardProps {
  flight: FlightOffer;
}

export const FlightCard = ({ flight }: FlightCardProps) => {
  const itinerary = flight.itineraries[0];
  const firstSegment = itinerary?.segments[0];
  const lastSegment = itinerary?.segments.at(-1);
  
  if (!firstSegment || !lastSegment) return null;

  const price = Number.parseFloat(flight.price.grandTotal);
  const stops = getNumberOfStops(flight);
  const airline = flight.validatingAirlineCodes[0];
  const duration = itinerary.duration;

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-lg transition-shadow">
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4 items-center">
        {/* Airline */}
        <div className="md:col-span-1">
          <p className="text-sm text-gray-600 font-semibold">{airline}</p>
          <p className="text-xs text-gray-500">Validating Airline</p>
        </div>

        {/* Departure */}
        <div className="md:col-span-1">
          <p className="text-2xl font-bold text-gray-900">
            {formatTime(firstSegment.departure.at)}
          </p>
          <p className="text-sm text-gray-600">{firstSegment.departure.iataCode}</p>
        </div>

        {/* Duration & Stops */}
        <div className="md:col-span-1 text-center">
          <p className="text-sm font-medium text-gray-700">{formatDuration(duration)}</p>
          <div className="w-full h-0.5 bg-gray-300 my-2"></div>
          <p className="text-xs text-gray-600">{getNumberOfStopsLabel(stops)}</p>
        </div>

        {/* Arrival */}
        <div className="md:col-span-1">
          <p className="text-2xl font-bold text-gray-900">
            {formatTime(lastSegment.arrival.at)}
          </p>
          <p className="text-sm text-gray-600">{lastSegment.arrival.iataCode}</p>
        </div>

        {/* Price & Select */}
        <div className="md:col-span-1 text-right">
          <p className="text-3xl font-bold text-blue-600">${price.toFixed(2)}</p>
          <button
            onClick={() => alert('Booking feature coming soon!')}
            className="mt-2 w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 active:bg-blue-800 transition-all font-semibold text-sm shadow-sm hover:shadow-md"
          >
            Select
          </button>
        </div>
      </div>

      {/* Details */}
      <div className="mt-4 pt-4 border-t border-gray-200">
        <details className="cursor-pointer group">
          <summary className="text-sm font-semibold text-blue-600 hover:text-blue-700 active:text-blue-800 transition-colors select-none group-open:text-blue-700">
            View details
          </summary>
          <div className="mt-3 space-y-2 text-xs text-gray-600">
            {itinerary.segments.map((segment, idx) => (
              <div key={segment.id} className="bg-gray-50 p-2 rounded">
                <p className="font-semibold text-gray-800">
                  Segment {idx + 1}: {segment.departure.iataCode} → {segment.arrival.iataCode}
                </p>
                <p>Duration: {formatDuration(segment.duration)}</p>
                <p>
                  {formatTime(segment.departure.at)} - {formatTime(segment.arrival.at)}
                </p>
              </div>
            ))}
          </div>
        </details>
      </div>
    </div>
  );
};
