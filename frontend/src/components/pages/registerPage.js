import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

const PRIMARY_COLOR = "#301952";
const url = `${process.env.REACT_APP_BACKEND_SERVER_URI}/user/signup`;

const Register = () => {
  const [data, setData] = useState({ username: "", party: "", email: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // Handle input changes
  const handleChange = ({ currentTarget: input }) => {
    setData({ ...data, [input.name]: input.value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(url, data);
      navigate("/login"); // Navigate to login page on successful registration
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
    <section className="min-h-screen bg-[#301952] flex justify-center items-center">
      <div className="w-full max-w-sm bg-white p-8 rounded-lg shadow-lg">
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-4" controlId="formBasicUsername">
            <Form.Label className="text-[#301952] font-bold">Username</Form.Label>
            <Form.Control
              type="text"
              name="username"
              onChange={handleChange}
              placeholder="Enter username"
              className="p-2 border border-[#301952] rounded-md"
            />
          </Form.Group>

          <Form.Group className="mb-4" controlId="formBasicParty">
            <Form.Label className="text-[#301952] font-bold">Political Party</Form.Label>
            <Form.Select
              name="party"
              onChange={handleChange}
              value={data.party}
              className="p-2 border border-[#301952] rounded-md"
              required
            >
              <option value="">Select your party</option>
              <option value="Democrat">Democrat</option>
              <option value="Republican">Republican</option>
              <option value="Libertarian">Libertarian</option>
              <option value="Green">Green</option>
              <option value="Independent">Independent</option>
            </Form.Select>
          </Form.Group>

          <Form.Group className="mb-4" controlId="formBasicEmail">
            <Form.Label className="text-[#301952] font-bold">Email</Form.Label>
            <Form.Control
              type="email"
              name="email"
              onChange={handleChange}
              placeholder="Enter email"
              className="p-2 border border-[#301952] rounded-md"
              required
            />
          </Form.Group>

          <Form.Group className="mb-4" controlId="formBasicPassword">
            <Form.Label className="text-[#301952] font-bold">Password</Form.Label>
            <Form.Control
              type="password"
              name="password"
              placeholder="Password"
              onChange={handleChange}
              className="p-2 border border-[#301952] rounded-md"
              required
            />
          </Form.Group>

          {error && (
            <div className="text-[#cc5c99] pt-3 text-center">{error}</div>
          )}

          <Button
            variant="primary"
            type="submit"
            style={{ background: PRIMARY_COLOR, borderColor: PRIMARY_COLOR }}
            className="w-full py-2 text-white rounded-md mt-4"
          >
            Register
          </Button>
        </Form>
      </div>
    </section>
  );
};

export default Register;
