import React, { useState } from "react";
import { Link } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
// import Button from 'react-bootstrap/Button';
import Offcanvas from "react-bootstrap/Offcanvas";
import "../assets/css/topnav.css";

import {
  BsFillGrid3X3GapFill,
  BsFillBellFill,
  BsFillHouseFill,
  BsColumnsGap,
  BsFillCpuFill,
  BsFilePerson,
  BsTruck,
  BsPinMapFill,
  BsPersonFill,
  BsExclamationCircle,
  BsFillFileFill,
  BsPaypal,
  BsFillGeoFill,
  BsFillFilePdfFill,
} from "react-icons/bs";

import logo from "../assets/img/logo.png";

function Topnav() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Navbar bg="white" expand="lg" className="topnav">
        <Container fluid>
          <Navbar.Brand>
            <Link to="/">
              <img src={logo} alt="" className="logo" />
            </Link>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
              <Nav.Link to="/" className="mx-2">
                <span className="h5 top-icon">
                  <BsFillHouseFill />
                </span>
              </Nav.Link>
              <Nav.Link href="#link" className="mx-2">
                <span className="h5 top-icon">
                  <BsFillBellFill />
                </span>
              </Nav.Link>
              <Nav.Link onClick={handleShow} className="ms-2">
                <span className="h5 top-icon">
                  <BsFillGrid3X3GapFill />
                </span>
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <Offcanvas show={show} onHide={handleClose} placement="end">
        <Offcanvas.Body>
          <div className="d-flex nav-container">
            <Link to="/">
              <div className="nav-box">
                <span className="h2">
                  <BsColumnsGap />
                </span>
                <p className="mt-2">
                  <small>Dashboard</small>
                </p>
              </div>
            </Link>
            <div className="nav-box">
              <span className="h2">
                <BsFillCpuFill />
              </span>
              <p className="mt-2">
                <small>Devices</small>
              </p>
            </div>
            <div className="nav-box">
              <span className="h2">
                <BsFilePerson />
              </span>
              <p className="mt-2">
                <small>Drivers</small>
              </p>
            </div>
            <Link to="/vehicles">
              <div className="nav-box">
                <span className="h2">
                  <BsTruck />
                </span>
                <p className="mt-2">
                  <small>Vehicles</small>
                </p>
              </div>
            </Link>
            <Link to="/completed-trips">
              <div className="nav-box">
                <span className="h2">
                  <BsPinMapFill />
                </span>
                <p className="mt-2">
                  <small>Trips</small>
                </p>
              </div>
            </Link>
            <div className="nav-box">
              <span className="h2">
                <BsPersonFill />
              </span>
              <p className="mt-2">
                <small>Contacts</small>
              </p>
            </div>
            <div className="nav-box">
              <span className="h2">
                <BsExclamationCircle />
              </span>
              <p className="mt-2">
                <small>Alert Triggers</small>
              </p>
            </div>
            <div className="nav-box">
              <span className="h2">
                <BsFillGeoFill />
              </span>
              <p className="mt-2">
                <small>Geofencing</small>
              </p>
            </div>
            <div className="nav-box">
              <span className="h2">
                <BsFillFilePdfFill />
              </span>
              <p className="mt-2">
                <small>Reports</small>
              </p>
            </div>
            <div className="nav-box">
              <span className="h2">
                <BsFillFileFill />
              </span>
              <p className="mt-2">
                <small>RFID</small>
              </p>
            </div>
            <div className="nav-box">
              <span className="h2">
                <BsPaypal />
              </span>
              <p className="mt-2">
                <small>Payment</small>
              </p>
            </div>
          </div>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
}

export default Topnav;
