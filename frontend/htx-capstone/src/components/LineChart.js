import React from "react";
import { Line } from "react-chartjs-2";
import { Chart as ChartJS } from "chart.js/auto";

function LineChart({ chartData }) {

    const options = {
        aspectRatio: 1.2,
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

    return <Line data={chartData} options={options}/>;
}

export default LineChart;