import React, { useEffect, useState, useRef } from 'react';
import {
  GoogleMap,
  Marker,
  InfoWindow,
  DirectionsRenderer,
  DirectionsService
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
  currentRoute,
  setDistanceMatrix,
  handleCloseInfoMap }) => {

  const [schoolInfo, setSchoolInfo] = useState(null);
  const [routeDestination, setRouteDestination] = useState(null);
  const [response, setResponse] = useState(null);

  const mapRef = useRef();

  useEffect(() => {
    setSchoolInfo(currentSchool);
    setRouteDestination(currentRoute);
  }, [currentSchool, currentRoute]);


  const onMapLoad = React.useCallback((map) => {
    mapRef.current = map;
  }, []);

  const directionsCallback = (response) => {
    if (response) {
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
              setSchoolInfo(marker);
            }}
            icon={{
              url: `/school.svg`,
              origin: new window.google.maps.Point(0, 0),
              anchor: new window.google.maps.Point(15, 15),
              scaledSize: new window.google.maps.Size(30, 30),
            }}
          />
        ))}

        {schoolInfo && (
          <InfoWindow
            position={{ lat: schoolInfo.latitude, lng: schoolInfo.longitude }}
            onCloseClick={() => {
              setSchoolInfo(null);
              handleCloseInfoMap();
            }}>
            <div className="p-info">
              <h5>
                <span role="img" aria-label="bear">
                  🏫
                </span>{" "}
                {schoolInfo.nome}
              </h5>
              <p>
                Endereço: {`${schoolInfo.logradouro}, ${schoolInfo.numero}`}
              </p>
              <p> Bairro: {schoolInfo.bairro}</p>
              <p> Email: {schoolInfo.email}</p>
              <p> Site: {schoolInfo.site}</p>
            </div>
          </InfoWindow>
        )}

        {(
          currentLocation && routeDestination
        ) && (
            <DirectionsService
              options={{
                destination: {
                  lat: currentLocation.lat,
                  lng: currentLocation.lng
                },
                origin: {
                  lat: routeDestination.latitude,
                  lng: routeDestination.longitude
                },
                travelMode: 'DRIVING'
              }}
              callback={directionsCallback}
            />
          )
        }

        {
          response && (
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