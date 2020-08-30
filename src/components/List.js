import React from 'react';
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { faRoute } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { bindActionCreators } from "redux";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import Search from './Search';
import Locate from './Locate';
import * as locationActions from "../redux/actions/currentLocationActions";
import * as currentSchoolsActions from "../redux/actions/currentSchoolActions";
import * as currentRouteActions from "../redux/actions/currentRouteActions";

const List = ({
    schools,
    actions }) => {

  const handleSearch = (value) => {
    actions.setCurrentLocation(value);
  }

  const handleLocateClick = (location) => {
    actions.setCurrentLocation(location);
  }

  const handleSchoolClick = (school) => {
    actions.setCurrentSchool(school);
    actions.setCurrentRoute(null);
  }

  const handleRouteClick = (school) => {
    actions.setCurrentRoute(school);
    actions.setCurrentSchool(null);
  }

  return (
    <div>
      <div className="px-15">
        <Search handleSearch={handleSearch} />
        <Locate handleLocateClick={handleLocateClick} />
      </div>
      <Container>
        {schools && schools.length > 0 && schools.map(school => (
          <Row key={school.id} className="item-list">
            <Col
              key={school.id + "col1"}
              xs="9"
              className="item-list-left"
              onClick={() => handleSchoolClick(school)}>
              <h1>{school.nome}</h1>
              <p>{school.bairro}</p>
            </Col>
            <Col
              key={school.id + "col2"}
              className="item-list-right"
              onClick={() => handleRouteClick(school)}>
              <span><FontAwesomeIcon icon={faRoute} /></span>
            </Col>
          </Row>

        ))}
      </Container>
    </div>
  )
};

List.propTypes = {
  schools: PropTypes.array.isRequired,
  currentLocation: PropTypes.object,
  currentRoute: PropTypes.object,
  actions: PropTypes.object.isRequired,
};

function mapStateToProps(state) {
  return {
    schools: state.schools,
    currentLocation: state.currentLocation,
    currentSchool: state.currentSchool,
    currentRoute: state.currentRoute,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: {
      setCurrentSchool:
        bindActionCreators(currentSchoolsActions.setCurrentSchool, dispatch),
      setCurrentLocation:
        bindActionCreators(locationActions.setCurrentLocation, dispatch),
      setCurrentRoute:
        bindActionCreators(currentRouteActions.setCurrentRoute, dispatch)
    }
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(List);

