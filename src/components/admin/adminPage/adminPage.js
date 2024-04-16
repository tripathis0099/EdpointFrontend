import React, { useState, useEffect } from "react";
import { Button, Container, Row, Table, Modal, Form } from "react-bootstrap";
import Loading, { LoadingBuffer } from "../../loading/loading";
import { formatDate } from "../admin";

export const AdminPage = () => {
    const [admins, setAdmins] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        dob: ""
    });
    const [selectedAdmin, setSelectedAdmin] = useState(null);
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
        setSelectedAdmin(null);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleAddAdmin = async () => {
        try {
        setUpdating(true);
            const response = await fetch(process.env.REACT_APP_API_CALLBACK + "/login/addAdmin", {
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
            // Reload admins after adding new admin
            fetchAdmins();
            // Close modal
            handleClose();
        setUpdating(false);

        } catch (error) {
            console.error("Error adding admin:", error);
        setUpdating(false);

        }
    };

    const handleEditAdmin = async () => {
        try {
        setUpdating(true);

            const response = await fetch(process.env.REACT_APP_API_CALLBACK + `/login/editAdmin/${selectedAdmin._id}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                credentials: 'include',
                body: JSON.stringify(formData)
            });
            if (!response.ok) {
                throw new Error("Failed to edit admin");
            }
            // Reload admins after editing admin
            fetchAdmins();
            // Close modal
            handleClose();
        setUpdating(false);

        } catch (error) {
            console.error("Error editing admin:", error);
        setUpdating(false);

        }
    };

    const handleDeleteAdmin = async (adminId) => {
        
            if (window.confirm('Are you sure you want to delete this Admin?')) {
                try {
                    setUpdating(true);
            
            
            
                        const response = await fetch(process.env.REACT_APP_API_CALLBACK + `/login/deleteAdmin/${adminId}`, {
                            method: "POST",
                            credentials: 'include'
                        });
                        if (!response.ok) {
                            throw new Error("Failed to delete admin");
                        }
                        // Reload admins after deleting admin
                        fetchAdmins();
                    setUpdating(false);
            
                    } catch (error) {
                        console.error("Error deleting admin:", error);
                    setUpdating(false);
            
                    }   
            }
           
    };

    const handleShow = (admin) => {
        setSelectedAdmin(admin);
        setFormData({
            name: admin?.name,
            email: admin?.email,
            phone: admin?.phone,
            dob: admin?.dob.substring(0, 10)
        });
        setShowModal(true);
    };

    const fetchAdmins = async () => {
        try {
            const response = await fetch(process.env.REACT_APP_API_CALLBACK + "/login/getAdmins", { credentials: 'include' });
            if (!response.ok) {
                throw new Error("Failed to fetch admins");
            }
            const data = await response.json();
            setAdmins(data.data);
        } catch (error) {
            console.error("Error fetching admins:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchAdmins();
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
                    <h3 style={{ maxWidth: "fit-content", textTransform: 'capitalize' }}>Admins of EdPoint</h3>
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
                        {admins.map((admin, index) => (
                            <tr key={index}>
                                <td>{index + 1}</td>
                                <td>{admin.name}</td>
                                <td>{admin.email}</td>
                                <td>{admin.phone}</td>
                                <td>{formatDate(admin.dob)}</td>
                                <td style={{ display: 'flex', justifyContent: 'space-evenly', gap: '10px' }}>
                                    <div href="#" style={{ color: 'green', cursor: 'pointer' }} onClick={() => handleShow(admin)}>Edit</div>
                                    <div style={{ color: 'red', cursor: 'pointer' }} onClick={() => handleDeleteAdmin(admin._id)}>Delete</div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            )}

            {/* Modal for adding/editing admin */}
            <Modal show={showModal} onHide={handleClose} style={{ zIndex: '99999999' }}>
                <Modal.Header closeButton>
                    <Modal.Title>{selectedAdmin ? "Edit Admin" : "Add New Admin"}</Modal.Title>
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
                    <Button variant="primary" onClick={selectedAdmin ? handleEditAdmin : handleAddAdmin}>
                        {selectedAdmin ? "Edit Admin" : "Add Admin"}
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};
