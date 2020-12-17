import React, { useState } from "react"

/*
    The context is imported and used by individual components
    that need data
*/
export const TravelerContext = React.createContext()

/*
 This component establishes what data can be used.
 */
export const TravelerProvider = (props) => {

    const [travelersArray, setTravelers] = useState([])
    // useState returns [initial value of state variable, a function to set the value of the state variable]

    const getTravelers = () => {
        return fetch("http://localhost:8088/travelers")
            .then(res => res.json())
            .then(setTravelers)
    }


    return (
        <TravelerContext.Provider value={
            {
                travelersArray, getTravelers
            }
        }>
            {props.children}
        </TravelerContext.Provider>
    )
}