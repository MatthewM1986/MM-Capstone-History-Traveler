import React, { useContext, useEffect, useState } from "react"
import { LandmarkContext } from "./LandmarkProvider"
import { LandmarkHTML } from "./LandmarkHTML"
import "./Landmark.css"
import { TypeContext } from "../types/TypeProvider"

export const LandmarkDetails = (props) => {
    const { landmarksArray, getLandmarks, addLandmark } = useContext(LandmarkContext)
    const { typesArray, getTypes } = useContext(TypeContext)

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

    const addToTrip = () => {
        const landmarkId = +props.match.params.landmarkId
        const tripId = +props.match.params.tripId

        addLandmark({
            landmarkId, tripId
        }).then(() => props.history.push("/landmarks/:cityId(\d+)"))
    }

    useEffect(() => {
        const typeOfLandmark = typesArray.find(t => t.id === landmark.typeId) || {}
        setTypeOfLandmark(typeOfLandmark)
    }, [landmark])


    return (
        <div className="landmark">
            < LandmarkHTML key={landmark.id} typeObj={typeOfLandmark} landmarkObj={landmark} />
            <br></br>
            < button onClick={(evt) => {
                evt.preventDefault()
                addToTrip()
            }}>Add
            </button>
        </div>
    )
}

// type = "submit"
// onClick = {(evt) => {
//                 evt.preventDefault();
//                 addToList();
//             }}