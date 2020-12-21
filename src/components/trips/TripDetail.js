import React, { useContext, useEffect, useState } from "react"
import { TripContext } from "./TripProvider"
import { LandmarkContext } from "../landmarks/LandmarkProvider"
import { LandmarkHTML } from "../landmarks/LandmarkHTML"
import "./Trip.css"
import { TypeContext } from "../types/TypeProvider"


export const TripDetails = (props) => {
    console.log("props", props)

    const { tripsArray, getTrips, getLandmarksByTripId, landmarkTripsArray } = useContext(TripContext)
    const { landmarksArray, getLandmarks } = useContext(LandmarkContext)
    const { typesArray, getTypes } = useContext(TypeContext)

    const [typeOfLandmark, setTypeOfLandmark] = useState({})
    const [landmark, setLandmark] = useState({})
    const [newTrip, setTrips] = useState({})

    useEffect(() => {
        getTrips()
    }, [])

    useEffect(() => {
        const trip = tripsArray.find(t => t.id === +props.match.params.tripId) || {}
        setTrips(trip)
    }, [tripsArray])


    useEffect(() => {
        getTypes()
            .then(getLandmarks)
    }, [])

    // useEffect(() => {
    //     const landmark = landmarksArray.find(lm => lm.id === +props.match.params.landmarkId) || {}
    //     setLandmark(landmark)
    // }, [landmarksArray])



    return (
        <section className="landmarks_container">
            < div className="landmarks" ></div>
            < div >
                {
                    tripsArray.map(ta => {
                        // console.log("trips array", ta)
                        const tripList = landmarkTripsArray.filter(lta => lta.tripId === ta.id)
                        return (
                            <section>
                                <h2>
                                    {ta.name}
                                </h2>
                                <div className="landmarksTrip">
                                    {
                                        tripList.map(tl => {
                                            // console.log("trip list", tripList)
                                            const landmarksSelected = landmarksArray.find(lm => tl.landmarkId === lm.id)
                                            // console.log("landmark array", landmarksArray)
                                            // console.log("landmark selected", landmarksSelected)
                                            return (
                                                <div className="landmarkTripCard">
                                                    < LandmarkHTML key={landmarksSelected.id} typeObj={typeOfLandmark} landmarkObj={landmarksSelected} />
                                                </div>)
                                        })}
                                </div>
                            </section>
                        )
                    })
                }
            </ div>
        </section >
    )
}