import React, { useContext, useEffect, useState } from "react"
import { LandmarkContext } from "./LandmarkProvider"
import { LandmarkHTML } from "./LandmarkHTML"
import "./Landmark.css"
import { TypeContext } from "../types/TypeProvider"
import { CityContext } from "../cities/CityProvider"

export const LandmarkDetails = (props) => {
    const { landmarksArray, getLandmarks, addLandmark } = useContext(LandmarkContext)
    const { typesArray, getTypes } = useContext(TypeContext)
    const { citiesArray, getCities } = useContext(CityContext)


    const [landmark, setLandmark] = useState({})
    const [typeOfLandmark, setTypeOfLandmark] = useState({})
    const [city, setCity] = useState({})


    useEffect(() => {
        getTypes()
            .then(getLandmarks)
    }, [])

    useEffect(() => {
        const landmark = landmarksArray.find(lm => lm.id === +props.match.params.landmarkId) || {}
        setLandmark(landmark)
    }, [landmarksArray])

    useEffect(() => {
        const city = citiesArray.find(c => c.id === +props.match.params.cityId) || {}
        setLandmark(city)
    }, [citiesArray])

    // const addToTrip = () => {
    //     const landmarkId = +props.match.params.landmarkId
    //     const tripId = +props.match.params.tripId
    //     const cityId = +props.match.params.cityId

    // debugger
    // console.log(citiesArray)

    //     addLandmark({
    //         landmarkId, tripId
    //     }).then(() => props.history.push(`/landmarks/${city.id}`))
    //     // }).then(() => props.history.push(`/landmarks/${city.current.value}`))
    // }

    useEffect(() => {
        const typeOfLandmark = typesArray.find(t => t.id === landmark.typeId) || {}
        setTypeOfLandmark(typeOfLandmark)
    }, [landmark])


    return (
        <div className="landmark">
            < LandmarkHTML key={landmark.id} typeObj={typeOfLandmark} landmarkObj={landmark} />
            <br></br>
            < button className="btn--add"
                onClick={() => props.history.push(`/landmarks/${city.id}`)}>Add</button>
            {/* < button className="btn--add" onClick={(evt) => {
                evt.preventDefault()
                addToTrip()
            }}>Add
            </button> */}
        </div >

    )
}
