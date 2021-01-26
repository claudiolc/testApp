import './App.css';
import React, { SetStateAction, useEffect } from 'react';
import Table from 'react-bootstrap/Table';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import { ETIMEDOUT } from 'constants';
import { Form, Modal } from 'react-bootstrap';
import { JsonSourceFile } from 'typescript';

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
  const [currentRegistry, setCurrentRegistry] = React.useState<Person>({id: 0, name: 'null', email: 'null', treatment: 'null'});

  const handleClose = () => setEdition(false);
  const handleShow = (index: number) => {
    setCurrentRegistry(itemList[index])
    setEdition(true);
  }

  const mainUrl = "http://localhost:9000/";
  const indexUrl = mainUrl + "index";
  const editUrl = mainUrl + "edit"

  async function sendRequest() {
    const response = await fetch(editUrl, {
      method: 'POST', 
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json'
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: JSON.stringify(currentRegistry)
    });

    return response;
  }

  const handleSubmitChanges = () => {
    sendRequest()
    handleClose()
  }

  async function fetchJson() {
    return await fetch(indexUrl)
        .then(res => res.json());
  }

  async function callApi() {
    let json = await fetchJson()
        .then(res => res as Person[])
        .then(res => setItemList(res))
  }

  useEffect(() => {
    callApi()
  }, [])

  function onChangeCurrentRegistry<k extends keyof Person>(key: k, value: Person[k])  {
    setCurrentRegistry({...currentRegistry, [key]: value});
  }

  const dialog = (
    <Form id="editForm">
      <Modal show={edition} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Edit patient</Modal.Title>
        </Modal.Header>
    
        <Modal.Body>
        <Form.Group controlId="formID">
            <Form.Label>ID</Form.Label>
            <Form.Control type="number" placeholder="Enter ID" defaultValue={currentRegistry?.id}/>
          </Form.Group>
          <Form.Group controlId="formName">
            <Form.Label>Name</Form.Label>
            <Form.Control type="text"
              placeholder="Enter name"
              defaultValue={currentRegistry?.name}
              onChange={(event) => onChangeCurrentRegistry("name", event.target.value)} 
            />
          </Form.Group>
          <Form.Group controlId="formEmail">
            <Form.Label>Email</Form.Label>
            <Form.Control type="email" placeholder="Enter email" defaultValue={currentRegistry?.email}/>
          </Form.Group>
          <Form.Group controlId="formTreatment">
            <Form.Label>Treatment</Form.Label>
            <Form.Control as="textarea" placeholder="Enter treatment" rows={3} defaultValue={currentRegistry?.treatment}/>
          </Form.Group>
        </Modal.Body>
    
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>Close</Button>
          <Button variant="primary" type="submit" onClick={handleSubmitChanges}>
            Submit changes
          </Button>
          </Modal.Footer>
      </Modal>
    </Form>
  )

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
            
              {
              itemList.map((currentValue, index) => {
                return (
                  <>
                    <tr>
                      <td>{itemList[index] && itemList[index].id}</td>
                      <td>{itemList[index] && itemList[index].name}</td>
                      <td>{itemList[index] && itemList[index].email}</td>
                      <td>{itemList[index] && itemList[index].treatment}</td>
                      <td>
                        <ButtonGroup className="d-flex">
                          <Button variant="outline-primary" onClick={() => handleShow(index)}>Edit</Button>
                          <Button variant="outline-danger">Delete</Button>
                        </ButtonGroup>
                      </td>
                    </tr>
                  </>
                )
              })}
          </tbody>
        </Table>
        {dialog}
      </Container>

      
    </>
  );
}

export default App;