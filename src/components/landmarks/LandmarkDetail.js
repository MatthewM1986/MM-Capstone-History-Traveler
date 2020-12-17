import React, { useContext, useEffect, useState } from "react"
import { LandmarkContext } from "./LandmarkProvider"
import { LandmarkHTML } from "./LandmarkHTML"
import "./Landmark.css"
import { TypeContext } from "../types/TypeProvider"
import { TripContext } from "../trips/TripProvider"
import { CityContext } from "../cities/CityProvider"

export const LandmarkDetails = (props) => {
    const { landmarksArray, getLandmarks } = useContext(LandmarkContext)
    const { typesArray, getTypes } = useContext(TypeContext)
    const { addLandmarkToTrip } = useContext(TripContext)
    const { setCurrentCityId, currentCityId } = useContext(CityContext)

    const [landmark, setLandmark] = useState({})
    const [typeOfLandmark, setTypeOfLandmark] = useState({})



    useEffect(() => {
        getTypes()
            .then(getLandmarks)
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
        //get tripid
        const tripId = +localStorage.getItem("current_trip_id")
        //put values into an object and call the function that will post to database
        {
            addLandmarkToTrip({
                landmarkId: landmarkId,
                tripId: tripId
            })
                //Need to figure out how to define cityId
                .then(() => props.history.push(`/landmarks/${currentCityId}`))
        }
    }
    // console.log(typeof addLandmarkToTrip)
    // console.log("props", props)

    return (
        <div className="landmark">
            < LandmarkHTML key={landmark.id} typeObj={typeOfLandmark} landmarkObj={landmark} />
            <button onClick={addNewLandmarkTripObj} >
                Add to Trip
            </button>
        </div >

    )
}
