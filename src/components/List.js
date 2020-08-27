import React from 'react';
import Search from './Search';
import Locate from './Locate';
import ListGroup from 'react-bootstrap/ListGroup';

const List = ({schools}) => (
  <div>
    <div className="px-15">
      <Search />
      <Locate />
    </div>
    <div>
      <ListGroup>
        { schools && schools.length > 0 && schools.map(school =>
          (<ListGroup.Item key={school.ID} action>{school.nome}</ListGroup.Item>)
        )}
      </ListGroup>
      </div>
  </div>
);

export default List;


