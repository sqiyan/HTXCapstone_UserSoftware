import React, { useEffect, useRef, useState } from "react";
import { Line } from "react-chartjs-2";
import { Chart as ChartJS } from "chart.js/auto";


function LineChart({ Dataset, Label }) {

    const [data, setData] = useState({
      labels: [],
      datasets: [
        {
          label: Label,
          data: [],
          backgroundColor: [
            "rgba(75,192,192,1)",
            "#ecf0f1",
            "#50AF95",
            "#f3ba2f",
            "#2a71d0",
          ],
          borderColor: "white",
          borderWidth: 2,
        },
      ],
    })

    const options = {
        aspectRatio: 1.8,
        animation: false,
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
        // const chart = chartRef.current;

        setData({
          labels: Dataset[1],
          datasets: [
            {
              label: Label,
              data: Dataset[0],
              backgroundColor: [
                "rgba(75,192,192,1)",
                "#ecf0f1",
                "#50AF95",
                "#f3ba2f",
                "#2a71d0",
              ],
              borderColor: "white",
              borderWidth: 2,
            },
          ],
        })

        // var dataset = data.datasets.data
        // dataset.push(newData)

        // var labels = data[labels]
        // const newLabel = "data"+newData
        // labels.push(newLabel)

        // data.datasets.data = dataset
        // data.labels = labels

        // setData(data)

        // chart.data.labels.push("test");
        // chart.data.datasets.forEach((dataset) => {
        //     dataset.data.push(newData);
        // });
        // chart.update();
        
      }, [Dataset]);

    return <Line data={data} options={options}/>;
}

export default LineChart;