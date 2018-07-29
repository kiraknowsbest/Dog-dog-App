import React from 'react'
import $ from 'jquery'
import moment from 'moment'
import { connect } from 'react-redux'
import { changePosts } from '../../../action/changePost.js'

const mapStateToProps = (state, props) => {
	return {
		posts: state.posts
	}
}

const mapDispatchToProps = (dispatch, props) => {
	return {
		changePostsToSort: function (posts) {
			dispatch(changePosts(posts))
		}
	}
}

class Sort extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			show: false,
			selectedField: ''
		}
		this.changeShowOrHide = this.changeShowOrHide.bind(this);
		this.clickSort = this.clickSort.bind(this);
	}

	changeShowOrHide() {
		this.setState({
			show: !this.state.show
		})
	}

	clickSort (text) {
		this.setState({
			selectedField: text
		})
		var newPosts = this.props.posts.slice(0);
		if (text === 'New Post') {
			newPosts = newPosts.sort(function(a,b){
				return moment(b.creatAt).format("YYYYMMDDHHMM") - moment(a.creatAt ).format("YYYYMMDDHHMM");
			})
		} else if (text === 'Hot Post') {
			newPosts = newPosts.sort(function(a,b){
				return b.view - a.view
			})
		} else if (text === 'Price Up') {
			newPosts = newPosts.sort(function(a,b){
				return a.info.price.fullPrice - b.info.price.fullPrice
			})
		} else if (text === 'Age Up') {
			newPosts = newPosts.sort(function(a,b){
				return parseInt('' + a.info.age.year + a.info.age.month) - parseInt('' + b.info.age.year + b.info.age.month)
			})
		} else if (text === 'Price Down') {
			newPosts = newPosts.sort(function(a,b){
				return b.info.price.fullPrice - a.info.price.fullPrice
			})
		} else if (text === 'Age Down') {
			newPosts = newPosts.sort(function(a,b){
				return parseInt('' + b.info.age.year + b.info.age.month) - parseInt('' + a.info.age.year + a.info.age.month)
			})
		}
		this.props.changePostsToSort(newPosts)
	}

	render() {
		return(
			<div>
				<h3 className={this.state.show ? 'selected-option' : 'sort-header'} onClick={this.changeShowOrHide}>Sort</h3>
				{this.state.show ? (
					<div>
						<div className={this.state.selectedField === 'New Post' ? 'selected-text sort-item' : 'sort-item'} onClick={this.clickSort.bind(null, "New Post")}>
							New Post
						</div>
						<div className={this.state.selectedField === 'Hot Post' ? 'selected-text sort-item' : 'sort-item'} onClick={this.clickSort.bind(null, "Hot Post")}>
							Hot Post
						</div>
						<div className={this.state.selectedField === 'Price Up' ? 'selected-text sort-item' : 'sort-item'} onClick={this.clickSort.bind(null, "Price Up")}>
							Price Up
						</div>
						<div className={this.state.selectedField === 'Price Down' ? 'selected-text sort-item' : 'sort-item'} onClick={this.clickSort.bind(null, "Price Down")}>
							Price Down
						</div>
						<div className={this.state.selectedField === 'Age Up' ? 'selected-text sort-item' : 'sort-item'} onClick={this.clickSort.bind(null, "Age Up")}>
							Age Up
						</div>
						<div className={this.state.selectedField === 'Age Down' ? 'selected-text sort-item' : 'sort-item'} onClick={this.clickSort.bind(null, "Age Down")}>
							Age Down
						</div>
					</div>
				) : null}
			</div>
		)
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Sort)
