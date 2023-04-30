import { useEffect, useState } from "react";

/*Create a React component that fetches weather data from an API endpoint using useEffect hook and displays the current temperature, humidity, and wind speed on the screen using the useState hook. Add a button which toggles between Celsius and Fahrenheit units for the temperature.*/
const fakeFetch = (url) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (url === "https://example.com/api/weather") {
        resolve({
          status: 200,
          message: "Success",
          data: {
            temperature: 21,
            humidity: 50,
            windSpeed: 10
          }
        });
      } else {
        reject({
          status: 404,
          message: "Weather data not found."
        });
      }
    }, 2000);
  });
};
export function WeatherDetails() {
  const [data, setData] = useState({});
  const [flag, setFlag] = useState(false);
  const fetchData = async () => {
    try {
      const response = await fakeFetch("https://example.com/api/weather");
      setData(response.data);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const convertCelsiusToFahrenheit = () => {
    let temp = data.temperature * (9 / 5) + 32;
    let newData = {
      ...data,
      temperature: Math.round((temp + Number.EPSILON) * 100) / 100
    };
    setData(newData);
    setFlag(true);
  };
  const convertFahrenheitToCelsius = () => {
    let temp = (data.temperature - 32) * (5 / 9);
    let newData = {
      ...data,
      temperature: Math.round((temp + Number.EPSILON) * 100) / 100
    };
    setData(newData);
    setFlag(false);
  };
  return (
    <div>
      <ul style={{ listStyle: "none", textAlign: "left" }}>
        <h1>Weather</h1>
        <p>
          Temperature: {data.temperature}{" "}
          {!flag ? <span>&#8451;</span> : <span>&#8457;</span>}
        </p>
        {/* <p>Temperature: {data.temperature} &#8457;</p> */}
        <p>Humidity: {data.humidity} %</p>
        <p>WindSpeed: {data.windSpeed} km/h</p>

        {!flag && (
          <button onClick={convertCelsiusToFahrenheit}>
            Switch to Fahrenheit
          </button>
        )}
        {flag && (
          <button onClick={convertFahrenheitToCelsius}>
            Switch to Celsius
          </button>
        )}
      </ul>
    </div>
  );
}
