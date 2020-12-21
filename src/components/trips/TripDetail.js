import React, { useContext, useEffect, useState } from "react"
import { TripContext } from "./TripProvider"
import { LandmarkContext } from "../landmarks/LandmarkProvider"
import "./Trip.css"


export const TripDetails = (props) => {
    console.log("props", props)

    const { tripsArray, getTrips, getLandmarksByTripId, landmarkTripsArray } = useContext(TripContext)
    const { landmarksArray, getLandmarks } = useContext(LandmarkContext)

    const [newTrip, setTrips] = useState({})

    useEffect(() => {
        getTrips()
    }, [])

    useEffect(() => {
        getLandmarks()
    }, [])

    useEffect(() => {
        const trip = tripsArray.find(t => t.id === +props.match.params.tripId) || {}
        setTrips(trip)
    }, [tripsArray])



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
                                                <div key={"landmarks--" + landmarksSelected.id} className="landmarkCard">
                                                    <h3 className="landmark__name">{landmarksSelected.name}</h3>
                                                    <div className="landmark__image"><img src={landmarksSelected.imageURL}></img></div>
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






//     return (
//         <section className="landmarks_container">
//             <div className="landmarks">
//                 {/* <h1>${trip.name}</h1> */}
//                 {
//                     landmarksArray.filter(lm => lm.cityId === +props.match.params.tripId).map(tripObj => {
//                         // console.log("before map", landmarksArray.filter(lm => lm.cityId === +props.match.params.cityId)
//                         return (
//                             <div key={tripObj.id} className="landmarkCard">
//                                 <h3 className="landmark__name">{tripObj.name}</h3>
//                                 <div className="landmark__image"><img src={tripObj.imageURL}></img></div>
//                             </div>)
//                     })}
//             </div>
//         </section >
//     )
// }