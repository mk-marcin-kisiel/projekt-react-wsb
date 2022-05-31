import { useState } from 'react'
import '../theme/login.css'
import { useNavigate } from 'react-router-dom'

export default function Login(props) {
	const [username, setUsername] = useState('')
	const [password, setPassword] = useState('')
	const navigate = useNavigate();
	async function loginUser(event) {
		event.preventDefault()

		const response = await fetch('/memes/login', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				username,
				password,
			}),
		})

		const data = await response.json()

		if (data.status === 'ok') {
			localStorage.setItem('token', data.user)
			props.onLogin(true);
			// window.location.href = '/memes/dashboard'
			navigate('../memes/dashboard', { replace: true })
		} else {
			alert('Sprawdź nazwę użytkownika i hasło')
		}
	}

	return (
		<div className='Login-body Login-view Login-text'>
			<div className='Login-headtext'>
			<h1>Witaj.log('ponownie')</h1>
			</div>
			{/* <p class='Login-hellotext'>Witaj.log('ponownie')</p> */}
				<div className='Login-form'>

					<form onSubmit={loginUser}>
						<input value={username} 
						onChange={(e) => setUsername(e.target.value)} 
						type="text" 
						placeholder='Username' 
						className='text' 
						required/>
						<br/>

						<input value={password} 
						onChange={(e) => setPassword(e.target.value)} 
						type="password" 
						placeholder='•••••••••' 
						className='password' 
						required/><br/>

						<input type="submit" className='btn-login' value="Zaloguj"/>
      					<a href="/memes/register" className='Login-register'>Nie masz konta? Zarejestruj się</a>
					</form>
				</div>
		</div>
	)
}

// </footer>
