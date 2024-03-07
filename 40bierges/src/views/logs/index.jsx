import React from "react";
import { Redirect } from 'react-router-dom'

// core components
import '../../assets/css/main.css'

import tools from "../../toolBox"
import axios from "axios";


class Logs extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      redirected: false,
      logs: [],
      token: "",
      isLoading: true,
      url: "http://localhost:3001"
    };
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

  promisedSetState = (newState) => new Promise(resolve => this.setState(newState, resolve));

  fetchData() {
    axios.get(this.state.url + '/logs', {
      headers: {
        'token': this.state.token
      }
    }).then(response => {
      this.setState({
        logs: response.data,
        isLoading: false
      })
    }).catch(error => {
      console.log(error)
    });
  }

  render() {
    if (this.state.redirected) return (<Redirect to="/index" />)

    return (
      <>
        <pre>
          <code>
            {JSON.stringify(this.state.logs, null, 2)}
          </code>
        </pre>
      </>
    )
  }
}

export default Logs;
