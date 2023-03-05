import React, {useState} from 'react'
import { Container, Table, Modal, Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { BsTruck, BsArrowLeft} from 'react-icons/bs'
import JSONInput from 'react-json-editor-ajrm';
import locale    from 'react-json-editor-ajrm/locale/en';

const VehicleView = () => {
    const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <Container className='my-5'>
        <Link to="/vehicles"><BsArrowLeft /> <small>Vehicles</small></Link>
        <div className="row mt-3">
            <div className="col-md-6">
                <div className="card">
                    <div className="card-body">
                        <div className='d-flex'>
                            <div className="px-4 align-self-center">
                                <span className='h1'>
                                    <BsTruck />
                                </span>
                            </div>
                            <div className="px-4">
                                <h5>Toyota Bengluru</h5>
                                <p className='mb-0'><strong>Registration Number:</strong> TL 021 H 3292</p>
                                <p className=''><strong>ECU:</strong> EC0155A | <strong>IoT:</strong> FC0155A</p>
                                <button className='btn btn-info btn-sm' onClick={handleShow}>Feature set</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <Modal show={show} onHide={handleClose} size="lg">
            <Modal.Header closeButton>
                <Modal.Title>Feature Set</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <JSONInput
                    id          = 'a_unique_id'
                    locale      = { locale }
                    height      = '400px'
                    width='100%'
                />
            </Modal.Body>
            <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
                Cancel
            </Button>
            <Button variant="primary" onClick={handleClose}>
                Save & Update
            </Button>
            </Modal.Footer>
        </Modal>

        <div className="mt-4">
            <div className="d-flex justify-content-between my-3">
                <h4>Toyota Bengluru Trips</h4>
                <p>Total: 05</p>
            </div>
            <Table striped hover>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Vehicle Name</th>
                        <th>Registration Number</th>
                        <th>Trip Start</th>
                        <th>Trip End</th>
                        <th>Distance Travelled (KM)</th>
                        <th>Duration</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>1</td>
                        <td>Toyota Bengluru</td>
                        <td>TL 021 H 3292</td>
                        <td>24-01-2023 15:02:23</td>
                        <td>24-01-2023 17:04:23</td>
                        <td>65</td>
                        <td>2 Hrs 2 mins</td>
                        <td>
                            <span className='text-primary'>
                                <small>
                                    <Link to="/vehicles/vehicle-view/">View</Link>
                                </small>
                            </span>
                        </td>
                    </tr>
                    <tr>
                        <td>1</td>
                        <td>Toyota Bengluru</td>
                        <td>TL 021 H 3292</td>
                        <td>24-01-2023 15:02:23</td>
                        <td>24-01-2023 17:04:23</td>
                        <td>65</td>
                        <td>2 Hrs 2 mins</td>
                        <td>
                            <span className='text-primary'>
                                <small>
                                    <Link to="/vehicles/vehicle-view/">View</Link>
                                </small>
                            </span>
                        </td>
                    </tr>
                    <tr>
                        <td>1</td>
                        <td>Toyota Bengluru</td>
                        <td>TL 021 H 3292</td>
                        <td>24-01-2023 15:02:23</td>
                        <td>24-01-2023 17:04:23</td>
                        <td>65</td>
                        <td>2 Hrs 2 mins</td>
                        <td>
                            <span className='text-primary'>
                                <small>
                                    <Link to="/vehicles/vehicle-view/">View</Link>
                                </small>
                            </span>
                        </td>
                    </tr>
                    <tr>
                        <td>1</td>
                        <td>Toyota Bengluru</td>
                        <td>TL 021 H 3292</td>
                        <td>24-01-2023 15:02:23</td>
                        <td>24-01-2023 17:04:23</td>
                        <td>65</td>
                        <td>2 Hrs 2 mins</td>
                        <td>
                            <span className='text-primary'>
                                <small>
                                    <Link to="/vehicles/vehicle-view/">View</Link>
                                </small>
                            </span>
                        </td>
                    </tr>
                    <tr>
                        <td>1</td>
                        <td>Toyota Bengluru</td>
                        <td>TL 021 H 3292</td>
                        <td>24-01-2023 15:02:23</td>
                        <td>24-01-2023 17:04:23</td>
                        <td>65</td>
                        <td>2 Hrs 2 mins</td>
                        <td>
                            <span className='text-primary'>
                                <small>
                                    <Link to="/vehicles/vehicle-view/">View</Link>
                                </small>
                            </span>
                        </td>
                    </tr>
                </tbody>
            </Table>
        </div>
    </Container>
  )
}

export default VehicleView