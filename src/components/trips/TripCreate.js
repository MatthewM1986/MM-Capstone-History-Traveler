import React, { useContext, useRef, useEffect } from "react"
import { TripContext } from "./TripProvider"
import { LandmarkContext } from "../landmarks/LandmarkProvider"
import "./Trip.css"
import { TripHTML } from "./TripHTML"
import { TravelerContext } from "../travelers/TravelerProvider"

export const TripCreate = (props) => {

    const { landmarksArray, getLandmarks } = useContext(LandmarkContext)
    const { tripsArray, getTrips, addTrip, setTrips } = useContext(TripContext)
    // const { travelersArray, getTravelers } = useContext(TravelerContext)

    const trip = useRef(null)
    const traveler = useRef(null)

    useEffect(() => {
        getTrips()
            .then(setTrips)
    }, [])

    useEffect(() => {
        const trip = tripsArray.find(t => t.id === +props.match.params.tripId) || {}
        setTrips(trip)
    }, [tripsArray])

    // useEffect(() => {
    //     getTravelers()
    //         .then(getTrips)
    // }, [])

    const addNewTrip = () => {

        // const travelerId = +traveler.current.value
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
            {/* {
                tripsArray.map(t => <TripHTML key={t.id} tripObj={t} />
                )} */}
            {/* return ( */}
            <section className="landmarks_container">
                < div className="landmarksTrip" >
                    <div className="trip--name">
                        <input type="text" ref={trip} id="tripName" className="form-control" placeholder="Name Your Future Trip" />
                        {/* < button className="btn--create"
                            onClick={() => props.history.push(`/${trip.current.value}`)}>Create</button> */}
                        <button type="create"
                            onClick={evt => {
                                evt.preventDefault() // Prevent browser from submitting the form
                                addNewTrip()
                            }}
                            className="btn btn-create">
                            Create Trip</button>
                        <div>
                            {/* <button className="btn--submit"

                        >Submit</button> */}
                        </div>
                    </div >
                </div>
            </section>
                    )
        </section >
    )
}

// console.log(TripList)











{/* </div>
                {tripsArray.map(t => <tripHTML key={t.id} tripObj={t} />)}
                         return (
                             <div key={landmarkObj.id} className="landmarkCard">
                    <h3 className="landmark__name">{landmarkObj.name}</h3>
                    <button className="btn--release" */}
{/* onClick = {() => { * /}
                releaseLandmark(landmarkTripId)
                    .then(() => {
                        props.history.push("/landmarks/:cityId(\d+)")
                    })
            }}
                                 > Delete</button >
            </div >)
                    })
                    } */}