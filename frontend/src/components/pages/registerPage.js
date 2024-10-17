import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

const PRIMARY_COLOR = "#cc5c99";
const SECONDARY_COLOR = "#0c0c1f";
const url = `${process.env.REACT_APP_BACKEND_SERVER_URI}/user/signup`;

const Register = () => {
  const [data, setData] = useState({ username: "", party: "", email: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const [light, setLight] = useState(false);
  const [bgColor, setBgColor] = useState(SECONDARY_COLOR);
  const [bgText, setBgText] = useState("Light Mode");

  // Handle input changes
  const handleChange = ({ currentTarget: input }) => {
    setData({ ...data, [input.name]: input.value });
  };

  // Effect for toggling light/dark mode
  useEffect(() => {
    if (light) {
      setBgColor("white");
      setBgText("Dark Mode");
    } else {
      setBgColor(SECONDARY_COLOR);
      setBgText("Light Mode");
    }
  }, [light]);

  // Styling objects
  const labelStyling = {
    color: PRIMARY_COLOR,
    fontWeight: "bold",
    textDecoration: "none",
  };
  const backgroundStyling = { background: bgColor };
  const buttonStyling = {
    background: PRIMARY_COLOR,
    borderStyle: "none",
    color: bgColor,
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Make sure to remove destructuring from response
      const res = await axios.post(url, data);
      // If login is successful, navigate to login page
      navigate("/login");
    } catch (error) {
      if (
        error.response &&
        error.response.status >= 400 &&
        error.response.status <= 500
      ) {
        setError(error.response.data.message);
      }
    }
  };

  return (
    <section className="vh-100">
      <div className="container-fluid h-custom vh-100">
        <div
          className="row d-flex justify-content-center align-items-center h-100"
          style={backgroundStyling}
        >
          <div className="col-md-8 col-lg-6 col-xl-4 offset-xl-1">
            <Form onSubmit={handleSubmit}> {/* Added onSubmit to Form */}
              <Form.Group className="mb-3" controlId="formBasicUsername">
                <Form.Label style={labelStyling}>Username</Form.Label>
                <Form.Control
                  type="text" // Changed type to 'text'
                  name="username"
                  onChange={handleChange}
                  placeholder="Enter username"
                  required // Optional: make it required
                />
                <Form.Text className="text-muted">
                  We just might sell your data
                </Form.Text>
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicParty">
                <Form.Label style={labelStyling}>Political Party</Form.Label>
                <Form.Select
                  name="party"
                  onChange={handleChange}
                  value={data.party}
                  required // Optional: make it required
                >
                  <option value="">Select your party</option>
                  <option value="Democrat">Democrat</option>
                  <option value="Republican">Republican</option>
                  <option value="Libertarian">Libertarian</option>
                  <option value="Green">Green</option>
                  <option value="Independent">Independent</option>
                </Form.Select>
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label style={labelStyling}>Email</Form.Label>
                <Form.Control
                  type="email"
                  name="email"
                  onChange={handleChange}
                  placeholder="Enter email"
                  required // Optional: make it required
                />
                <Form.Text className="text-muted">
                  We just might sell your data
                </Form.Text>
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label style={labelStyling}>Password</Form.Label>
                <Form.Control
                  type="password"
                  name="password"
                  placeholder="Password"
                  onChange={handleChange}
                  required // Optional: make it required
                />
              </Form.Group>

              <div className="form-check form-switch">
                <input
                  className="form-check-input"
                  type="checkbox"
                  id="flexSwitchCheckDefault"
                  onChange={() => setLight(!light)}
                />
                <label
                  className="form-check-label text-muted"
                  htmlFor="flexSwitchCheckDefault"
                >
                  {bgText}
                </label>
              </div>

              {error && (
                <div style={labelStyling} className="pt-3">
                  {error}
                </div>
              )}

              <Button
                variant="primary"
                type="submit" // Changed to type submit
                style={buttonStyling}
                className="mt-2"
              >
                Register
              </Button>
            </Form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Register;
