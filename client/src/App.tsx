import './App.css';
import React, { SetStateAction, useEffect } from 'react';
import Table from 'react-bootstrap/Table';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import { ETIMEDOUT } from 'constants';
import { Form, Modal } from 'react-bootstrap';
import { JsonSourceFile } from 'typescript';

interface Person {
  id: number | undefined;
  name: string;
  email: string;
  treatment: string;  
}


function App() {
  const defaultRegistry = {id: undefined, name: '', email: '', treatment: ''};

  const [itemList, setItemList] = React.useState<Person[]>([]);
  const [update, setUpdate] = React.useState<Boolean>(false);
  const [currentRegistry, setCurrentRegistry] = React.useState<Person>(defaultRegistry);
  const [updateCount, setUpdateCount] = React.useState<number>(0);
  const [newRegistry, setNewRegistry] = React.useState<Boolean>(false);

  const handleCloseDialog = () => {
    setUpdate(false);
    setNewRegistry(false);
  }

  const handleShowDialog = (index: number = -1) => {
    if (!newRegistry)
      if (index !== -1)
        setCurrentRegistry(itemList[index])
    else
      setCurrentRegistry(defaultRegistry)

    setUpdate(true)
  }

  const handleNewRegistry = () => {
    setNewRegistry(true)
    handleShowDialog()
  }

  const mainUrl = "http://localhost:9000/";
  const indexUrl = mainUrl + "index";
  const updateUrl = mainUrl + "update";
  const createUrl = mainUrl + "create";
  const deleteUrl = mainUrl + "delete";
  

  async function sendUpdateRequest() {
    const response = await fetch(updateUrl, {
      method: 'POST', 
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(currentRegistry)
    });

    return response;
  }

  async function sendCreateRequest() {
    const response = await fetch(createUrl, {
      method: 'POST', 
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(currentRegistry)
    });

    return response;
  }

  async function sendDeleteRequest(patient: Person) {
    const response = await fetch(deleteUrl, {
      method: 'POST', 
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(patient)
    });

    return response;
  }

  const handleSubmitChanges = () => {
    if(!newRegistry)
      sendUpdateRequest()
    else
      sendCreateRequest()

    handleCloseDialog()
    setUpdateCount(updateCount + 1)
  }

  const handleDeletition = (index: number) => {
    sendDeleteRequest(itemList[index])
    handleCloseDialog()
    setUpdateCount(updateCount + 1)
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
  }, [updateCount])

  function onChangeCurrentRegistry<k extends keyof Person>(key: k, value: Person[k])  {
    setCurrentRegistry({...currentRegistry, [key]: value});
  }

  const dialog = (
    <Form id="inputForm">
      <Modal show={update} onHide={handleCloseDialog}>
        <Modal.Header closeButton>
          <Modal.Title>Update patient</Modal.Title>
        </Modal.Header>
    
        <Modal.Body>
          <Form.Group controlId="formID">
            <Form.Label>ID</Form.Label>
            <Form.Control 
              type="number"
              placeholder="Enter ID"
              defaultValue={currentRegistry?.id}
              onChange={(event) => onChangeCurrentRegistry("id", +event.target.value)}
              disabled={!newRegistry}
            />
          </Form.Group>

          <Form.Group controlId="formName">
            <Form.Label>Name</Form.Label>
            <Form.Control 
              type="text"
              placeholder="Enter name"
              defaultValue={currentRegistry?.name}
              onChange={(event) => onChangeCurrentRegistry("name", event.target.value)} 
            />
          </Form.Group>

          <Form.Group controlId="formEmail">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              defaultValue={currentRegistry?.email}
              onChange={(event) => onChangeCurrentRegistry("email", event.target.value)} 
            />
          </Form.Group>

          <Form.Group controlId="formTreatment">
            <Form.Label>Treatment</Form.Label>
            <Form.Control 
              as="textarea" 
              placeholder="Enter treatment"
              rows={3}
              defaultValue={currentRegistry?.treatment}
              onChange={(event) => onChangeCurrentRegistry("treatment", event.target.value)} 
            />
          </Form.Group>
        </Modal.Body>
    
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseDialog}>Close</Button>
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
        <Button
          variant="success"
          className="mb-3"
          onClick={handleNewRegistry}
        >
          New registry
        </Button>
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
                        {itemList[index] &&
                          <>
                            <td> {itemList[index].id}</td>
                            <td> {itemList[index].name}</td>
                            <td> {itemList[index].email}</td>
                            <td> {itemList[index].treatment}</td>
                            <td>
                              <ButtonGroup className="d-flex">
                                <Button variant="outline-primary" onClick={() => handleShowDialog(index)}>Edit</Button>
                                <Button variant="outline-danger" onClick={() => handleDeletition(index)}>Delete</Button>
                              </ButtonGroup>
                            </td>
                          </>
                        }
                      </tr>
                    </>
                  )
                })
              }
          </tbody>
        </Table>
        {dialog}
      </Container>

      
    </>
  );
}

export default App;