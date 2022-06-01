import React, {useEffect, useState} from 'react'
import { Grid, Item } from '@mui/material';
import './style.scss';

const TopBar = () => {

    return(
        <div>
            <div className='section'>
                Welcome to the LISA Robot. Below is the sensor readings and video feed from the robot.
            </div>
            <Grid className='section' container spacing={2}>
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