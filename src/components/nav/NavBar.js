
import React, { useContext, useRef, useEffect } from "react"
import "./NavBar.css"
import { CityContext } from "../cities/CityProvider"
import { TripContext } from "../trips/TripProvider"
import { LandmarkContext } from "../landmarks/LandmarkProvider"
import logo from "../images/HistoryTravelerLogo.jpg"

export const NavBar = (props) => {
    //this component is giving access to the properties from my CityProvider.js through the useContext
    const { citiesArray, getCities } = useContext(CityContext)
    //this component is giving access to the properties from my TripProvider.js through the useContex
    const { tripsArray, getTrips } = useContext(TripContext)
    //this component is giving access to the properties from my LandmarkProvider.js through the useContex
    const { getLandmarks } = useContext(LandmarkContext)


    //a reference point that holds the value of the text box
    //null makes it blank when page renders and trip holds what is typed in the text box
    const city = useRef(null)
    const trip = useRef(null)

    //this grabs my landmarks array from my json immediatly after the page renders the first time
    useEffect(() => {
        getLandmarks()
            //This then grabs my cities array
            .then(getCities())
        //the empty array tells it to run just once
    }, [])

    //this grabs my trips array from my json immediatly after the page renders the first time
    useEffect(() => {
        getTrips()
        //the empty array tells it to run just once
    }, [])

    const handleCitySelect = () => {
        //If statement so the drop down element with 0 returns to homepage
        if (city.current.value === "0") {
            //This pushes the page view to home
            props.history.push("/")

            //else if statement so the drop down elements go to the id value's selected page when clicked
        } else if (city.current.value !== 0) {
            props.history.push(`/landmarks/${city.current.value}`)
        }
    }

    const handleTripSelect = () => {
        if (trip.current.value === "0") {
            props.history.push("/")

        } else if (trip.current.value !== 0) {
            props.history.push(`/trips/${trip.current.value}`)
        }
    }

    //This clears the local storage of the logged in user
    const clearLocalStorage = () => {
        localStorage.removeItem("app_user_id")
    }

    return (
        <div className="navbar-container">
            <section>
                <div >
                    <img className="Logo" src={logo} alt="Logo" />
                </div>


                <div className="navbar">
                    <section className="homeButton">

                        <button onClick={() => props.history.push("/")}>
                            Home</button>
                    </section>

                    <section>
                        <select defaultValue="0"
                            onChange={() => {
                                handleCitySelect()
                            }}
                            name="city" ref={city} id="destinationCity" className="form-control">
                            <option value="0">City Select</option>
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
                        < select defaultValue="0"
                            onChange={() => {
                                handleTripSelect()
                            }}
                            name="trip" ref={trip} id="createdTrip" className="form-control" >
                            <option value="0">Trip Select</option>
                            {
                                tripsArray.map(trip => (
                                    <option key={trip.id} value={trip.id}>
                                        {trip.name}
                                    </option>
                                ))
                            }
                        </select >
                    </section>
                    <section className="logout">
                        <button onClick={() => {
                            clearLocalStorage()
                            props.history.push("/login")
                        }}
                        >Log Out</button>
                    </section>
                </div>
            </section>
        </div >
    )
}