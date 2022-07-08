import React from "react";
import { Grid, Stack } from '@mui/material';
import LineChart from "./LineChart";

const DataCharts = ({chartData})  => {

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