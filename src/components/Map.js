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


const Map = ({
  markers,
  center,
  currentLocation,
  currentSchool,
  handleCloseInfoMap }) => {
  const [selected, setSelected] = useState(null);
  const [response, setResponse] = useState(null);
  const mapRef = useRef();

  useEffect(() => {
    if (Object.entries(currentSchool).length !== 0) {
      setSelected(currentSchool);
    }
    console.log(currentLocation)
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

        {markers && markers.map(marker => (
          <Marker
            key={`${marker.latitude}-${marker.longitude}-${marker.codigo}`}
            position={{ lat: marker.latitude, lng: marker.longitude }}
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
            position={{ lat: selected.latitude, lng: selected.longitude }}
            onCloseClick={() => {
              setSelected(null);
              handleCloseInfoMap();
            }}>
            <div className="p-info">
              <h5>
                <span role="img" aria-label="bear">
                  🏫
                </span>{" "}
                {selected.nome}
              </h5>
              <p> Endereço: {`${selected.logradouro}, ${selected.numero}`}</p>
              <p> Bairro: {selected.bairro}</p>
              <p> Email: {selected.email}</p>
              <p> Site: {selected.site}</p>
            </div>
          </InfoWindow>
        )}

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
                origin: {
                  lat: currentSchool.latitude,
                  lng: currentSchool.longitude
                },
                travelMode: 'DRIVING'
              }}
              callback={directionsCallback}
            />
          )
        }

        {
          response !== null && (
            <DirectionsRenderer
              options={{
                directions: response
              }}
            />
          )
        }
      </GoogleMap>
    </div>
  )
}

export default Map;