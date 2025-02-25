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