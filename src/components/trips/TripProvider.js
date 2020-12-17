import React, { useState } from "react"

/*
    The context is imported and used by individual components
    that need data
*/
export const TripContext = React.createContext()

/*
 This component establishes what data can be used.
 */
export const TripProvider = (props) => {

    const [tripsArray, setTrips] = useState([])
    const [landmarkTripsArray, setLandmarkTrips] = useState([])
    // useState returns [initial value of state variable, a function to set the value of the state variable]

    const getTrips = () => {
        return fetch("http://localhost:8088/trips")
            .then(res => res.json())
            .then(setTrips)
    }

    const addTrip = (trip) => {
        return fetch("http://localhost:8088/trips", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(trip)
        }).then(getTrips)
    }

    const getLandmarksByTripId = (tripId) => {
        return fetch(`http://localhost:8088/landmarkTrips/?tripId=${tripId}`)
            .then(res => res.json())
            .then(setLandmarkTrips)
    }

    const addLandmarkToTrip = (newLandmarkTripObj) => {
        return fetch("http://localhost:8088/landmarkTrips", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(newLandmarkTripObj)
        }).then(getTrips)
    }

    const releaseLandmark = landmarkTripId => {
        return fetch(`http://localhost:8088/landmarkTrips/${landmarkTripId}`, {
            method: "DELETE"
        })
            .then(getTrips)
    }

    return (
        <TripContext.Provider value={
            {
                tripsArray, getTrips, addTrip, addLandmarkToTrip, landmarkTripsArray, getLandmarksByTripId, releaseLandmark
            }
        }>
            {props.children}
        </TripContext.Provider>
    )
}