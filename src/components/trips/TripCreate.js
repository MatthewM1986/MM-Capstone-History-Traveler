import React, { useContext, useRef, useEffect, useState } from "react"
import { TripContext } from "./TripProvider"
import { LandmarkContext } from "../landmarks/LandmarkProvider"
import "./Trip.css"

export const TripCreate = (props) => {
    const { tripsArray, getTrips, addTrip, getLandmarksByTripId, landmarkTripsArray, releaseLandmark } = useContext(TripContext)
    const { landmarksArray, getLandmarks } = useContext(LandmarkContext)

    const [newTrip, setTrips] = useState({})

    const trip = useRef(null)

    const tripId = localStorage.getItem("current_trip_id")

    useEffect(() => {
        getLandmarks()
    }, [])

    useEffect(() => {
        getTrips()
    }, [])


    useEffect(() => {
        getLandmarksByTripId(tripId)
    }, [tripsArray])


    useEffect(() => {
        const newTrip = tripsArray.find(nt => nt.id === tripId) || {}
        setTrips(newTrip)
    }, [tripsArray])

    const addNewTrip = () => {

        {
            addTrip({
                name: trip.current.value,
                userId: +localStorage.getItem("app_user_id")
            })
                .then(() => props.history.push(`/trips/${tripId}`))
                .then(getLandmarks)
        }
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
                        Create Trip</button>
                    <div>
                        <h3>Add Landmarks to Visit</h3>
                    </div>
                    <div className="singleTrip">
                        {tripsArray.map(ta => {
                            const tripList = landmarkTripsArray.filter(lta => lta.tripId === ta.id)
                            return (
                                <section>
                                    <h2>
                                        {ta.name}
                                    </h2>
                                    <div className="landmarksTrip">
                                        {
                                            tripList.map(tl => {
                                                const landmarksSelected = landmarksArray.find(lm => tl.landmarkId === lm.id)
                                                return (
                                                    <div key={"landmark--" + landmarksSelected.id} className="landmarkCard">
                                                        <h3 className="landmark__name">{landmarksSelected.name}</h3>
                                                        <div className="landmark__image"><img src={landmarksSelected.imageURL}></img></div>
                                                        <button className="btn--release"
                                                            onClick={() => {
                                                                releaseLandmark(tl.id)
                                                                    .then(getLandmarksByTripId(tripId))
                                                            }}
                                                        >Delete</button>
                                                    </div>)
                                            })}
                                    </div>
                                </section>
                            )
                        })
                        }
                    </div>
                </div >
            </div>
        </section>
    )
}