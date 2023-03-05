import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import {
  GoogleMap,
  InfoWindow,
  LoadScript,
  Marker,
  Polyline,
} from "@react-google-maps/api";
import { Link } from "react-router-dom";
import { Container, Tabs, Tab, ListGroup, Badge, Form } from "react-bootstrap";
import { BsPinMapFill, BsArrowLeft } from "react-icons/bs";
import car from "../assets/icons/liveIcon.svg";

const OngoingTripView = () => {
  let { id } = useParams();
  const [path, setPath] = useState([]);
  const [tripData, setTripData] = useState([]);
  const [center, setCenter] = useState({});
  const [startPoint, setStartPoint] = useState({});
  const [startAddress, setStartAddress] = useState("");
  const [endPoint, setEndPoint] = useState({});
  const [startTime, setStartTime] = useState();
  const [lastTime, setLastTime] = useState();
  const [endAddress, setEndAddress] = useState("");
  const [distance, setDistance] = useState("");
  const [duration, setDuration] = useState("");
  const [maxSpd, setMaxSpd] = useState("");
  const [durationInSec, setDurationInSec] = useState();
  const [avgSpd, setAvgSpd] = useState();
  const [spdData, setSpdData] = useState([]);
  const [vehicle, setVehicle] = useState([]);

  useEffect(() => {
    setInterval(() => {
      const fetchData = (async) => {
        axios.get(`/ongoingTrip/getOngoingTripdataById/${id}`).then((res) => {
          console.log(res.data);
          // Set trip data
          setTripData(res.data);

          const dataLength = res.data.length - 1;

          // Set Map center
          setCenter({
            lat: parseFloat(res.data[dataLength].lat),
            lng: parseFloat(res.data[dataLength].lng),
          });

          // Set start point
          setStartPoint({
            lat: parseFloat(res.data[0].lat),
            lng: parseFloat(res.data[0].lng),
          });

          // Set path
          setPath(
            res.data.map((location) => ({
              lat: parseFloat(location.lat),
              lng: parseFloat(location.lng),
            }))
          );

          // Set end point

          setEndPoint({
            lat: parseFloat(res.data[dataLength].lat),
            lng: parseFloat(res.data[dataLength].lng),
          });

          // Set Start time
          let sttime = res.data[0].timestamp;
          let updateStTime = new Date(sttime * 1000);
          setStartTime(updateStTime.toLocaleString());

          // Set Last time
          let edtime = res.data[dataLength].timestamp;
          setLastTime(edtime);

          // Set the duration
          let difference = edtime - sttime;
          setDurationInSec(difference); // this is use for calculate the avg speed

          let hours = Math.floor(difference / 3600);
          difference = difference % 3600;

          let minutes = Math.floor(difference / 60);
          difference = difference % 60;
          let seconds = difference;
          if (hours > 0) {
            setDuration(
              hours + " hours " + minutes + " Mins " + seconds + " Sec"
            );
          } else {
            setDuration(minutes + " Mins " + seconds + " Sec");
          }

          // Calculate average speed
          setSpdData(res.data.map((speed) => speed.spd));
        });
      };
      fetchData();
    }, 5000);
  }, []);

  // Set Address
  useEffect(() => {
    if (tripData.length > 0 && startPoint !== "" && endPoint !== "") {
      const getAddress = async (lat, lng, setAddress) => {
        const response = await fetch(
          `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=AIzaSyB3W_lCZn6WX-bJsVp0ar7Q0KJboGsKnPk`
        );
        const data = await response.json();
        setAddress(data.results[0].formatted_address);
      };

      getAddress(startPoint.lat, startPoint.lng, setStartAddress);
      getAddress(endPoint.lat, endPoint.lng, setEndAddress);
    }
  }, [tripData]);

  // Set total distance
  useEffect(() => {
    if (tripData.length > 0) {
      let distancefunc = (lat1, lng1, lat2, lng2) => {
        let R = 6371;
        let dLat = 0.0174533 * (lat1 - lat2);
        let dLng = 0.0174533 * (lng1 - lng2);
        let a =
          Math.sin(dLat / 2) * Math.sin(dLat / 2) +
          Math.cos(0.0174533 * lat1) *
            Math.cos(0.0174533 * lat2) *
            Math.sin(dLng / 2) *
            Math.sin(dLng / 2);

        let c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        let d = R * c;
        return d;
      };
      let sum = 0;
      for (let i = 0; i < path.length - 1; i++) {
        sum =
          sum +
          distancefunc(
            path[i].lat,
            path[i].lng,
            path[i + 1].lat,
            path[i + 1].lng
          );
      }
      setDistance(sum.toFixed(2));
    }
  }, [tripData]);

  // Set Maximum Speed
  useEffect(() => {
    if (tripData.length > 0) {
      const maxFloat = Math.max(...spdData);
      setMaxSpd(Math.round(maxFloat));
    }
  }, [tripData]);

  // Set Average Speed
  useEffect(() => {
    if (tripData.length > 0 && distance > 0 && durationInSec > 0) {
      const distanceInKM = parseFloat(distance);
      const distanceInMeter = distanceInKM * 1000; // meters
      const time = parseFloat(durationInSec); // seconds
      const averageSpeed = distanceInMeter / time; // meters per second
      //   console.log(averageSpeed / 1000);

      setAvgSpd(Math.round(averageSpeed));
    }
  }, [tripData, distance, durationInSec]);

  // Set vehicle data
  useEffect(() => {
    if (tripData.length > 0) {
      axios.get(`/vehicles/getVehicleByTripId/${id}`).then((res) => {
        setVehicle(res.data[0]);
      });
    }
  }, [tripData]);

  // Check the time difference for trip end logic
  useEffect(() => {
    if (tripData.length > 0 && lastTime > 0) {
      const currentTime = Math.floor(+new Date() / 1000);
      const timeDiff = currentTime - lastTime;
      const timeDiffInMin = timeDiff / 60;

      if (timeDiffInMin > 3) {
        let values = {
          source: startAddress,
          destination: endAddress,
          trip_end_time: lastTime,
          total_distance: distance,
          duration: duration,
          avg_spd: avgSpd,
          max_spd: maxSpd,
          trip_status: 1,
        };

        endTrip(values);
      } else {
        console.log("data is coming");
      }
    }
  }, [tripData]);

  // End trip
  const endTrip = (params) => {
    axios
      .put(`/ongoingTrip/endTripById/${id}`, params)
      .then((res) => {
        if (res.status === 200) {
          console.log("Trip end");
          clearInterval();
        } else {
          console.log("trip end error");
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // Customized Icon
  const liveIcon = {
    url: car,
  };
  const start = {
    url: "http://maps.google.com/mapfiles/ms/icons/green-dot.png",
  };

  return (
    <>
      <Container className="my-3">
        <Link to="/ongoing-trips">
          <BsArrowLeft /> <small>Ongoing Trip list</small>
        </Link>
        <div className="mb-3">
          <h4>{vehicle.vehicle_name} Ongoing Trip</h4>
        </div>

        {/* Google Map */}
        <LoadScript googleMapsApiKey="AIzaSyB3W_lCZn6WX-bJsVp0ar7Q0KJboGsKnPk">
          <GoogleMap
            mapContainerClassName="map-container"
            center={center}
            zoom={14}
          >
            <Marker position={startPoint} icon={start} className="liveIcon" />
            <Polyline path={path} />
            <Marker position={endPoint} icon={liveIcon} />
          </GoogleMap>
        </LoadScript>

        {/* Content Tabs */}
        <div className="my-3">
          <Tabs
            defaultActiveKey="summary"
            id="justify-tab-example"
            className="mb-3"
            justify
          >
            {/* Trip summary tab */}
            <Tab eventKey="summary" title="Trip Summary">
              <div className="row">
                <div className="col-md-4">
                  <div className="d-flex my-3">
                    <div className="text-center">
                      <span className="h2 text-muted">
                        <BsPinMapFill className="text-success" />
                      </span>
                    </div>
                    <div className="px-4">
                      <p className="mb-0 text-muted">
                        <small>
                          <em>Source</em>
                        </small>
                      </p>
                      <p className="mb-0">{startAddress}</p>
                      <span>
                        <small>
                          <strong>{startTime}</strong>
                        </small>
                      </span>
                    </div>
                  </div>
                  <hr />
                  <div className="d-flex my-3">
                    <div className="text-center">
                      <span className="h2 text-muted">
                        <BsPinMapFill className="text-warning" />
                      </span>
                    </div>
                    <div className="px-4">
                      <p className="mb-0 text-muted">
                        <small>
                          <em>Current Location</em>
                        </small>
                      </p>
                      <p className="mb-0">{endAddress}</p>
                      <span>
                        {/* <small><strong>{endTime}</strong></small> */}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="col-md-8">
                  <div className="card">
                    <div className="card-header">
                      <strong>Trip Ananlytics</strong>
                    </div>
                    <div className="card-body">
                      <div className="row">
                        <div className="col-sm-3 mb-3">
                          <p className="mb-0">
                            <strong>Total Distance</strong>
                          </p>
                          {/* <p>{distance} KM</p> */}
                        </div>
                        <div className="col-sm-3 mb-3">
                          <p className="mb-0">
                            <strong>Travelled Time</strong>
                          </p>
                          {/* <p>{duration}</p> */}
                        </div>
                        {/* <div className="col-sm-3 mb-3">
                        <p className="mb-0">
                          <strong>Halt</strong>
                        </p>
                        <p>3 Min</p>
                      </div> */}
                        <div className="col-sm-3 mb-3">
                          <p className="mb-0">
                            <strong>Average Speed</strong>
                          </p>
                          {/* <p>{avgSpd} m/s</p> */}
                        </div>
                        <div className="col-sm-3 mb-3">
                          <p className="mb-0">
                            <strong>Max speed</strong>
                          </p>
                          {/* <p>{maxSpd} Kmph</p> */}
                        </div>
                        {/* <div className="col-sm-3 mb-3">
                        <p className="mb-0">
                          <strong>Braking Freq</strong>
                        </p>
                        <p>3 Min</p>
                      </div>
                      <div className="col-sm-3 mb-3">
                        <p className="mb-0">
                          <strong>Driver Score</strong>
                        </p>
                        <p>40 Kmph</p>
                      </div>
                      <div className="col-sm-3 mb-3">
                        <p className="mb-0">
                          <strong>Driver Incentive</strong>
                        </p>
                        <p>0</p>
                      </div> */}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Tab>

            {/* Fault count tab */}
            <Tab eventKey="fault" title="Fault Counts">
              <div className="row">
                <div className="col-md-4 mb-3">
                  <div className="card mb-3">
                    <div className="card-header">
                      <strong>CAS</strong>
                    </div>
                    <div className="card-body">
                      <ListGroup>
                        <ListGroup.Item
                          as="li"
                          className="d-flex justify-content-between align-items-start border-0"
                        >
                          <div className="ms-2 me-auto">
                            <Form.Group className="" controlId="cas1">
                              <Form.Check
                                type="checkbox"
                                label="Automatic Braking"
                              />
                            </Form.Group>
                          </div>
                          <Badge bg="primary" pill>
                            0
                          </Badge>
                        </ListGroup.Item>
                        <ListGroup.Item
                          as="li"
                          className="d-flex justify-content-between align-items-start border-0"
                        >
                          <div className="ms-2 me-auto">
                            <Form.Group className="" controlId="cas2">
                              <Form.Check
                                type="checkbox"
                                label="Accident Saved"
                              />
                            </Form.Group>
                          </div>
                          <Badge bg="primary" pill>
                            {/* {accident} */}
                          </Badge>
                        </ListGroup.Item>
                      </ListGroup>
                    </div>
                  </div>

                  <div className="card mb-3">
                    <div className="card-header">
                      <strong>Sleep Alert</strong>
                    </div>
                    <div className="card-body">
                      <ListGroup>
                        <ListGroup.Item
                          as="li"
                          className="d-flex justify-content-between align-items-start border-0"
                        >
                          <div className="ms-2 me-auto">
                            <Form.Group className="" controlId="sl1">
                              <Form.Check
                                type="checkbox"
                                label="Sleep Alert Missed"
                              />
                            </Form.Group>
                          </div>
                          <Badge bg="primary" pill>
                            {/* {sleeptAlt} */}
                          </Badge>
                        </ListGroup.Item>
                      </ListGroup>
                    </div>
                  </div>
                </div>

                <div className="col-md-4 mb-3">
                  <div className="card">
                    <div className="card-header">
                      <strong>Driver Evaluation</strong>
                    </div>
                    <div className="card-body">
                      <ListGroup>
                        <ListGroup.Item
                          as="li"
                          className="d-flex justify-content-between align-items-start border-0"
                        >
                          <div className="ms-2 me-auto">
                            <Form.Group className="" controlId="de1">
                              <Form.Check
                                type="checkbox"
                                label="Harsh Acceleration"
                              />
                            </Form.Group>
                          </div>
                          <Badge bg="primary" pill>
                            {/* {harshacc} */}
                          </Badge>
                        </ListGroup.Item>
                        <ListGroup.Item
                          as="li"
                          className="d-flex justify-content-between align-items-start border-0"
                        >
                          <div className="ms-2 me-auto">
                            <Form.Group className="" controlId="de2">
                              <Form.Check type="checkbox" label="Lane Change" />
                            </Form.Group>
                          </div>
                          <Badge bg="primary" pill>
                            {/* {laneChng} */}
                          </Badge>
                        </ListGroup.Item>
                        <ListGroup.Item
                          as="li"
                          className="d-flex justify-content-between align-items-start border-0"
                        >
                          <div className="ms-2 me-auto">
                            <Form.Group className="" controlId="de3">
                              <Form.Check type="checkbox" label="Speed Bump" />
                            </Form.Group>
                          </div>
                          <Badge bg="primary" pill>
                            {/* {spdBump} */}
                          </Badge>
                        </ListGroup.Item>
                        <ListGroup.Item
                          as="li"
                          className="d-flex justify-content-between align-items-start border-0"
                        >
                          <div className="ms-2 me-auto">
                            <Form.Group className="" controlId="de4">
                              <Form.Check
                                type="checkbox"
                                label="Sudden Braking"
                              />
                            </Form.Group>
                          </div>
                          <Badge bg="primary" pill>
                            {/* {suddenBrk} */}
                          </Badge>
                        </ListGroup.Item>
                        <ListGroup.Item
                          as="li"
                          className="d-flex justify-content-between align-items-start border-0"
                        >
                          <div className="ms-2 me-auto">
                            <Form.Group className="" controlId="de5">
                              <Form.Check type="checkbox" label="Tailgating" />
                            </Form.Group>
                          </div>
                          <Badge bg="primary" pill>
                            {/* {tailgating} */}
                          </Badge>
                        </ListGroup.Item>
                      </ListGroup>
                    </div>
                  </div>
                </div>

                <div className="col-md-4 mb-3">
                  <div className="card">
                    <div className="card-header">
                      <strong>Speed Governer</strong>
                    </div>
                    <div className="card-body">
                      <ListGroup>
                        <ListGroup.Item
                          as="li"
                          className="d-flex justify-content-between align-items-start border-0"
                        >
                          <div className="ms-2 me-auto">
                            <Form.Group className="" controlId="sg1">
                              <Form.Check
                                type="checkbox"
                                label="Overspeeding"
                              />
                            </Form.Group>
                          </div>
                          <Badge bg="primary" pill>
                            {/* {overspeed} */}
                          </Badge>
                        </ListGroup.Item>
                      </ListGroup>
                    </div>
                  </div>
                </div>
              </div>
            </Tab>

            {/* DMS */}
            <Tab eventKey="dms" title="Trip Media">
              <div className="row">
                <div className="col-md-4 mb-3">
                  <div className="card">
                    <div className="card-header">
                      <strong>DMS</strong>
                    </div>
                    <div className="card-body">
                      <ListGroup>
                        <ListGroup.Item
                          as="li"
                          className="d-flex justify-content-between align-items-start border-0"
                        >
                          <div className="ms-2 me-auto">
                            <Form.Group className="" controlId="dms1">
                              <Form.Check type="checkbox" label="Drowsiness" />
                            </Form.Group>
                          </div>
                          <Badge bg="primary" pill>
                            {/* {drowsiness} */}
                          </Badge>
                        </ListGroup.Item>
                        <ListGroup.Item
                          as="li"
                          className="d-flex justify-content-between align-items-start border-0"
                        >
                          <div className="ms-2 me-auto">
                            <Form.Group className="" controlId="dms2">
                              <Form.Check type="checkbox" label="Distraction" />
                            </Form.Group>
                          </div>
                          <Badge bg="primary" pill>
                            {/* {distraction} */}
                          </Badge>
                        </ListGroup.Item>
                      </ListGroup>
                    </div>
                  </div>
                </div>
                <div className="col-md-8">
                  <h5>DMS Media</h5>
                  {/* <div className="row">
                  <div className="col-md-6">
                    <img src={dmsImg} alt="" className="img-fluid w-100" />
                  </div>

                  <div className="col-md-6">
                    <Iframe
                      src={dmsVid}
                      width="100%"
                      height="100%"
                      allow="autoplay"
                    ></Iframe>
                  </div>
                </div> */}
                </div>
              </div>
            </Tab>

            {/* Trip Details Vehicle and Driver */}
            <Tab eventKey="details" title="Trip Details">
              <div className="row">
                <div className="col-md-6 mb-3">
                  <div className="card">
                    <div className="card-header">Vehicle Details</div>
                    <div className="card-body">
                      <p>
                        <strong>Vehicle Name:</strong> {vehicle.vehicle_name}
                      </p>
                      <p>
                        <strong>Registration Number:</strong>{" "}
                        {vehicle.vehicle_registration}
                      </p>
                      <p>
                        <strong>ECU:</strong> {vehicle.ecu}
                      </p>
                      <p>
                        <strong>IoT:</strong> {vehicle.iot}
                      </p>
                    </div>
                  </div>
                </div>
                {/* <div className="col-md-6 mb-3">
                <div className="card">
                  <div className="card-header">Driver Details</div>
                  <div className="card-body">
                    <p>
                      <strong>Driver Name:</strong> Ramu
                    </p>
                    <p>
                      <strong>Licence Number:</strong> KHD9278932
                    </p>
                    <p>
                      <strong>Contact Number:</strong> +91-39833-32983
                    </p>
                    <p>
                      <strong>Email ID:</strong> driver@stk.com
                    </p>
                  </div>
                </div>
              </div> */}
              </div>
            </Tab>
          </Tabs>
        </div>
      </Container>
    </>
  );
};

export default OngoingTripView;
