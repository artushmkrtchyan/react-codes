import React, { Component } from 'react'
import { connect } from "react-redux";
import {Row, Col, FormGroup, FormControl } from 'react-bootstrap';

import Service from '../../../Services/Api'


class Contractor extends Component {

	constructor(props) {
		super(props);

		this.state = {
			problemCategories: [],
		}
	}

	componentWillMount = () => {
		let { problemCategories } = this.state

		Service.create().getProblemCategories().then(res => {
			this.setState({ problemCategories: res.data.data })
			
		})
	}

	render() {
		const {
			problemCategories
		} = this.state

		const {
			handleChange,
			user,
		} = this.props

		const {
			first_name,
			last_name,
			phone_number,
			problem_category,
			zip_codes,
			rate,
		} = user

		return(
			<div className="bankAccount">

	  			<Row>
	  				<p className="tabsTitle">Contractor</p>
	  			</Row>

	  			<Row>
		  			<Col md={6}>
						<FormGroup>
						    {
						    	first_name ?
						    	<FormControl name="first_name" defaultValue={ first_name } type="text" placeholder="First Name" onChange={ handleChange } />
						    	:
						    	<FormControl name="first_name" type="text" placeholder="First Name" onChange={ handleChange } />
						    }
						</FormGroup>
					</Col>
					<Col md={6}>
						<FormGroup>
						    {
						    	last_name ?
						    	<FormControl name="last_name" defaultValue={ last_name } type="text" placeholder="Last Name" onChange={ handleChange } />
						    	:
						    	<FormControl name="last_name" type="text" placeholder="Last Name" onChange={ handleChange } />
						    }
						</FormGroup>
					</Col>
				</Row>

				<FormGroup>
				    <FormControl name="problem_category_id" componentClass="select" placeholder="Service Category" onChange={ handleChange }>
				        <option value="">Service Category</option>
				        {
	                          problemCategories.map( (cat, key) => (
	                          	problem_category === cat.title ?
	                            <option key={key} selected="true" value={cat.id}>{cat.title}</option>
	                            :
	                            <option key={key} value={cat.id}>{cat.title}</option>
	                          ))
                        }
				    </FormControl>
			    </FormGroup>

			    <FormGroup>
			    	<p>Please enter all zip codes separated by commas</p>
			    	<Row>
			    		<Col md={8}>
				    		<FormControl name="zip_codes" type="text" defaultValue={ zip_codes } placeholder="Service Area" onChange={ handleChange } />
				    	</Col>
				    </Row>
				</FormGroup>

				<Row>
		  			<Col md={6}>
						<FormGroup>
							{
						    	phone_number ?
						    	<FormControl name="phone_number" defaultValue={ phone_number } type="text" placeholder="Phone Number" onChange={ handleChange } />
						    	:
						    	<FormControl name="phone_number" type="text" placeholder="Phone Number" onChange={ handleChange } />
						    }
						</FormGroup>
					</Col>
					<Col md={6}>
						<FormGroup>
							{
						    	rate ?
						    	<FormControl name="rate" defaultValue={ rate } type="text" placeholder="Enter your rate per hour" onChange={ handleChange } />
						    	:
						    	<FormControl name="rate" type="text" placeholder="Enter your rate per hour" onChange={ handleChange } />
						    }
						</FormGroup>
					</Col>
				</Row>

			</div>
		)
	}
}

const mapStateToProps = state => ({
	user: state.user
})
const mapDispatchToProps = dispatch => ({})

export default connect(mapStateToProps, mapDispatchToProps)(Contractor);
