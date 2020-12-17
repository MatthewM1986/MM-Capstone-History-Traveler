import React, { useContext, useRef, useEffect, useState } from "react"
import { TripContext } from "./TripProvider"
import { LandmarkContext } from "../landmarks/LandmarkProvider"
import "./Trip.css"
import { CityContext } from "../cities/CityProvider"

export const TripCreate = (props) => {

    // const { landmarksArray, getLandmarks } = useContext(LandmarkContext)
    const { tripsArray, getTrips, addTrip, getLandmarksByTripId, landmarkTripsArray, releaseLandmark } = useContext(TripContext)
    const { landmarksArray, getLandmarks } = useContext(LandmarkContext)
    const { setCurrentCityId, currentCityId } = useContext(CityContext)

    const [newTrip, setTrips] = useState({})

    const trip = useRef(null)

    useEffect(() => {
        getTrips()
    }, [])

    useEffect(() => {
        getLandmarksByTripId(+props.match.params.tripId)
    }, [])

    useEffect(() => {
        const newTrip = tripsArray.find(nt => nt.id === +props.match.params.tripId) || {}
        setTrips(newTrip)
    }, [tripsArray])

    const addNewTrip = () => {

        {
            addTrip({
                name: trip.current.value,
                travelerId: +localStorage.getItem("app_user_id")
            })
                .then(() => props.history.push(`/trips/${trip.current.value.id}`))
        }
    }

    return (
        <section className="landmarks_container">
            <div className="landmarks"></div>
            <section className="landmarks_container">
                < div className="landmarksTrip" >
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
                        <div>
                            {landmarkTripsArray.map(lta => {
                                const tripList = tripsArray.find(ta => lta.tripId === ta.id)
                                return (
                                    <section>
                                        <div>
                                            tripList.name
                                        </div>
                                        {
                                            landmarksArray.filter(la => lta.landmarkId === la.id).map(landmarkTripObj => {
                                                return (
                                                    <div key={landmarkTripObj.id} className="landmarkCard">
                                                        <h3 className="landmark__name">{landmarkTripObj.name}</h3>
                                                        <div className="landmark__image"><img src={landmarkTripObj.imageURL}></img></div>
                                                        <button className="btn--release"
                                                            onClick={() => {
                                                                releaseLandmark(landmarkTripObj.id)
                                                                    .then(() => {
                                                                        props.history.push("/landmarks/${currentCityId}")
                                                                    })
                                                            }}
                                                        >Delete</button>
                                                    </div>)
                                            })}
                                    </section>
                                )
                            })
                            }
                        </div>
                        {/* <div>
                            <button className="btn--submit"

                            >Submit</button>
                        </div> */}
                    </div >
                </div>
            </section>
                    )
        </section >
    )
}