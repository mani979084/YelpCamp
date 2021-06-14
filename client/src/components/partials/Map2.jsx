import React, { useEffect } from 'react'

import './env'

import mapboxgl from 'mapbox-gl';
mapboxgl.accessToken = window.env.MAP_TOKEN;

const Map2 = ({ camp }) => {

    useEffect(() => {

        const map = new mapboxgl.Map({
            container: 'map1',
            style: 'mapbox://styles/mapbox/streets-v10',
            center: camp.geometry.coordinates,
            zoom: 8

        });

        new mapboxgl.Marker()
            .setLngLat(camp.geometry.coordinates)
            .setPopup(
                new mapboxgl.Popup({ offset: 25 })
                    .setHTML(`<br><h4>${camp.title}</h4><p>${camp.location}</p>`)
            )
            .addTo(map);
        map.addControl(new mapboxgl.NavigationControl());
    }, [camp])

    return (
        <>
            <div id='map1' className="mb-3 map2"></div>

        </>
    )
}

export default Map2
