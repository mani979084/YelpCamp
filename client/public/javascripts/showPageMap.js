
mapboxgl.accessToken = window.env.MAP_TOKEN;


async function fetchApi() {

    const campid = document.querySelector('#campid').getAttribute('campid');

    const res = await axios.get(`/api/campground/${campid}`)
    const campground = res.data;

    const map1 = new mapboxgl.Map({
        container: 'map1',
        style: 'mapbox://styles/mapbox/streets-v10',
        center: campground.geometry.coordinates,
        zoom: 8

    });

    const marker = new mapboxgl.Marker()
        .setLngLat(campground.geometry.coordinates)
        .setPopup(
            new mapboxgl.Popup({ offset: 25 })
                .setHTML(`<br><h4>${campground.title}</h4><p>${campground.location}</p>`)
        )
        .addTo(map1);
    map1.addControl(new mapboxgl.NavigationControl());
}

fetchApi();




