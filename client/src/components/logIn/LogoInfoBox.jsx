import React from 'react'
import { connect } from 'react-redux'
import { changeLocation } from '../../action/changeLocation.js'
import { Link, withRouter } from 'react-router-dom'


const mapStateToProps = (state, props) => {

	return {
		location: state.location,
		login: state.login,
		user: state.user
	}
}

const mapDispatchToProps = (dispatch, props) => {
	return {
		changeLocationToStore: function (location) {
			dispatch(changeLocation(location))
		}
	}
}

class LogoInfoBox extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			logIn : true,
			locationBox: false,

		}

	this.changeLocation = this.changeLocation.bind(this);
	this.clickSwith = this.clickSwith.bind(this);
	this.switchToUserPage = this.switchToUserPage.bind(this);
	}

	changeLocation (e) {
		this.props.changeLocationToStore(e.target.value)
	}

	clickSwith () {
		this.setState({
			logIn : !this.state.logIn,
			locationBox: !this.state.locationBox
		})
	}

	switchToUserPage () {
		if (this.props.user) {
			this.props.history.push('/user')
		} else {
			this.props.history.push('/login')
		}
	}

	render() {
		return(
			<div>
				<div className="LogoInfoBox" style={{display: this.state.logIn ? 'block' : 'none'}}>
					{this.props.user ? (
						<div>
							<h3 onClick={this.switchToUserPage}>
							Hi {this.props.user}
							</h3>
							<div className="changeLocationBox" style={{display: this.state.locationBox ? 'block' : 'none'}}>
								<input type="text" onChange={this.changeLocation}/>
								<button onClick={this.clickSwith}>change location</button>
							</div>
						</div>
					) : (
						<Link className='no-decoration' to='/login'>
							<h3 className='centered welcome-msg'>Sign in to see the dogs!</h3>
						</Link>
					)}
				</div>
			</div>
		)
	}
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps) (LogoInfoBox))
