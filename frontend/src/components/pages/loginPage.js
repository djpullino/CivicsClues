import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import getUserInfo from "../../utilities/decodeJwt";

const PRIMARY_COLOR = "#301952";
const SECONDARY_COLOR = '#0c0c1f'
const url = `${process.env.REACT_APP_BACKEND_SERVER_URI}/user/login`;

const Login = () => {
  const [user, setUser] = useState(null)
  const [data, setData] = useState({ username: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = ({ currentTarget: input }) => {
    setData({ ...data, [input.name]: input.value });
  };

  useEffect(() => {
    const obj = getUserInfo(user)
    setUser(obj)
  }, [user]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data: res } = await axios.post(url, data);
      const { accessToken } = res;
      //store token in localStorage
      localStorage.setItem("accessToken", accessToken);
      navigate("/home");
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

  if(user) {
    navigate('/home')
    return
  }

  return (
    <section className="min-h-screen bg-[#301952] flex justify-center items-center">
      <div className="w-full max-w-sm bg-white p-8 rounded-lg shadow-lg">
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-4" controlId="formBasicEmail">
            <Form.Label className="text-[#301952] font-bold">Username</Form.Label>
            <Form.Control
              type="text"
              name="username"
              onChange={handleChange}
              placeholder="Enter username"
              className="p-2 border border-[#301952] rounded-md"
            />
          </Form.Group>

          <Form.Group className="mb-4" controlId="formBasicPassword">
            <Form.Label className="text-[#301952] font-bold">Password</Form.Label>
            <Form.Control
              type="password"
              name="password"
              placeholder="Password"
              onChange={handleChange}
              className="p-2 border border-[#cc5c99] rounded-md"
            />
          </Form.Group>

          <Form.Group className="mb-4">
            <Form.Text className="text-sm text-gray-500">
              Don't have an account? 
              <Link to="/signup" className="text-[#301952] font-semibold"> Sign up</Link>
            </Form.Text>
          </Form.Group>

          {error && <div className="text-[#cc5c99] pt-3 text-center">{error}</div>}

          <Button
            variant="primary"
            type="submit"
            style={{ background: PRIMARY_COLOR, borderColor: PRIMARY_COLOR }}
            className="w-full py-2 text-white rounded-md mt-4"
          >
            Log In
          </Button>
        </Form>
      </div>
    </section>
  );
};

export default Login;
