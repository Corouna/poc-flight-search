import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

interface PriceChartProps {
  data: Array<{ price: number; count: number }>;
}

export const PriceChart = ({ data }: PriceChartProps) => {
  if (data.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-md p-6 flex items-center justify-center h-96">
        <p className="text-gray-500">No price data available</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-xl font-bold text-gray-900 mb-4">📊 Price Distribution</h2>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data} margin={{ top: 20, right: 30, left: 0, bottom: 20 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
          <XAxis
            dataKey="price"
            label={{ value: 'Price (USD)', position: 'insideBottomRight', offset: -5 }}
            tick={{ fontSize: 12 }}
            tickFormatter={(value) => `$${value}`}
          />
          <YAxis
            label={{ value: 'Number of Flights', angle: -90, position: 'insideLeft' }}
            tick={{ fontSize: 12 }}
          />
          <Tooltip
            formatter={(value) => [`${value} flights`, 'Count']}
            labelFormatter={(label) => `Price: $${label}`}
            contentStyle={{
              backgroundColor: '#1f2937',
              border: 'none',
              borderRadius: '8px',
              color: '#fff',
            }}
          />
          <Bar dataKey="count" fill="#3b82f6" radius={[8, 8, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};
