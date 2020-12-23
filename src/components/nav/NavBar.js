
import React, { useContext, useRef, useEffect } from "react"
import "./NavBar.css"
import { CityContext } from "../cities/CityProvider"
import { TripContext } from "../trips/TripProvider"
import { LandmarkContext } from "../landmarks/LandmarkProvider"
import { Link } from "react-router-dom"

export const NavBar = (props) => {
    const { citiesArray, getCities } = useContext(CityContext)
    //I am allowing this component is giving access to the three properties from my TripProvider.js
    const { tripsArray, getTrips, addTrip } = useContext(TripContext)
    const { getLandmarks } = useContext(LandmarkContext)


    const city = useRef(null)
    const trip = useRef(null)


    useEffect(() => {
        getLandmarks()
            .then(getCities())
    }, [])

    //a reference point that holds the value of the text box
    //null makes it blank when page renders and trip holds what is typed in the text box
    useEffect(() => {
        //this grabs my trips array from my json immediatly after the page renders the first time
        getTrips()
        //the empty array tells it to run just once
    }, [])

    //this builds out a new trip object to post to trips database
    const addNewTrip = () => {
        addTrip({
            name: trip.current.value,
            userId: +localStorage.getItem("app_user_id")
        })
            //this redirects the user to the new trip details view that was created by changing the endpoint of the url with the newest trip value
            .then(() => props.history.push(`/trips/${trip.current.value.id}`))
        // .then(() => props.history.push("/"))
    }

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
                <div >
                    <input type="text" ref={trip} id="tripName" className="form-control" placeholder="Name Your Future Trip" />
                    <button className="create"
                        onClick={evt => {
                            evt.preventDefault()
                            addNewTrip()
                        }}
                        className="btn btn-create">
                        Create New Trip</button>
                </div >
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
