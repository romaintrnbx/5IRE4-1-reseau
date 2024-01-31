import React from "react";
import { Redirect } from 'react-router-dom'


// core components
import '../../assets/css/main.css'

import tools from "../../toolBox"
import axios from "axios";


class Blog extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      redirected: false,
      newMessage: "",
      messages: [],
      token: "",
      isLoading: true,
      url: "http://localhost:3001"
    };
    this.handleChange = this.handleChange.bind(this)
    this.handleSend = this.handleSend.bind(this)
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

  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  handleSend(event) {
    axios.post(this.state.url + '/blog', {
      message: this.state.newMessage
    }, {
      headers: {
        'token': this.state.token
      }
    }).then(response => {
      if (response.status === 200) {
        let tmp = this.state.messages
        tmp.push(this.state.newMessage)
        this.setState({ messages: tmp, newMessage: "" })
      } else {
        alert("error " + response.status)
      }
    }).catch(error => {
      console.log(error)
    });
  }

  promisedSetState = (newState) => new Promise(resolve => this.setState(newState, resolve));

  fetchData() {
    axios.get(this.state.url + '/blog', {
      headers: {
        'token': this.state.token
      }
    }).then(response => {
      this.setState({
        messages: response.data,
        isLoading: false
      })
    }).catch(error => {
      console.log(error)
    });
  }

  render() {
    if (this.state.redirected) return (<Redirect to="/index" />)
    if (this.state.isLoading) return (<p>Please wait...</p>);
    return (
      <>
        <div>
          <textarea name="newMessage" value={this.state.newMessage} onChange={this.handleChange}></textarea>
          <button onClick={this.handleSend}>Poster ce nouveau message</button>
          {this.state.messages.map((message, index) => {
            return (
              <div key={index}>
                <p>{index+1}. {message}</p>
              </div>
            )
          })}
        </div>
      </>
    )
  }
}

export default Blog;