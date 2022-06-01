import React, {useEffect, useState} from 'react'
import { Grid, Item } from '@mui/material';

const TopBar = () => {

    return(
        <div>
            <div>
                Hello I'm a sensor
            </div>
            <Grid container spacing={2}>
                <Grid item xs={4}>
                    CO2:
                </Grid>
                <Grid item xs={4}>
                    IR:
                </Grid>
                <Grid item xs={4}>
                    Microphone:
                </Grid>
            </Grid>
        </div>
    )
}

export default TopBar