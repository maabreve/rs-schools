import React, {useEffect} from 'react';
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { bindActionCreators } from "redux";

import Search from './Search';
import Locate from './Locate';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import * as schoolsActions from "../redux/actions/schoolsActions";
import * as locationActions from "../redux/actions/currentLocationActions";
import * as currentSchoolsActions from "../redux/actions/currentSchoolActions";
import { faRoute } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const List = ({schools, currentLocation, currentSchool, actions}) => {
  useEffect(() => {
  //  console.log('List.js current location', currentLocation)
  }, [currentLocation, currentSchool]);

  const handleListItemClick = (school) => {
    actions.setCurrentSchool(school)
  }

  const handleSearch = (value) => {
    actions.setCurrentLocation(value)
  }

  const handleLocateClick = (location) => {
    actions.setCurrentLocation(location)
  }

  return (
    <div>
      <div className="px-15">
        <Search handleSearch={handleSearch} />
        <Locate handleLocateClick={handleLocateClick} />
      </div>
        <Container>
        { schools && schools.length > 0 && schools.map(school => (
            <Row key={school.ID} className="item-list">
              <Col
                key={school.ID + "col1"}
                xs="9"
                className="item-list-left"
                onClick={() => handleListItemClick(school)}>
                  {school.nome}
              </Col>
              <Col
                key={school.ID + "col2"}
                className="item-list-right">
                  <span><FontAwesomeIcon icon={faRoute}/></span>
              </Col>
            </Row>

        ))}
        </Container>
    </div>
  )
};

List.propTypes = {
  schools: PropTypes.array.isRequired,
  currentLocation: PropTypes.object.isRequired,
  actions: PropTypes.object.isRequired,
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
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: {
      loadSchools: bindActionCreators(schoolsActions.loadSchools, dispatch),
      setCurrentSchool:
        bindActionCreators(currentSchoolsActions.setCurrentSchool, dispatch),
      setCurrentLocation:
        bindActionCreators(locationActions.setCurrentLocation, dispatch),
    }
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(List);

