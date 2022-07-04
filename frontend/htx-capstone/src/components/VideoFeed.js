import React, { useEffect, useRef } from "react";
import './style.scss'


const VideoFeed = () => {

    const videoRef = useRef(null);
    var videoFeed = null

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
            .getUserMedia({ video: { deviceId: "229f22947cc884ca8b920c04d0b0cbe5c53d418700f0682fd3f2da7392be69a6"
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

    return (
        <div>
            <div className="section">
                <video className="fullscreen" ref={videoRef} />
            </div>
            <div className="section">
                <button onClick={toggleCamera} >Turn Off Camera</button>
            </div>
        </div>
    )
    
}

export default VideoFeed