import React, {useEffect, useState, useRef} from 'react';
import { Stack } from '@mui/material';
import robotFront from '../robotFront.png';
import robotBack from '../robotBack.png';

const RobotInfoPanel = ({robotAngle}) => {

    const robotFrontRef = useRef()
    const robotBackRef = useRef()

    useEffect(() =>{
        console.log('receive robot angle:', robotAngle)
    }, [robotAngle])
    
    return (
        <div>
            <Stack alignItems="center" >
            Robot Information Panel
            {/* <Stack> */}
                {/* <robotFront width="100%" height="100%" /> */}
                <robotBack width ="10px" />
                <img ref={robotFrontRef} src={robotFront} width="7.5%" style={{marginTop: "24px"}} />
                <img ref={robotBackRef} src={robotBack} width="5%" />
            {/* </Stack> */}
            </Stack>
        </div>
    )
}

export default RobotInfoPanel