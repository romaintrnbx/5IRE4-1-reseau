import React from "react";
import { Redirect } from 'react-router-dom'

// core components
import '../assets/css/main.css'
import axios from "axios";
import tools from "../toolBox"

import ButtonUser from "../components/ButtonUser";

class Index extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      showSecret: false,
      redirected: false,
      token: "",
      mail: "",
      secret: "",
      isAdmin: false,
      isLoading: true,
      url: "http://localhost:3001"
    };
    this.toggleSecret = this.toggleSecret.bind(this)
  };

  componentDidMount() {
    if (tools.checkIfConnected()) {
      this.promisedSetState({ token: tools.readCookie("Token") }).then(result => {
        this.fetchData()
      })
    } else {
      this.setState({ redirected: true })
    }
  }

  toggleSecret() {
    this.setState({ showSecret: !this.state.showSecret })
  }

  fetchData() {
    axios.get(this.state.url + '/user', {
      headers: {
        'token': this.state.token
      }
    }).then(response => {
      this.setState({
        mail: response.data.mail,
        secret: response.data.secret,
        isLoading: false
      })
    }).catch(error => {
      console.log(error)
    });
  }

  promisedSetState = (newState) => new Promise(resolve => this.setState(newState, resolve));

  render() {
    if (this.state.redirected) return (<Redirect to="/login" />)
    if (this.state.isAdmin) return (<Redirect to="/admin" />) 
    if (this.state.isLoading) return (<p>Please wait...</p>);
    return (
      <>
        <div>
          Ravi de te voir {this.state.mail},
          <ButtonUser handleClick={this.toggleSecret} />
          {this.state.showSecret ? <div>{this.state.secret}</div> : <div>***************</div>}
        </div>
      </>
    )
  }
}

export default Index;
