import React, { useContext, useRef, useEffect, useState } from "react"
import { TripContext } from "./TripProvider"
import { LandmarkContext } from "../landmarks/LandmarkProvider"
import "./Trip.css"

export const TripCreate = (props) => {

    // const { landmarksArray, getLandmarks } = useContext(LandmarkContext)
    const { tripsArray, getTrips, addTrip } = useContext(TripContext)

    const [newTrip, setTrips] = useState({})

    const trip = useRef(null)

    useEffect(() => {
        getTrips()
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
                                evt.preventDefault() // Prevent browser from submitting the form
                                addNewTrip()
                            }}
                            className="btn btn-create">
                            Create Trip</button>
                        <div>
                            <h3>Add Landmarks to Visit</h3>
                        </div>
                        <div>
                            <button className="btn--submit"

                            >Submit</button>
                        </div>
                    </div >
                </div>
            </section>
                    )
        </section >
    )
}











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