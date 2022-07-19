import React, {useEffect, useState} from 'react'
import { Grid, Item } from '@mui/material';
import '../style.scss';

const TopBar = ({CO2, Sound, Algo}) => {

    return(
        <div className='top-bar'>
            {/* <div className='section'>
                Welcome to the LISA Robot. Below is the sensor readings and video feed from the robot.
            </div> */}
            <Grid className='section' container spacing={2} sx={{marginTop:"64px", fontSize:"36px"}}>
                <Grid item xs={4} sx={{fontWeight:"700"}}>
                    {Algo ? !0 : "NO HUMAN"}
                </Grid>
                <Grid item xs={4}>
                    SOUND: {Sound}
                </Grid>
                <Grid item xs={4}>
                    CO2: {CO2}
                </Grid>
            </Grid>
        </div>
    )
}

export default TopBar