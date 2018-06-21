import React, { Component } from 'react'
import { connect } from "react-redux";
import Actions from "Redux/Actions";
import { Button, Col, Row, Glyphicon, Alert } from 'react-bootstrap';
import * as qs from 'query-string';
import Service from '../../Services/Api'

// Tabs
import Registration from './Tabs/Registration'
import Documents from './Tabs/Documents'
import BankAccount from './Tabs/BankAccount'
import Contractors from './Tabs/Contractors'


import { isAuth } from '../../Helper'

import './styles.css';

const { localStorage } = window

class SignUp extends Component {

	constructor(props) {
		super(props);
		this.state = {
			step: isAuth() ? 1 : 0,
			fields: [
				{
					password: '',
					password2: '',
				},
				{
					first_name: '',
					last_name: '',
					phone_number: '',
					zip_codes: '',
					rate: 0,
					problem_category_id: '',
				},
				{

				},
				{
				
				},
			],
			error: '',
		};
	}

	components = [ 
		{
			component: Registration,
			ajaxMethod: options => this.signUp(options),
			callback: () => {
				this.next()
			}
		},
		{
			component: Contractors,
			ajaxMethod: options => this.updateUser(options),
			callback: () => {
				this.next()
			}
		},
		{
			component: Documents,
			ajaxMethod: () => {
				this.next()
			}
		}, 
		{
			component: BankAccount,
			ajaxMethod: () => {}
		} 
	]

	next = () => this.setState({ step: ++this.state.step })

	componentWillMount = () => {
		const query = qs.parse(window.location.search)

		let localUserData = {}
		if(Object.keys(query).length) {
			localUserData = query
			localStorage.setItem('userData', JSON.stringify(query))
			this.props.history.push('/provider')
			this.props.fetchInitialState(localUserData)
		}
		else {
			const localStorageData = localStorage.getItem('userData')
			if(localStorageData) {
				localUserData = JSON.parse(localStorageData)
				this.props.fetchInitialState(localUserData)
			}
			else {
				this.props.fetchUserRequest()
			}
		}
		
	}

	handleChange = e => {
		const {
			step, fields
		} = this.state
		const name = e.target.name
		let value = e.target.value

		fields[step][name] = value
		this.setState(this.state)
	}

	handleClick = e => {
		let { step } = this.state
		const { ajaxMethod, callback } = this.components[step]

		ajaxMethod(callback)
	}


	signUp = (cb) => {
		const {
			fields,
			step,
		} = this.state

		let {
			error,
		} = this.state

		const {
			password,
			password2,
		} = fields[step]

		const {
			email
		} = this.props.user

		Service.create().signup({
			email: email,
			password: password,
			password_confirmation: password2,
		}).then(res => {
			if(res.data.data){
				localStorage.setItem('token', res.data.data.token);
				// this.props.fetchUserRequest()
				error = res.data.meta.message
				this.setState({ error: "" })
				cb();
			}else{
				error = res.data.meta.message
				this.setState({ error: error })
			}
			
		})
	}

	updateUser = (cb) => {
		const {
			fields,
			step,
		} = this.state

		const { user } = this.props

		const {
			first_name,
			last_name,
			phone_number,
			problem_category_id,
			zip_codes,
			rate,
		} = fields[step]

		let { error } = this.state

		Service.create().updateContractors({
			first_name: first_name ? first_name : user.first_name,
			last_name: last_name ? last_name : user.last_name,
			problem_category_id: +problem_category_id,
			zip_codes: zip_codes ? zip_codes : user.zip_codes,
			phone_number: phone_number ? phone_number : user.phone_number,
			rate: rate ? rate : user.rate,
		}).then(res => {
			if(res.data.data){
				this.props.fetchUserRequest()
				localStorage.removeItem("userData")
				error = res.data.meta.message
				this.setState({ error: "" })
				cb()
			}else{
				error = res.data.meta.message
				this.setState({ error: error })
			}
		})
	}

	render() {

		const {
			state,
			props,
			components,
			handleChange,
			onSubmit,
			handleClick,
		} = this

		const {
			step,
			fields,
			error,
		} = state

		const {
			first_name,
			last_name,
			company_name,
			zip_codes,
			phone_number,
		} = props.user

		const SubComponent = components[step].component

		return(
			<div>
				<div className="container signup">
					<Row>
			  			<Col md={3} className="rightSection">
			  				<p> { first_name + ' ' + last_name } </p>
			  				<p> { company_name } </p>
			  				<p> { phone_number } </p>
			  				<p> { zip_codes } </p>
			  			</Col>
			  			<Col md={5} className="formBg">
			  				<form>
			  					<Col md={12}>
									<SubComponent fields={ fields[step] } handleChange={ handleChange } />

									{ error ?
										<Alert bsStyle="danger">{ error }</Alert>
									:
										''
									}

									{ components.length - 1 > step ?
										<div className="text-center">
											<Button bsStyle="success" onClick={ handleClick }>Next <Glyphicon glyph="chevron-right" /></Button>
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
	user: state.user
});

const mapDispatchToProps = dispatch => ({
	fetchUserRequest: payload =>
		new Promise((resolve, reject) =>
			dispatch(Actions.fetchUser(payload, resolve, reject))
		),
	fetchInitialState: payload => dispatch(Actions.fetchInitialState(payload))
});

export default connect(mapStateToProps, mapDispatchToProps)(SignUp);
