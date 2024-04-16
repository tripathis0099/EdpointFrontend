import React, { useState, useEffect } from "react";
import { Button, Container, Row, Table, Modal, Form } from "react-bootstrap";
import Loading, { LoadingBuffer } from "../../loading/loading";
import { formatDate } from "../admin";

export const StudentPage = () => {
    const [user, setUser] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        dob: ""
    });
    const [selectedUser, setSelectedUser] = useState(null);
    const [updatin,setUpdating] = useState(false);

    const handleClose = () => {
        setShowModal(false);
        // Reset form data
        setFormData({
            name: "",
            email: "",
            phone: "",
            dob: ""
        });
        setSelectedUser(null);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleAddUser = async () => {
        try {
        setUpdating(true);
            const response = await fetch(process.env.REACT_APP_API_CALLBACK + "/login/addUser", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                credentials: 'include',
                body: JSON.stringify(formData)
            });
            if (!response.ok) {
                throw new Error("Failed to add admin");
            }
            // Reload user after adding new admin
            fetchUsers();
            // Close modal
            handleClose();
        setUpdating(false);

        } catch (error) {
            console.error("Error adding admin:", error);
        setUpdating(false);

        }
    };

    const handleEditUser = async () => {
        try {
        setUpdating(true);

            const response = await fetch(process.env.REACT_APP_API_CALLBACK + `/login/editUser/${selectedUser._id}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                credentials: 'include',
                body: JSON.stringify(formData)
            });
            if (!response.ok) {
                throw new Error("Failed to edit user");
            }
            // Reload user after editing admin
            fetchUsers();
            // Close modal
            handleClose();
        setUpdating(false);

        } catch (error) {
            console.error("Error editing admin:", error);
        setUpdating(false);

        }
    };

    const handleDeleteUser = async (userId) => {
        
            if (window.confirm('Are you sure you want to delete this User?')) {
                try {
                    setUpdating(true);
            
            
            
                        const response = await fetch(process.env.REACT_APP_API_CALLBACK + `/login/deleteUser/${userId}`, {
                            method: "POST",
                            credentials: 'include'
                        });
                        if (!response.ok) {
                            throw new Error("Failed to delete user");
                        }
                        // Reload user after deleting user
                        fetchUsers();
                    setUpdating(false);
            
                    } catch (error) {
                        console.error("Error deleting user:", error);
                    setUpdating(false);
            
                    }   
            }
           
    };

    const handleShow = (users) => {
        setSelectedUser(users);
        setFormData({
            name: users?.name,
            email: users?.email,
            phone: users?.phone,
            dob: users?.dob,
        });
        setShowModal(true);
    };

    const fetchUsers = async () => {
        try {
            const response = await fetch(process.env.REACT_APP_API_CALLBACK + "/login/getUsers", { credentials: 'include' });
            if (!response.ok) {
                throw new Error("Failed to fetch user");
            }
            const data = await response.json();
            setUser(data.data);
        } catch (error) {
            console.error("Error fetching users:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    return (
        <div style={{ minHeight: '100vh' }}>
            {updatin && <LoadingBuffer/>}
            <Container>
                <Row
                    style={{
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "space-between",
                        margin: "40px 0px",
                    }}
                >
                    <h3 style={{ maxWidth: "fit-content", textTransform: 'capitalize' }}>Students of EdPoint</h3>
                    <Button
                        style={{ maxWidth: "fit-content" }}
                        variant="primary"
                        onClick={()=>{handleShow(null)}}
                    >
                        Add New +
                    </Button>
                </Row>
            </Container>
            {loading ? (
                <Loading />
            ) : (
                <Table style={{ marginTop: '40px' }} striped bordered hover>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Phone</th>
                            <th>DOB</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {user.map((users, index) => (
                            <tr key={index}>
                                <td>{index + 1}</td>
                                <td>{users.name}</td>
                                <td>{users.email}</td>
                                <td>{users.phone}</td>
                                <td>{formatDate(users.dob)}</td>
                                <td style={{ display: 'flex', justifyContent: 'space-evenly', gap: '10px' }}>
                                    <div href="#" style={{ color: 'green', cursor: 'pointer' }} onClick={() => handleShow(users)}>Edit</div>
                                    <div style={{ color: 'red', cursor: 'pointer' }} onClick={() => handleDeleteUser(users._id)}>Delete</div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            )}

            {/* Modal for adding/editing admin */}
            <Modal show={showModal} onHide={handleClose} style={{ zIndex: '99999999' }}>
                <Modal.Header closeButton>
                    <Modal.Title>{selectedUser ? "Edit User" : "Add New User"}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group controlId="name">
                            <Form.Label>Name</Form.Label>
                            <Form.Control type="text" name="name" value={formData.name} onChange={handleInputChange} />
                        </Form.Group>
                        <Form.Group controlId="email">
                            <Form.Label>Email</Form.Label>
                            <Form.Control type="email" name="email" value={formData.email} onChange={handleInputChange} />
                        </Form.Group>
                        <Form.Group controlId="phone">
                            <Form.Label>Phone</Form.Label>
                            <Form.Control type="text" name="phone" value={formData.phone} onChange={handleInputChange} />
                        </Form.Group>
                        <Form.Group controlId="dob">
                            <Form.Label>DOB</Form.Label>
                            <Form.Control type="date" name="dob" value={formData.dob} onChange={handleInputChange} />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={selectedUser ? handleEditUser : handleAddUser}>
                        {selectedUser ? "Edit User" : "Add User"}
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};
