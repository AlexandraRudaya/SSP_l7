import React, { Component } from 'react';
import './App.css';
import Logo from './Logo'
import Tabs from './Tabs'
import Description from './Description'
import {connect} from "react-redux"
import * as actions from "./actions/action"

class App extends Component {

  constructor() {
    super();
    this.state = { isLoaded: false }
  }

  componentDidMount() {
    let _this = this;

    fetch("https://api.github.com/users/AlexandraRudaya").then(data => data.json()).then(data => {
      _this.setState({
        data: data,
        isLoaded: true
      })
    });
  }

  render() {
    if (this.state.isLoaded === false) return null;
    

    let email = "Доступ к E-mail закрыт";
    if (this.state.data.email != null) {
      email = this.state.data.email;
    }

    const data = this.state.data;
    console.log(this.state.data);

    return (
      <div className="App">
        <div className="Wrapper">

          <Logo photo={data.avatar_url}/>

          <Description fullName={data.name} username={data.login} location={data.location} email={email}/>
        </div>

        <div className="Navigation">
          <Tabs />
        </div>
      </div>
    );

    function mapStateToProps(state){
      return{
        data:state.loadReducer.data,
        status:state.loadReducer.status
      }
    }
  }
}

export default connect(mapStateToProps)(App);