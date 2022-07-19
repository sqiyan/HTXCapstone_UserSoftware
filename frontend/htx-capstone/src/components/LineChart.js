import React, { useEffect, useRef } from "react";
import { Line } from "react-chartjs-2";
import { Chart as ChartJS } from "chart.js/auto";

function LineChart({ chartData, newData }) {

    const chartRef = useRef(null);

    const options = {
        aspectRatio: 1.8,
        scales: {
          x: {
            ticks: {
                color: 'white'
            },
            grid: {
              color: '#000000',
              borderColor: 'white'
            }
          },
          y: {
            ticks: {
                color: 'white'
            },
            grid: {
              color: '#000000',
              borderColor: 'white'
            }
          }
        }
      };

      useEffect(() => {
        // call this method whenever props newData is updated
        const chart = chartRef.current;

        chart.data.labels.push("test");
        chart.data.datasets.forEach((dataset) => {
            dataset.data.push(newData);
        });
        chart.update();
        
      }, newData);

    return <Line ref={chartRef} data={chartData} options={options}/>;
}

export default LineChart;