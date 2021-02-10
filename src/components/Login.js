import React, { useState } from 'react';
import { setUserSession } from '../Utils/Common';
import http from "../services/httpService";
import { apiUrl } from "../config.json";
import "../App.css";
import { FormGroup, Label, Input } from "reactstrap";

function Login(props) {
  const [loading, setLoading] = useState(false);
  const username = useFormInput('');
  const password = useFormInput('');
  const url = useFormInput('');
  const [error, setError] = useState(null);

  // handle button click of login form
  const handleLogin = () => {
    setError(null);
    setLoading(true);
    http.post(apiUrl + '/login', { url: url.value, username: username.value, password: password.value }).then(response => {
      setLoading(false);
      setUserSession(response.data.token, response.data.user);
      props.history.push('/host_groups');
    }).catch(error => {
      setLoading(false);
      if (error.response.status === 401) setError(error.response.data.message);
      else setError("Something went wrong. Please try again later.");
    });
  }

  return (
    <div className="login-form">
      <h1 className="text-center">Welcome!</h1>
      <h4 className="mb-5 text-center">ZABBIX - PROJECT</h4>
      <FormGroup>
          <Label>URL Address</Label>
          <Input
            type="text"
            {...url}
          />
      </FormGroup>
      <FormGroup>
          <Label>Username</Label>
          <Input
            type="text"
            {...username}
          />
      </FormGroup>
      <FormGroup>
          <Label>Password</Label>
          <Input
            type="password"
            {...password}
          />
      </FormGroup>
      <button type="submit" value={loading ? 'Loading...' : 'Login'} onClick={handleLogin} disabled={loading} className="btn-lg btn-dark btn-block">Submit</button>
    </div>


  );
}

const useFormInput = initialValue => {
  const [value, setValue] = useState(initialValue);

  const handleChange = e => {
    setValue(e.target.value);
  }
  return {
    value,
    onChange: handleChange
  }
}

export default Login;