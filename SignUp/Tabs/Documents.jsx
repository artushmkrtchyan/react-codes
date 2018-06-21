import React, { Component } from 'react';
import { connect } from "react-redux";
import Actions from "Redux/Actions";
import { Row, FormGroup, FormControl, ControlLabel, Alert } from 'react-bootstrap';
import _ from 'lodash';
import Service from '../../../Services/Api';


class Documents extends Component {

	constructor(props) {
		super(props);

		this.state = {
			error: '',
		}
	}

	uploadDocument = e => {
		let { error } = this.state
		const name = e.target.name;
		const form = new FormData();
		form.append('image', e.target.files[0])
		form.append('type', 'File')
		form.append('document_type', name)
		Service.create().uploadDocument(form)
		.then( res => {
			if(res.data.data){
				this.props.fetchUserRequest()
				error = ''
				this.setState({error: error })
			}else{
				error = res.data.meta.message
				this.setState({error: error })
			}
		})
	}

	render() {

		const {
			uploadDocument,
			props,
		} = this

		const {
			error,
		} = this.state

		const { user: { documents } } = props

		const professional_license = _.find(documents, ['document_type', 'professional_license'])
		const business_license = _.find(documents, ['document_type', 'business_license'])
		const liability_insurance = _.find(documents, ['document_type', 'liability_insurance'])

		return(
			<div className="documents">
				<Row>
	  				<p className="tabsTitle">Required Documents</p>
	  			</Row>
				<FormGroup>
					<ControlLabel>Professional License</ControlLabel>
				    
				    { professional_license ?
				    	<div><img alt="" src={professional_license.thumbnail} /></div>
				    	:
				    	<FormControl name="professional_license" type="file" onChange={ uploadDocument } />
				    }
				</FormGroup>

				<FormGroup>
					<ControlLabel>Business License</ControlLabel>
				    { business_license ?
				    	<div><img alt="" src={business_license.thumbnail} /></div>
				    	:
				    	<FormControl name="business_license" type="file" onChange={ uploadDocument } />
				    }
				</FormGroup>

				<FormGroup>
					<ControlLabel>Liability Insurance Summary</ControlLabel>
				    { liability_insurance ?
				    	<div><img alt="" src={liability_insurance.thumbnail} /></div>
				    	:
				    	<FormControl name="liability_insurance" type="file" onChange={ uploadDocument } />
				    }
				</FormGroup>
				{ error ?
					<Alert bsStyle="danger">{ error }</Alert>
				:
					''
				}
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
		)
});

export default connect(mapStateToProps, mapDispatchToProps)(Documents);