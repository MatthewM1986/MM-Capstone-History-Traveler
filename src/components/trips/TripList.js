import React, { useContext, useEffect } from "react"
import { TripContext } from "./TripProvider"
import { LandmarkContext } from "../landmarks/LandmarkProvider"
import "./Trip.css"

export const TripList = (props) => {

    const { landmarksArray, getLandmarks } = useContext(LandmarkContext)
    const { tripsArray, getTrips } = useContext(TripContext)

    useEffect(() => {
        getTrips()
    }, [])

    return (
        <section className="landmarks_container">
            < div className="landmarksTrip" >
                <div className="trip--name">
                    <input type="text" id="tripName" className="form-control" placeholder="Name Your Future Trip" />
                </div>
                {
                    tripsArray.filter(tp => tp.tripId === 1).map(landmarkObj => {
                        return (
                            <div key={landmarkObj.id} className="landmarkCard">
                                <h3 className="landmark__name">{landmarkObj.name}</h3>
                                <button className="btn--release"
                                // onClick={() => {
                                //     releaseLandmark(landmarkTripId)
                                //         .then(() => {
                                //             props.history.push("/landmarks/:cityId(\d+)")
                                //         })
                                // }}
                                >Delete</button>
                            </div>)
                    })
                }
                <button className="btn--submit"

                >Submit</button>
            </div >
        </section>
    )
}