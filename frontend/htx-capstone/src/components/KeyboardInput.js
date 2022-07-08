import React, {useEffect, useState} from 'react'
import axios from 'axios'
import './style.scss'

const KeyboardInput = () => {

    const [key, setKey] = useState(null);

    const handleKeyDown = (event) => {
        setKey(event.key)
        var control = ""

        if (event.key == "ArrowUp") {
            console.log("move forward")
            control = "move forward"
        }
        else if (event.key == "ArrowDown") {
            console.log("move backward")
            control = "move backward"
        }
        else if (event.key == "a") {
            console.log("pan left")
            control = "pan left"
        }
        else if (event.key == "d") {
            console.log("pan right")
            control = "pan right"
        }
        
        if (control != "") {
            axios.post('http://127.0.0.1:8000/movement_control', {control: control})
            .then(res => {
                console.log(res);
                console.log(res.data);
              })
            console.log(control+" sent to FastAPI")
        } else {
            console.log("command not recognised")
        }
    
      }

    useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    }, []);
      
    return(
        <div>
            {/* <div className='section'>
                {key != null ? key+" has been pressed" : null }
            </div> */}
        </div>
    )

}

export default KeyboardInput