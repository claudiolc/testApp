import logo from './logo.svg';
import './App.css';
import React from 'react';
import Table from 'react-bootstrap/Table';

const state = {listItems: []};

function App() {
  const [listItems, setListItems] = React.useState([])

  function callAPI() {
    return fetch("http://localhost:9000/patients")
        .then(res => res.json())
        // .then(res => setListItems(res.map(row =>
        //   <tr>
        //     <td>{row.id}</td>
        //     <td>{row.name}</td>
        //     <td>{row.email}</td>
        //     <td>{row.treatment}</td>
        //   </tr>
        // )));
        .then(res => {
          res.map(patient => console.log(patient))
        })
  }

  callAPI();

  return (
    // <div className="App">
    //   <header className="App-header">
    //     <img src={logo} className="App-logo" alt="logo" />
    //     <p>
    //       {apiResponse}
    //     </p>
    //     <a
    //       className="App-link"
    //       href="https://reactjs.org"
    //       target="_blank"
    //       rel="noopener noreferrer"
    //     >
    //       Learn React
    //     </a>
    //   </header>
    // </div>
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
        {/* {state.listItems} */}
      </tbody>
    </Table>
  </>

  );
}

export default App;
