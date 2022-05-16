import React, {useEffect, useState} from 'react'

const KeyboardInput = () => {

    const [key, setKey] = useState(null);

    const handleKeyDown = (event) => {
        setKey(event.key)
      }

    useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    window.addEventListener("gamepadconnected", function(e) {
        console.log("Gamepad connected at index %d: %s. %d buttons, %d axes.",
          e.gamepad.index, e.gamepad.id,
          e.gamepad.buttons.length, e.gamepad.axes.length);
      });
    }, []);
      
    return(
        <div>
            <div>
                {key != null ? key+" has been pressed" : null }
            </div>
        </div>
    )

}

export default KeyboardInput