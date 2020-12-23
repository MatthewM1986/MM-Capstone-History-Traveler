import React from "react"
import { Route } from "react-router-dom"
import { CityProvider } from "./cities/CityProvider"
import { TypeProvider } from "./types/TypeProvider"
import { TripProvider } from "./trips/TripProvider"
import { TripDetails } from "./trips/TripDetail"
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

            <TripProvider>
                <TypeProvider>
                    <LandmarkProvider>
                        <CityProvider>
                            <Route exact path="/landmarks/:cityId(\d+)" render={
                                props => <LandmarkList {...props} />
                            } />

                            <Route exact path="/landmarks/detail/:landmarkId(\d+)" render={
                                props => <LandmarkDetails cityId={props.match.params.cityId} {...props} />
                            } />
                        </CityProvider>
                    </LandmarkProvider>
                </TypeProvider>
            </TripProvider>


            <TripProvider>
                <TypeProvider>
                    <LandmarkProvider>
                        <CityProvider>
                            {/* <Route exact path="/trips/:tripId(\d+)" render={
                                props => <TripCreate {...props} />
                            } /> */}

                            <Route exact path="/trips/:tripId(\d+)" render={
                                props => <TripDetails {...props} />
                            } />
                        </CityProvider>
                    </LandmarkProvider>
                </TypeProvider>
            </TripProvider>
        </>
    )
}