import React, {useEffect, useState} from 'react'
import VideoFeed from "../../components/VideoFeed"
import TopBar from "../../components/TopBar"
// import './style.scss'

const OperatorView = () => {

    return(
        <div className='OperatorView__container'>
            <TopBar />
            <VideoFeed />
        </div>
    )
}

export default OperatorView