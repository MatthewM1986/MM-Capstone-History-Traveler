import React, { useContext, useRef, useEffect, useState } from "react"
import { TripContext } from "./TripProvider"
import "./Trip.css"

export const TripCreate = (props) => {
    //this component is giving access to the three properties from my TripProvider.js
    const { tripsArray, getTrips, addTrip } = useContext(TripContext)
    //Create a newTrip state variable with the initual value of an empty object
    //the left holds the current state and the right holds the function that updates the state
    // const [newTrip, setTrips] = useState({})
    // console.log("new trip state", newTrip)
    const [newTripId, setTrips] = useState([])
    //a reference point that holds the value of the text box
    //null makes it blank when page renders and trip holds what is typed in the text box
    const trip = useRef(null)
    // console.log("trip", trip)

    const tripId = localStorage.getItem("current_trip_id")

    //this grabs my trips array from my json immediatly after the page renders the first time
    useEffect(() => {
        getTrips()
        //the empty array tells it to run just once
    }, [])

    useEffect(() => {
        const newTrip = tripsArray.find(nt => nt.id === tripId) || {}
        setTrips(newTrip)
    }, [tripsArray])

    //this builds out a new trip object to post to trips database
    const addNewTrip = () => {

        addTrip({
            name: trip.current.value,
            userId: +localStorage.getItem("app_user_id")
        })
            .then(() => props.history.push("/trips"))
        // console.log("new trip id button click", newTrip)
        // .then(getTrips)
    }


    return (
        <section className="landmarks_container">
            < div className="landmarks" >
                <>
                    <h2>Please Enter a Trip Name</h2>
                </>
                <div className="trip--name">
                    <input type="text" ref={trip} id="tripName" className="form-control" placeholder="Name Your Future Trip" />
                    <button className="create"
                        onClick={evt => {
                            evt.preventDefault()
                            addNewTrip()
                        }}
                        className="btn btn-create">
                        Create New Trip</button>
                </div >
                <>
                    <h3>Once a name is entered and you create the trip, select the City you are travelling too and choose which landmarks to visit on your trip</h3>
                    <h3>After you finish selecting the landmarks you want to visit on your travels go to your trip page to edit the trip</h3>
                </>
            </div>
        </section>
    )
}