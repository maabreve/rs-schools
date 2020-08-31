import React, { useEffect, useState } from 'react';
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { faRoute } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { bindActionCreators } from "redux";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import ButtonGroup  from 'react-bootstrap/ButtonGroup';
import Button from 'react-bootstrap/Button';

import Search from './Search';
import Locate from './Locate';
import * as locationActions from "../redux/actions/currentLocationActions";
import * as currentSchoolsActions from "../redux/actions/currentSchoolActions";
import * as currentRouteActions from "../redux/actions/currentRouteActions";

const pageLimit = 7;
const List = ({
    schools,
    currentLocation,
    actions }) => {

  const [schoolList, setSchoolList] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [lastPage, setLastPage] = useState(1);

  useEffect(() => {
    const schoolsPaginated = paginateArray(schools, pageLimit, currentPage);
    setSchoolList(schoolsPaginated);
    setLastPage(Math.ceil(schools.length / pageLimit));
  }, [currentPage, schools]);

  const handleSearch = (value) => {
    actions.setCurrentLocation(value);
  }

  const clearSearch = () => {
    actions.setCurrentLocation(null);
  }

  const handleLocateClick = (location) => {
    actions.setCurrentLocation(location);
  }

  const handleSchoolClick = (school) => {
    actions.setCurrentSchool(school);
  }

  const handleRouteClick = (school) => {
    actions.setCurrentRoute(school);
  }

  const searchSchool = (e) => {
    e.preventDefault();
    const searchValue = e.target.value;
    if (searchValue.trim() !== "") {
     const filtered = schools.filter(s=>
        s.nome.toLowerCase().indexOf(searchValue.toLowerCase()) !== -1);

      const schoolsFilteredPaginated = paginateArray(filtered, pageLimit, 1);
      setCurrentPage(1);
      setSchoolList(schoolsFilteredPaginated);
    } else {
      const schoolsFilteredPaginated = paginateArray(schools, pageLimit, 1);
      setCurrentPage(1);
      setSchoolList(schoolsFilteredPaginated);
    }
  }

  const nextPage = (e) => {
    const schoolsPaginated = paginateArray(schoolList, pageLimit, currentPage + 1);
    setCurrentPage(currentPage + 1);
    setSchoolList(schoolsPaginated)
  }

  const previousPage = (e) => {
    const schoolsPaginated = paginateArray(schoolList, pageLimit, currentPage - 1);

    setCurrentPage(currentPage - 1);
    setSchoolList(schoolsPaginated)
  }


  const paginateArray = (array, limit, page) =>  {
    return array.slice((page - 1) * limit, page * limit);
  }

  return (
    <div>
      <div className="px-15">
        <Search
          handleSearch={handleSearch}
          clearSearch={clearSearch} />
        <input
          type="text"
          placeholder="Pesquisar escola"
          className="mt-15"
          onChange={searchSchool} />
        <Locate handleLocateClick={handleLocateClick} />
      </div>
      <Container>
        {schoolList && schoolList.length > 0 && schoolList.map(school => (
          <Row key={school.id} className="item-list">
            <Col
              key={school.id + "col1"}
              xs="9"
              className="item-list-left"
              onClick={() => handleSchoolClick(school)}>
              <h1>{school.nome}</h1>
              <p>{school.bairro}</p>
            </Col>
            {currentLocation &&
              <Col
                key={school.id + "col2"}
                className="item-list-right"
                onClick={() => handleRouteClick(school)}>
                <span><FontAwesomeIcon icon={faRoute} /></span>
              </Col>
            }
          </Row>
        ))}
      </Container>
      <div className="text-center mb-15">
        <Button disabled={currentPage === 1} onClick={previousPage}>
            Página Anterior
        </Button>
        {" "}
        <Button disabled={currentPage === lastPage} onClick={nextPage}>Próxima Página</Button>
      </div>
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
        bindActionCreators(currentRouteActions.setCurrentRoute, dispatch),
    }
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(List);

