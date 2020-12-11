import React, { useContext, useEffect } from "react"
import { CityContext } from "./CityProvider"
import { CityHTML } from "./CityHTML"
import { LandmarkContext } from "../landmarks/LandmarkProvider"
import { LandmarkHTML } from "../landmarks/LandmarkHTML"

export const CityList = () => {
    const { citiesArray, getCities } = useContext(CityContext)
    const { landmarksArray, getLandmarks } = useContext(LandmarkContext)

    useEffect(() => {
        getLandmarks()
            .then(getCities)
    }, [])

    return (
        <div className="cities">
            {
                citiesArray.map(c => {
                    const landmarksByCity = landmarksArray.find(lm => lm.id === c.cityId)
                    return < LandmarkHTML key={c.id} cityObj={c} landmarkObj={landmarksByCity} />
                })}
        </div>
    )
}