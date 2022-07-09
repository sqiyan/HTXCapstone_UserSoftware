import React from "react";
import { Grid, Item } from '@mui/material';
import LineChart from "./LineChart";

const DataCharts = ({chartData, CO2})  => {

    

    return(
        <div>
            <Grid container spacing={3} sx={{marginLeft:"-14px"}}>
                <Grid item xs={6}>
                    <LineChart chartData={chartData} />
                </Grid>
                <Grid item xs={6}>
                    <LineChart chartData={chartData} />
                </Grid>
                <Grid item xs={6}>
                    <LineChart chartData={chartData} />
                </Grid>
                <Grid item xs={6}>
                    <LineChart chartData={chartData} />
                </Grid>
            </Grid>
        </div>
    )

}

export default DataCharts