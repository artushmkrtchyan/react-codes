import React, { Component } from 'react'
import { connect } from "react-redux";
import { Button, Col, Row, Glyphicon } from 'react-bootstrap';

import Service from '../../Services/Api'

// Tabs
import Registration from './Tabs/Registration'
import Documents from './Tabs/Documents'
import BankAccount from './Tabs/BankAccount'
import './styles.css';

class SignUp extends Component {

	constructor(props) {
		super(props);
		this.components = [ Registration, Documents, BankAccount ]
		this.state = {
			step: 0,
			fields: [
				{
					password: '',
					password2: '',
					category: '',
					zip: '',
				},
				{

				},
				{
				
				},
			],
			userData: {
				name: "John Plumber",
				companyName: "Atlant Pipe Specialists, INC",
				city: "Marietta, Georgia",
				email: "john@atlahtapipe.com"
			},
		};
	}

	handleChange = e => {
		const {
			step, fields
		} = this.state
		const name = e.target.name
		let value = e.target.value

		if(e.target.type === 'file') {
	        let inputFile = document.querySelector('input[type="file"]')
	        value = inputFile.files[0];
	     }

		fields[step][name] = value
		this.setState(this.state)

		console.log(fields)
	}

	onSubmit = e => {
		const {
			fields,
			userData
		} = this.state

		const {
			businessLicense,
			liabilityInsurance,
			professionalLicense,
		} = fields[1]

		const {
			password,
			password2,
		} = fields[0]

		const {
			email
		} = userData

	    e.preventDefault()

			let formData = new FormData();
			formData.append('businessLicense', businessLicense);
			formData.append('liabilityInsurance', liabilityInsurance);
			formData.append('professionalLicense', professionalLicense);

		Service.create().signup({
			email: email,
			password: password,
			password_confirmation: password2,
		}).then(console.log)
	}

	render() {

		const {
			state,
			components,
			handleChange,
			onSubmit,
		} = this
		let {
			step,
			fields,
			userData,
		} = state
		const {
			name,
			companyName,
			city,
			email,
		} = userData

		const SubComponent = components[step]

		return(
			<div>
				<div className="container signup">
					<Row>
			  			<Col md={3} className="rightSection">
			  				<p> { name } </p>
			  				<p> { companyName } </p>
			  				<p> { city } </p>
			  			</Col>
			  			<Col md={5} className="formBg">
			  				<form>
			  					<Col md={12}>
									<SubComponent userData={ userData } fields={ fields[step] } handleChange={ handleChange } />
									{ components.length - 1 > step ?
										<div className="text-center">
											<Button bsStyle="success" onClick={() => this.setState({ step: ++step })}>Next <Glyphicon glyph="chevron-right" /></Button>
										</div>
									:
										<div className="text-center">
											<Button bsStyle="primary" onClick={ onSubmit }>Submit </Button>
										</div> }
								</Col>		
							</form>
			  			</Col>
			  			<Col md={4} className="leftSection">
			  				<p>
			  					Jonny On It, LLC requires the following<br/>
			  					information of all registered providers:
			  				</p>
			  				<ul>
			  					<li>Professional Licenses</li>
			  					<li>Insuraance coverage</li>
			  					<li>Bank Account information (so you can get paid)</li>
			  				</ul>
			  			</Col>
					</Row>
				</div>
			</div>
		)
	}
}

const mapStateToProps = state => ({

});

const mapDispatchToProps = dispatch => ({

});

export default connect(mapStateToProps, mapDispatchToProps)(SignUp);
