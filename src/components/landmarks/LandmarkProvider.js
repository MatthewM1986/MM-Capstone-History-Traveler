import React, { useState } from "react"

/*
    The context is imported and used by individual components
    that need data
*/
export const LandmarkContext = React.createContext()

/*
 This component establishes what data can be used.
 */
export const LandmarkProvider = (props) => {

    const [landmarksArray, setLandmarks] = useState([])
    // useState returns [initial value of state variable, a function to set the value of the state variable]

    const getLandmarks = () => {
        return fetch("http://localhost:8088/landmarks")
            .then(res => res.json())
            .then(setLandmarks)
    }

    const getLandmarkById = (id) => {
        return fetch(`http://localhost:8088/cities/${id}?_expand=landmarks`)
            .then(res => res.json())
    }

    return (
        <LandmarkContext.Provider value={
            {
                landmarksArray, getLandmarks, getLandmarkById
            }
        }>
            {props.children}
        </LandmarkContext.Provider>
    )
}