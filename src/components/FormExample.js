import React from 'react'
import "./FormExample.css"
import { FormGroup , ControlLabel , FormControl , Button } from 'react-bootstrap'

class FormExample extends React.Component {
    constructor(props, context) {
        super(props, context);

        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)

        this.state = {
            value: '',
            chromosome: '',
            position: '',
            allele: ''
        }
    }

    getChromosomeValidationState() {
        const validation = this.state.chromosome
        if (validation === 'X' || validation === 'Y' || validation === 'MT' ) return 'success'
        else if ( validation > 0 && validation < 23 && (validation % 1 === 0 ) ) return 'success'
        else if ( validation === '') return null
        else return 'error'
    }

    getPositionValidationState() {
        const validation = this.state.position
        if ( validation === '' ) return null
        else if (!isNaN(validation) && validation % 1 === 0 ) return 'success'
        else return 'error'
    }

    getAlleleValidationState() {
        var bases = RegExp('^[ACGT]*$')
        const validation = this.state.allele
        if ( validation === '' ) return null
        else if ( bases.test(validation) ) return 'success'
        else return 'error'
    }

    handleChange(event) {
        const target = event.target
        const value = target.value
        const name = target.name

        this.setState({
            [name]: value
        })
    }

    handleSubmit(event) {
        if ( this.getChromosomeValidationState() === 'success' && 
             this.getPositionValidationState() === 'success' &&
             this.getAlleleValidationState() === 'success'
        ){
            alert('validated, let\'s query the shit out of it')
        } else alert( 'you obviously fucked up')
        event.preventDefault()
    }

    render() {
        return (
            <form
            onSubmit={this.handleSubmit}>
            <FormGroup       
            controlId="formBasicText"
            validationState={this.getChromosomeValidationState()}
            >

            <ControlLabel>Chromosome </ControlLabel>
            <FormControl
            name="chromosome"
            type="text"
            value={this.state.chromosome}
            placeholder="1-22, X, Y, MT"
            onChange={this.handleChange}
            />
            <FormControl.Feedback />
            </FormGroup>

            <FormGroup 
            controlId="formPositionNumeric"
            validationState={this.getPositionValidationState()}
            >
            <ControlLabel>Position </ControlLabel>
            <FormControl
            name="position"
            type="text"
            value={this.state.position}
            placeholder="numeric position"
            onChange={this.handleChange}
            />
            <FormControl.Feedback />
            </FormGroup>

            <FormGroup 
            controlId="allele"
            validationState={this.getAlleleValidationState()}
            >
            <ControlLabel>Allele </ControlLabel>
            <FormControl
            name="allele"
            type="text"
            value={this.state.allele}
            placeholder="eg. A, C, G, T"
            onChange={this.handleChange}
            />
            <FormControl.Feedback />
            </FormGroup>
            <Button type="submit"
            >Submit</Button>
            </form>
            <Alert>
            Currently no result available
            </Alert>
        );
    }
}

export default FormExample
