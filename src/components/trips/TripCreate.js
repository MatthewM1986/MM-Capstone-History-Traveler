import React, { useContext, useRef, useEffect, useState } from "react"
import { TripContext } from "./TripProvider"
import { LandmarkContext } from "../landmarks/LandmarkProvider"
import "./Trip.css"
import { CityContext } from "../cities/CityProvider"

export const TripCreate = (props) => {
    // console.log("trip create props", props)

    // const { landmarksArray, getLandmarks } = useContext(LandmarkContext)
    const { tripsArray, getTrips, addTrip, getLandmarksByTripId, landmarkTripsArray, releaseLandmark } = useContext(TripContext)
    const { landmarksArray, getLandmarks } = useContext(LandmarkContext)
    const { setCurrentCityId, currentCityId } = useContext(CityContext)

    const [newTrip, setTrips] = useState({})

    const trip = useRef(null)

    const tripId = localStorage.getItem("current_trip_id")

    useEffect(() => {
        getLandmarks()
    }, [])

    useEffect(() => {
        getTrips()
        // .then(console.log("I got the trips"))
        // .then(getLandmarks())
    }, [])


    useEffect(() => {
        getLandmarksByTripId(tripId)
    }, [tripsArray])
    // console.log("error", props.match.params.tripId)

    // useEffect(() => {
    //     const tripId = landmarkTripsArray.filter(nt => nt.id === +props.match.params.tripId) || {}
    //     setTrips(newTrip)
    // }, [tripsArray])

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
                .then(() => props.history.push(`/landmarks/${props.match.params.cityId}`))
                // .then(console.log("I created a trip"))
                .then(getLandmarks)
        }
    }

    // const deleteNewLandmarkTripObj = () => {
    //     //get landmarkid 
    //     const landmarkId = +props.match.params.landmarkId
    //     //get tripid
    //     const tripId = +localStorage.getItem("current_trip_id")
    //     //put values into an object and call the function that will post to database
    //     {
    //         releaseLandmark({
    //             landmarkId: landmarkId,
    //             tripId: tripId
    //         })
    //             //Need to figure out how to define cityId
    //             .then(() => props.history.push(`/landmarks/${currentCityId}`))
    //     }
    // }

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
                    <div>
                        {tripsArray.map(ta => {
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
                                                    <div key={"landmark--" + landmarksSelected.id} className="landmarkCard">
                                                        <h3 className="landmark__name">{landmarksSelected.name}</h3>
                                                        <div className="landmark__image"><img src={landmarksSelected.imageURL}></img></div>
                                                        <button className="btn--release"
                                                            onClick={() => {
                                                                releaseLandmark(tl.id)
                                                                    .then(getLandmarksByTripId(tripId))

                                                                // .then(() => {
                                                                //     props.history.push(`/landmarks/${currentCityId}`)
                                                                // })
                                                            }}
                                                        >Delete</button>
                                                        {/* <button onClick={deleteNewLandmarkTripObj} >
                                                            Delete
                                                        </button> */}
                                                    </div>)
                                            })}
                                    </div>
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
}