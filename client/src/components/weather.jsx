import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getWeather } from '../redux/slices/featureSlice';

function Weather(props) {
    const dispatch = useDispatch();
    const { weather } = useSelector(state => state.featureReducer)
    const setDaytime = () => {
        const currentHours = new Date().getHours();
        const newIsDaytime = currentHours >= 6 && currentHours < 18;

        if (newIsDaytime) {
            if (weather?.main === "Clouds" && weather?.id === 804) {
                document.body.classList = "";
                document.body.classList.add("cloudy");
            }
            else if (weather?.main === "Rain") {
                document.body.classList = "";
                document.body.classList.add("rain");
            }
            else {
                document.body.classList = "";
            }
        } else {
            document.body.classList = ""
            document.body.classList.add("darktheme");
        }
    };


    useEffect(() => {
        const options = {
            maximamAge: 0,
            timeout: 1000,
            enableHighAccuracy: true
        }
        const success = (pos) => {
            const { latitude, longitude } = pos.coords;

            try {
                dispatch(getWeather({ latitude, longitude }))
            } catch (error) {
                console.error(error.message)
            }
        }
        const error = (err) => {
            console.warn(`${err.code} ${err.message}`)
        }
        setDaytime()
        navigator.geolocation.getCurrentPosition(success, error, options)

        const intervalId = setInterval(() => {
            setDaytime();
        }, 60000);
        return () => clearInterval(intervalId);

    }, [dispatch])
    return (
        <>{props.children}</>
    )
}
export default Weather