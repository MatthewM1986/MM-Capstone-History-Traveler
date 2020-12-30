import React from "react"
import { Route } from "react-router-dom"
import { CityProvider } from "./cities/CityProvider"
import { TypeProvider } from "./types/TypeProvider"
import { TripProvider } from "./trips/TripProvider"
import { TripDetails } from "./trips/TripDetail"
import { TripCreate } from "./trips/TripCreate"
import { TripList } from "./trips/TripList"
import { LandmarkProvider } from "./landmarks/LandmarkProvider"
import { LandmarkList } from "./landmarks/LandmarkList"
import { LandmarkDetails } from "./landmarks/LandmarkDetail"
import { NavBar } from "./nav/NavBar"
import background from "./images/OldMapBlue.jpg"


export const ApplicationView = () => {
    return (
        <>
            <section
                style={{
                    backgroundImage: `url(${background})`, backgroundRepeat: 'no-repeat',
                    backgroundSize: 'cover'
                }} >

                <CityProvider>
                    <TripProvider>
                        <LandmarkProvider>
                            <Route path="/" render={props => <NavBar {...props} />} />
                        </LandmarkProvider>
                    </TripProvider>
                </CityProvider>

                <TripProvider>
                    <TypeProvider>
                        <LandmarkProvider>
                            <CityProvider>
                                <Route exact path="/" render={
                                    props => <TripCreate {...props} />
                                } />

                                <Route exact path="/trips/:tripId(\d+)" render={
                                    props => <TripDetails {...props} />
                                } />

                                <Route exact path="/trips" render={
                                    props => <TripList {...props} />
                                } />
                            </CityProvider>
                        </LandmarkProvider>
                    </TypeProvider>
                </TripProvider>

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
            </section>
        </>
    )
}