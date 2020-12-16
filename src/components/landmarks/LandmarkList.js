import React, { useContext, useEffect } from "react"
import { LandmarkContext } from "./LandmarkProvider"
import { LandmarkHTML } from "./LandmarkHTML"
import "./Landmark.css"



export const LandmarkList = (props) => {
    // This state changes when `getLandmarks()` is invoked below
    const { landmarksArray, getLandmarks } = useContext(LandmarkContext)
    /*
        What's the effect this is reponding to? Component was
        "mounted" to the DOM. React renders blank HTML first,
        then gets the data, then re-renders.
    */

    // const tripName = useRef(null)

    useEffect(() => {
        getLandmarks()
    }, [])

    return (
        <section className="landmarks_container">
            <div className="landmarks">
                {/* <h1>${cities.name}</h1> */}
                {
                    landmarksArray.filter(lm => lm.cityId === +props.match.params.cityId).map(landmarkObj => {
                        // console.log("before map", landmarksArray.filter(lm => lm.cityId === +props.match.params.cityId)
                        return (
                            <div key={landmarkObj.id} className="landmarkCard">
                                <h3 className="landmark__name">{landmarkObj.name}</h3>
                                <div className="landmark__image"><img src={landmarkObj.imageURL}></img></div>
                                < button className="btn--details"
                                    onClick={() => props.history.push(`/landmark/detail/${landmarkObj.id}`)}>Details</button>
                            </div>)
                    })}
            </div>
            <div className="landmarksTrip">
                <div className="trip--name">
                    <input type="text" id="tripName" className="form-control" placeholder="Name Your Trip" />
                </div>
                {
                    landmarksArray.filter(lm => lm.landmarkTripId === +props.match.params.landmarkTripId).map(landmarkObj => {
                        return (
                            <div key={landmarkObj.id} className="landmarkCard">
                                <h3 className="landmark__name">{landmarkObj.name}</h3>
                                <button className="btn--release"
                                // onClick={() => {
                                //     releaseLandmark(landmarkTripId)
                                //         .then(() => {
                                //             props.history.push("/landmarks/:cityId(\d+)")
                                //         })
                                // }}
                                >Delete</button>
                            </div>)
                    })}
                <button className="btn--submit"

                >Submit</button>
            </div>
        </section >
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