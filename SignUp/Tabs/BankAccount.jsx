import React, { Component } from 'react'
import { connect } from "react-redux";
import {Row, Col, FormGroup, FormControl } from 'react-bootstrap';


class BankAccount extends Component {

	render() {

		const {
			handleChange,
			user,
		} = this.props

		const {
			first_name,
			last_name,
		} = user


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
						    {
						    	first_name.length > 0 ?
						    	<FormControl name="first_name" defaultValue={ first_name } type="text" placeholder="First Name" onChange={ handleChange } />
						    	:
						    	<FormControl name="first_name" type="text" placeholder="First Name" onChange={ handleChange } />
						    }
						</FormGroup>
					</Col>
					<Col md={6}>
						<FormGroup>
						    {
						    	last_name.length > 0 ?
						    	<FormControl name="last_name" defaultValue={ last_name } type="text" placeholder="Last Name" onChange={ handleChange } />
						    	:
						    	<FormControl name="last_name" type="text" placeholder="Last Name" onChange={ handleChange } />
						    }
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
				    <FormControl name="address" type="text" placeholder="Business Address" onChange={ handleChange }  />
				</FormGroup>

				<FormGroup>
				    <FormControl name="address_2" type="text" placeholder="Business Address 2" onChange={ handleChange }  />
				</FormGroup>

				<FormGroup>
				    <FormControl name="city" type="text" placeholder="City" onChange={ handleChange }  />
				</FormGroup>

				<FormGroup>
				    <FormControl name="state" type="text" placeholder="state" onChange={ handleChange }  />
				</FormGroup>

				<FormGroup>
				    <FormControl name="postal-code" type="text" placeholder="Postal Code" onChange={ handleChange }  />
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

const mapStateToProps = state => ({
	user: state.user
})
const mapDispatchToProps = dispatch => ({})

export default connect(mapStateToProps, mapDispatchToProps)(BankAccount);
