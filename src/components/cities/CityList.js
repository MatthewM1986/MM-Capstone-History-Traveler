import React, { useContext, useEffect } from "react"
import { CityContext } from "./CityProvider"
import { CityHTML } from "./CityHTML"

export const CityList = () => {
    const { citiesArray, getCities } = useContext(CityContext)

    useEffect(() => {
        getCities()
    }, [])

    return (
        <div className="cities">
            {
                citiesArray.map(c => < CityHTML key={c.id} cityObj={c} />
                )}
        </div>
    )
}