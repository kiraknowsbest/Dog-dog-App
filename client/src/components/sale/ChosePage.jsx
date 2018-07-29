import React from 'react'
import { Link } from 'react-router-dom'
import Sale from './Sale/Sale.jsx'
import ForSale from './ForSale/ForSale.jsx'

class ChosePage extends React.Component {
	render() {
		return(
			<div className='centered-container'>
				<Link className='centered sale-selection' to='/forSale'>SALE</Link><br/>
				<Link className='centered sale-selection' to='/sale'>LOOKING FOR DOG</Link>
			</div>
		)
	}
}

export default ChosePage
