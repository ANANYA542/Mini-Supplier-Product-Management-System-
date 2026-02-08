import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend
} from 'recharts';

const COLORS = ['#FF8042', '#FFBB28', '#00C49F', '#0088FE'];

export function CategoryBarChart({ data }) {
  if (!data || data.length === 0) return <div className="text-center text-gray-300 italic h-64 flex items-center justify-center">No data available</div>;

  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
        <XAxis dataKey="_id" axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#9ca3af' }} />
        <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#9ca3af' }} />
        <Tooltip 
            cursor={{ fill: '#fff7ed' }}
            contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
        />
        <Bar dataKey="count" fill="#fdba74" radius={[6, 6, 0, 0]} animationDuration={1000} />
      </BarChart>
    </ResponsiveContainer>
  );
}

export function CertificationPieChart({ data }) {
    if (!data || data.length === 0) return <div className="text-center text-gray-300 italic h-64 flex items-center justify-center">No data available</div>;

    const total = data.reduce((sum, item) => sum + item.count, 0);

    const chartData = data.map((item, index) => ({
        ...item,
        name: item._id,
        percentage: ((item.count / total) * 100).toFixed(0),
        fill: item._id === 'Certified' ? '#4ade80' : item._id === 'Pending' ? '#facc15' : '#d1d5db'
    }));

    return (
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={chartData}
            cx="50%"
            cy="50%"
            innerRadius={60}
            outerRadius={80}
            paddingAngle={5}
            dataKey="count"
            nameKey="name"
            label={({ cx, cy, midAngle, innerRadius, outerRadius, percent }) => {
                const RADIAN = Math.PI / 180;
                const radius = outerRadius + 20;
                const x = cx + radius * Math.cos(-midAngle * RADIAN);
                const y = cy + radius * Math.sin(-midAngle * RADIAN);
                return (
                  <text x={x} y={y} fill="#6b7280" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central" fontSize={12} fontWeight="bold">
                    {`${(percent * 100).toFixed(0)}%`}
                  </text>
                );
            }}
          >
            {chartData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.fill} stroke="none" />
            ))}
          </Pie>
          <Tooltip contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }} />
          <Legend 
            iconType="circle" 
            verticalAlign="bottom" 
            height={36} 
            iconSize={8} 
            formatter={(value, entry) => (
                <span className="text-xs font-bold text-gray-500 uppercase tracking-wider ml-1">
                    {value} <span className="text-gray-400">({entry.payload.percentage}%)</span>
                </span>
            )} 
          />
        </PieChart>
      </ResponsiveContainer>
    );
  }
