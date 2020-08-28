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
import Spinner from './components/Spinner';
import * as schoolsActions from "./redux/actions/schoolsActions";
import * as currentSchoolActions from "./redux/actions/currentSchoolActions";

const libraries = ["places"];

const App = ({schools, currentLocation, currentSchool, loading, actions}) => {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
    libraries,
  });

  useEffect(() => {
    if (schools && schools.length === 0) {
      actions.loadSchools().catch(error => {
        console.log("Busca de escolas falhou " + error);
      });
    }
  }, [actions, schools, currentLocation, currentSchool]);

  if (loadError) return "Erro";
  if (!isLoaded || loading) return <Spinner />;

  const handleCloseInfoMap = () => {
    actions.setCurrentSchool({});
  }

  const center = {
    lat: -30.036288,
    lng: -51.215899
  };

  return (
    <>
      <Toolbar title="Escolas RS"></Toolbar>
      <Row className="no-margin">
        <Col sm={3} className=" relative">
          <List />
        </Col>
        <Col sm={9}>
          <Map
            center={center}
            markers={schools}
            currentLocation={currentLocation}
            currentSchool={currentSchool}
            handleCloseInfoMap={handleCloseInfoMap}/>
        </Col>
      </Row>
    </>
  );
}

App.propTypes = {
  schools: PropTypes.array.isRequired,
  currentLocation: PropTypes.object.isRequired,
  currentSchool: PropTypes.object.isRequired,
  actions: PropTypes.object.isRequired,
  loading: PropTypes.bool.isRequired
};

function mapStateToProps(state) {
  return {
    schools: state.schools,
    currentLocation:
      !state.currentLocation
        ? {}
        : state.currentLocation,
    currentSchool:
      !state.currentSchool
        ? {}
        : state.currentSchool,
    loading: state.apiCallsInProgress > 0
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: {
      loadSchools: bindActionCreators(schoolsActions.loadSchools, dispatch),
      setCurrentSchool: bindActionCreators(currentSchoolActions.setCurrentSchool, dispatch)
    }
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
