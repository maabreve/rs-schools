import React, {useEffect} from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from 'react-bootstrap/Navbar';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import {
  GoogleMap,
  useLoadScript,
  Marker,
  InfoWindow,
} from "@react-google-maps/api";
import usePlacesAutocomplete, {
  getGeocode,
  getLatLng,
} from "use-places-autocomplete";
import {
  Combobox,
  ComboboxInput,
  ComboboxPopover,
  ComboboxList,
  ComboboxOption,
} from "@reach/combobox";
import "@reach/combobox/styles.css";
import mapStyles from "./mapStyles";

const libraries = ["places"];
const mapContainerStyle = {
  height: "calc(100vh - 60px) ",
  width: "100%",
};

const options = {
  styles: mapStyles,
  disableDefaultUI: true,
  zoomControl: true,
};

const center = {
  lat: -30.0441,
  lng: -51.2194
};

export default function App() {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
    libraries,
  });

  const markers = [{
    lat: -30.0441,
    lng: -51.2194,
    time: new Date(),
    nome: 'Escola 1',
    email: 'escola1@gmail.com',
    site: 'www.escola1.com.br',
    endereco: 'Rua Manuel da Silva Santos Xavier, 345'
  },
  {
    lat: -30.07,
    lng: -51.1562,
    time: new Date(),
    nome: 'Escola 2',
    email: 'escola2@gmail.com',
    site: 'www.escola2.com.br',
    endereco: 'Rua 2'
  },
  {
    lat: -29.9804,
    lng: -51.1855,
    time: new Date(),
    nome: 'Escola 3',
    email: 'escola3@gmail.com',
    site: 'www.escola3.com.br',
    endereco: 'Rua 3'
  }
  ];

  const [selected, setSelected] = React.useState(null);
  const mapRef = React.useRef();
  const onMapLoad = React.useCallback((map) => {
    mapRef.current = map;
  }, []);

  const panTo = React.useCallback(({ lat, lng }) => {
    mapRef.current.panTo({ lat, lng });
    mapRef.current.setZoom(14);
  }, []);


  useEffect(() => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
          // center.lat = position.coords.latitude;
          // center.lng = position.coords.longitude;
        },
        error => {
          console.log('Erro ao tentar buscar a localização atual', error)
        });
      } else {
        console.log('Este dipositivo não possui serviço de geolocalização');
      }
  });


  if (loadError) return "Error";
  if (!isLoaded) return "Loading...";

  return (
    <>
      <Navbar bg="dark" variant="dark">
        <Navbar.Brand href="#home">Escolas RS</Navbar.Brand>
      </Navbar>
      <Row className="no-margin">
        <Col sm={3}>
          <Row className="pt-15">
            <Col xs="10" md="10" lg="10">
              <Search panTo={panTo} />
            </Col>
            <Col xs="1" md="1" lg="1">
              <Locate panTo={panTo} />
            </Col>
          </Row>
        </Col>
        <Col sm={9}>
        <div>
          <GoogleMap
          id="map"
          mapContainerStyle={mapContainerStyle}
          zoom={12}
          center={center}
          options={options}
          onLoad={onMapLoad}
        >
          {markers.map((marker) => (
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
      </Col>
    </Row>
    </>
  );
}

function Locate({ panTo }) {
  return (
    <button
      className="locate"
      onClick={() => {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            panTo({
              lat: position.coords.latitude,
              lng: position.coords.longitude,
            });
          },
          () => null
        );
      }}
    >
      <img src="/compass.svg" alt="compass" />
    </button>
  );
}

function Search({ panTo }) {
  const {
    ready,
    value,
    suggestions: { status, data },
    setValue,
    clearSuggestions,
  } = usePlacesAutocomplete({
    requestOptions: {
      location: { lat: () => 43.6532, lng: () => -79.3832 },
      radius: 100 * 1000,
    },
  });

  const handleInput = (e) => {
    setValue(e.target.value);
  };

  const handleSelect = async (address) => {
    setValue(address, false);
    clearSuggestions();

    try {
      const results = await getGeocode({ address });
      const { lat, lng } = await getLatLng(results[0]);
      panTo({ lat, lng });
    } catch (error) {
      console.log("😱 Error: ", error);
    }
  };

  return (
    <div className="search">
      <Combobox onSelect={handleSelect}>
        <ComboboxInput
          value={value}
          onChange={handleInput}
          disabled={!ready}
          placeholder="Informe seu endereço"
        />
        <ComboboxPopover>
          <ComboboxList>
            {status === "OK" &&
              data.map(({ id, description }) => {
                return (
                <ComboboxOption key={Math.random().toString()} value={description} />
              )})}
          </ComboboxList>
        </ComboboxPopover>
      </Combobox>
    </div>
  );
}
