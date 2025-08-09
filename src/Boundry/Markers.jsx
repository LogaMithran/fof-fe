import {AdvancedMarker, Pin, useMap} from "@vis.gl/react-google-maps";
import {useCallback, useEffect, useRef, useState} from "react";
import {MarkerClusterer} from "@googlemaps/markerclusterer";
import {renderToString} from "react-dom/server";

export const Markers = ({marks, isSelf = false}) => {
    const map = useMap();
    const [markers, setMarkers] = useState({});
    const clusterer = useRef(null);
    const [circleCenter, setCircleCenter] = useState(null)
    const handleClick = useCallback((ev) => {
        if (!map) return;
        if (!ev.latLng) return;
        map.panTo(ev.latLng);
        setCircleCenter(ev.latLng);
    });

    useEffect(() => {
        if (!map) return;
        if (!clusterer.current) {
            clusterer.current = new MarkerClusterer({map});
        }
    }, [map]);

    // Update markers, if the markers array has changed
    useEffect(() => {
        clusterer.current?.clearMarkers();
        clusterer.current?.addMarkers(Object.values(markers));
    }, [markers]);

    const setMarkerRef = (marker, key) => {
        if (marker && markers[key]) return;
        if (!marker && !markers[key]) return;

        setMarkers(prev => {
            if (marker) {
                return {...prev, [key]: marker};
            } else {
                const newMarkers = {...prev};
                delete newMarkers[key];
                return newMarkers;
            }
        });
    };

    return (<>
        {marks.map((poi) => (<AdvancedMarker
            key={poi.key}
            position={poi.location}
            ref={marker => setMarkerRef(marker, poi.key)}
            clickable={true}
            onClick={handleClick}
        >
            <div style={{transform: 'scale(1.5)'}}>
                <Pin
                    background={isSelf ? '#00FF00' : '#FF0000'}
                    borderColor="#000"
                    glyph={poi?.userName}
                    glyphColor="#000"
                    scale={1.5} // 👈 this increases the pin size
                >
                </Pin>


            </div>
        </AdvancedMarker>))}
    </>);
};
