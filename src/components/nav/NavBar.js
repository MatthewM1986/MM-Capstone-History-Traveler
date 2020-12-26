
import React, { useContext, useRef, useEffect, useState } from "react"
import "./NavBar.css"
import { CityContext } from "../cities/CityProvider"
import { TripContext } from "../trips/TripProvider"
import { LandmarkContext } from "../landmarks/LandmarkProvider"

export const NavBar = (props) => {
    //this component is giving access to the properties from my TripProvider.js through the useContext
    const { citiesArray, getCities } = useContext(CityContext)
    const { tripsArray, getTrips, addTrip } = useContext(TripContext)
    const { getLandmarks } = useContext(LandmarkContext)


    //a reference point that holds the value of the text box
    //null makes it blank when page renders and trip holds what is typed in the text box
    const city = useRef(null)
    const trip = useRef(null)


    useEffect(() => {
        getLandmarks()
            .then(getCities())
    }, [])

    //this grabs my trips array from my json immediatly after the page renders the first time
    useEffect(() => {
        getTrips()
        //the empty array tells it to run just once
    }, [])

    const handleCitySelect = () => {
        //*=== needs "" wrapped around value if not a string, or just put == instead of ===
        if (city.current.value === "0") {
            props.history.push("/")

        } else if (city.current.value !== 0) {
            props.history.push(`/landmarks/${city.current.value}`)
        }
    }

    const handleTripSelect = () => {
        //*if current city value = 0 then push to home (make sure == and not ===)
        if (trip.current.value === "0") {
            props.history.push("/")

        } else if (trip.current.value !== 0) {
            // parseInt(localStorage.setItem("current_trip_id", trip.current.value))
            props.history.push(`/trips/${trip.current.value}`)
        }
    }

    const clearLocalStorage = () => {
        localStorage.removeItem("app_user_id")

    }

    return (
        <div className="navbar">
            <section>
                <button onClick={() => props.history.push("/")}>
                    Home</button>
            </section>

            <section>
                <button onClick={() => props.history.push("/trips")}>
                    Go Travel</button>
            </section>

            <section>
                <label>Browse Cities</label>
                <select defaultValue="0"
                    onChange={() => {
                        handleCitySelect()
                    }}
                    name="city" ref={city} id="destinationCity" className="form-control">
                    <option value="0">Select a City</option>
                    {
                        citiesArray.map(city => (
                            <option key={city.id} value={city.id}>
                                {city.name}
                            </option>
                        ))
                    }
                </select >
            </section>

            <section>
                <label>Browse Created Trips</label>
                < select defaultValue="0"
                    onChange={() => {
                        handleTripSelect()
                    }}
                    name="trip" ref={trip} id="createdTrip" className="form-control" >
                    <option value="0">Select Your Trip</option>
                    {
                        tripsArray.map(trip => (
                            <option key={trip.id} value={trip.id}>
                                {trip.name}
                            </option>
                        ))
                    }
                </select >
            </section>
            <section>
                <button onClick={() => { clearLocalStorage() }}
                    to="/login"
                >Log Out</button>
            </section>
        </div >
    )
}
