import React, {useState, useEffect} from 'react'
import {ReactComponent as ForwardIcon} from '../forward_black_24dp.svg';

const NavigationGuide = ({navigation, robotAngle}) => {

    const [navGuide, setNavGuide] = useState("")

    useEffect(() => {
        // robot angle ranges from 0 to 180, with 90 being the default starting state of the robot
        var difference = robotAngle - navigation

        if (difference > 0) {
            setNavGuide("left")
        }
        else if (difference < 0) {
            setNavGuide= ("right")
        }

    },[navigation, robotAngle])


    return(
        <div>
            {/* <Forward /> */}
            {/* <ForwardIcon></ForwardIcon> */}
            {/* <img alt="Move Right" src={ForwardIcon} color="white" /> */}
            {navGuide != "" && navGuide == "left" ? <ForwardIcon height="80px" width="80px" fill="#FF00F5" style={{marginLeft: "50px", transform: "scaleX(-1)"}} fillOpacity="0%" /> 
            : <ForwardIcon height="80px" width="80px" fill="#FF00F5" style={{marginLeft: "50px"}}fillOpacity="0%" />}
        </div>
    )

}

export default NavigationGuide