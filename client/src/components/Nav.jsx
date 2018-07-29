import React from 'react'
import { Link } from 'react-router-dom'

const Nav = props => {
	return(
		<div className="nav">
			<Link to="/home" className="title">Home</Link>
			<Link to="/chosePage" className="title">Dogs</Link>
			<Link to="/" className="title">Store</Link>
			<Link to="/" className="title">Platform</Link>
			<Link to="/" className="title">Video</Link>
		</div>
	)
}

export default Nav
