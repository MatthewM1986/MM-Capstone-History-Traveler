import React, { useContext, useRef, useEffect, useState } from "react"
import { TripContext } from "../trips/TripProvider"
import "./Home.css"

export const Home = (props) => {
    //this component is giving access to the three properties from my TripProvider.js
    const { tripsArray, getTrips, addTrip } = useContext(TripContext)
    //Create a newTrip state variable with the initual value of an empty object
    //the left holds the current state and the right holds the function that updates the state
    const [newTripId, setTrips] = useState([])
    //a reference point that holds the value of the text box
    //null makes it blank when page renders and trip holds what is typed in the text box
    const trip = useRef(null)

    //this grabs my trips array from my json immediatly after the page renders the first time
    useEffect(() => {
        getTrips()
        //the empty array tells it to run just once
    }, [])

    //This goes through the trips array to find the trip id
    useEffect(() => {
        const newTrip = tripsArray.find(nt => nt.id === +props.match.params.tripId) || {}
        //This sets the trip id into the newTripId variable for the UseState
        setTrips(newTrip)
        //This refreshes everytime the trips array's state is changed
    }, [tripsArray])

    //this builds out a new trip object to post to trips database
    const addNewTrip = () => {

        addTrip({
            //This sends the current referenced value to json
            name: trip.current.value,
            //This sends the userid that is performing the action to json
            userId: +localStorage.getItem("app_user_id")
        })
            //This pushes to the /trips url
            .then(() => props.history.push("/trips"))
    }


    return (
        <section className="createTrips_container">
            < div className="createTrips" >
                <div className="intro">
                    <h2>Begin Your History Travels Now!</h2>
                    <br></br>
                    <h3>Create a New Trip, Browse Cities or Choose a Saved Trip!</h3>
                </div>
                <div className="createTripName">
                    <input type="text" ref={trip} id="tripName" className="form-control" placeholder="Name Your Future Trip" />
                    <button className="newTripButton"
                        onClick={evt => {
                            evt.preventDefault()
                            addNewTrip()
                        }}
                    >Create New Trip</button>
                </div >
            </div>
        </section>
    )
}