import React, { useContext, useEffect } from "react"
import { LandmarkContext } from "./LandmarkProvider"
import "./Landmark.css"
import { CityContext } from "../cities/CityProvider"


export const LandmarkList = (props) => {
    //This gives access to the to the context in the landmark provider
    const { landmarksArray, getLandmarks } = useContext(LandmarkContext)
    //This gives access to the to the context in the city provider
    const { setCurrentCityId } = useContext(CityContext)

    //This grabs my landmarks array from json
    useEffect(() => {
        getLandmarks()
        //the empty array tells react to load just once on page render
    }, [])

    //this gets the current city id from props
    useEffect(() => {
        setCurrentCityId(+props.match.params.cityId)
        //this tells react to refresh everytime landmark array state is changed
    }, [landmarksArray])


    return (
        <section className="landmarks_container">
            <div className="landmarks">
                {
                    //This filters through the landmarks array and finds the cityid stored in props and mathces it with the landmark array cityid
                    //Then it maps through the filtered array
                    landmarksArray.filter(lm => lm.cityId === +props.match.params.cityId).map(landmarkObj => {
                        return (
                            <div key={landmarkObj.id} className="landmarkCard">
                                <h3 className="landmark__name">{landmarkObj.name}</h3>
                                <img className="landmark__image" src={landmarkObj.imageURL}></img>
                                < button className="btn--details"
                                    //This tells the button that when clicked push to the details page of the current landmark
                                    onClick={() => props.history.push(`/landmarks/detail/${landmarkObj.id}`)}>Details</button>
                            </div>)
                    })}
            </div>
        </section >
    )
}

