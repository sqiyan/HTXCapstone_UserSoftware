import React, {useEffect, useState} from 'react'
import axios from 'axios'

const Message = () => {
    
    const [result, setResult] = useState(null);

    const getMessage = async () => {
        try{
            let res = await axios.get('http://127.0.0.1:8000/sensors');
            let result = res.data["CO2"]; 
            console.log(result)
            setResult(result)
        } catch (e) {
            console.log(e)
        }
    };

    useEffect(() => {
        getMessage()
    }, [])

    return (
        <div>
            {result}
        </div>
    )
}

export default Message