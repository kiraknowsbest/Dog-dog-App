import React from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { withRouter } from 'react-router-dom'
import UploadPicture from '../sale/ForSale/UploadPicture.jsx'

class EditPost extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			id: this.props.post._id || "",
			imageUrls: this.props.post.imageUrls || "",
			title: this.props.post.title || "",
			type: this.props.post.type || "",
			size: this.props.post.size || "",
			sex: this.props.post.sex || "",
			year: this.props.post.year || "",
			month: this.props.post.month || "",
			color: this.props.post.color || "",
			fullPrice: this.props.post.fullPrice || "",
			deposit: this.props.post.deposit || "",
			email: this.props.post.email || "",
			call: this.props.post.call || "",
			street: this.props.post.street || "",
			city: this.props.post.city || "",
			state: this.props.post.state || "",
			zipcode: this.props.post.zipcode || "",
			description: this.props.post.description || ""
		}
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

	onSubmit (e) {
		e.preventDefault()
		var app = this;
		axios({
			method: 'post',
			url: "http://localhost:3000/api/editPost",
			data: {
				id: app.state.id,
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
				console.log("edited post! ", response)
			})
			.catch(function (error) {
				console.log(error);
			});
	}

	getUrl (data) {
		this.setState({
			imageUrls: this.state.imageUrls.concat(data)
		})
	}

	getTitle(e) {
		this.setState({title: e.target.value});
	}

	getType(e) {
		this.setState({type: e.target.value});
	}

	getSize(e) {
		this.setState({size: e.target.value});
	}

	getSex(e) {
		this.setState({sex: e.target.value});
	}

	getYear(e) {
		this.setState({year: e.target.value});
	}

	getMonth(e) {
		this.setState({month: e.target.value});
	}

	getColor(e) {
		this.setState({color: e.target.value});
	}

	getFullPrice(e) {
		this.setState({fullPrice: e.target.value});
	}

	getDeposit(e) {
		this.setState({deposit: e.target.value});
	}

	getEmail(e) {
		this.setState({email: e.target.value});
	}

	getCall(e) {
		this.setState({call: e.target.value});
	}

	getStreet(e) {
		this.setState({street: e.target.value});
	}

	getCity(e) {
		this.setState({city: e.target.value});
	}

	getState(e) {
		this.setState({state: e.target.value});
	}

	getZipcode(e) {
		this.setState({zipcode: e.target.value});
	}

	getDescription(e) {
		this.setState({description: e.target.value});
	}

	render() {
		return(
			<div className="EditPost">
				<div>
					<h1>Edit imformation</h1>
					<form className="form-style-7" onSubmit={this.onSubmit}>
						<ul>
							<li>
								<label htmlFor="title">Title</label>
								<input type="text" name="title" maxLength="100" onChange={this.getTitle} value={`${this.state.title}`}/>
								<span>Enter your your post title here</span>
							</li>
							<li>
								<label htmlFor="type">Type</label>
								<input type="text" name="type" maxLength="100" onChange={this.getType} value={`${this.state.type}`}/>
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
							</div>
							<br/>
							<div>
								<UploadPicture getUrl={this.getUrl} />
							</div>
							<br/>
							<li>
								<label htmlFor="color">Color</label>
								<input type="text" name="color" maxLength="100"	onChange={this.getColor} value={`${this.state.color}`}/>
								<span>Enter your your dog's color here</span>
							</li>
							<li>
								<label htmlFor="fullPrice">Price</label>
								FullPrice:
								<input type="text" name="fullPrice" maxLength="100" onChange={this.getFullPrice} value={`${this.state.fullPrice}`}/>
								Deposit:
								<input type="text" name="deposit" maxLength="100"	onChange={this.getDeposit} value={`${this.state.deposit}`}/>
								<span>Enter your your dog's price here</span>
							</li>
							<li>
								<label htmlFor="Connect">Connect</label>
								email:
								<input type="text" name="email" maxLength="100" onChange={this.getEmail} value={`${this.state.email}`}/>
								call:
								<input type="text" name="call" maxLength="100"	onChange={this.getCall} value={`${this.state.call}`}/>
								<span>Enter your your connect here</span>
							</li>
							<li>
								<label htmlFor="Address">Address</label>
								<input type="text" name="street" maxLength="100"	onChange={this.getStreet} value={`${this.state.street}`}/>street:
								<input type="text" name="city" maxLength="100" onChange={this.getCity} value={`${this.state.city}`}/>city:
								<input type="text" name="state" maxLength="100" onChange={this.getState} value={`${this.state.state}`}/>state:
								<input type="text" name="zipcode" maxLength="100" onChange={this.getZipcode} value={`${this.state.zipcode}`}/>zipcode:
								<span>Enter your your address here</span>
							</li>
						</ul>
						description:
						<input type="text" placeholder="let's start write something about your dog..." style={{width:"400px",height:"200px"}}	onChange={this.getDescription} value={`${this.state.description}`}/>
						<input type="submit" value="Submit"/>
					</form>
				</div>
			</div>
		)
	}
}

export default withRouter(EditPost)
