export interface Segment {
  departure: {
    iataCode: string;
    at: string;
  };
  arrival: {
    iataCode: string;
    at: string;
  };
  operatingCarrier?: {
    carrierCode: string;
  };
  aircraft?: {
    code: string;
  };
  operating?: string;
  duration: string;
  id: string;
  numberOfStops: number;
  blacklistedInEU?: boolean;
}

export interface Itinerary {
  duration: string;
  segments: Segment[];
}

export interface PricingDetail {
  currency: string;
  total: string;
  base: string;
  fee: string;
  grandTotal: string;
}

export interface FlightOffer {
  type: string;
  id: string;
  source: string;
  instantTicketingRequired: boolean;
  nonHomogeneous: boolean;
  oneWay: boolean;
  lastTicketingDate: string;
  numberOfBookableSeats: number;
  itineraries: Itinerary[];
  price: PricingDetail;
  pricingOptions: {
    fareType: string[];
    includedCheckedBagsOnly: boolean;
  };
  validatingAirlineCodes: string[];
  travelerPricings: Array<{
    travelerId: string;
    fareOption: string;
    travelerType: string;
    price: PricingDetail;
    fareDetailsBySegment: Array<{
      segmentId: string;
      cabin: string;
      fareBasis: string;
      class: string;
      includedCheckedBags: {
        weight: number;
        weightUnit: string;
      };
    }>;
  }>;
}

export interface SearchParams {
  origin: string;
  destination: string;
  departureDate: string;
}

export interface FilterState {
  selectedAirlines: string[];
  maxPrice: number;
  selectedStops: string[];
}

export interface AirlineInfo {
  code: string;
  name: string;
  count: number;
}

export interface PriceDataPoint {
  price: number;
  count: number;
}
