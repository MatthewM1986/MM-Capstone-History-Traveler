import React, { useState } from "react"

/*
    The context is imported and used by individual components
    that need data
*/
export const CityContext = React.createContext()

/*
 This component establishes what data can be used.
 */
export const CityProvider = (props) => {

    const [citiesArray, setCities] = useState([])
    // useState returns [initial value of state variable, a function to set the value of the state variable]

    const getCities = () => {
        return fetch("http://localhost:8088/cities")
            .then(res => res.json())
            .then(setCities)
    }


    return (
        <CityContext.Provider value={
            {
                citiesArray, getCities
            }
        }>
            {props.children}
        </CityContext.Provider>
    )
}