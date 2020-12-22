import React, { useContext, useRef, useEffect, useState } from "react"
import { LandmarkContext } from "./LandmarkProvider"
import { LandmarkHTML } from "./LandmarkHTML"
import "./Landmark.css"
import { TypeContext } from "../types/TypeProvider"
import { TripContext } from "../trips/TripProvider"
import { CityContext } from "../cities/CityProvider"

export const LandmarkDetails = (props) => {
    const { landmarksArray, getLandmarks } = useContext(LandmarkContext)
    const { typesArray, getTypes } = useContext(TypeContext)
    const { tripsArray, getTrips, addLandmarkToTrip } = useContext(TripContext)
    const { currentCityId } = useContext(CityContext)

    const [landmark, setLandmark] = useState({})
    const [typeOfLandmark, setTypeOfLandmark] = useState({})
    const [tripId, setTripId] = useState(0)

    const trip = useRef(null)

    useEffect(() => {
        getTypes()
            .then(getLandmarks)
    }, [])

    useEffect(() => {
        getTrips()
    }, [])

    useEffect(() => {
        const landmark = landmarksArray.find(lm => lm.id === +props.match.params.landmarkId) || {}
        setLandmark(landmark)
    }, [landmarksArray])


    useEffect(() => {
        const typeOfLandmark = typesArray.find(t => t.id === landmark.typeId) || {}
        setTypeOfLandmark(typeOfLandmark)
    }, [landmark])

    const addNewLandmarkTripObj = () => {
        //get landmarkid 
        const landmarkId = +props.match.params.landmarkId
        if (tripId !== 0) {

            //put values into an object and call the function that will post to database

            addLandmarkToTrip({
                landmarkId: landmarkId,
                tripId: tripId
            })
                //Need to figure out how to define cityId
                .then(() => props.history.push(`/landmarks/${currentCityId}`))
        } else {
            alert("Choose Trip First")
        }

    }

    const handleTripSelect = (event) => {
        setTripId(+event.target.value)
    }

    return (
        <div className="landmark">
            < LandmarkHTML key={landmark.id} typeObj={typeOfLandmark} landmarkObj={landmark} />
            < select defaultValue="0"
                onChange={handleTripSelect}
                name="trip" ref={trip} id="createdTrip" className="form-control" >
                <option value="0">Select Your Trip</option>
                {
                    tripsArray.map(trip => (
                        <option key={trip.id} value={trip.id}>
                            {trip.name}
                        </option>
                    ))
                }
            </select >
            <button onClick={addNewLandmarkTripObj} >
                Add to Trip
            </button>
        </div >

    )
}
