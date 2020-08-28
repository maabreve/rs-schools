import React, { useEffect } from 'react';
import { GoogleMap, Marker, InfoWindow} from "@react-google-maps/api";

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

const center = {
  lat: -30.036288,
  lng: -51.215899
};

const Map = ({markers, currentLocation, currentSchool}) => {
  const [selected, setSelected] = React.useState(null);
  const mapRef = React.useRef();

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


  return (
    <div>
      <GoogleMap
        id="map"
        mapContainerStyle={mapContainerStyle}
        zoom={12}
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
        {Object.entries(currentLocation).length !== 0 ? (
           <Marker
              key="center-mark"
              position={{ lat: currentLocation.lat, lng: currentLocation.lng }}
          />
        ) : null}

        {/* <Marker
          key="center-mark"
          position={{ lat: center.lat, lng: center.lng }}
          onClick={() => {
            // setSelected(marker);
          }}
        /> */}

        {selected ? (
          <InfoWindow
            position={{ lat: selected.lat, lng: selected.lng }}
            onCloseClick={() => {
              setSelected(null);
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
        ) : null}
      </GoogleMap>
    </div>
  )
}

export default Map;