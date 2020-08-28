import React, {useEffect} from 'react';
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { bindActionCreators } from "redux";

import Search from './Search';
import Locate from './Locate';
import ListGroup from 'react-bootstrap/ListGroup';
import * as schoolsActions from "../redux/actions/schoolsActions";
import * as locationActions from "../redux/actions/currentLocationActions";
import * as currentSchoolsActions from "../redux/actions/curentSchoolActions";

const List = ({schools, currentLocation, currentSchool, actions}) => {
  useEffect(() => {
  //  console.log('List.js current location', currentLocation)
  }, [currentLocation, currentSchool]);

  const handleSearch = (value) => {
    actions.setLocation(value)
  }

  const handleListItemClick = (school) => {
    actions.setCurrentSchool(school)
  }

  return (
    <div>
      <div className="px-15">
        <Search handleSearch={handleSearch} />
        <Locate />
      </div>
      <div>
        <ListGroup>
          { schools && schools.length > 0 && schools.map(school =>
            (<ListGroup.Item key={school.ID} action onClick={() => handleListItemClick(school)}>
                {school.nome}
            </ListGroup.Item>)
          )}
        </ListGroup>
        </div>
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
      setCurrentSchool: bindActionCreators(currentSchoolsActions.setCurrentSchool, dispatch),
      setLocation: bindActionCreators(locationActions.setLocation, dispatch),
    }
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(List);

