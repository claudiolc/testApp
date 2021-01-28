import './App.css';
import React, { useEffect } from 'react';
import Table from 'react-bootstrap/Table';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import { Alert, Form, Modal } from 'react-bootstrap';
import { appContainer } from './inversify.config';
import { Model } from './entities';
import { Person } from './interfaces';

function App() {
  const model = appContainer.get(Model)
  const defaultRegistry = {id: undefined, name: '', email: '', treatment: ''};

  const [itemList, setItemList] = React.useState<Person[]>([]);
  const [update, setUpdate] = React.useState<Boolean>(false);
  const [currentRegistry, setCurrentRegistry] = React.useState<Person>(defaultRegistry);
  const [updateCount, setUpdateCount] = React.useState<number>(0);
  const [newRegistry, setNewRegistry] = React.useState<Boolean>(false);
  const [showAlert, setShowAlert] = React.useState<boolean>(false);
  const [operationSuccessful, setOperationSuccessful] = React.useState<boolean>(true);

  const ALERT_DELAY = 3000;


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

  async function handleSubmitChanges() {
    if(!newRegistry)
      // model.sendUpdateRequest(currentRegistry).then((res) => {
      //   console.log('res')
      //   triggerAlertBox(res.ok)
      // })
      model.sendUpdateRequest(currentRegistry).then(() => 
        console.log('res')
      )
    else
      model.sendCreateRequest(currentRegistry).then(res => triggerAlertBox(res.ok))

    handleCloseDialog()
    setUpdateCount(updateCount + 1)
  }

  const handleDeletition = (index: number) => {
    let success: boolean;
    model.sendDeleteRequest(itemList[index]).then(res => triggerAlertBox(res.ok))
    setUpdateCount(updateCount + 1)
    handleCloseDialog();
  }

  useEffect(() => {
    model.callApi().then(data => {
      setItemList(data)
      console.log('FETCHING...')            
    });
  }, [updateCount])

  function onChangeCurrentRegistry<k extends keyof Person>(key: k, value: Person[k])  {
    setCurrentRegistry({...currentRegistry, [key]: value});
  }

  const dialog = (
    <Form id="inputForm">
      <Modal show={update} onHide={handleCloseDialog}>
        <Modal.Header closeButton>
          <Modal.Title>{newRegistry ? 'Create' : 'Update'} patient</Modal.Title>
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

  const alertBox = (
     <Alert show={showAlert} variant={operationSuccessful ? 'success' : 'danger'} className="d-flex">
      <p className="m-auto">{operationSuccessful ? 'Operation done successfuly' : "The operation couldn't be completed"}</p>
    </Alert>
  );

  function triggerAlertBox(success: boolean) {
    setOperationSuccessful(success);
    setShowAlert(true);
    setTimeout(() => {
      setShowAlert(false)
    }, ALERT_DELAY);
  }

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
        {alertBox}
      </Container>

      
    </>
  );
}

export default App;