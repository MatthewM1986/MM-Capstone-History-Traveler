import React, { useContext, useRef, useEffect, useState } from "react"
import { TripContext } from "./TripProvider"
import { LandmarkContext } from "../landmarks/LandmarkProvider"
import "./Trip.css"
import { CityContext } from "../cities/CityProvider"

export const TripCreate = (props) => {
    const { tripsArray, getTrips, addTrip } = useContext(TripContext)
    const { landmarksArray, getLandmarks } = useContext(LandmarkContext)

    //Use State holds two arrays that = useState(the initial state value)
    //the left holds the current state and the right holds the function that updates the state
    const [currentCityId, setCurrentCityId] = useState(null)
    const [newTrips, setTrips] = useState({})

    const trip = useRef(null)

    const tripId = localStorage.getItem("current_trip_id")

    useEffect(() => {
        getTrips()
    }, [])


    // useEffect(() => {
    //     getLandmarksByTripId(tripId)
    // }, [tripsArray])


    useEffect(() => {
        const newTrip = tripsArray.find(nt => nt.id === tripId) || {}
        setTrips(newTrip)
    }, [tripsArray])

    const addNewTrip = () => {


        addTrip({
            name: trip.current.value,
            userId: +localStorage.getItem("app_user_id")
        })
            // console.log("trip", tripsArray)

            .then(() => props.history.push("/"))
        // .then(getLandmarks)

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
                            console.log("new trip", tripsArray)
                        }}
                        className="btn btn-create">
                        Create New Trip</button>
                </div >
            </div>
        </section>
    )
}