import React, { useContext, useEffect, useState } from "react"
import { TripContext } from "./TripProvider"
import { LandmarkContext } from "../landmarks/LandmarkProvider"
import { LandmarkHTML } from "../landmarks/LandmarkHTML"
import "./Trip.css"
import { TypeContext } from "../types/TypeProvider"


export const TripDetails = (props) => {
    console.log("props", props)

    const { tripsArray, getTrips, getLandmarksByTripId, landmarkTripsArray, releaseTrip } = useContext(TripContext)
    const { landmarksArray, getLandmarks } = useContext(LandmarkContext)
    const { getTypes } = useContext(TypeContext)

    const [typeOfLandmark, setTypeOfLandmark] = useState({})
    const [trip, setTrips] = useState({})
    const [landmarkTripsChosen, setLandmarkTripsChosen] = useState([])


    useEffect(() => {
        getTrips()
    }, [])

    useEffect(() => {
        const foundTrip = tripsArray.find(t => t.id === +props.match.params.tripId) || {}
        setTrips(foundTrip)
        getLandmarksByTripId(foundTrip.id)
        // this watches the property of a URL(tripId)
    }, [tripsArray, props.match.params.tripId])

    useEffect(() => {
        const chosenLandmarkTrips = landmarkTripsArray.filter(lta => lta.tripId === trip.id) || []
        setLandmarkTripsChosen(chosenLandmarkTrips)
    }, [landmarkTripsArray])

    useEffect(() => {
        getTypes()
            .then(getLandmarks)
    }, [])


    return (
        <section className="landmarks_container">
            < div className="landmarks" ></div>
            < div >
                <section>
                    <h2>
                        {trip.name}
                    </h2>
                    <h3>
                        Choose a city and add the landmarks you would like to visit to this trip
                    </h3>
                    <div className="landmarksTrip">
                        {
                            landmarkTripsChosen.map(tl => {
                                const foundLandmarkObj = landmarksArray.find(lm => tl.landmarkId === lm.id) || {}
                                return (
                                    <div key={foundLandmarkObj.id} className="landmarkTripCard">
                                        < LandmarkHTML typeObj={typeOfLandmark} landmarkObj={foundLandmarkObj} />
                                    </div>)
                            })}
                    </div>
                    <div>
                        <button className="btn--release"
                            onClick={() => {
                                releaseTrip(trip.id)
                                    .then(() => {
                                        props.history.push("/")
                                    })
                            }}>
                            Delete</button>
                    </div>
                </section>
            </ div>
        </section >
    )
}