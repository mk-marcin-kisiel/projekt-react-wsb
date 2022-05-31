import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

export default function Login() {
	useEffect(() => {
        localStorage.clear()
        
	}, [])
    return (
        useNavigate('../memes/login', { replace: true })
    )
}
