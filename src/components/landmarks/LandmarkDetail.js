import React, { useContext, useEffect, useState } from "react"
import { LandmarkContext } from "./LandmarkProvider"
import { LandmarkHTML } from "./LandmarkHTML"
import "./Landmark.css"
import { TypeContext } from "../types/TypeProvider"

export const LandmarkDetails = (props) => {
    const { landmarksArray, getLandmarks, addLandmark, getLandmarkById } = useContext(LandmarkContext)
    const { typesArray, getTypes } = useContext(TypeContext)

    // const [landmark, setLandmarks] = useState({})

    useEffect(() => {
        // const landmarkId = parseInt(props.match.params.landmarkId)
        // getLandmarkById(landmarkId)
        getTypes()
            .then(getLandmarks)
        // .then(setLandmarks)
    }, [])

    return (
        <section className="landmarkDetail">
            <div className="landmark">
                {
                    landmarksArray.map(lm => {
                        const typeOfLandmark = typesArray.find(t => t.id === lm.typeId)
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