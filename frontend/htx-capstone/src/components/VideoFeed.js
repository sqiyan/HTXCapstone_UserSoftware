import React, { useEffect, useRef, useState } from "react";
import Fab from '@mui/material/Fab';
import './style.scss'


const VideoFeed = () => {

    // DEPRECATED METHOD: now pulling image stream directly from ROS web_video_server
    const videoRef = useRef(null);
    var videoFeed = null

    const [filter, setFilter] = useState(false)

    useEffect(() => {
        getVideo();
    }, [videoRef]);

    const getVideo = () => {
        
        // List cameras and microphones.
        // navigator.mediaDevices.enumerateDevices()
        // .then(function(devices) {
        // devices.forEach(function(device) {
        //     console.log(device.kind + ": " + device.label +
        //                 " id = " + device.deviceId);
        // });
        // })
        // .catch(function(err) {
        // console.log(err.name + ": " + err.message);
        // });

        // to edit device Id after setting up camera on HTX laptop
        navigator.mediaDevices
            .getUserMedia({ video: { deviceId: "pkZEps+1ZGaXwd7ywMmbLG0W7DF1prKJsUeTVFeDTvM="
, width: window.screen.width, height: window.screen.height } })
            .then(stream => {
            let video = videoRef.current;
            videoFeed = video
            video.srcObject = stream;
            video.play();
            })
            .catch(err => {
            console.error("error:", err);
            });
    };

    const toggleCamera = () => {
        videoFeed.srcObject = null
    }

    const toggleFilter = () => {
        filter ? setFilter(false) : setFilter(true)
    }

    return (
        <div>
            <div className="section">
                {/* <video width="100%" ref={videoRef} /> */}
                <div style={{display: "flex", justifyContent: 'flex-end'}} >
                    <Fab variant="extended" style={{ marginRight: "24px" }} onClick={toggleFilter} >
                        THERMAL CAMERA FILTER
                    </Fab>
                </div>
                {filter ? <img src="http://localhost:8080/stream?topic=/life_detection/body_preprocess&type=mjpeg" width="80%" /> : null}
                <img src="http://0.0.0.0:8080/stream?topic=/camera/rgb/image_rect_color&type=mjpeg" width="80%" />
                {/* http://0.0.0.0:8080/stream?topic=/sensors/thermal 
                http://0.0.0.0:8080/stream?topic=/camera/rgb/image_rect_color&type=mjpeg */}
            </div>
            {/* <div className="section">
                <button onClick={toggleCamera} >Turn Off Camera</button>
            </div> */}
        </div>
    )
    
}

export default VideoFeed