import React, { useEffect, useState } from 'react'
import { Container, Navbar, Nav, NavDropdown } from 'react-bootstrap'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const HomeScreen = () => {

    const [name, setName] = useState('')
    let navigate = useNavigate()

    useEffect(() => {
        const userInfo = localStorage.getItem("userInfo")
        if (userInfo) {
            const user = JSON.parse(userInfo)
            setName(user.name)
            navigate('/')
        } else {
            navigate('/login')
        }
    }, [])

    return (
        <>
            <Navbar bg="light" expand="lg">
                <Container>
                    <Navbar.Brand href="#home">ShopX</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="ms-auto">
                            <Nav.Link onClick={() => {
                                localStorage.removeItem('userInfo')

                                navigate('/login')
                            }}>Logout</Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
            <Container className='py-3'>
                <h1>{'Hello ' + name}</h1>
            </Container>
        </>
    )
}

export default HomeScreen
