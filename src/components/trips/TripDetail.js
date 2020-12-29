import React, { useContext, useEffect, useState } from "react"
import { TripContext } from "./TripProvider"
import { LandmarkContext } from "../landmarks/LandmarkProvider"
import { LandmarkHTML } from "../landmarks/LandmarkHTML"
import "./Trip.css"
import { TypeContext } from "../types/TypeProvider"


export const TripDetails = (props) => {

    const { tripsArray, getTrips, getLandmarksByTripId, landmarkTripsArray, releaseTrip, releaseLandmark } = useContext(TripContext)
    const { landmarksArray, getLandmarks } = useContext(LandmarkContext)
    const { getTypes } = useContext(TypeContext)

    const [typeOfLandmark, setTypeOfLandmark] = useState({})
    const [trip, setTrips] = useState({})
    const [landmarkTripsChosen, setLandmarkTripsChosen] = useState([])

    //This pulls the trip id from local storage
    const tripId = localStorage.getItem("current_trip_id")
    useEffect(() => {
        getTrips()
            .then(getLandmarks())
    }, [])

    useEffect(() => {
        getTrips()
    }, [])

    //This finds the trip id that matches the trip id stores in props
    useEffect(() => {
        const foundTrip = tripsArray.find(t => t.id === +props.match.params.tripId) || {}
        //This puts the found id into UseState variable trip
        setTrips(foundTrip)
        getLandmarksByTripId(foundTrip.id)
        // this watches the property of a URL endpoint(tripId)
    }, [tripsArray, props.match.params.tripId])


    //This filters through landmarkTrips array and finds all the landmarkTrip id's that match the trip id's in the UseState variable trip
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
            < div ></div>
            < div >
                <section>
                    <h2>
                        {trip.name}
                    </h2>
                    <h3>
                        Choose a city and add the landmarks you would like to visit on this trip
                    </h3>
                    <div className="landmarks">
                        {
                            landmarkTripsChosen.map(tl => {
                                const foundLandmarkObj = landmarksArray.find(lm => tl.landmarkId === lm.id) || {}
                                return (
                                    <div key={foundLandmarkObj.id} className="landmarkTripCard">
                                        < LandmarkHTML typeObj={typeOfLandmark} landmarkObj={foundLandmarkObj} />
                                        < button className="btn--release"
                                            onClick={() => {
                                                releaseLandmark(tl.id)
                                                    .then(getLandmarksByTripId(tripId))
                                            }}
                                        >Remove</button>
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
                            Delete Trip</button>
                    </div>
                </section>
            </ div>
        </section >
    )
}