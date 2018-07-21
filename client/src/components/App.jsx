import React from 'react'
import { BrowserRouter, Route, Switch} from 'react-router-dom'

import Nav from './Nav.jsx'
import LogoInfoBox from './logIn/LogoInfoBox.jsx'
import Welcome from './home/Welcome.jsx'
import Home from './home/Home.jsx'
import Sale from './sale/Sale/Sale.jsx'
import ClickSale from './sale/Sale/clickSale.jsx'
import ForSale from './sale/ForSale/ForSale.jsx'
import ChosePage from './sale/ChosePage.jsx'
import logIn from './logIn/logIn.jsx'
import UserPage from './user/UserPage.jsx'
import EntryUserPost from './user/EntryUserPost.jsx'



class App extends React.Component {
	render() {
		return(

			<BrowserRouter>
				<div className='full-width'>
					<Nav/>
					<LogoInfoBox/>
						<Switch>
							<Route exact path='/' component={Welcome} />
							<Route exact path='/user' component={UserPage} />
							<Route path='/login' component={logIn} />
							<Route path='/home' component={Home} />
							<Route exact path='/sale' component={Sale} />
							<Route path='/sale/:postid' component={ClickSale} />
							<Route path='/forSale' component={ForSale} />
							<Route path='/chosePage' component={ChosePage} />
							<Route path='/user/:postid' component={EntryUserPost} />
						</Switch>
				</div>
			</BrowserRouter>
		)
	}
}

export default App
