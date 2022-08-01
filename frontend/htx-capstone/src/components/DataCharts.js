import React, { useEffect, useRef, useState } from "react";
import { Grid, Stack } from '@mui/material';
import { Line } from "react-chartjs-2";
import LineChart from "./LineChart";
import RobotInfoPanel from "./RobotInfoPanel";

const DataCharts = ({chartData, CO2, Mic})  => {

    const [CO2Dataset, setCO2Dataset] = useState([])
    const [CO2Labels, setCO2Labels] = useState([])
    const [micDataset, setMicDataset] = useState([])
    const [micLabels, setMicLabels] = useState([])
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
        if (CO2[0] !== undefined) {
            newCO2.push(CO2[0])
        }

        console.log("new co2 data added:", CO2[0])
        console.log("new co2 label added:", CO2[1])

        let newCO2Label = [...CO2Labels]

        if (CO2[1] !== undefined) {
            newCO2Label.push(CO2[1])
        }

        console.log("new co2 datalist:", newCO2)
        console.log("new co2 label list:", newCO2Label)

        if (newCO2.length > 30) {
            newCO2.shift()
            newCO2Label.shift()
        }


        console.log("updated CO2 dataset", newCO2)
        console.log("updated CO2 label dataset", newCO2Label)
        setCO2Dataset(newCO2);
        setCO2Labels(newCO2Label);

    }, [CO2]);



    useEffect(() => {
        // update Mic dataset whenever a new datapoint is received
        let newMic = [...micDataset]; // copying existing CO2 dataset
        if (Mic[0] !== undefined) {
            newMic.push(Mic[0])
        }

        let newMicLabel = [...micLabels]
        if (Mic[1] !== undefined) {
            newMicLabel.push(Mic[1])
        }

        if (newMic.length > 30) {
            newMic.shift()
            newMicLabel.shift()
        }

        console.log("updated Mic dataset", (newMic,newMicLabel))

        setMicDataset(newMic);
        setMicLabels(newMicLabel)
        // setMicDataset([...micDataset, Mic]);

    }, [Mic]);

    return(
        <div>
            <Stack container spacing={3} sx={{maxHeight:"600px"}}>
                {/* <Line ref={CO2ChartRef} data={chartData} options={options}/>
                <Line ref={micChartRef} data={chartData} options={options}/>
                <Line ref={micChartRef} data={chartData} options={options}/> */}
                <LineChart Dataset={[CO2Dataset, CO2Labels]} Label="CO2 Prediction" />
                <LineChart Dataset={[micDataset, micLabels]} Label="Microphone Prediction" />
                {/* <LineChart Dataset={[CO2Dataset, CO2Labels]} Label="Robot Information" /> */}
                <RobotInfoPanel />
            </Stack>
        </div>
    )

}

export default DataCharts