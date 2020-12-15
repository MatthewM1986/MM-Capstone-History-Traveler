import React, { useContext, useEffect, useState } from "react"
import { LandmarkContext } from "./LandmarkProvider"
import { LandmarkHTML } from "./LandmarkHTML"
import "./Landmark.css"
import { TypeContext } from "../types/TypeProvider"

export const LandmarkDetails = (props) => {
    const { landmarksArray, getLandmarks, addLandmark } = useContext(LandmarkContext)
    const { typesArray, getTypes } = useContext(TypeContext)

    const [landmark, setLandmark] = useState({})

    useEffect(() => {
        getTypes()
            .then(getLandmarks)
    }, [])

    useEffect(() => {
        const landmark = landmarksArray.find(lm => lm.id === +props.match.params.landmarkId) || {}
        setLandmark(landmark)
    }, [landmarksArray])

    return (
        <section className="landmarkDetail">
            <div className="landmark">
                {
                    landmarksArray.map(lm => {
                        const typeOfLandmark = typesArray.find(t => t.id === lm.typeId)
                        // console.log("details", lm)
                        return < LandmarkHTML key={lm.id} typeObj={typeOfLandmark} landmarkObj={lm} />
                    })}
            </div>
            {/* <button className="btn--add"
                onClick={() => {
                    addLandmark(landmark.id)
                    // .then(() => {
                    //     props.history.push("/animals")
                    // })
                }}
            >Add</button> */}
        </section>
    )
}