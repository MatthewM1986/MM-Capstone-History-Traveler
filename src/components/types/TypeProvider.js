import React, { useState } from "react"

/*
    The context is imported and used by individual components
    that need data
*/
export const TypeContext = React.createContext()

/*
 This component establishes what data can be used.
 */
export const TypeProvider = (props) => {

    const [typesArray, setTypes] = useState([])
    // useState returns [initial value of state variable, a function to set the value of the state variable]

    const getTypes = () => {
        return fetch("http://localhost:8088/types")
            .then(res => res.json())
            .then(setTypes)
        // .then(parsedLocations => setLocations(parsedLocations))
    }

    return (
        <TypeContext.Provider value={
            {
                typesArray, getTypes
            }
        }>
            {props.children}
        </TypeContext.Provider>
    )
}