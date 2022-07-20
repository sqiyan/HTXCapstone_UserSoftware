import React, { useEffect, useRef, useState } from "react";
import { Grid, Stack } from '@mui/material';
import { Line } from "react-chartjs-2";
import LineChart from "./LineChart";

const DataCharts = ({chartData, CO2, Mic})  => {

    const [CO2Dataset, setCO2Dataset] = useState([])
    const [micDataset, setMicDataset] = useState([])

    // const CO2ChartRef = useRef(null);
    // const micChartRef = useRef(null);

    // const options = {
    //     aspectRatio: 1.8,
    //     scales: {
    //       x: {
    //         ticks: {
    //             color: 'white'
    //         },
    //         grid: {
    //           color: '#000000',
    //           borderColor: 'white'
    //         }
    //       },
    //       y: {
    //         ticks: {
    //             color: 'white'
    //         },
    //         grid: {
    //           color: '#000000',
    //           borderColor: 'white'
    //         }
    //       }
    //     }
    //   };

    useEffect(() => {
        // update CO2 dataset whenever a new datapoint is received
        let newCO2 = [...CO2Dataset]; // copying existing CO2 dataset
        newCO2.push(CO2)

        if (newCO2.length > 30) {
            newCO2.shift()
        }

        console.log("updated CO2 dataset", newCO2)

        setCO2Dataset(newCO2);

    }, [CO2]);

    useEffect(() => {
        // update Mic dataset whenever a new datapoint is received
        let newMic = [...micDataset]; // copying existing CO2 dataset
        newMic.push(Mic)

        if (newMic.length > 30) {
            newMic.shift()
        }

        console.log("updated Mic dataset", newMic)

        setMicDataset(newMic);
        // setMicDataset([...micDataset, Mic]);

    }, [Mic]);

    return(
        <div>
            <Stack container spacing={3} sx={{maxHeight:"600px"}}>
                {/* <Line ref={CO2ChartRef} data={chartData} options={options}/>
                <Line ref={micChartRef} data={chartData} options={options}/>
                <Line ref={micChartRef} data={chartData} options={options}/> */}
                <LineChart Dataset={CO2Dataset} />
                <LineChart Dataset={micDataset} />
                <LineChart Dataset={CO2Dataset} />
            </Stack>
        </div>
    )

}

export default DataCharts