import React, { Component } from 'react'
import { connect } from "react-redux";
import { Row, FormGroup, FormControl } from 'react-bootstrap';

class Registration extends Component {

	render() {

		const {
			handleChange,
			user,
		} = this.props


		const {
			email,
		} = user

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
				    <FormControl name="password" type="password" placeholder="Password" onChange={ handleChange }  />
				</FormGroup>

				<FormGroup>
				    <FormControl name="password2" type="password" placeholder="Retype Password" onChange={ handleChange } />
				</FormGroup>
			</div>
		)
	}
}



const mapStateToProps = state => ({
	user: state.user
})
const mapDispatchToProps = dispatch => ({})

export default connect(mapStateToProps, mapDispatchToProps)(Registration);
