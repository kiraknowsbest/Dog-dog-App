import React from 'react'
import { connect } from 'react-redux'
import { addPosts, changePosts } from '../../../action/changePost.js'
import { addUsers } from '../../../action/changeUser.js'
import axios from 'axios'
import EntrySale from './EntrySale.jsx'
import SeachBar from './SeachBar.jsx'
import ClickSale from './clickSale.jsx'
import FilterBox from './FilterBox.jsx'


const mapStateToProps = (state, props) => {

	return {
		posts: state.posts,
		users:state.users
	}
}

const mapDispatchToProps = (dispatch, props) => {
	return {
		addPostsToStore: function (posts) {
			dispatch(addPosts(posts))
		},
		addUsersToStore: function (users) {
			dispatch(addUsers(users))
		},
		changePostsToStore: function (posts) {
			dispatch(changePosts(posts))
		}
	}
}

class Sale extends React.Component {
	constructor(props) {
	  super(props);
	    this.state = {
	    	currentPost: '',
	    	view: true,
	    	currentPage: 1,
	    	postsPerPage:5,
	    };
	this.showComponent = this.showComponent.bind(this);
	// this.changeView = this.changeView.bind(this);
	this.changeCurrentPost = this.changeCurrentPost.bind(this);
	this.handleClickPage = this.handleClickPage.bind(this);
	this.changeComments = this.changeComments.bind(this);

  }

  handleClickPage (e) {
  	this.setState({
  		currentPage: Number(e.target.id)
  	})
  }

	componentDidMount () {
		fetch('http://localhost:3000/api/posts')
			.then(res => {
				return res.json()
			}).then((data) => {
				let postIds = new Set(this.props.posts.map(function (post) { return post._id; }))
				let newPosts = data.filter(function (post) {
					return !postIds.has(post._id)
				}).map(function(post) {
					post.keyWords = "";
					post.keyWords += post.info.type;
					post.keyWords += post.info.color;
					post.keyWords += post.location.city;
					return post;
				})

				this.props.addPostsToStore(newPosts)
				this.setState({
					currentPost: newPosts[0]
				})
			})
			.catch(function (err) {
				console.error('error getting data: ', err)
			});

			fetch('http://localhost:3000/api/users')
			.then(res => {
				return res.json()
			}).then((data) => {
				let userIds = new Set(this.props.users.map(function (user) { return user._id; }))
				let newUsers = data.filter(function (user) {
					return !userIds.has(user._id)
				})
				this.props.addUsersToStore(newUsers)

			})
			.catch(function (err) {
				console.error('error getting data: ', err)
			})

	}
	changeCurrentPost (post) {
		var app = this;
		this.setState({
			view:!this.state.view,
			currentPost:post
		},function() {
			axios({
	  		method: 'post',
	  		url: `http://localhost:3000/api/viewUp/${app.state.currentPost._id}`,
	  	})
		  .then(function (response) {
		    var newPosts = app.props.posts.map(function(x) {
		    	if (x._id === response.data._id) {
		    		x.view++
		    	}
		    	return x ;
		    })
		    app.props.changePostsToStore(newPosts)

		  })
		  .catch(function (error) {
		    console.log(error);
		  });
		})
	}


	changeComments (data) {
	  var newPost = Object.assign({}, this.state.currentPost)
	   newPost.comments.push(data)
	  this.setState({
	   currentPost: newPost
	  })
	 }


	showComponent () {
		// if (this.state.view === true) {
			const indexOfLastPost = this.state.currentPage * this.state.postsPerPage;
			const indexOfFirstPost = indexOfLastPost - this.state.postsPerPage;
			const currentPosts = this.props.posts.slice(indexOfFirstPost, indexOfLastPost)
			return (
				<div>
					{currentPosts.map((post,i) => {
						return(
								<EntrySale post={post} key={i} changeView={this.changeView} changeCurrentPost={this.changeCurrentPost} />
						)
					})}
				</div>
			)
	}

	render() {
		const pageNumbers= [];
		for (let i = 1; i <= Math.ceil(this.props.posts.length / this.state.postsPerPage); i++) {
			pageNumbers.push(i)
		}

		const renderPageNumbers = pageNumbers.map(number => {
          return (
            <li className="page-per-numbers" key={number} id={number} onClick={this.handleClickPage}>
              <span>{number}</span>
            </li>
          );
        });
		return(
			<div>
				<FilterBox/>
				<SeachBar/>
				{this.showComponent()}
				<ul className="page-numbers" >{renderPageNumbers}</ul>
			</div>
		)
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Sale)
