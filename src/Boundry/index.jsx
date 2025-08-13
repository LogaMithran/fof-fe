import React, {useContext, useEffect, useState} from 'react';

import {APIProvider, Map} from '@vis.gl/react-google-maps';
import {Markers} from "./Markers.jsx";
import axios from "axios";
import MapContext from "./mapContext.jsx";
import {BACKEND_URL, MAPS_API_KEY, WEBSOCKET_URI} from "../utils/constants.js";
import {storage} from "../utils/storage.js";

const options = {
    enableHighAccuracy: true, timeout: 5000, maximumAge: 0,
};
const ws = new WebSocket(WEBSOCKET_URI);

const MapBoundry = ({userName}) => {
    const [currentLocation, setCurrentLocation] = useState([])
    const [loaded, setLoaded] = useState(false)
    const [nearByFriends, setNearbyFriends] = useState([])

    const {refresh, refreshMap, showToastMessage, resetToast} = useContext(MapContext)


    ws.onmessage = ((ev) => {
        console.log(ev)
        refreshMap()
        showToastMessage()
        setTimeout(() => resetToast(), 2000)
    })
    const success = async (cords) => {
        const {latitude, longitude} = cords?.coords
        setCurrentLocation([{key: 'operaHouse', userName: userName, location: {lat: latitude, lng: longitude}}])
        setLoaded(true)
        ws.send(JSON.stringify({lat: latitude, lng: longitude, userName: userName}))

        await getFriends(latitude, longitude)
    }

    const failure = (err) => {
        console.log(err)
    }

    useEffect(() => {
        if (navigator.geolocation) {
            if (!storage.getFromCookies("userName")) {
                ws.onopen = function () {
                    console.log("Connected to WebSocket server");
                };
            }
            navigator.permissions
                .query({name: "geolocation"})
                .then((data) => {
                    if (data.state === "denied") {
                        console.log("User position dene")
                    } else if (data.state === "granted" || data.state === "prompt") {
                        console.log("Providing")
                        navigator.geolocation.getCurrentPosition(success, failure, options)
                    }
                })
        }
    }, []);
    useEffect(() => {
        if (currentLocation?.length && currentLocation[0]?.location?.lng && currentLocation[0]?.location?.lat) {
            getFriends(currentLocation[0]?.location?.lat, currentLocation[0]?.location?.lng).then((data) => (console.log(data)))
        }
    }, [refresh]);

    const getFriends = async (latitude, longitude) => {
        const response = await axios.get(`${BACKEND_URL}/friends?km=1000&lat=${latitude}&lng=${longitude}`)

        if (response.status === 200) {
            const nearByFriends = response?.data?.filter((data) => data.Name !== userName)
            nearByFriends?.map((value, index) => {
                setNearbyFriends((prevState) => [...prevState, {
                    key: index, userName: value.Name, location: {
                        lat: value.Latitude, lng: value.Longitude,
                    },
                },]);
            })
        }
    }
    return (<>

        {loaded && (<APIProvider apiKey={MAPS_API_KEY}
                                 onLoad={() => console.log('Maps API has loaded.')}>
            <Map
                defaultZoom={13}
                defaultCenter={{
                    lat: currentLocation[0]?.location?.lat, lng: currentLocation[0]?.location?.lng
                }}
                mapId='da37f3254c6a6d1c'
            >
                <Markers marks={currentLocation} isSelf={true}/>
                <Markers marks={nearByFriends}/>
            </Map>
        </APIProvider>)}
    </>)
};

export default MapBoundry;