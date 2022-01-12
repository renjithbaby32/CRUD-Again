import React, { useEffect, useState } from 'react'
import { Container, Row, Col, Form, FormLabel, FormGroup, FormControl, ToggleButton, Button } from 'react-bootstrap'
import FormContainer from '../components/FormContainer'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'


const EditUser = () => {
    const [email, setEmail] = useState('')
    const [name, setName] = useState('')
    const navigate = useNavigate()


    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }

    const submitHandler = async (e) => {
        e.preventDefault()
        const { data } = await axios.put(`/api/user/${id}`, { name, email}, config)
        if (data) {
            navigate('/admin')
        }

    }

    const idA = useParams()
    var id = idA.id
    const [checked, setChecked] = useState(false)
    const handleClick = async () => {
        try {

            const config = {
                headers: {
                    "Content-type": "application/json",
                },
            }
            await axios.patch(`/api/admin/edit/${id}`, { isAdmin: true, }, config)
            navigate('/admin')

        }

        catch (error) {
            throw new error(error.response.data.message)
        }
    }

    useEffect(() => {
        const getUser = async () => {
            const { data } = await axios.get(`/api/user/${id}`)
            setEmail(data.email)
            setName(data.name)
        }
        getUser()
    }, [])


    return (
        <Container>
            <h1 className='py-3'>Edit User</h1>
            <Row>
                <Col>
                    <h4>Do you want to make this user an admin?</h4>
                </Col>
                <Col>
                    <Button
                        onClick={handleClick}
                    >Yes</Button>
                </Col>
            </Row>
            <FormContainer>
                <h1 className='py-3'>Edit user details</h1>
                <Form onSubmit={submitHandler}>
                    <FormGroup controlId='name'>
                        <FormLabel>Name</FormLabel>
                        <FormControl type='text' name='name' placeholder='Enter the new name' value={name} onChange={(e) => {
                            setName(e.target.value)
                        }}
                        ></FormControl>
                    </FormGroup>
                    <FormGroup controlId='email'>
                        <FormLabel>Email address</FormLabel>
                        <FormControl type='email' name='email' placeholder='Enter the new email' value={email} onChange={(e) => {
                            setEmail(e.target.value)
                        }}
                        ></FormControl>
                    </FormGroup>
                    <div className='py-3'>
                        <Button type='submit' variant='primary' >Update</Button>
                    </div>
                </Form>
            </FormContainer>

        </Container>
    )
}

export default EditUser
