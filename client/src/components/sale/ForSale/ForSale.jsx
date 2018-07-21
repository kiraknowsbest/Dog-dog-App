import React from 'react'
import UploardPicture from './UploardPicture.jsx'
import axios from 'axios'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import logIn from '../../logIn/logIn.jsx'
import { Redirect } from 'react-router-dom'

const mapStateToProps = (state, props) => {

	return {
		login: state.login,
		user: state.user
	}
}

const mapDispatchToProps = (dispatch, props) => {
	return {
	}
}
class ForSale extends React.Component {
	constructor(props) {
	  super(props);
	    this.state = {
	    	imageUrls: [],
	    	title: '',
	    	type: '',
	    	size: "Middle",
	    	sex: "Male",
	    	year: "0",
	    	month: "0",
	    	color: '',
	    	fullPrice: 0,
	    	deposit: 0,
	    	email: '',
	    	call: '',
	    	street: '',
	    	city: '',
	    	state: '',
	    	zipcode: '',
	    	description: ''
	    };

	this.getTitle = this.getTitle.bind(this);
	this.getType = this. getType.bind(this);
	this.getSize = this.getSize.bind(this);
	this.getSex = this.getSex.bind(this)
	this.getYear = this.getYear.bind(this);
	this.getMonth = this.getMonth.bind(this);
	this.getColor = this.getColor.bind(this);
	this.getFullPrice = this.getFullPrice.bind(this);
	this.getDeposit = this.getDeposit.bind(this);
	this.getEmail = this.getEmail.bind(this);
	this.getCall = this.getCall.bind(this);
	this.getStreet = this.getStreet.bind(this);
	this.getCity = this.getCity.bind(this);
	this.getState = this.getState.bind(this);
	this.getZipcode = this.getZipcode.bind(this);
	this.getDescription = this.getDescription.bind(this);

	this.getUrl = this.getUrl.bind(this);
	this.onSubmit = this.onSubmit.bind(this);
  }

  	getUrl (data) {
  		this.setState({
  			imageUrls: data
  		})
  	}

  	onSubmit (e) {
  		e.preventDefault()
  		if (this.props.login === false) {
  			this.props.history.push('/login')
  		} else if (this.props.login) {
  		var app = this;
  		axios({
	  		method: 'post',
	  		url: "http://localhost:3000/api/submitPost",
	  		data: {
	  				title: app.state.title,
					creatAt: new Date(),
					info: {
						type: app.state.type,
						age: {
							year: parseInt(app.state.year),
							month: parseInt(app.state.month)
						},
						size: app.state.size,
						sex: app.state.sex,
						color: app.state.color,
						price: {
							fullPrice: app.state.fullPrice,
							deposit: app.state.deposit
						},
						connect: {
							email: app.state.email,
							call: app.state.call
						}
					},
					view: 0,
					comments:[],
					photo: app.state.imageUrls,
					location: {
						street: app.state.street,
						city: app.state.city,
						state: app.state.state,
						zipcode: app.state.zipcode
					},
					description: app.state.description
	  		}
	  	})
		  .then(function (response) {
			    axios({
			    	method:'post',
			    	url: "http://localhost:3000/api/addPostToUser",
			    	data: {
			    		id: response.data._id,
			    		user: app.props.user
			    	}
			    })
			    .then(function(response) {
			    	app.props.history.push('/sale')
			    })
			    .catch(function (error) {
			    	console.log(error);
			  });

		  })
		  .catch(function (error) {
		    console.log(error);
		  });
		}
  	}


  	getTitle(e) {
    this.setState({title: e.target.value});
    console.log("title",this.state.title)
  }

    getType(e) {
    this.setState({type: e.target.value});
    console.log("type",this.state.type)
  }

  	getSize(e) {
    this.setState({size: e.target.value});
    console.log("size",this.state.size)
  }

  	getSex(e) {
    this.setState({sex: e.target.value});
    console.log("sex",this.state.sex)
  }

  	getYear(e) {
    this.setState({year: e.target.value});
    console.log("year",this.state.year)
  }

  	getMonth(e) {
    this.setState({month: e.target.value});
    console.log("month",this.state.month)
  }

  	getColor(e) {
    this.setState({color: e.target.value});
    console.log("color",this.state.color)
  }

  	getFullPrice(e) {
    this.setState({fullPrice: e.target.value});
    console.log("fullPrice",this.state.fullPrice)
  }

  	getDeposit(e) {
    this.setState({deposit: e.target.value});
    console.log("deposit",this.state.deposit)
  }

  	getEmail(e) {
    this.setState({email: e.target.value});
    console.log("email",this.state.email)
  }

  	getCall(e) {
    this.setState({call: e.target.value});
    console.log("call",this.state.call)
  }

  	getStreet(e) {
    this.setState({street: e.target.value});
    console.log("street",this.state.street)
  }

  	getCity(e) {
    this.setState({city: e.target.value});
    console.log("city",this.state.city)
  }

  	getState(e) {
    this.setState({state: e.target.value});
    console.log("state",this.state.state)
  }

  	getZipcode(e) {
    this.setState({zipcode: e.target.value});
    console.log("zipcode",this.state.zipcode)
  }

  	getDescription(e) {
    this.setState({description: e.target.value});
    console.log("description",this.state.description)
  }
	render() {
		return(
			<div>
				<h1 className='centered'>Let's fill out some imformation</h1>
					<form className="form-style-7" onSubmit={this.onSubmit}>
					<ul>
					<li>
					<label htmlFor="title">Title</label>
   					<input type="text" name="title" maxLength="100" onChange={this.getTitle}/>
    				<span>Enter your your post title here</span>
    			</li>
					<li>
					<label htmlFor="type">Type</label>
   					<input type="text" name="type" maxLength="100" onChange={this.getType}/>
    				<span>Enter your your dog's type here</span>
    			</li>
    	<div>
					<li>
					<label htmlFor="size">Size</label>
   						<select onChange={this.getSize} value={this.state.size}>
							  <option value="Middle">Middle</option>
							  <option value="Large">Large</option>
							  <option value="Small">Small</option>
							</select>
    				<span>Enter your your dog's size here</span>
    			</li>
    				<li>
					<label htmlFor="sex">Sex</label>
   						<select onChange={this.getSex} value={this.state.sex}>
							  <option value="Male">Male</option>
							  <option value="Female">Female</option>
							</select>
    				<span>Enter your your dog's sex here</span>
    			</li>
					<li>
					<label htmlFor="age">Age</label>
						<select onChange={this.getYear} value={this.state.year}>
							  <option value="0">0</option>
							  <option value="1">1</option>
							  <option value="2">2</option>
							  <option value="3">3</option>
							  <option value="4">4</option>
							  <option value="5">5</option>
							  <option value="6">6</option>
							  <option value="7">7</option>
							  <option value="8">8</option>
							  <option value="9">9</option>
							  <option value="10">10</option>
							  <option value="11">11</option>
							  <option value="12">12</option>
							</select>
							Year
							<select onChange={this.getMonth} value={this.state.month}>
							  <option value="0">0</option>
							  <option value="1">1</option>
							  <option value="2">2</option>
							  <option value="3">3</option>
							  <option value="4">4</option>
							  <option value="5">5</option>
							  <option value="6">6</option>
							  <option value="7">7</option>
							  <option value="8">8</option>
							  <option value="9">9</option>
							  <option value="10">10</option>
							  <option value="11">11</option>
							  <option value="12">12</option>
							  <option value="13">13</option>
							  <option value="14">14</option>
							  <option value="15">15</option>
							  <option value="16">16</option>
							  <option value="17">17</option>
							  <option value="18">18</option>
							  <option value="19">19</option>
							  <option value="20">20</option>
							</select>
							Month
    				<span>Enter your your dog's age here</span>
    			</li>
				</div><br/>
					<div>
						<UploardPicture getUrl={this.getUrl}/>
					</div><br/>
					<li>
					<label htmlFor="color">Color</label>
   					<input type="text" name="color" maxLength="100" placeholder="Black" onChange={this.getColor}/>
    				<span>Enter your your dog's color here</span>
    			</li>
    			<li>
					<label htmlFor="fullPrice">Price</label>
					FullPrice:
   					<input type="text" name="fullPrice" maxLength="100" placeholder="1500" onChange={this.getFullPrice}/>
   				Deposit:
   					<input type="text" name="deposit" maxLength="100" placeholder="500" onChange={this.getDeposit}/>
    				<span>Enter your your dog's price here</span>
    			</li>
    			<li>
					<label htmlFor="Connect">Connect</label>
					email:
   					<input type="text" name="email" maxLength="100" placeholder="xxxx@gmail.com" onChange={this.getEmail}/>
   				call:
   					<input type="text" name="call" maxLength="100" placeholder="415-XXX-XXXX" onChange={this.getCall}/>
    				<span>Enter your your connect here</span>
    			</li>
    			<li>
					<label htmlFor="Address">Address</label>
				<input type="text" name="street" maxLength="100" placeholder="16243 Miramar Pl" onChange={this.getStreet}/>street:
   				<input type="text" name="city" maxLength="100" placeholder="San Leandro" onChange={this.getCity}/>city:
   				<input type="text" name="state" maxLength="100" placeholder="CA" onChange={this.getState}/>state:
   				<input type="text" name="zipcode" maxLength="100" placeholder="94578" onChange={this.getZipcode}/>zipcode:
    				<span>Enter your your address here</span>
    			</li>
					</ul>
					description:
							<input type="text" placeholder="let's start write something about your dog..." style={{width:"400px",height:"200px"}}  onChange={this.getDescription}/>
						<input type="submit" value="Submit"/>
					</form>
			</div>
		)
	}
}

export default connect(mapStateToProps, mapDispatchToProps) (ForSale)
