import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import '../theme/register.css'

function App() {
	const navigate = useNavigate()

	const [username, setUsername] = useState('')
	const [password, setPassword] = useState('')

	async function registerUser(event) {
		event.preventDefault()

		const response = await fetch('/memes/register', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				'Accept': 'application/json'
			},
			body: JSON.stringify({
				username,
				password,
			}),
		})
		const data = await response.json()
		if (data.status === 'ok') {
			navigate('../memes/login', { replace: true })
		} else {
			alert('Nazwa użytkownika zajęta')
		}
	}

	return (
		<div class='Register-body Register-view Register-text'>
			<div class='Register-headtext'>
			<h1>Witaj.register('Nowy użytkowniku')</h1>
			</div>
			<div class='Register-form'>
				<form onSubmit={registerUser}>
					<input
						value={username}
						onChange={(e) => setUsername(e.target.value)}
						type="text"
						placeholder="Username"
						class='text' 
						required
					/>
					<br />
					<input
						value={password}
						onChange={(e) => setPassword(e.target.value)}
						type="password"
						placeholder="Password"
						class='password' 
						required
					/>
					<br />
					<input type="submit" class='btn-login' value="Zarejestruj"/>
				</form>
			</div>
		</div>
	)
}

export default App