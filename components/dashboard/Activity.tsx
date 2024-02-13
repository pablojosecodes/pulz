import { useSettings } from '@/util/globalSettings';
import { BasicChartData, Event } from '@/util/typical/types';
import React, { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';


// Define the props for the component
// type ActivityProps = {
//   events: Event[];
// };


type ActivityProps = {
  events: Event[];

};

const Activity: React.FC<ActivityProps> = ({ events }) => {
  const { settings } = useSettings();



  const [chartData, setChartData] = useState<BasicChartData[]>([]);

  const countEventsPerDay = () => {
    let counts: { [key: string]: BasicChartData } = {}; // Use ChartData here

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
      if (event.timestamp) {
        let eventDate = event.timestamp.toString().split('T')[0];
        if (counts[eventDate]) {
          counts[eventDate].events++;
        }
      }
    });

    // Convert counts to array for the chart
    let dataForChart = Object.values(counts);

    setChartData(dataForChart);
  };


  const countEventsPerHour = () => {
    let counts: { [hour: string]: BasicChartData } = {};

    // Initialize counts for each hour of the day
    for (let i = 0; i < 24; i++) {
      let hour = i.toString().padStart(2, '0') + ':00';
      counts[hour] = { time: hour, events: 0 };
    }

    // Count events per hour
    events.forEach(event => {
      if (event.timestamp) {
        let hour = new Date(event.timestamp).getHours().toString().padStart(2, '0') + ':00';
        if (counts[hour]) {
          counts[hour].events++;
        }
      }
    });

    // Convert counts to array for the chart
    let dataForChart = Object.values(counts);
    setChartData(dataForChart);
  };
  const countEventsPerMonth = () => {
    let counts: { [key: string]: BasicChartData } = {};

    // Get the current date and first date of the month
    let currentDate = new Date();
    let firstDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);

    // Iterate over each day of the month
    while (firstDayOfMonth.getMonth() === currentDate.getMonth()) {
      let dateString = firstDayOfMonth.toISOString().split('T')[0];
      counts[dateString] = {
        date: dateString,
        events: 0,
        dayOfMonth: firstDayOfMonth.getDate()  // Store the day of the month
      };
      firstDayOfMonth.setDate(firstDayOfMonth.getDate() + 1);
    }

    // Count events per day
    events.forEach(event => {
      if (event.timestamp) {
        let eventDate = event.timestamp.toString().split('T')[0];
        if (counts[eventDate]) {
          counts[eventDate].events++;
        }
      }
    });

    let dataForChart = Object.values(counts);
    setChartData(dataForChart);
  };

  useEffect(() => {
    if (settings.timespan.text === 'Yesterday' || settings.timespan.text === 'Today') {
      countEventsPerHour();
    } else if (settings.timespan.text === '7 days') {
      countEventsPerDay();
    } else if (settings.timespan.text === 'This month') {
      countEventsPerMonth();
    }
  }, [events, settings]);



  return (
    <ResponsiveContainer  className="text-neutral-800 " width="100%" height={300}>
      <LineChart data={chartData}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey={settings.timespan.text === 'Yesterday' || settings.timespan.text === 'Today' ? 'time' : 'dayOfWeek'} />
        <YAxis />
        <Tooltip />
        <Legend />
        {/* <Line type="monotone" dataKey="events" stroke="#8884d8" activeDot={{ r: 8 }} /> */}
        <Line type="monotone" dataKey="events" stroke="#8884d8" activeDot={{ r: 8 }} />

      </LineChart>
    </ResponsiveContainer>
  );
};

export default Activity;



// const Activity: React.FC<ActivityProps> = ({ events }) => {
//   const [chartData, setChartData] = useState<BasicChartData[]>([]);

//   useEffect(() => {
//     const countEventsPerDay = () => {
//       let counts: { [key: string]: BasicChartData } = {}; // Use ChartData here

//       // Get today's date and the dates for the past 7 days
//       for (let i = 6; i >= 0; i--) { // Start from 7 days ago
//         let date = new Date();
//         date.setDate(date.getDate() - i);
//         let dateString = date.toISOString().split('T')[0];
//         counts[dateString] = {
//           date: dateString,
//           events: 0,
//           dayOfWeek: date.toLocaleDateString('en-US', { weekday: 'short' })
//         };
//       }

//       // Count events per day
//       events.forEach(event => {
//         if (event.timestamp) {
//           let eventDate = event.timestamp.toString().split('T')[0];
//           if (counts[eventDate]) {
//             counts[eventDate].events++;
//           }
//         }
//       });

//       // Convert counts to array for the chart
//       let dataForChart = Object.values(counts);

//       setChartData(dataForChart);
//     };

//     countEventsPerDay();
//   }, [events]);

//   return (
//     <ResponsiveContainer width="100%" height={300}>
//       <LineChart data={chartData}>
//         <CartesianGrid strokeDasharray="3 3" />
//         <XAxis dataKey="dayOfWeek" />
//         <YAxis />
//         <Tooltip />
//         <Legend />
//         <Line type="monotone" dataKey="events" stroke="#8884d8" activeDot={{ r: 8 }} />
//       </LineChart>
//     </ResponsiveContainer>
//   );
// };

// export default Activity;
