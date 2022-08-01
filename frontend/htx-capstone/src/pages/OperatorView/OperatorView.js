import React, {useEffect, useState} from 'react'
import VideoFeed from "../../components/VideoFeed"
import TopBar from "../../components/TopBar/TopBar"
import KeyboardInput from '../../components/KeyboardInput'
import DataCharts from '../../components/DataCharts'
import LineChart from '../../components/LineChart'
import NavigationGuide from '../../components/NavigationGuide'
import { Grid, Item } from '@mui/material';
import { UserData } from "../../Data";
import ROSLIB from 'roslib';
import './style.scss'

const OperatorView = () => {

    const sampleData = [1, 3, 7, 10, 13, 12, 9, 8, 10, 15, 18]
    var result = 0
    var scaled_prediction = 0
    var co2_timestamp = 0
    var mic_timestamp = 0

    const [CO2RawData, setCO2RawData] = useState(0)
    const [micRawData, setMicRawData] = useState(0)
    const [panData, setPanData] = useState(0)

    const [navData, setNavData] = useState(0)
    const [CO2Data, setCO2Data] = useState([])
    const [micData, setMicData] = useState([])
    const [imageData, setImageData] = useState(null)
    const [algoData, setAlgoData] = useState(0)

    // const [userData, setUserData] = useState({
    //     labels: [],
    //     datasets: [
    //       {
    //         label: "Users Gained",
    //         data: [],
    //         backgroundColor: [
    //           "rgba(75,192,192,1)",
    //           "#ecf0f1",
    //           "#50AF95",
    //           "#f3ba2f",
    //           "#2a71d0",
    //         ],
    //         borderColor: "white",
    //         borderWidth: 2,
    //       },
    //     ],
    //   });

    var ros = new ROSLIB.Ros({
      url : 'ws://localhost:9090'
    });

    ros.on('connection', function() {
      // document.getElementById("status").innerHTML = "Connected";
      console.log("Successfully connected to ROS server!")
    });

    ros.on('error', function(error) {
      // document.getElementById("status").innerHTML = "Error";
      console.log("Error connecting to ROS server!")
    });

    ros.on('close', function() {
      // document.getElementById("status").innerHTML = "Closed";
      console.log("ROS server connection has been closed")
    });

    var CO2_raw_listener = new ROSLIB.Topic({
      ros : ros,
      name : '/sensors/co2',
      messageType : 'sensors/CO2'
    });

    CO2_raw_listener.subscribe(function(m) {
      // console.log("CO2 raw:",m.iaq)
      setCO2RawData(m.iaq)
    });

    var CO2_listener = new ROSLIB.Topic({
      ros : ros,
      name : '/life_detection/smell',
      messageType : 'life_detection/Detection'

      // for raw values
      // name : '/sensors/co2',
      // messageType : 'sensors/CO2'
    });

    CO2_listener.subscribe(function(m) {
      // console.log("CO2", m)
      // console.log("Smell probability", m.prediction)

      co2_timestamp = m.header.stamp.secs%3600+(Math.round(m.header.stamp.nsecs/10000000)*0.01)

      setCO2Data([m.prediction*100, co2_timestamp])

      // console.log(m.header.stamp.secs%100+(m.header.stamp.nsecs%10000000/1000000000));
      // for raw values
      // console.log("CO2",m.iaq)
      // setCO2Data(m.iaq)

      // document.getElementById("CO2").innerHTML = m.iaq;
    });

    // UNCOMMEnt WHEN IMPLEMENTED

    var mic_raw_listener = new ROSLIB.Topic({
      ros : ros,
      name : '/sensors/audio',
      messageType : 'sensors/Audio' // msg type to be updated after JK's implementation
  });

  // TO-DO Set fixed scale of 0 - 100
  mic_raw_listener.subscribe(function(m) {
    var min = Math.min(...m.audio_sample)
    var max = Math.max(...m.audio_sample)

    // for raw values, take difference between max and min microphone values
    // console.log("Mic raw:",max-min)
    setMicRawData(max-min)

    // document.getElementById("mic").innerHTML = m.audio_sample[0];
  });  

    var mic_listener = new ROSLIB.Topic({
        ros : ros,
        name : '/life_detection/sound',
        messageType : 'life_detection/Detection' 

        // for raw values
        // name : '/sensors/audio',
        // messageType : 'sensors/Audio' // msg type to be updated after JK's implementation
    });
  
    // TO-DO Set fixed scale of 0 - 100
    mic_listener.subscribe(function(m) {
      scaled_prediction = m.prediction*100*2
      // console.log("Sound probability", scaled_prediction)

      if (scaled_prediction > 100) {
        scaled_prediction = 100
      }
      if (scaled_prediction < 0) {
        scaled_prediction = 0
      }

      mic_timestamp = m.header.stamp.secs%3600+((m.header.stamp.nsecs/10000000)*0.01).toFixed(2) // modulo for an hour of data collection
      // cawin's change: mic_timestamp = Math.round(m.header.stamp.secs%100+(m.header.stamp.nsecs/10000000)*0.01,0)

      setMicData([scaled_prediction, mic_timestamp])

      // for raw value
      // console.log("Mic",m.audio_sample[0])
      // setMicData(m.audio_sample[0])

      // document.getElementById("mic").innerHTML = m.audio_sample[0];
    });  

    var algo_listener = new ROSLIB.Topic({
        ros : ros,
        name : '/life_detection/ensemble',
        messageType : 'life_detection/Ensemble'
    });

    algo_listener.subscribe(function(m) {
      console.log("ensemble prediction :", m)
      setAlgoData(m.ensemble_prediction*100)
    });  
    
    // var camera_listener = new ROSLIB.Topic({
    //     ros : ros,
    //     name : '/camera/rgb/image_raw/compressed',
    //     messageType : 'sensor_msgs/CompressedImage'
    // });

    // camera_listener.subscribe(function(m) {
    //   // console.log("imageData:", m)
    //   setImageData("data:image/jpeg;base64,"+m.data)
    // });  
    
    var angle_listener = new ROSLIB.Topic({
      ros : ros,
      name : '/sensors/pan',
      messageType : 'sensors/PanInfo'
    });

    angle_listener.subscribe(function(m) {
      console.log("pan info:", m)

      // pan_timestamp = m.header.stamp.secs%100+((m.header.stamp.nsecs/10000000)*0.01).toFixed(2)

      setPanData(m.angle)
    });

    var nav_listener = new ROSLIB.Topic({
      ros : ros,
      name : '/life_detection/human_search',
      messageType : 'sensors/PanInfo'
    });

    nav_listener.subscribe(function(m) {
      console.log("nav info:", m)

      // pan_timestamp = m.header.stamp.secs%100+((m.header.stamp.nsecs/10000000)*0.01).toFixed(2)

      setNavData(m.angle)
    });


    return(
        <div className='OperatorView__container'>
            <TopBar CO2={CO2RawData} Sound={micRawData} Algo={algoData}/>
            {/* should be algoData once ensemble model is done */}
            <KeyboardInput />
            {/* <NavigationGuide /> */}
            {/* <img src={imageData} width={50} /> to be removed */}
            <Grid>
              {/* <p>Connection status: <span id="status"></span></p>
              <p>Last CO2 reading received: <span id="CO2"></span></p>
              <p>Last Sound reading received: <span id="mic"></span></p> */}
              {/* <p>pan angle: {panData}</p> */}
            </Grid>
            <Grid className='section' container spacing={2} sx={{marginTop:"24px"}}>
                <Grid item xs={9} sx={{fontWeight:"700", marginLeft:"-30px"}}>
                    <VideoFeed robotAngle={panData} navigation={navData} />
                </Grid>
                <Grid item xs={3} >
                    <DataCharts CO2={CO2Data} Mic={micData} />
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