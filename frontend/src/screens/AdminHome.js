import React, { useEffect, useState } from 'react'
import { Container, Navbar, Nav, NavDropdown, Table, Button } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'



const AdminHome = () => {

    const navigate = useNavigate()

    const [users, setUsers] = useState([])
    const [refresh, setRefresh] = useState(false)


    useEffect(() => {
        const userInfo = localStorage.getItem("userInfo")
        const info = JSON.parse(userInfo)
        if (userInfo && info.isAdmin) {
            navigate('/admin')
            const getProducts = async () => {
                try {
                    const config = {
                        headers: {
                            "Content-type": "application/json",
                        },
                    }

                    const { data } = await axios.get("/api/admin", {

                    }, config)
                    setUsers(data)
                }

                catch (error) {
                    throw new error(error.response.data.message)
                }
            }
            getProducts()

        } else {
            navigate('/login')
        }
    }, [navigate, refresh])

    const clickHandler = async (id) => {

        try {

            const config = {
                headers: {
                    "Content-type": "application/json",
                },
            }
            await axios.delete(`/api/admin/delete/${id}`, {

            }, config)
            setRefresh(!refresh)
        }

        catch (error) {
            throw new error(error.response.data.message)
        }

    }
    const editHandle = (id) => {
        navigate(`/edit/${id}`)
    }

    return (
        <>
            <Navbar bg="light" expand="lg">
                <Container>
                    <Navbar.Brand href="#home">ShopX - Admin</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="ms-auto">
                            <NavDropdown title="Admin" id="basic-nav-dropdown">
                                <NavDropdown.Item onClick={() => {
                                    localStorage.removeItem('userInfo')

                                    navigate('/login')
                                }}>Logout</NavDropdown.Item>


                            </NavDropdown>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
            <Container className='py-3'>
                <Table striped bordered hover>
                    <thead>
                        <tr>

                            <th>Name</th>
                            <th>Email</th>
                            <th>Options</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((e) => {


                            return (
                                <tr key={e._id}>
                                    <td>{e.name}</td>
                                    <td>{e.email}</td>
                                    <td><Button variant="primary" onClick={() => { editHandle(e._id) }} >Edit</Button> <Button variant="danger" onClick={() => clickHandler(e._id)}>Delete</Button> </td>

                                </tr>
                            )
                        })}




                    </tbody>
                </Table>
            </Container>
        </>
    )
}

export default AdminHome
