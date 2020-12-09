import React, { useState } from "react"

/*
    The context is imported and used by individual components
    that need data
*/
export const StateContext = React.createContext()

/*
 This component establishes what data can be used.
 */
export const StateProvider = (props) => {

    const [statesArray, setStates] = useState([])
    // useState returns [initial value of state variable, a function to set the value of the state variable]

    const getStates = () => {
        return fetch("http://localhost:8088/states")
            .then(res => res.json())
            .then(setStates)
        // .then(parsedLocations => setLocations(parsedLocations))
    }

    return (
        <StateContext.Provider value={
            {
                statesArray, getStates
            }
        }>
            {props.children}
        </StateContext.Provider>
    )
}