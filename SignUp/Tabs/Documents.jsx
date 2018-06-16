import React, { Component } from 'react'
import { Row, FormGroup, FormControl, ControlLabel } from 'react-bootstrap';


export default class Documents extends Component {

	render() {

		const {
			handleChange,
		} = this.props

		return(
			<div className="documents">
				<Row>
	  				<p className="tabsTitle">Required Documents</p>
	  			</Row>
				<FormGroup>
					<ControlLabel>Professional License</ControlLabel>
				    <FormControl name="professionalLicense" type="file" onChange={ handleChange } />
				</FormGroup>

				<FormGroup>
					<ControlLabel>Business License</ControlLabel>
				    <FormControl name="businessLicense" type="file" onChange={ handleChange } />
				</FormGroup>

				<FormGroup>
					<ControlLabel>Liability Insurance Summary</ControlLabel>
				    <FormControl name="liabilityInsurance" type="file" onChange={ handleChange } />
				</FormGroup>
			</div>
		)
	}
}