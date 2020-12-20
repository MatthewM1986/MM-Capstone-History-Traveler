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
            .then(res => setLandmarks(res))
    }
    // console.log("this is the landmarks", landmarksArray)

    // console.log("landmark context", LandmarkContext)
    return (
        <LandmarkContext.Provider value={
            {
                landmarksArray, getLandmarks
            }
        }>
            { props.children}
        </LandmarkContext.Provider >
    )
}