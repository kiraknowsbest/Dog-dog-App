import React from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { changeLocation } from '../../action/changeLocation.js'

import Home from './Home.jsx'


const mapStateToProps = (state, props) => {

	return {
		user: state.user,
		location: state.location
	}
}

const mapDispatchToProps = (dispatch, props) => {
	return {
		changeLocationToStore: function (location) {
			dispatch(changeLocation(location))
		}
	}
}

class Welcome extends React.Component {

	constructor(props) {
	  super(props);
	this.locationHandler = this.locationHandler.bind(this);
	}

  locationHandler(e) {
  	this.props.changeLocationToStore(e.target.value)
  }

	render() {
		return(
			<div className='full-width'>
				{this.props.user ? (
					<div>
						<h2>What area do you want to look?</h2>
						<input type="text" onChange={this.locationHandler}/>
						<Link to='/home'>GO</Link>
					</div>
				) : (
					<div className="centered-full">
						<Link to='/login' className='centered-container'>
							<button className="sign-in-button centered">
								<span>Sign In</span>
							</button>
						</Link>
					</div>
				)}
			</div>
		)
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Welcome)
