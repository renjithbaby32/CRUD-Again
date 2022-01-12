import React, { useState } from 'react'
import { Form, Button, Row, Col, FormControl, FormGroup, FormLabel } from 'react-bootstrap'
import FormContainer from '../components/FormContainer'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const SignupScreen = () => {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [name, setName] = useState('')
    const navigate = useNavigate()

    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }

    const submitHandler = async (e) => {
        e.preventDefault()
        const { data } = await axios.post('/api/', { name, email, password }, config)
        if (data) {
            navigate('/login')
        }

    }

    return (
        <>
            <FormContainer>
                <h1 className='py-3'>Sign Up</h1>
                <Form onSubmit={submitHandler}>
                    <FormGroup controlId='name'>
                        <FormLabel>Name</FormLabel>
                        <FormControl type='text' name='name' placeholder='Enter your name' value={name} onChange={(e) => {
                            setName(e.target.value)
                        }}
                        ></FormControl>
                    </FormGroup>
                    <FormGroup controlId='email'>
                        <FormLabel>Email address</FormLabel>
                        <FormControl type='email' name='email' placeholder='Enter email' value={email} onChange={(e) => {
                            setEmail(e.target.value)
                        }}
                        ></FormControl>
                    </FormGroup>
                    <FormGroup controlId='password'>
                        <FormLabel>Password</FormLabel>
                        <FormControl type='password' name='password' placeholder='Enter password' value={password} onChange={(e) => {
                            setPassword(e.target.value)
                        }}
                        ></FormControl>
                    </FormGroup>
                    <div className='py-3'>
                        <Button type='submit' variant='primary' >Sign Up</Button>
                    </div>
                </Form>
            </FormContainer>
        </>
    )
}

export default SignupScreen
