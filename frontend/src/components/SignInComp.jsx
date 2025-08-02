import React, { useState, useEffect } from 'react'
import { Form, Button, Alert, InputGroup } from 'react-bootstrap';
import axios from 'axios';

const SignInComp = ({ onSwitchToSignUp, onSignInSuccess }) => {
  const [existingUser, setExistingUser] = useState({ email: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [sms, setSms] = useState('');
  const [alertVariant, setAlertVariant] = useState('success');
  const [showAlert, setShowAlert] = useState(false);

  const handleChange = (e) => {
    setExistingUser({ ...existingUser, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { email, password } = existingUser;

    if (!email || !password) {
      setSms("Please fill in all fields.");
      setAlertVariant("danger");
      setShowAlert(true);
      return;
    }

    try {
      const res = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/users/signin`, existingUser);

      localStorage.setItem('user', JSON.stringify(res.data.user));

      setSms("Signed in successfully!");
      setAlertVariant("success");
      setShowAlert(true);
      onSignInSuccess(res.data.user);

      setTimeout(() => window.location.reload(), 1000);
    } catch (err) {
      const errorMsg = err.response?.data?.error || "Sign-in failed. Please try again.";
      setSms(errorMsg);
      setAlertVariant("danger");
      setShowAlert(true);
    }
  };

  useEffect(() => {
    if (!showAlert) return;
    const timer = setTimeout(() => setShowAlert(false), 5000);
    return () => clearTimeout(timer);
  }, [showAlert]);

  return (
    <div>
      <h3 className="text-center mb-4">Sign In</h3>
      <Form onSubmit={handleSubmit}>

        {/* Email Field */}
        <Form.Group className="mb-3" controlId="formEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            name="email"
            placeholder="Enter your email"
            value={existingUser.email}
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
              placeholder="Enter your password"
              value={existingUser.password}
              onChange={handleChange}
              required
              maxLength={20}
              pattern="^[a-zA-Z0-9!@#$%^&*()_+=-]{6,20}$"
              autoComplete="current-password"
              title="6–20 characters. No < > [ ] / { } allowed."
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

        <Button variant="primary" type="submit" className="w-100">
          Sign In
        </Button>

        <p className="text-center mt-3">
          Don’t have an account?{" "}
          <Button variant="link" onClick={onSwitchToSignUp}>
            Sign Up
          </Button>
        </p>

        {showAlert && <Alert variant={alertVariant}>{sms}</Alert>}
      </Form>
    </div>
  );
};

export default SignInComp;
