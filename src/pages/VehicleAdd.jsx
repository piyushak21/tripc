import React from "react";
import { Container } from "react-bootstrap";
import { Link } from "react-router-dom";

import { BsArrowLeft } from "react-icons/bs";

const VehicleAdd = () => {
  return (
    <Container className="my-5">
      <div className="row justify-content-center">
        <div className="col-md-8">
          <div className="card border-0 shadow p-4">
            <div className="card-body">
              <Link to="/vehicles">
                <BsArrowLeft /> <small>Vehicles</small>
              </Link>
              <h4 className="my-4">Add Vehicle</h4>
              <form action="">
                <div className="row">
                  <div className="col-md-6 mb-3">
                    <label htmlFor="">Vehicle Name</label>
                    <input
                      type="text"
                      className="form-control"
                      name="vehicle_name"
                      id=""
                    />
                  </div>
                  <div className="col-md-6 mb-3">
                    <label htmlFor="">Registration Number</label>
                    <input
                      type="text"
                      className="form-control"
                      name="registration_no"
                    />
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-6 mb-3">
                    <label htmlFor="">Select ECU</label>
                    <select name="ecu" id="" className="form-control">
                      <option value="">- Select -</option>
                      <option value="">EC0155A</option>
                      <option value="">EC0205A</option>
                      <option value="">EC0207A</option>
                    </select>
                  </div>
                  <div className="col-md-6 mb-3">
                    <label htmlFor="">Select IoT</label>
                    <select name="ecu" id="" className="form-control">
                      <option value="">- Select -</option>
                      <option value="">FC0155A</option>
                      <option value="">FC0205A</option>
                      <option value="">FC0207A</option>
                    </select>
                  </div>
                  <div className="col-md-6 mb-3">
                    <label htmlFor="">Select Feature Set</label>
                    <select name="ecu" id="" className="form-control">
                      <option value="">- Select -</option>
                      <option value="">Feature set 1</option>
                      <option value="">Feature set 2</option>
                      <option value="">Feature set 3</option>
                    </select>
                  </div>
                </div>

                <button className="btn btn-primary w-100">Submit</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default VehicleAdd;
