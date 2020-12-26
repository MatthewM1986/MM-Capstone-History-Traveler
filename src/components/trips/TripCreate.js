import React, { useContext, useRef, useEffect, useState } from "react"
import { TripContext } from "./TripProvider"
import "./Trip.css"

export const TripCreate = (props) => {
    //this component is giving access to the three properties from my TripProvider.js
    const { tripsArray, getTrips, addTrip } = useContext(TripContext)
    console.log("props", props)
    //Create a newTrip state variable with the initual value of an empty object
    //the left holds the current state and the right holds the function that updates the state
    const [newTrip, setTrips] = useState({})
    // console.log("new trip state", newTrip)

    //a reference point that holds the value of the text box
    //null makes it blank when page renders and trip holds what is typed in the text box
    const trip = useRef(null)
    // console.log("trip", trip)
    //this grabs my trips array from my json immediatly after the page renders the first time
    useEffect(() => {
        getTrips()
        //the empty array tells it to run just once
    }, [])

    //this builds out a new trip object to post to trips database
    const addNewTrip = () => {


        addTrip({
            name: trip.current.value,
            userId: +localStorage.getItem("app_user_id")
        })
            //this redirect the user to the new trip view that was created by changing the endpoint of the url with the newest trip id
            .then(() => props.history.push(`/trips/${props.match.params.id}`))
        // console.log("new trip id button click", newTrip)
        // .then(() => props.history.push("/"))
    }


    return (
        <section className="landmarks_container">
            < div className="landmarks" >
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
            </div>
        </section>
    )
}