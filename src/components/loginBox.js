import React, { useState } from 'react';
import { setUserSession } from '../Utils/Common';
import http from "../services/httpService";
import { Button, FormGroup, Label, Input } from "reactstrap";

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
    http.post('http://localhost:3000/api/v1/zabbix/login', { url: url.value, username: username.value, password: password.value }).then(response => {
      setLoading(false);
      setUserSession(response.data.token, response.data.user);
      props.history.push('/hostGroups');
    }).catch(error => {
      setLoading(false);
      if (error.response.status === 401) setError(error.response.data.message);
      else setError("Something went wrong. Please try again later.");
    });
  }

  return (
    <div>
    Login<br /><br />
    <div>
      URL<br />
      <input type="text" {...url} autoComplete="new-password" />
    </div>
    <div>
      Username<br />
      <input type="text" {...username} autoComplete="new-password" />
    </div>
    <div style={{ marginTop: 10 }}>
      Password<br />
      <input type="password" {...password} autoComplete="new-password" />
    </div>
    {error && <><small style={{ color: 'red' }}>{error}</small><br /></>}<br />
    <input type="button" value={loading ? 'Loading...' : 'Login'} onClick={handleLogin} disabled={loading} /><br />
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