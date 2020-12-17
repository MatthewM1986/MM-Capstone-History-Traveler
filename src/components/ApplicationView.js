import React from "react"
import { Route } from "react-router-dom"
import { CityProvider } from "./cities/CityProvider"
import { CityList } from "./cities/CityList"
import { TypeProvider } from "./types/TypeProvider"
import { TripProvider } from "./trips/TripProvider"
import { TripList } from "./trips/TripList"
import { TripCreate } from "./trips/TripCreate"
import { LandmarkProvider } from "./landmarks/LandmarkProvider"
import { LandmarkList } from "./landmarks/LandmarkList"
import { LandmarkDetails } from "./landmarks/LandmarkDetail"
import { Home } from "./home/Home"


export const ApplicationView = () => {
    return (
        <>
            <Route exact path="/">
                <Home></Home>
            </Route>

            <TypeProvider>
                <LandmarkProvider>
                    <CityProvider>
                        <Route exact path="/landmarks/:cityId(\d+)" render={
                            props => <LandmarkList {...props} />
                        } />

                        <Route exact path="/landmarks/detail/:landmarkId(\d+)" render={
                            props => <LandmarkDetails {...props} />
                        } />
                    </CityProvider>
                </LandmarkProvider>
            </TypeProvider>


            <TripProvider>
                <LandmarkProvider>
                    <CityProvider>
                        <Route exact path="/landmarks/:tripId(\d+)" render={
                            props => <TripCreate {...props} />
                        } />

                        <Route exact path="/trips/:tripId(\d+)" render={
                            props => <TripList {...props} />
                        } />
                    </CityProvider>
                </LandmarkProvider>
            </TripProvider>
        </>
    )
}