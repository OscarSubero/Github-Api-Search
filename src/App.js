import React, { useState } from 'react';
import './App.css';
// REACTSTRAP
//import { InputGroup, InputGroupAddon, Input, Button } from 'reactstrap';
import { InputGroup, Input, Button } from 'reactstrap';
// COMPONENTS
import Header from './components/Header/Header';
import CardUser from './components/CardUser/CardUser';
import axios from 'axios';

const App = () => {
	const [inputText, setInputText] = useState('');
	const [userData, setUserData] = useState({});

	const onHandleChange = (e) => {
		//console.log(e.target.value);
		setInputText(e.target.value);
	};

	const onHandleSubmit = (e) => {
		// Para prevenir el comportamiento por defecto de un form cuando se hace submit
		// debemos utilizar un preventDefault()
		e.preventDefault();
		const userInput = inputText.toLocaleLowerCase().replace(/ /g, ''); // Sanitizar la variable de espacios y mayusculas
		// console.log(userInput);
		if (userInput) {
			axios(`https://api.github.com/users/${userInput}`).then((res) =>
				// console.log(res.data)
				setUserData(res.data)
			);
		}
		// Limpiamos el input despues de la búsqueda!
		setInputText('');
	};

	return (
		<div className='App'>
			<Header />
			<div className='App-Form'>
				<form onSubmit={onHandleSubmit}>
					<InputGroup>
						<Input
							placeholder='Buscar usuario'
							onChange={onHandleChange}
							value={inputText}
						/>
						<Button>Buscar</Button>
						{/* <InputGroupAddon addonType='prepend'>
							<Button>Buscar</Button>
						</InputGroupAddon> */}
					</InputGroup>
				</form>
			</div>

			{/* {userData.id ? (
				<div className='App-Container__Data'>
					<CardUser userData={userData} />
				</div>
			) : (
				<p>No hiciste una búsqueda aún!</p>
			)} */}

			{/* {userData.id ? (
				<div className='App-Container__Data'>
					<CardUser userData={userData} />
				</div>
			) : null} */}

			{userData.id && (
				<div className='App-Container__Data'>
					<CardUser userData={userData} />
				</div>
			)}
		</div>
	);
};

export default App;
