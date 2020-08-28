import React, { useEffect, useState, useRef } from 'react';
import {
  GoogleMap,
  Marker,
  InfoWindow,
  DirectionsRenderer,
  DirectionsService,
} from "@react-google-maps/api";

import mapStyles from "../style/mapStyles";

const mapContainerStyle = {
  height: "calc(100vh - 60px)",
  width: "100%",
};

const options = {
  styles: mapStyles,
  disableDefaultUI: true,
  zoomControl: true,
};


const Map = ({markers, center, currentLocation, currentSchool, handleCloseInfoMap}) => {
  const [selected, setSelected] = useState(null);
  const [response, setResponse] = useState(null);
  const mapRef = useRef();

  useEffect(() => {
    if (Object.entries(currentSchool).length !== 0) {
      setSelected(currentSchool);
    }

    if (Object.entries(currentLocation).length !== 0) {
    }

  }, [currentLocation, currentSchool]);


  const onMapLoad = React.useCallback((map) => {
    mapRef.current = map;
  }, []);

  const directionsCallback = (response) => {

    if (response !== null) {
      if (response.status === 'OK') {
        setResponse(response)
      } else {
        console.log('response: ', response)
      }
    }
  }

  return (
    <div>
      <GoogleMap
        id="map"
        mapContainerStyle={mapContainerStyle}
        zoom={14}
        center={center}
        options={options}
        onLoad={onMapLoad}>

        { markers.map(marker => (
          <Marker
            key={`${marker.lat}-${marker.lng}`}
            position={{ lat: marker.lat, lng: marker.lng }}
            onClick={() => {
              setSelected(marker);
            }}
            icon={{
              url: `/school.svg`,
              origin: new window.google.maps.Point(0, 0),
              anchor: new window.google.maps.Point(15, 15),
                scaledSize: new window.google.maps.Size(30, 30),
            }}
          />
        ))}

        {selected && (
          <InfoWindow
            position={{ lat: selected.lat, lng: selected.lng }}
            onCloseClick={() => {
              setSelected(null);
              handleCloseInfoMap();
            }}>
            <div className="p-info">
              <h3>
                <span role="img" aria-label="bear">
                  🏫
                </span>{" "}
                { selected.nome}
              </h3>
              <p> Endereço: { selected.endereco}</p>
              <p> Email: { selected.email}</p>
              <p> Site: { selected.site}</p>
            </div>
          </InfoWindow>
        ) }

        {(
            Object.entries(currentLocation).length !== 0 &&
            Object.entries(currentSchool).length !== 0
          ) && (
            <DirectionsService
              options={{
                destination: {
                  lat: currentLocation.lat,
                  lng: currentLocation.lng
                },
                origin:{
                  lat: currentSchool.lat,
                  lng: currentSchool.lng
                },
                travelMode: 'DRIVING'
              }}
              callback={directionsCallback}
              onLoad={directionsService => {
                console.log('DirectionsService onLoad directionsService: ', directionsService)
              }}
              // optional
              onUnmount={directionsService => {
                console.log('DirectionsService onUnmount directionsService: ', directionsService)
              }}
            />
          )
        }

        {
          response !== null && (
            <DirectionsRenderer
              // required
              options={{
                directions: response
              }}
              // optional
              onLoad={directionsRenderer => {
                console.log('DirectionsRenderer onLoad directionsRenderer: ', directionsRenderer)
              }}
              // optional
              onUnmount={directionsRenderer => {
                console.log('DirectionsRenderer onUnmount directionsRenderer: ', directionsRenderer)
              }}
            />
          )
        }
      </GoogleMap>
    </div>
  )
}

export default Map;