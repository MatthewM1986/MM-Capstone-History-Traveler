
import React, { useContext, useRef, useEffect } from "react"
import "./NavBar.css"
import { CityContext } from "../cities/CityProvider"
import { TripContext } from "../trips/TripProvider"
import { LandmarkContext } from "../landmarks/LandmarkProvider"
import { Link } from "react-router-dom"

export const NavBar = (props) => {
    const { citiesArray, getCities } = useContext(CityContext)
    const { tripsArray, getTrips } = useContext(TripContext)
    const { currentCityId } = useContext(CityContext)
    const { getLandmarks } = useContext(LandmarkContext)

    const city = useRef(null)
    const trip = useRef(null)

    useEffect(() => {
        getLandmarks()
            .then(getCities())
    }, [])

    useEffect(() => {
        getTrips()
    }, [])

    const handleCitySelect = () => {
        //*=== needs "" wrapped around value if not a sting, or just put == instead of ===
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
            console.log("trip current value", trip.current.value)
        }
    }

    const clearLocalStorage = () => {
        localStorage.removeItem("app_user_id")

    }

    return (
        <div className="navbar">
            {/* <button to="/">
                home
            </button> */}

            <button onClick={() => { }}
                to="/"
            >Home</button>

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


            <button onClick={() => { clearLocalStorage() }}
                to="/login"
            >Log Out</button>

            {/* 
            <br></br>

            <section>
                <div className="trip--name">
                    <input type="text" ref={trip} id="tripName" className="form-control" placeholder="Name Your Future Trip" />
                    <button className="create"
                        onClick={evt => {
                            evt.preventDefault()
                            addNewTrip()
                        }}
                        className="btn btn-create">
                        Create Trip</button>
                </div>
            </section> */}
        </div >

    )
}
