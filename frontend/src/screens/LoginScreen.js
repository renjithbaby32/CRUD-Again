import React, { useState } from 'react'
import { Form, Button, Row, Col, FormControl, FormGroup, FormLabel } from 'react-bootstrap'
import FormContainer from '../components/FormContainer'
import axios from 'axios'
import { Link, useNavigate, } from 'react-router-dom'

const LoginScreen = () => {

    const [email, setEmail] = useState('')
    const [error, setError] = useState('')
    const [password, setPassword] = useState('')
    const navigate = useNavigate()

    const submitHandler = async (e) => {
        e.preventDefault()
        try {
            const config = {
                headers: {
                    "Content-type": "application/json",
                }
            }
            const { data } = await axios.post('/api/login', { email, password }, config)
            console.log('hello')
            localStorage.setItem('userInfo', JSON.stringify(data))
            if (localStorage.userInfo) {
                navigate('/')
            }
        } catch (error) {
            setError('Invalid credentials')
        }


    }

    return (
        <>
            <FormContainer>
                <h1 className='py-3'>Sign In</h1>
                {error && <h3 style={{color: 'red'}}>{ error}</h3>}
                <Form onSubmit={submitHandler}>
                    <FormGroup controlId='email'>
                        <FormLabel>Email address</FormLabel>
                        <FormControl type='email' placeholder='Enter email' value={email} onChange={(e) => {
                            setEmail(e.target.value)
                        }}
                        ></FormControl>
                    </FormGroup>
                    <FormGroup controlId='password'>
                        <FormLabel>Password</FormLabel>
                        <FormControl type='password' placeholder='Enter password' value={password} onChange={(e) => {
                            setPassword(e.target.value)
                        }}
                        ></FormControl>
                    </FormGroup>
                    <div className='py-3'>
                        <Button type='submit' variant='primary' >Sign In</Button>
                    </div>
                </Form>
                <Row className='py-3 ' >
                    <Col>New User? <Link to='/signup'>
                        <Button>Sign Up</Button>
                    </Link>
                    </Col>
                    <Col>

                    </Col>
                </Row>
            </FormContainer>
        </>
    )
}

export default LoginScreen
