import React, { useContext, useEffect } from "react"
import { LandmarkContext } from "./LandmarkProvider"
import { LandmarkHTML } from "./LandmarkHTML"
import "./Landmark.css"
import { TypeContext } from "../types/TypeProvider"

export const LandmarkList = () => {
    // This state changes when `getLandmarks()` is invoked below
    const { landmarksArray, getLandmarks } = useContext(LandmarkContext)
    const { typesArray, getTypes } = useContext(TypeContext)

    /*
        What's the effect this is reponding to? Component was
        "mounted" to the DOM. React renders blank HTML first,
        then gets the data, then re-renders.
    */
    useEffect(() => {
        getTypes()
            .then(getLandmarks)
    }, [])

    return (
        <div className="landmarks">
            {
                landmarksArray.map(lm => {
                    const typeOfLandmark = typesArray.find(t => t.id === lm.typeId)
                    // console.log("typeid", typesArray, lm.typeId)
                    return < LandmarkHTML key={lm.id} typeObj={typeOfLandmark} landmarkObj={lm} />
                })}
        </div>
    )
}

























// export const LandmarkList = () => {
//     // This state changes when `getLandmarks()` is invoked below
//     const { landmarksArray, getLandmarks } = useContext(LandmarkContext)
//     const { typesArray, getTypes } = useContext(TypeContext)

//     /*
//         What's the effect this is reponding to? Component was
//         "mounted" to the DOM. React renders blank HTML first,
//         then gets the data, then re-renders.
//     */
//     useEffect(() => {
//         getTypes()
//             .then(getLandmarks)
//     }, [])

//     return (
//         <div className="landmarks">
//             {
//                 landmarksArray.map(lm => {
//                     const typeOfLandmark = typesArray.find(t => t.id === lm.typeId)
//                     // console.log("typeid", typesArray, lm.typeId)
//                     return < LandmarkHTML key={lm.id} typeObj={typeOfLandmark} landmarkObj={lm} />
//                 })}
//         </div>
//     )
// }