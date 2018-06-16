import React, { Component } from 'react'
import {Row, Col, FormGroup, FormControl } from 'react-bootstrap';


export default class BankAccount extends Component {

	render() {

		const {
			handleChange,
		} = this.props

		return(
			<div className="bankAccount">

	  			<Row>
	  				<p className="tabsTitle">Bank Account Information</p>
	  			</Row>
	  			<Row>
		  			<Col md={12}>
		  				<p>Account Holder</p>
		  			</Col>
		  			<Col md={6}>
						<FormGroup>
						    <FormControl name="first-name" type="text" placeholder="First Name" onChange={ handleChange }  />
						</FormGroup>
					</Col>
					<Col md={6}>
						<FormGroup>
						    <FormControl name="last-name"  type="text" placeholder="Last Name" onChange={ handleChange }  />
						</FormGroup>
					</Col>
				</Row>

				<FormGroup>
				    <FormControl name="bank-name"  type="text" placeholder="Bank Name" onChange={ handleChange }  />
				</FormGroup>

				<Row>
		  			<Col md={6}>
						<FormGroup>
						    <FormControl name="routing" type="text" placeholder="Routing #" onChange={ handleChange }  />
						</FormGroup>
					</Col>
					<Col md={6}>
						<FormGroup>
						    <FormControl name="account" type="text" placeholder="Account #" onChange={ handleChange }  />
						</FormGroup>
					</Col>
				</Row>

				<FormGroup>
				    <FormControl name="business-address" type="text" placeholder="Business Address" onChange={ handleChange }  />
				</FormGroup>

			    <FormGroup>
			    	<Row>
			    		<Col md={8}>
				    		<FormControl name="ssn" type="text" placeholder="SSN #" onChange={ handleChange } />
				    	</Col>
				    </Row>
				</FormGroup>
			</div>
		)
	}
}
