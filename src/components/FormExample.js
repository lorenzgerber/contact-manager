import React from 'react'
import "./FormExample.css"
import axios from 'axios'
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
            allele: '',
            result: ''
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
            this.setState({
                result: "we're now querying the beacon"
            })
        } else {
            this.setState({
            result: "Yo man, check your input!"
            })
        }
        event.preventDefault()
    }

    doQuery() {
        axios
      .get("https://jsonplaceholder.typicode.com/users")
      .then(response => {

        // create an array of contacts only with relevant data
        const newContacts = response.data.map(c => {
          return {
            id: c.id,
            name: c.name
          };
        });

        // create a new "State" object without mutating
        // the original State object.
        const newState = Object.assign({}, this.state, {
          contacts: newContacts
        });

        // store the new state object in the component's state
        this.setState(newState);
      })
      .catch(error => console.log(error));




    }
    
    render() {
        return (
            <div id="query">
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
            <div id="result">
                <h1 className="resultText">{this.state.result}</h1>
            </div>
            </div>
        )
    }
}

export default FormExample
