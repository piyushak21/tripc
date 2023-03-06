import axios from "axios";
import React, { useState, useEffect } from "react";
import { Container, Table, Badge } from "react-bootstrap";
import { Link } from "react-router-dom";
import { AiFillEdit, AiFillEye } from "react-icons/ai";

const Vehicles = () => {
  const [vehicles, setVehicles] = useState([]);
  useEffect(() => {
    axios
      .get("/vehicles/getAllVehicles")
      .then((res) => {
        setVehicles(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <Container>
      <div className="d-flex justify-content-between my-4">
        <div>
          <h4>Vehicles</h4>
          <span className="me-2">Total: {vehicles.length}</span>
        </div>
        <div>
          <Link to="/vehicles/add-vehicle">
            <button className="btn btn-dark">Add New</button>
          </Link>
        </div>
      </div>

      <div className="card mb-4 border-0 shadow">
        <div className="card-body">
          {/* List of vehicles */}
          <Table striped hover>
            <thead>
              <tr>
                <th>#</th>
                <th>Vehicle Name</th>
                <th>Registration Number</th>
                <th>Status</th>
                <th>Created Date</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {vehicles?.map((el, index) => {
                return (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{el.vehicle_name}</td>
                    <td>{el.vehicle_registration}</td>
                    <td>
                      {el.status === 1 ? (
                        <Badge bg="success">Active</Badge>
                      ) : (
                        <Badge bg="danger">Deactive</Badge>
                      )}
                    </td>
                    <td>{el.created_at}</td>
                    <td>
                      <span>
                        <small>
                          <Link
                            to={`/editvehicle/${el.vehicle_id}`}
                            className="text-decnone"
                          >
                            <AiFillEdit
                              size={18}
                              className="text-primary mx-2 h4"
                            />
                          </Link>

                          <Link to={`/vehiclecard/${el.vehicle_id}`}>
                            <AiFillEye className="h5 text-success" />
                          </Link>
                        </small>
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </Table>
        </div>
      </div>
    </Container>
  );
};

export default Vehicles;
