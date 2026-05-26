import { useCallback } from 'react';
import { Area, AreaChart, CartesianGrid, Cell, Line, LineChart, Pie, PieChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { apiClient } from '../../shared/api/client';
import { useRemoteData } from '../../shared/hooks/useRemoteData';
import SectionIntro from '../../shared/ui/SectionIntro';
import AsyncNotice from '../../shared/ui/AsyncNotice';

const allocation = [
  { name: 'Math', value: 14 },
  { name: 'Physics', value: 11 },
  { name: 'English', value: 8 },
  { name: 'CS', value: 8 }
];
const palette = ['#4f98a3', '#6daa45', '#e8af34', '#a86fdf'];

export default function InsightsScreen() {
  const loadTrend = useCallback(() => apiClient.readTrend(), []);
  const { data, loading, error } = useRemoteData(loadTrend, []);

  return (
    <div className="screen-grid">
      <section className="panel panel-span-8">
        <SectionIntro
          tag="Insights"
          title="Progress is easier to trust when it looks consistent"
          text="The trend view shows whether effort and results are moving in the same direction."
        />
        <AsyncNotice loading={loading} error={error} />
        <div className="chart-box">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data}>
              <CartesianGrid stroke="#393836" strokeDasharray="3 3" />
              <XAxis dataKey="week" stroke="#797876" />
              <YAxis stroke="#797876" />
              <Tooltip />
              <Line type="monotone" dataKey="score" stroke="#4f98a3" strokeWidth={3} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </section>

      <section className="panel panel-span-4">
        <SectionIntro tag="Hours" title="How time was distributed" />
        <div className="chart-box">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie data={allocation} dataKey="value" nameKey="name" outerRadius={90} innerRadius={54}>
                {allocation.map((entry, index) => <Cell key={entry.name} fill={palette[index % palette.length]} />)}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </section>

      <section className="panel panel-span-12">
        <SectionIntro tag="Trend" title="Study hours by week" />
        <div className="chart-box chart-box-short">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data}>
              <CartesianGrid stroke="#393836" strokeDasharray="3 3" />
              <XAxis dataKey="week" stroke="#797876" />
              <YAxis stroke="#797876" />
              <Tooltip />
              <Area type="monotone" dataKey="hours" stroke="#6daa45" fill="#6daa45" fillOpacity={0.18} />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </section>
    </div>
  );
}
