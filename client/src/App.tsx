import './App.css';
import React, { SetStateAction, useEffect } from 'react';
import Table from 'react-bootstrap/Table';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import { ETIMEDOUT } from 'constants';

// const state = {listItem: []};

interface Person {
  id: number;
  name: string;
  email: string;
  treatment: string;  
}

function App() {
  const [itemList, setItemList] = React.useState<Person[]>([])
  const [edition, setEdition] = React.useState<Boolean>(false)

  function callApi() {
    return fetch("http://localhost:9000")
        .then(res => res.json())
        .then(res => res as Person[])
        .then(res => setItemList(res))
  }

  useEffect(() => {
    callApi()
  }, [])

  function toggleEdition() {
    setEdition(!edition)
  }

  return (
  <>
    <Container className="mt-5">
      <Button variant="success" className="mb-3">New registry</Button>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Treatment</th>
            <th>Actions</th>
            
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{itemList[0] && itemList[0].id}</td>
            <td>{itemList[0] && itemList[0].name}</td>
            <td>{itemList[0] && itemList[0].email}</td>
            <td>{itemList[0] && itemList[0].treatment}</td>
            <td>
              <ButtonGroup className="d-flex">
                <Button variant="outline-primary">Edit</Button>
                <Button variant="outline-danger">Delete</Button>
              </ButtonGroup>
            </td>
          </tr>
        </tbody>
      </Table>
    </Container>
  </>

  );
}

export default App;