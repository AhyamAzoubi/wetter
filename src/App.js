import React, { useState } from "react";
import axios from "axios";
function App() {
  const [data, setData] = useState({});
  const [location, setLocation] = useState("");
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=imperial&appid=292690c557586dbcbfb913fbffb7e62d`;
  const searchLocation = (event) => {
    if (event.key === "Enter") {
      axios.get(url).then((response) => {
        setData(response.data);
      });
      setLocation("");
    }
  };

  return (
    <div className="App">
      <div className="search">
        <input
          className="input"
          value={location}
          type="text"
          onChange={(event) => setLocation(event.target.value)}
          onKeyPress={searchLocation}
          placeholder="Enter Location"
        />
      </div>
      <div className="container">
        <div className="top">
          <div className="location">
            <p>{data.name}</p>
          </div>
          <div className="temp">
            {data.main ? (
              <h1>{(((data.main.temp - 32) * 5) / 9).toFixed()}°</h1>
            ) : null}
          </div>
          <div className="description">
            {data.weather ? (
              <p className="clouds">{data.weather[0].main}</p>
            ) : null}
          </div>
        </div>
        {data.main !== undefined && (
          <div className="button">
            <div className="feels">
              {data.main ? (
                <p className="bold">
                  {(((data.main.feels_like - 28) * 5) / 9).toFixed()}
                </p>
              ) : null}

              <p>Feels Like</p>
            </div>
            <div className="humidity">
              {data.main ? (
                <p className="bold">{data.main.humidity}% </p>
              ) : null}

              <p>Humidity</p>
            </div>
            <div className="wind">
              {data.wind ? <p className="bold">{data.wind.speed}MPH </p> : null}

              <p>Wind Speed</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
