// import React, { useEffect, useState, useCallback } from 'react';
// import {
//   Chart as ChartJS,
//   CategoryScale,
//   LinearScale,
//   TimeScale,
//   Tooltip,
//   Legend,
//   Title,
// } from 'chart.js';
// import { Chart } from 'react-chartjs-2';
// import 'chartjs-adapter-date-fns';
// import zoomPlugin from 'chartjs-plugin-zoom';
// import { CandlestickController, CandlestickElement } from 'chartjs-chart-financial';

// // Register Chart.js components
// ChartJS.register(
//   CategoryScale,
//   LinearScale,
//   TimeScale,
//   Tooltip,
//   Legend,
//   Title,
//   zoomPlugin,
//   CandlestickController,
//   CandlestickElement
// );

// const ThreeDChart = ({ selectedCoin }) => {
//   const [chartData, setChartData] = useState({
//     datasets: [{ label: 'Loading...', data: [] }],
//   });

//   const [loading, setLoading] = useState(true);
//   const [interval, setIntervalState] = useState('1h');

//   // Fetch candlestick data
//   const fetchChartData = useCallback(async () => {
//     if (!selectedCoin) return;

//     setLoading(true);

//     try {
//       const response = await fetch(
//         `https://api.binance.com/api/v3/klines?symbol=${selectedCoin}&interval=${interval}&limit=100`
//       );

//       if (!response.ok) {
//         throw new Error(`HTTP error! Status: ${response.status}`);
//       }

//       const data = await response.json();

//       const formattedData = data.map((item) => ({
//         x: new Date(item[0]),
//         o: parseFloat(item[1]),
//         h: parseFloat(item[2]),
//         l: parseFloat(item[3]),
//         c: parseFloat(item[4]),
//       }));

//       setChartData({
//         datasets: [
//           {
//             label: selectedCoin,
//             data: formattedData,
//             type: 'candlestick',
//             borderColor: '#000000',
//             color: {
//               up: '#089981', // Green for bullish
//               down: '#f23645', // Red for bearish
//               unchanged: '#000000',
//             },
//           },
//         ],
//       });
//     } catch (error) {
//       console.error('Error fetching data:', error);
//     } finally {
//       setLoading(false);
//     }
//   }, [selectedCoin, interval]);

//   // Fetch data when selectedCoin or interval changes
//   useEffect(() => {
//     fetchChartData();
//   }, [fetchChartData], 4000);

//   // Handle interval change
//   const handleIntervalChange = (newInterval) => {
//     if (newInterval !== interval) {
//       setIntervalState(newInterval);
//     }
//   };

//   // Chart options
//   const options = {
//     responsive: true,
//     maintainAspectRatio: false,
//     scales: {
//       x: {
//         type: 'time',
//         time: {
//           unit: 'auto',
//           tooltipFormat: 'PP HH:mm',
//         },
//         grid: {
//           color: 'rgba(255, 255, 255, 0.1)',
//         },
//         ticks: {
//           color: '#FFFFFF',
//         },
//       },
//       y: {
//         position: 'right',
//         grid: {
//           color: 'rgba(255, 255, 255, 0.1)',
//         },
//         ticks: {
//           color: '#FFFFFF',
//         },
//       },
//     },
//     plugins: {
//       legend: { display: false },
//       tooltip: {
//         mode: 'index',
//         intersect: false,
//         backgroundColor: '#1e1e1e',
//         bodyColor: '#FFFFFF',
//         titleColor: '#FFFFFF',
//         callbacks: {
//           label: (context) => {
//             const data = context.raw;
//             return [
//               `Open: ${data.o.toFixed(2)}`,
//               `High: ${data.h.toFixed(2)}`,
//               `Low: ${data.l.toFixed(2)}`,
//               `Close: ${data.c.toFixed(2)}`,
//             ];
//           },
//         },
//       },
//       zoom: {
//         zoom: {
//           wheel: { enabled: true },
//           pinch: { enabled: true },
//           mode: 'x',
//         },
//         pan: {
//           enabled: true,
//           mode: 'x',
//         },
//       },
//     },
//   };

//   return (
//     <div
//       style={{
//         backgroundColor: '#131722',
//         borderRadius: '8px',
//         padding: '16px',
//         height: '600px',
//         position: 'relative',
//       }}
//     >
//       {/* Interval Selector */}
//       <div
//         style={{
//           display: 'flex',
//           gap: '8px',
//           marginBottom: '16px',
//           position: 'absolute',
//           top: '16px',
//           left: '16px',
//           zIndex: 100,
//         }}
//       >
//         {['1m', '5m', '15m', '1h', '4h', '1d'].map((t) => (
//           <button
//             key={t}
//             onClick={() => handleIntervalChange(t)}
//             style={{
//               backgroundColor: interval === t ? '#2962FF' : '#2a2e39',
//               color: 'white',
//               border: 'none',
//               borderRadius: '4px',
//               padding: '6px 12px',
//               cursor: 'pointer',
//             }}
//           >
//             {t}
//           </button>
//         ))}
//       </div>

//       {/* Chart */}
//       {loading ? (
//         <div style={{ color: 'white', textAlign: 'center', marginTop: '40px' }}>
//           Loading chart...
//         </div>
//       ) : (
//         <Chart type="candlestick" data={chartData} options={options} />
//       )}
//     </div>
//   );
// };

// export default ThreeDChart;




import React, { useEffect, useState } from 'react';
  import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Tooltip,
    Legend,
    TimeScale,
    Title
  } from 'chart.js';
  import { Chart } from 'react-chartjs-2';
  import 'chartjs-adapter-date-fns';
  import zoomPlugin from 'chartjs-plugin-zoom';
  import { CandlestickController, CandlestickElement } from 'chartjs-chart-financial';
  import { Typography } from '@mui/material'
  // Register Chart.js components
  ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    CandlestickController,
    CandlestickElement,
    Tooltip,
    Legend,
    TimeScale,
    Title,
    zoomPlugin
  );

  const ThreeDChart = ({ selectedCoin }) => {
    const [chartData, setChartData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Fetch candlestick data from Binance API
    const fetchChartData = async () => {
      try {
        const response = await fetch(
          `https://api.binance.com/api/v3/klines?symbol=${selectedCoin}&interval=1h&limit=100`
        );
        if (!response.ok) throw new Error(`API error: ${response.status}`);

        const data = await response.json();
        if (!Array.isArray(data)) throw new Error('Invalid data format');

        // Format data for candlestick chart
        const formattedData = data.map((item) => ({
          x: new Date(item[0]), // Timestamp
          o: parseFloat(item[1]), // Open
          h: parseFloat(item[2]), // High
          l: parseFloat(item[3]), // Low
          c: parseFloat(item[4]), // Close
        }));

        setChartData({
          datasets: [
            {
              label: `${selectedCoin} Price`,
              data: formattedData,
              type: 'candlestick',
              borderColor: 'rgba(75, 192, 192, 1)',
              backgroundColor: (ctx) => {
                const { o, c } = ctx.raw;
                return c >= o ? 'rgba(0, 255, 0, 0.3)' : 'rgba(255, 0, 0, 0.3)'; // Green for bullish, red for bearish
              },
            },
          ],
        });
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    useEffect(() => {
      setLoading(true);
      setError(null);
      fetchChartData();
    }, [selectedCoin]);

    // Chart options
    const options = {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        x: {
          type: 'time',
          time: {
            unit: 'hour',
            displayFormats: {
              hour: 'HH:mm',
            },
          },
          title: {
            display: true,
            text: 'Time',
          },
        },
        y: {
          title: {
            display: true,
            text: 'Price (USDT)',
          },
        },
      },
      plugins: {
        legend: {
          display: false,
        },
        tooltip: {
          callbacks: {
            label: (ctx) => {
              const { o, h, l, c } = ctx.raw;
              return `O: ${o.toFixed(2)}  H: ${h.toFixed(2)}  L: ${l.toFixed(2)}  C: ${c.toFixed(2)}`;
            },
          },
        },
        zoom: {
          zoom: {
            wheel: {
              enabled: true,
            },
            pinch: {
              enabled: true,
            },
            mode: 'x',
          },
          pan: {
            enabled: true,
            mode: 'x',
          },
        },
      },
    };

    return (
      <div style={{ height: '500px', position: 'relative' }}>
        <Typography variant="h6" gutterBottom>
          {selectedCoin} Price Chart (1H)
        </Typography>
        {loading && <p>Loading...</p>}
        {error && <p style={{ color: 'red' }}>{error}</p>}
        {!loading && !error && chartData && (
          <Chart
            type="candlestick"
            data={chartData}
            options={options}
          />
        )}
      </div>
    );
  };

  export default ThreeDChart;