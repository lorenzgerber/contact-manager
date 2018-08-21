import React from 'react'
import "./FormExample.css"
import { FormGroup , ControlLabel , FormControl , Button } from 'react-bootstrap'

class FormExample extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.handleChange = this.handleChange.bind(this);

    this.state = {
      value: ''
    };
  }

  getValidationState() {
	  const value = this.state.value
		if (value === 'X' || value === 'Y' || value === 'MT' ) return 'success'
		else if ( value > 0 && value < 23 && (value % 1 === 0 ) ) return 'success'
	 	else if ( value === '') return null
		else return 'error'
  }

  handleChange(e) {
    this.setState({ value: e.target.value });
  }

  render() {
    return (
      <form>
        <FormGroup       
          controlId="formBasicText"
          validationState={this.getValidationState()}
        >
    
        <ControlLabel>Chromosome </ControlLabel>
        <FormControl
          type="text"
          value={this.state.value}
          placeholder="1-22, X, Y, MT"
          onChange={this.handleChange}
        />
        <FormControl.Feedback />
        </FormGroup>
        
        <FormGroup controlId="positionNumeric">
        <ControlLabel>Position </ControlLabel>
        <FormControl
          type="text"
          placeholder="numeric position"
        />
        </FormGroup>
      
        <FormGroup controlId="allele">
        <ControlLabel>Allele </ControlLabel>
        <FormControl
          type="text"
          placeholder="eg. A, C, G, T"
        />
        </FormGroup>

      <Button type="submit">Submit</Button>
      </form>
    );
  }
}

export default FormExample
