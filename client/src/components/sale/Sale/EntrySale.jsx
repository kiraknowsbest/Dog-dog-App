import React from 'react'
import moment from 'moment'
import { Link } from 'react-router-dom'

class EntrySale extends React.Component {

	render(){
		return(
			<Link to={`/sale/${this.props.post._id}`} className="link-post">
				<div className='post'  onClick={()=>this.props.changeCurrentPost(this.props.post)}>
					<div className='EntrySale-Title-Box'>
						<h3 className='EntrySale-Title'>{this.props.post.title}</h3>
					</div>
					<img className='post-image' src={this.props.post.photo[0]}/>
						<div style={{width:'100px'}}>{this.props.post.type}</div>
						<div className="infoBoxEntrySale">
							<div className='entry-sale-item '>
								<span className='entry-sale-field-title'>Age:</span>
								<span className='entry-sale-field-value'>{this.props.post.info.age.year > 0 ? this.props.post.info.age.year > 1 ? `${this.props.post.info.age.year} years` : `${this.props.post.info.age.year} year` : ''}</span>
								<span className='entry-sale-field-value'>{this.props.post.info.age.month > 0 ? this.props.post.info.age.month > 1 ? `${this.props.post.info.age.month} months` : `${this.props.post.info.age.month} month` : ''}</span>
							</div>
							<div className='entry-sale-item '>
								<span className='entry-sale-field-title'>Location:</span>
								<span className='entry-sale-field-value'>{this.props.post.location.city}</span>
								<span className='entry-sale-field-value'>{this.props.post.location.state}</span>
							</div>
							<div className='entry-sale-item '>
								<span className='entry-sale-field-title'>Price:</span>
								<span className='entry-sale-field-value'>{this.props.post.info.price.fullPrice}</span>
							</div>
						</div>
						<div className="infoBoxEntrySale">
							<div className='entry-sale-item '>
								<span className='entry-sale-field-title'>Sex:</span>
								<span className='entry-sale-field-value'>{this.props.post.info.sex}</span>
							</div>
							<div className='entry-sale-item '>
								<span className='entry-sale-field-title'>Breed:</span>
								<span className='entry-sale-field-value'>{this.props.post.info.type}</span>
							</div>
							<div className='entry-sale-item '>
								<span className='entry-sale-field-title'>Size:</span>
								<span className='entry-sale-field-value'>{this.props.post.info.size}</span>
							</div>
						</div>
						<div className="infoBoxEntrySale">
							<div className='entry-sale-item '>
								<span className='entry-sale-field-title left'>Posted:</span>
								<span className='entry-sale-field-value left'>{moment(this.props.post.creatAt).startOf('hour').fromNow()}</span>
							</div>
							<div className='entry-sale-item'></div>
							<div className='entry-sale-item '>
								<span className='entry-sale-field-title'>Views:</span>
								<span className='entry-sale-field-value'>{this.props.post.view}</span>
							</div>
					</div>
				</div>
			</Link>
		)
	}
}

export default EntrySale;
