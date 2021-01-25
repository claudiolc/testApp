import logo from './logo.svg';
import './App.css';
import React from 'react';
import Table from 'react-bootstrap/Table';

const state = {listItems: []};

function App() {
  const [listItems, setListItems] = React.useState([])

  function callAPI() {
    return fetch("http://localhost:9000")
        .then(res => res.json())
        .then(res => {
          res.map((patient: any) => console.log(patient))
        })
  }

  callAPI();

  return (
  <>
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>ID</th>
          <th>Name</th>
          <th>Email</th>
          <th>Treatment</th>
        </tr>
      </thead>
      <tbody>
        {listItems.map((value, index) => {
          return (
            <tr>
              <td>{index}</td>
              {/* <td>{value.name}</td>
              <td>{value.email}</td>
              <td>{value.treatment}</td> */}
            </tr>
          )
        })}
      </tbody>
    </Table>
    <p>s</p>
  </>

  );
}

export default App;