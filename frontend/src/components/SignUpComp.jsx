import React, { useState, useEffect } from 'react';
import { Form, Button, Alert, InputGroup } from 'react-bootstrap';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const SignUpComp = ({ onSwitchToSignIn, onSignInSuccess }) => {
  const navigate = useNavigate();

  const [newUser, setNewUser] = useState({
    name: '',
    email: '',
    password: '',
    role: 'user'
  });

  const [showPassword, setShowPassword] = useState(false);
  const [sms, setSms] = useState('');
  const [alertVariant, setAlertVariant] = useState('success');
  const [showAlert, setShowAlert] = useState(false);

  const handleChange = (e) => {
    setNewUser({ ...newUser, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { name, email, password } = newUser;

    if (!name || !email || !password) {
      setSms("Please fill in all fields.");
      setAlertVariant("danger");
      setShowAlert(true);
      return;
    }

    const invalidChars = /[<>{}[\]/]/;
    if (invalidChars.test(name) || invalidChars.test(password)) {
      setSms("Name or password contains invalid characters.");
      setAlertVariant("danger");
      setShowAlert(true);
      return;
    }

    try {
      const res = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/users/signup`, newUser);

      setSms("Account created successfully!");
      setAlertVariant("success");
      setShowAlert(true);

      const createdUser = res.data.user;

      onSignInSuccess(createdUser);
      navigate('/');


    } catch (err) {
      const errorMsg = err.response?.data?.error || "Signup failed.";
      setSms(errorMsg);
      setAlertVariant("danger");
      setShowAlert(true);
      console.error("Signup error:", err);
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => setShowAlert(false), 5000);
    return () => clearTimeout(timer);
  }, [showAlert]);

  return (
    <div>
      <h3 className="text-center">Sign Up</h3>
      <Form onSubmit={handleSubmit}>

        <Form.Group className="mb-3" controlId="formName">
          <Form.Label>Full Name</Form.Label>
          <Form.Control
            type="text"
            name="name"
            placeholder="Enter your name"
            value={newUser.name}
            onChange={handleChange}
            required
            maxLength={30}
            autoComplete="name"
            pattern="^[a-zA-Z\s.'-]{2,30}$"
            title="Name should contain only letters and spaces."
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            name="email"
            placeholder="Enter your email"
            value={newUser.email}
            onChange={handleChange}
            required
            maxLength={50}
            autoComplete="email"
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formPassword">
          <Form.Label>Password</Form.Label>
          <InputGroup>
            <Form.Control
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Create a password"
              value={newUser.password}
              onChange={handleChange}
              required
              maxLength={20}
              pattern="^[a-zA-Z0-9!@#$%^&*()_+=-]{6,20}$"
              title="6–20 characters. No < > [ ] / { } allowed."
              autoComplete="new-password"
            />
            <Button
              variant="outline-secondary"
              onClick={() => setShowPassword(!showPassword)}
              tabIndex={-1}
            >
              <i className={`fa-solid ${showPassword ? 'fa-eye' : 'fa-eye-slash'}`}></i>
            </Button>
          </InputGroup>
        </Form.Group>


        <Button variant="success" type="submit" className="w-100">
          Sign Up
        </Button>


        <p className="text-center mt-3">
          Already have an account?{" "}
          <Button variant="link" onClick={onSwitchToSignIn}>
            Sign In
          </Button>
        </p>

        {showAlert && <Alert variant={alertVariant} className="mt-3">{sms}</Alert>}
      </Form>
    </div>
  );
};

export default SignUpComp;
