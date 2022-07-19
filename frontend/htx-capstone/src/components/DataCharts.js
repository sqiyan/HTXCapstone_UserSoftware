import React, { useEffect } from "react";
import { Grid, Stack } from '@mui/material';
import LineChart from "./LineChart";

const DataCharts = ({chartData, CO2, Mic})  => {

    useEffect(() => {
        // update the chart whenever a new datapoint is received


    });

    return(
        <div>
            <Stack container spacing={3} sx={{maxHeight:"600px"}}>
                <LineChart chartData={chartData} />
                <LineChart chartData={chartData} />
                <LineChart chartData={chartData} />
            </Stack>
        </div>
    )

}

export default DataCharts