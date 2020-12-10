
import React, { useContext, useRef, useEffect } from "react"
import "./NavBar.css"
import { CityContext } from "../cities/CityProvider"


export const NavBar = () => {
    const { citiesArray, getCities } = useContext(CityContext)
    const city = useRef(null)

    useEffect(() => {
        getCities()
    }, [])

    return (
        // <select>
        //     <option value="0">Choose City</option>
        //     <option value="savannah">Savannah</option>
        //     <option value="chattanooga">Chattanooga</option>
        //     <option value="nashville">Nashville</option>
        // </select >
        <select defaultValue="" name="city" ref={city} id="destinationCity" className="form-control" >
            <option value="0">Select a City</option>
            {
                citiesArray.map(city => (
                    <option key={city.id} value={city.id}>
                        {city.name}
                    </option>
                ))
            }
        </select >
    )
}



























//}

// ReactDOM.render(
//     <NavBar />,
//     document.getElementById('root')
// );





// export const NavBar = (props) => {
//     return (
//         <ul className="navbar">
//             <li className="navbar__item active">
//                 <Link className="navbar__link" to="/">NSS Kennels</Link>
//             </li>
//             <li className="navbar__item">
//                 <Link className="navbar__link" to="/animals">Animals</Link>
//             </li>
//         </ul>
//     )
// }






// export const NavBar = (props) => {
//     const { citiesArray, getcities } = useContext(CityContext)
//     const city = useRef(null)
//     return (

//         <div className="navbar">
//             <label htmlFor="cities">Choose City </label>
//             <select defaultValue="" name="city" ref={city} id="" className="navbar__item" >
//                 <option value="0">Select a City</option>
//                 {citiesArray.map(e => (
//                     <option key={e.id} value={e.id}>
//                         {e.name}
//                     </option>
//                 ))}
//             </select>
//         </div>
//     )
// }





// export const NavBar = () => {
//     const destinations = require("../api/database.json")
//     return (
//         // <select>
//         //     <option value="0">Choose City</option>
//         //     <option value="savannah">Savannah</option>
//         //     <option value="chattanooga">Chattanooga</option>
//         //     <option value="nashville">Nashville</option>
//         // </select >
//         <select>
//             {destinations.cities.map(city => (
//                 <option key={city.id} value={city.id}>
//                     {city.name}
//                 </option>
//             ))}
//         </select>
//     );
// }



// const Dropdown = ({ callbackFromParent }) => {
//     const node = react.useRef()
//     const handleClick = (e) => {
//         if (node.current.contains(e.target)) {
//             callbackFromParent(true)
//             return
//         }
//         callbackFromParent(false)
//     }
//     react.useEffect(() => {
//         document.addEventListener('mousedown', handleClick)
//         return () => {
//             document.removeEventListener('mousedown', handleClick)
//         }
//     }, [])
// }

// export const NavBar = () => {
//     const [listOpen, setListOpen] = react.useState(false);
//     const myCallback = (listOpen) => {
//         setListOpen(listOpen)
//     }
//     return (
//         <ul>
//             <li className="navbar" onClick={() => setListOpen(!listOpen)}>Choose City</li>
//             <div>{listOpen ? <Dropdown /> : null}</div>
//             <li onClick={() => setListOpen(false)}></li>
//             <Link to="/cities/name">Savannah</Link>
//             <li onClick={() => setListOpen(false)}></li>
//             <Link to="/cities/name">Chattanooga</Link>
//             <li onClick={() => setListOpen(false)}></li>
//             <Link to="/cities/name">Nashville</Link>
//         </ul>
//         <div className="dropdown">{listOpen ? <Dropdown callbackFromParent={myCallback} /> : null}</div>
//     )
// }