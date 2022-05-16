import React, { useEffect, useRef } from "react";


const VideoFeed = () => {

    const videoRef = useRef(null);
    var videoFeed = null

    useEffect(() => {
        // getVideo();
    }, [videoRef]);

    const getVideo = () => {
        navigator.mediaDevices
            .getUserMedia({ video: { width: window.screen.width, height: window.screen.height } })
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
            <div>
                <video className="fullscreen" ref={videoRef} />
            </div>
            <div>
                <button onClick={toggleCamera} >Turn Off Camera</button>
            </div>
        </div>
    )
    
}

export default VideoFeed