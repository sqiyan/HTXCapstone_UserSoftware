import React, {useEffect, useState} from 'react'

const KeyboardInput = () => {

    const [key, setKey] = useState(null);

    const handleKeyDown = (event) => {
        setKey(event.key)
      }

    useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
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