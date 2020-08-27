import React from 'react';
import Navbar from 'react-bootstrap/Navbar';

const Toolbar = ({title}) => (
  <Navbar bg="dark" variant="dark">
    <Navbar.Brand href="#home">{title}</Navbar.Brand>
  </Navbar>
)

export default Toolbar;