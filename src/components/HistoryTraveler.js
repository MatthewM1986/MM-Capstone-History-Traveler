import React from "react"
import { Route, Redirect } from "react-router-dom"
import { Login } from "./auth/Login"
import { Register } from "./auth/Register"
import { ApplicationView } from "./ApplicationView"
import "./HistoryTraveler.css"


export const HistoryTraveler = () => (
    <>
        < Route render={() => {
            // The user id is saved under the key app_user_id in local Storage. Change below if needed!
            if (localStorage.getItem("app_user_id")) {
                return (
                    <>
                        <Route render={props => <ApplicationView {...props} />} />
                    </>
                )
            } else {
                return <Redirect to="/login" />
            }
        }} />

        < Route path="/login" render={props => < Login {...props} />} />
        <Route path="/register" render={props => <Register {...props} />} />
    </>
)