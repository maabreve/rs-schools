import React, { useEffect } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { useLoadScript } from "@react-google-maps/api";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { bindActionCreators } from "redux";

import Toolbar from './components/Toolbar';
import Map from './components/Map';
import List from './components/List';
import * as schoolsActions from "./redux/actions/schoolsActions";
import * as locationActions from "./redux/actions/locationActions";

const libraries = ["places"];

const App = ({schools, location, actions}) => {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
    libraries,
  });

  useEffect(() => {
    if (schools && schools.length === 0) {
      actions.loadSchools().catch(error => {
        alert("Busca de escolas falhou" + error);
      });
    }
  }, [actions, schools]);

  // const mapRef = React.useRef();
  // const panTo = React.useCallback(({ lat, lng }) => {
  //   mapRef.current.panTo({ lat, lng });
  //   mapRef.current.setZoom(14);
  // }, []);

  if (loadError) return "Erro";
  if (!isLoaded) return "Carregando...";

  return (
    <>
      <Toolbar title="Escolas RS"></Toolbar>
      <Row className="no-margin">
        <Col sm={3} className=" relative">
          <List schools={schools} />
        </Col>
        <Col sm={9}>
          <Map markers={schools} />
        </Col>
      </Row>
    </>
  );
}

App.propTypes = {
  schools: PropTypes.array.isRequired,
  location: PropTypes.object.isRequired,
  actions: PropTypes.object.isRequired,
  loading: PropTypes.bool.isRequired
};

function mapStateToProps(state) {
  return {
    schools: state.schools,
    location:
      !state.location
        ? {}
        : state.location,
    loading: state.apiCallsInProgress > 0
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: {
      loadSchools: bindActionCreators(schoolsActions.loadSchools, dispatch),
      setLocation: bindActionCreators(locationActions.setLocation, dispatch),
    }
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
