import React, { useState } from "react"

/*
    The context is imported and used by individual components
    that need data
*/
export const UserContext = React.createContext()

/*
 This component establishes what data can be used.
 */
export const UserProvider = (props) => {

    const [usersArray, setUsers] = useState([])
    // useState returns [initial value of state variable, a function to set the value of the state variable]

    const getUsers = () => {
        return fetch("http://localhost:8088/users")
            .then(res => res.json())
            .then(setUsers)
    }


    return (
        <UserContext.Provider value={
            {
                usersArray, getUsers
            }
        }>
            {props.children}
        </UserContext.Provider>
    )
}