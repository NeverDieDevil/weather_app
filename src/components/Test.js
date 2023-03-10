import { useEffect, useRef, useState } from "react";


const Test = () =>{
    const getTown = useRef();
    const [weather, setWeather] = useState();
    useEffect(() => {
      console.log(weather)
    }, [weather])
    
    async function getWeather(){
        console.log(getTown.current.value)
        const location = await fetch(`https://api.api-ninjas.com/v1/geocoding?city=${getTown.current.value}`, 
        { 
            headers:{
                "X-Api-Key": "Gh54nG2OhgYlI4L5eavtlmo4p5gWXwm4TlgNTAbh",
            }
        }).then(response => response.json()).then(data => data);
        const data = await fetch(`https://api.open-meteo.com/v1/gfs?latitude=${location[0].latitude}&longitude=${location[0].longitude}&hourly=temperature_2m&current_weather=true`).then(response => response.json()).then(data => 
        {
        setWeather(data.current_weather); 
        return data});
    }
    return (
    <div>
        <input ref={getTown} />
        <p>{weather ? weather.temperature : ""}</p>
        <button onClick={getWeather}>click to download wheater</button>
    </div>)
}

export default Test;