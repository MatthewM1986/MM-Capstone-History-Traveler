import React, { useContext, useEffect } from "react"
import { LandmarkContext } from "./LandmarkProvider"
import "./Landmark.css"
import { CityContext } from "../cities/CityProvider"


export const LandmarkList = (props) => {
    // This state changes when `getLandmarks()` is invoked below
    const { landmarksArray, getLandmarks } = useContext(LandmarkContext)
    const { setCurrentCityId } = useContext(CityContext)


    useEffect(() => {
        getLandmarks()
    }, [])

    useEffect(() => {
        setCurrentCityId(+props.match.params.cityId)
    }, [landmarksArray])


    return (
        <section className="landmarks_container">
            <div className="landmarks">
                {/* <h1>${cities.name}</h1> */}
                {
                    landmarksArray.filter(lm => lm.cityId === +props.match.params.cityId).map(landmarkObj => {
                        return (
                            <div key={landmarkObj.id} className="landmarkCard">
                                <h3 className="landmark__name">{landmarkObj.name}</h3>
                                <div className="landmark__image"><img src={landmarkObj.imageURL}></img></div>
                                < button className="btn--details"
                                    onClick={() => props.history.push(`/landmarks/detail/${landmarkObj.id}`)}>Details</button>
                            </div>)
                    })}
            </div>
        </section >
    )
}

