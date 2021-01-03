import React, { useContext, useEffect, useState } from "react"
import { TripContext } from "./TripProvider"
import { LandmarkContext } from "../landmarks/LandmarkProvider"
import { LandmarkHTML } from "../landmarks/LandmarkHTML"
import "./Trip.css"
import { TypeContext } from "../types/TypeProvider"


export const TripDetails = (props) => {

    //These get the context listed in the brackets from the providers = to
    const { tripsArray, getTrips, getLandmarksByTripId, landmarkTripsArray, releaseTrip, releaseLandmark } = useContext(TripContext)
    const { landmarksArray, getLandmarks } = useContext(LandmarkContext)
    const { typesArray, getTypes } = useContext(TypeContext)

    //the left holds the current state and the right holds the function that updates the state
    const [trip, setTrips] = useState({})
    const [landmarkTripsChosen, setLandmarkTripsChosen] = useState([])
    //Create a typeOfLandmark state variable with the initual value of an empty object

    useEffect(() => {
        getTrips()
            .then(getTypes())
            .then(getLandmarks())
    }, [])

    //This finds the trip id that matches the trip id stores in props
    useEffect(() => {
        const foundTrip = tripsArray.find(t => t.id === +props.match.params.tripId) || {}
        //This puts the found id into UseState variable trip
        setTrips(foundTrip)
        //This gets the landmarks associated with the updated tripsid
        getLandmarksByTripId(foundTrip.id)
        // this watches the property of a URL endpoint(tripId)
    }, [tripsArray, props.match.params.tripId])

    //This filters through landmarkTrips array and finds all the landmarkTrip id's that match the trip id's in the UseState variable trip
    useEffect(() => {
        const chosenLandmarkTrips = landmarkTripsArray.filter(lta => lta.tripId === trip.id) || []
        setLandmarkTripsChosen(chosenLandmarkTrips)
    }, [landmarkTripsArray])


    return (
        <section className="trips_container">
            < div ></div>
            < div >
                <section >
                    {/* <h2 className="tripName">
                        {trip.name}
                    </h2> */}
                    <div className="trips">
                        {
                            //this maps through the filtered landmarks array from the useEffect
                            landmarkTripsChosen.map(tl => {
                                //this finds the landmark id that matches the join table landmark id
                                const foundLandmarkObj = landmarksArray.find(lm => tl.landmarkId === lm.id)
                                const foundTypeOfLandmark = typesArray.find(t => t.id === foundLandmarkObj.typeId)
                                return (
                                    <div key={foundLandmarkObj.id} className="landmarkTripCard">
                                        < LandmarkHTML typeObj={foundTypeOfLandmark} landmarkObj={foundLandmarkObj} />
                                        < button className="remove"
                                            onClick={() => {
                                                releaseLandmark(tl.id)
                                                    .then(getLandmarksByTripId(+props.match.params.tripId))
                                            }}
                                        >Remove</button>
                                    </div>)
                            })}
                    </div>
                    <div>
                        <button className="delete"
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