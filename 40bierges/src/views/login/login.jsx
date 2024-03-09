import React from "react";
import { Redirect } from 'react-router-dom'


// core components
import '../../assets/css/main.css'

import tools from "../../toolBox"
import axios from "axios";


class Login extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      redirected: false,
      redirectedAdmin: false,
      mail: "",
      password: "",
      url: tools.API_URL
    };
    this.handleConnect = this.handleConnect.bind(this)
    this.handleChange = this.handleChange.bind(this)
  };

  componentDidMount() {
    if (tools.checkIfConnected()) {
      this.setState({ redirected: true })
    }
  }

  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  handleConnect() {
    if (this.state.mail === '' || this.state.password === '') {
      alert('Please fill in all fields of the form')
      return;
    }
    if (!/\S+@\S+\.\S+/.test(this.state.mail)) {
      alert('The mail does not correspond to the right format')
      return;
    }
    axios.post(this.state.url + '/connection', {
      mail: this.state.mail,
      password: this.state.password
    }).then(response => {
      if (response.status === 200) {
        let d = new Date();
        d.setTime(d.getTime() + (3 * 24 * 60 * 60 * 1000));
        let expires = "expires=" + d.toUTCString();
        document.cookie = "Token=" + response.data.token + ";" + expires + ";path=/"
        if (response.data.role === "user") {
          this.setState({ redirected: true })
        } else if (response.data.role === "admin") {
          this.setState({ redirectedAdmin: true })
        }
      } else {
        alert("error " + response.status)
      }
    }).catch(error => {
      console.log(error)
    });
  }

  render() {
    if (this.state.redirected) return (<Redirect to="/index" />)
    if (this.state.redirectedAdmin) return (<Redirect to="/admin" />)
    return (
      <>
        <div>
          <input type="text" name="mail" value={this.state.mail} onChange={this.handleChange}></input>
          <input type="password" name="password" value={this.state.password} onChange={this.handleChange}></input>
          <button onClick={this.handleConnect}>Se connecter</button>
        </div>
      </>
    )
  }
}

export default Login;
