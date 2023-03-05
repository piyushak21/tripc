import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Container, Table } from "react-bootstrap";
import axios from "axios";

const OngoingTripList = () => {
  const [tripData, setTripData] = useState();
  const [totalTrip, setTotalTrip] = useState();

  useEffect(() => {
    const fetchData = (async) => {
      axios
        .get("/ongoingTrip/getOngoingTrips")
        .then((res) => {
          setTripData(res.data);
          setTotalTrip(res.data.length);
        })
        .catch((err) => {
          console.log(err);
        });
    };
    fetchData();
  }, []);

  const convertTime = (time) => {
    let updateStTime = new Date(time * 1000);
    return updateStTime.toLocaleString();
  };

  return (
    <Container className="my-5">
      <div className="d-flex justify-content-between my-4">
        <div>
          <h4>Ongoing Trips List</h4>
          <p>
            <small>
              <span>Total: {totalTrip}</span>
            </small>
          </p>
        </div>
        <div>
          <Link to="/completed-trips">
            <button className="btn btn-info">Check Completed Trips</button>
          </Link>
        </div>
      </div>

      {/* List of vehicles */}
      <Table striped hover>
        <thead>
          <tr>
            <th>#</th>
            <th>Trip ID</th>
            <th>Vehicle Name</th>
            <th>Registration Number</th>
            <th>Trip Start</th>
            <th>Trip End</th>
            <th>Distance Travelled</th>
            <th>Duration</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {tripData &&
            tripData.map((row, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{row.trip_id}</td>
                <td>{row.vehicle_name}</td>
                <td>{row.vehicle_registration}</td>
                <td>{convertTime(row.trip_start_time)}</td>
                <td>{row.trip_end_time && convertTime(row.trip_end_time)}</td>
                <td>{row.total_distance} Km</td>
                <td>{row.duration}</td>
                <td>
                  <span className="text-primary">
                    <small>
                      <Link
                        to={`/ongoing-trips/${row.trip_id}`}
                        className="btn btn-primary btn-sm"
                      >
                        View
                      </Link>
                    </small>
                  </span>
                </td>
              </tr>
            ))}
        </tbody>
      </Table>
    </Container>
  );
};

export default OngoingTripList;
