import React, { useContext, useEffect } from "react"
import { LandmarkContext } from "./LandmarkProvider"
import { LandmarkHTML } from "./LandmarkHTML"
import "./Landmark.css"

export const LandmarkList = () => {
    // This state changes when `getLandmarks()` is invoked below
    const { landmarksArray, getLandmarks } = useContext(LandmarkContext)

    /*
        What's the effect this is reponding to? Component was
        "mounted" to the DOM. React renders blank HTML first,
        then gets the data, then re-renders.
    */
    useEffect(() => {
        console.log("LandmarkList: Initial render before data")
        getLandmarks()
    }, [])

    return (
        <div className="landmarks">
            {
                landmarksArray.map(lm => <LandmarkHTML key={lm.id} landmarkObj={lm} />)
            }
        </div>
    )
}