import axios from "axios";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import styled from "@emotion/styled";
import { DataGrid } from "@mui/x-data-grid";
import "bootstrap/dist/css/bootstrap.min.css";
// import { Table } from "react-bootstrap";

import {
  Button,
  Typography,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
} from "@mui/material";
import React, { useState, useEffect } from "react";
import { api } from "../api/api";

function Student() {
  const Container = styled(Box)`
    box-shadow: rgba(136, 165, 191, 0.48) 6px 2px 16px 0px,
      rgba(255, 255, 255, 0.8) -6px -2px 16px 0px;
    width: 400px;
    height: auto;
    margin: auto;
    background-color: #f5f5f5;
    align-items: center;
    text-align: center;
    margin-top: 10px;
  `;

  const Image = styled("img")({
    cursor: "pointer",
    width: 200,
    margin: "auto",
    display: "flex",
    padding: "50px 0 0",
  });

  const Wrapper = styled("form")({
    padding: "25px 35px",
    display: "flex",
    backgroundColor: "transparent",
    flex: 1,
    flexDirection: "column",
    "& > div, & > button, & > p": {
      marginTop: "20px",
    },
  });

  const LoginButton = styled(Button)`
    text-transform: none;
    background: gray;
    :hover {
      background: #eed512;
      color: black;
    }
  `;

  const Table = styled("table")({
    fontFamily: "arial, sans-serif",
    borderCollapse: "collapse",
    width: "100%",
  });

  const TD = styled("td")({
    fontFamily: "arial, sans-serif",
    borderCollapse: "collapse",
    width: "100%",
  });

  const TR = styled("tr")({
    fontFamily: "arial, sans-serif",
    borderCollapse: "collapse",
    width: "100%",
  });

  const [error, setError] = useState("");

  const [as, setas] = useState({});
  // const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();
    let formData = new FormData(e.target);
    const userCredentials = Object.fromEntries(formData);
    console.log(formData);
    setError("");
    api
      .post("/create", userCredentials)
      .then((response) => {
        console.log(response.data.data);
        setas(response.data.data);
        window.alert("Registration Success..");
      })
      .catch((error) => {
        setError(error.response.data.message);
        console.log(error.response.data.message);
        window.alert(error.response.data.message);
      });
  }

  const [userData, setUserData] = useState([]);
  useEffect(() => {
    api
      .get("/students")
      .then((responce) => {
        console.log(responce.data.data);
        setUserData(responce.data.data);
      })
      .catch((error) => {
        setUserData([]);
        console.log(error.response.data.message);
        window.alert(error.response.data.message);
      });
  }, [as]);

  return (
    <div style={{ height: "100vh" }}>
      <Container>
        <Box>
          <Wrapper onSubmit={handleSubmit}>
            <h3>Student Registration Form</h3>
            <TextField
              required
              type="text"
              name="name"
              id="standard-basic"
              label="Enter Full Name"
              variant="standard"
              //   onChange={handleChange}
              //   value={formData.name}
            />
            <TextField
              required
              type="text"
              name="school"
              id="standard-basic"
              label="Enter Your School Name"
              variant="standard"
              //   onChange={handleChange}
              //   value={formData.school}
            />
            <TextField
              required
              type="email"
              name="email"
              id="standard-basic"
              label="Enter Email"
              variant="standard"
              //   onChange={handleChange}
              //   value={formData.email}
            />

            <TextField
              required
              type="number"
              name="age"
              id="standard-basic"
              label="Enter Your Age"
              variant="standard"
              //   onChange={handleChange}
              //   value={formData.age}
            />

            <FormControl>
              <FormLabel id="demo-radio-buttons-group-label">
                Select Gender
              </FormLabel>
              <RadioGroup
                row
                aria-labelledby="demo-radio-buttons-group-label"
                defaultValue="female"
                name="gender"
                // onChange={handleChange}
                // value={formData.gender}
              >
                <FormControlLabel
                  value="female"
                  control={<Radio />}
                  label="Female"
                />
                <FormControlLabel
                  value="male"
                  control={<Radio />}
                  label="Male"
                />
                <FormControlLabel
                  value="other"
                  control={<Radio />}
                  label="Other"
                />
              </RadioGroup>
            </FormControl>
            <LoginButton type="submit" variant="contained">
              Create
            </LoginButton>
          </Wrapper>
        </Box>
      </Container>

      <table className="table" style={{ marginTop: "80px" }}>
        <thead>
          <tr>
            <th scope="col">No.</th>
            <th scope="col">Fullname</th>
            <th scope="col">Age</th>
            <th scope="col">Schoolname</th>
            <th scope="col">Email</th>
            <th scope="col">Gender</th>
          </tr>
        </thead>
        <tbody>
          {userData.map((x, i) => {
            return (
              <tr key={i}>
                <td>{i + 1}</td>
                <td>{x.name}</td>
                <td>{x.age}</td>
                <td>{x.school}</td>
                <td>{x.email}</td>
                <td>{x.gender}</td>
              </tr>
            );
          })}
          <hr />
          <hr />
        </tbody>
      </table>
    </div>
  );
}

export default Student;
