import React, {useEffect, useState} from 'react'
import VideoFeed from "../../components/VideoFeed"
import TopBar from "../../components/TopBar/TopBar"
import KeyboardInput from '../../components/KeyboardInput'
import DataCharts from '../../components/DataCharts'
import LineChart from '../../components/LineChart'
import { Grid, Item } from '@mui/material';
import { UserData } from "../../Data";
import ROSLIB from 'roslib';
import './style.scss'

const OperatorView = () => {

    const sampleData = [1, 3, 7, 10, 13, 12, 9, 8, 10, 15, 18]
    var result = 0

    const [CO2Data, setCO2Data] = useState(0)
    const [micData, setMicData] = useState(0)
    const [imageData, setImageData] = useState(null)
    const [algoData, setAlgoData] = useState(0)

    const [userData, setUserData] = useState({
        // labels: UserData.map((data) => data.year),
        datasets: [
          {
            label: "Users Gained",
            // data: UserData.map((data) => data.userGain),
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

    var ros = new ROSLIB.Ros({
      url : 'ws://localhost:9090'
    });

    ros.on('connection', function() {
      document.getElementById("status").innerHTML = "Connected";
    });

    ros.on('error', function(error) {
      document.getElementById("status").innerHTML = "Error";
    });

    ros.on('close', function() {
      document.getElementById("status").innerHTML = "Closed";
    });

    var CO2_listener = new ROSLIB.Topic({
      ros : ros,
      name : '/sensors/co2',
      messageType : 'sensors/CO2'
    });

    CO2_listener.subscribe(function(m) {
      console.log("CO2",m.header.stamp.secs)
      setCO2Data(m.co2_equivalent)

      document.getElementById("CO2").innerHTML = m.co2_equivalent;
    });

    // UNCOMMEnt WHEN IMPLEMENTED

    // var mic_listener = new ROSLIB.Topic({
    //     ros : ros,
    //     name : '/sensors/mic',
    //     messageType : 'sensors/mic' // msg type to be updated after JK's implementation
    // });
  
    // mic_listener.subscribe(function(m) {
    //   document.getElementById("mic").innerHTML = m.data;
    // });  

    // var algo_listener = new ROSLIB.Topic({
    //     ros : ros,
    //     name : '/algo',
    //     messageType : 'algo/algo_msg'
    // });

    // algo_listener.subscribe(function(m) {
    //   // console.log("imageData:", m)
    //   setAlgoData(m.data)
    // });  
    
    var camera_listener = new ROSLIB.Topic({
        ros : ros,
        name : '/camera/rgb/image_raw/compressed',
        messageType : 'sensor_msgs/CompressedImage'
    });

    camera_listener.subscribe(function(m) {
      // console.log("imageData:", m)
      setImageData("data:image/jpeg;base64,"+m.data)
    });  
    

    return(
        <div className='OperatorView__container'>
            <TopBar CO2={CO2Data} Sound={micData} Algo={algoData}/>
            <KeyboardInput />
            {/* <img src={imageData} width={50} /> to be removed */}
            <Grid>
              <p>Connection status: <span id="status"></span></p>
              <p>Last CO2 reading received: <span id="CO2"></span></p>
              <p>Last Sound reading received: <span id="mic"></span></p>
            </Grid>
            <Grid className='section' container spacing={2} sx={{marginTop:"8px"}}>
                <Grid item xs={7} sx={{fontWeight:"700", marginLeft:"-30px"}}>
                    <VideoFeed imageData={imageData}/>
                </Grid>
                <Grid item xs={5} >
                    <DataCharts chartData={userData} CO2={CO2Data} />
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