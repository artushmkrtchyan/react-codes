import React, { Component } from 'react'
import { Row, Col, FormGroup, FormControl } from 'react-bootstrap';

class Registration extends Component {

	render() {

		const {
			fields,
			handleChange,
			userData,
		} = this.props

		const {
			password,
			password2,
			category,
			zip,
		} = fields

		const {
			email,
		} = userData

		return(
			<div className="registration">

	  			<Row>
	  				<p className="tabsTitle">Professional Registration</p>
	  			</Row>
	  			<div className="userEmail">
	  			<p>Username:</p>
	  			<p>{ email }</p>
	  			</div>
				<FormGroup>
				    <FormControl name="password" value={ password } type="password" placeholder="Password" onChange={ handleChange }  />
				</FormGroup>

				<FormGroup>
				    <FormControl name="password2" value={ password2 } type="password" placeholder="Retype Password" onChange={ handleChange } />
				</FormGroup>

				<FormGroup>
				    <FormControl name="category" value={ category } componentClass="select" placeholder="Service Category" onChange={ handleChange }>
				        <option value="">Service Category</option>
				        <option value="other">...</option>
				    </FormControl>
			    </FormGroup>

			    <FormGroup>
			    	<p>Please enter all zip codes separated by commas</p>
			    	<Row>
			    		<Col md={8}>
				    		<FormControl name="zip" value={ zip } type="text" placeholder="Service Area" onChange={ handleChange } />
				    	</Col>
				    </Row>
				</FormGroup>
			</div>
		)
	}
}


export default Registration;
