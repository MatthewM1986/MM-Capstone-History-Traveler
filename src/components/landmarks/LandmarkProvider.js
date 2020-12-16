import React, { useState } from "react"

/*
    The context is imported and used by individual components
    that need data
*/
export const LandmarkContext = React.createContext()

/*
 This component establishes what data can be used.
 */
export const LandmarkProvider = (props) => {

    const [landmarksArray, setLandmarks] = useState([])
    // useState returns [initial value of state variable, a function to set the value of the state variable]

    const getLandmarks = () => {
        return fetch("http://localhost:8088/landmarks")
            .then(res => res.json())
            .then(setLandmarks)
    }


    const addLandmark = (landmarkId, tripId) => {
        return fetch("http://localhost:8088/landmarkTrips", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(landmarkId, tripId)
        }).then(getLandmarks)
    }

    const releaseLandmark = landmarkTripId => {
        return fetch(`http://localhost:8088/landmarkTrips/${landmarkTripId}`, {
            method: "DELETE"
        })
            .then(getLandmarks)
    }

    return (
        <LandmarkContext.Provider value={
            {
                landmarksArray, getLandmarks, addLandmark, releaseLandmark
            }
        }>
            {props.children}
        </LandmarkContext.Provider>
    )
}