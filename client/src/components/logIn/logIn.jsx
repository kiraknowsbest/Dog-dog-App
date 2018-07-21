import React from 'react'
import { connect } from 'react-redux'
import axios from 'axios'

import { changeCurrentUser } from '../../action/changeCurrentUser.js'
import { changeLogInBox } from '../../action/changeLocation.js'

const mapStateToProps = (state, props) => {

	return {
		location: state.location,
		user: state.user,
		users: state.users
	}
}

const mapDispatchToProps = (dispatch, props) => {
	return {
		changeUserToStore : function (user) {
			dispatch(changeCurrentUser(user))
		},
		changeLogInToStore: function (boolean) {
			dispatch(changeLogInBox(boolean))
		}
	}
}

class logIn extends React.Component {

	constructor(props) {
	  super(props);
	  this.state = {
	  	username: null,
	  	password: null,
	  	repeatPassword: null,
	  	signupOrlogin: false
	  }
	this.submitLogIn = this.submitLogIn.bind(this);
	this.submitSignUp = this.submitSignUp.bind(this);
	this.getUsername = this.getUsername.bind(this);
	this.getPassword = this.getPassword.bind(this);
	this.getRepeatPassword = this.getRepeatPassword.bind(this);
	this.signupOrlogin = this.signupOrlogin.bind(this);
	this.changeToLogIn = this.changeToLogIn.bind(this);
	this.changeToSignUp = this.changeToSignUp.bind(this);
	}

	changeToLogIn () {
		this.setState({
				signupOrlogin: false
		})
	}

	changeToSignUp () {
		this.setState({
				signupOrlogin: true
		})
	}

	getUsername (e) {
		this.setState({
			username: e.target.value
		})
	}

	getPassword (e) {
		this.setState({
			password: e.target.value
		})
	}

	getRepeatPassword (e) {
		this.setState({
			repeatPassword: e.target.value
		})
	}



	submitLogIn (e) {
		e.preventDefault()
  		var app = this;
  		axios({
	  		method: 'post',
	  		url: "http://localhost:3000/api/login",
	  		data: {
	  			username: app.state.username,
	  			password: app.state.password
	  		}
	  	})
		  .then(function (response) {
		    app.props.changeUserToStore(response.data)
		    app.props.changeLogInToStore(true)
		    app.props.history.push('/home')

		  })
		  .catch(function (error) {
		    console.log(error);
		  });
	}

	submitSignUp (e) {
		e.preventDefault()
		if (this.state.password === this.state.repeatPassword) {
			var app = this;
  		axios({
	  		method: 'post',
	  		url: "http://localhost:3000/api/signup",
	  		data: {
	  			username: app.state.username,
	  			password: app.state.password,
	  		}
	  	})
		  .then(function (response) {
		    app.props.history.push('/login')

		  })
		  .catch(function (error) {
		    console.log(error);
		  });
		} else {
			console.log("not same password")
		}

	}


	signupOrlogin () {
		if (this.state.signupOrlogin) {
			return (
			<div className="signup">
					<form  onSubmit={this.submitSignUp}>
					  <div className="container">
					    <label htmlFor="uname"><b>Username</b></label>
					    <input className="login" type="text" placeholder="Enter Username" name="uname" onChange={this.getUsername}/>
					    <label htmlFor="psw"><b>Password</b></label>
					    <input className="login" type="password" placeholder="Enter Password" name="psw"  onChange={this.getPassword}/>
					    <label htmlFor="psw"><b>Repeat Password</b></label>
					    <input className="login" type="password" placeholder="Repeat Password " name="psw"  onChange={this.getRepeatPassword}/>
					    <button className="loginButton"type="submit">Sign Up</button>
					  </div>
					</form>
				</div>
			)
		} else {
			return (
				<div className="logIn">
					<form onSubmit={this.submitLogIn}>
					  <div className="container">
					    <label htmlFor="uname"><b>Username</b></label>
					    <input className="login" type="text" placeholder="Enter Username" name="uname" onChange={this.getUsername}/>
					    <label htmlFor="psw"><b>Password</b></label>
					    <input className="login" type="password" placeholder="Enter Password" name="psw"  onChange={this.getPassword}/>
					    <div className='centered-container'>
					    	<button className="loginButton" type="submit">Login</button>
					    </div>
					    <div>
					      <input className="remember-me" type="checkbox"  name="remember"/> Remember me
					    </div>
					  </div>
					  <div className="container">
					    <button type="button" className="cancelbtn">Cancel</button>
					    <span className="psw">Forgot <a href="#">password?</a></span>
					  </div>
					</form>
				</div>
			)
		}
	}
	render() {
		return(
			<div>
				<div className='form-selection-2'>
					<div className={`form-selection-2-choice${!this.state.signupOrlogin ? ' selected' : ''}`} onClick={this.changeToLogIn}>Login</div>
					<div className={`form-selection-2-choice${this.state.signupOrlogin ? ' selected' : ''}`} onClick={this.changeToSignUp}>Sign Up</div>
				</div>
				<div>{this.signupOrlogin()}</div>
			</div>
		)
	}
}

export default connect(mapStateToProps,mapDispatchToProps)(logIn)

