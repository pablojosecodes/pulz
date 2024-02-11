import React, { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

// Define the type for a single event
type Event = {
  city: string;
  country: string;
  id: string;
  originatorid: string;
  timestamp: string;
  type: string;
  url: string;
};

// Define the props for the component
type MyComponentProps = {
  events: Event[];
};

// Update the type for chart data to include dayOfWeek
type ChartData = {
  date: string;
  dayOfWeek: string; 
  events: number;
};

const MyComponent: React.FC<MyComponentProps> = ({ events }) => {
  const [chartData, setChartData] = useState<ChartData[]>([]);

  useEffect(() => {
    const countEventsPerDay = () => {
      let counts: { [key: string]: ChartData } = {}; // Use ChartData here

      // Get today's date and the dates for the past 7 days
      for (let i = 6; i >= 0; i--) { // Start from 7 days ago
        let date = new Date();
        date.setDate(date.getDate() - i);
        let dateString = date.toISOString().split('T')[0];
        counts[dateString] = { 
          date: dateString,
          events: 0,
          dayOfWeek: date.toLocaleDateString('en-US', { weekday: 'short' })
        };
      }

      // Count events per day
      events.forEach(event => {
        let eventDate = event.timestamp.split('T')[0];
        if (counts[eventDate]) {
          counts[eventDate].events++;
        }
      });

      // Convert counts to array for the chart
      let dataForChart = Object.values(counts);

      setChartData(dataForChart);
    };

    countEventsPerDay();
  }, [events]);

  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={chartData}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="dayOfWeek" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="events" stroke="#8884d8" activeDot={{ r: 8 }} />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default MyComponent;
