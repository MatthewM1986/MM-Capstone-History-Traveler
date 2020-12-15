import React, { useContext, useEffect } from "react"
import { LandmarkContext } from "./LandmarkProvider"
import { LandmarkHTML } from "./LandmarkHTML"
import "./Landmark.css"
import { CityContext } from "../cities/CityProvider"

export const LandmarkList = (props) => {
    // This state changes when `getLandmarks()` is invoked below
    const { landmarksArray, getLandmarks } = useContext(LandmarkContext)
    const { citiesArray, getCities } = useContext(CityContext)
    /*
        What's the effect this is reponding to? Component was
        "mounted" to the DOM. React renders blank HTML first,
        then gets the data, then re-renders.
    */
    useEffect(() => {
        getLandmarks()
    }, [])

    return (
        <div>
            {/* <h1>${city.id}</h1> */}
            {
                landmarksArray.filter(lm => lm.cityId === +props.match.params.cityId).map(landmarkObj => {
                    console.log("before map", landmarksArray.filter(lm => lm.cityId === +props.match.params.cityId))
                    // console.log("landmark object", landmarkObj)
                    return (
                        <div className="landmark">
                            <h3 className="landmark__name">{landmarkObj.name}</h3>
                            <div className="landmark__image"><img src={landmarkObj.imageURL}></img></div>
                            < button key={landmarkObj.id} to={`/landmarks/${landmarkObj.id}`} >Details</button>
                        </div>)
                })}
        </div>
    )
}




















// import React, { useContext, useEffect } from "react"
// import { LandmarkContext } from "./LandmarkProvider"
// import { LandmarkHTML } from "./LandmarkHTML"
// import "./Landmark.css"
// import { TypeContext } from "../types/TypeProvider"

// export const LandmarkList = (props) => {
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
//                 landmarksArray.filter(lm => lm.cityId === +props.match.params.cityId).map(lm => {
//                     const typeOfLandmark = typesArray.find(t => t.id === lm.typeId)
//                     // console.log("typeid", typesArray, lm.typeId)
//                     return < LandmarkHTML key={lm.id} typeObj={typeOfLandmark} landmarkObj={lm} />
//                 })}
//         </div>
//     )
// }