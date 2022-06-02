import React, {useEffect, useState} from 'react'
import VideoFeed from "../../components/VideoFeed"
import TopBar from "../../components/TopBar"
import KeyboardInput from '../../components/KeyboardInput'
import './style.scss'

const OperatorView = () => {

    return(
        <div className='OperatorView__container'>
            <TopBar />
            <VideoFeed />
            <KeyboardInput />
        </div>
    )
}

export default OperatorView