import React, {useEffect, useState} from 'react'
import VideoFeed from "../../components/VideoFeed"
import TopBar from "../../components/TopBar/TopBar"
import KeyboardInput from '../../components/KeyboardInput'
import DataCharts from '../../components/DataCharts'
import LineChart from '../../components/LineChart'
import { Grid, Item } from '@mui/material';
import { UserData } from "../../Data";
import './style.scss'

const OperatorView = () => {

    const sampleData = [1, 3, 7, 10, 13, 12, 9, 8, 10, 15, 18]
    var result = 0

    const [userData, setUserData] = useState({
        labels: UserData.map((data) => data.year),
        datasets: [
          {
            label: "Users Gained",
            data: UserData.map((data) => data.userGain),
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
      });
    

    return(
        <div className='OperatorView__container'>
            <TopBar />
            <KeyboardInput />
            <Grid className='section' container spacing={2} sx={{marginTop:"24px"}}>
                <Grid item xs={9} sx={{fontWeight:"700", marginLeft:"-30px"}}>
                    <VideoFeed />
                </Grid>
                <Grid item xs={3} >
                    <DataCharts chartData={userData} />
                </Grid>
            </Grid>
            {/* <VideoFeed />
            <DataCharts chartData={userData} /> */}
            {/* <div>
            <LineChart chartData={userData} />
            </div> */}
        </div>
    )
}

export default OperatorView