import React, { Component } from 'react'
import axios from "axios"
import logo from './logo.svg'
import './App.css'
import ContactList from "./components/ContactList"
import Query from "./components/Query"

class App extends Component {
	state = {
		contacts: []
	}

	componentDidMount(){
		axios
		.get("https://jsonplaceholder.typicode.com/users")
		.then(response => {
			const newContacts = response.data.map(c => {
				return {
					id: c.id,
					name: c.name
				}
			})

			const newState = Object.assign({}, this.state, {
				contacts: newContacts
			})

			
			this.setState(newState)
		})
		.catch(error => console.log(error));
	}


	render() {
		return (
			<div className="App">
			<header className="App-header">
			<img src={logo} className="App-logo" alt="logo" />
			<h1 className="App-title">Welcome to Contacts Manager</h1>
			</header>
			<ContactList contacts={this.state.contacts} />
			<Query />
			</div>
		);
	}
}

export default App;
