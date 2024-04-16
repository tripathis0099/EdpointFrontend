import React, { useEffect, useState } from "react";
import {
  Button,
  Card,
  Container,
  Form,
  ListGroup,
  Modal,
  Row,
} from "react-bootstrap";
import { Link } from "react-router-dom";
import Loading from "../loading/loading";

export const formatDate = (date) => {
  const options = { day: 'numeric', month: 'long', year: 'numeric' };
  const formattedDate = new Date(date).toLocaleDateString('en-US', options);
  const day = new Date(date).getDate();
  let suffix = "";
  if (day === 1 || day === 21 || day === 31) {
    suffix = "st";
  } else if (day === 2 || day === 22) {
    suffix = "nd";
  } else if (day === 3 || day === 23) {
    suffix = "rd";
  } else {
    suffix = "th";
  }
  return formattedDate.replace(/\b\d+\b/, `${day}${suffix}`);
};


export const Admin = () => {
  const [show, setShow] = useState(false);
  const [courses, setCourses] = useState(null);

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    try {
      const response = await fetch(
        process.env.REACT_APP_API_CALLBACK + "/cources/"
      );
      const data = await response.json();
      setCourses(data);
      console.log(data);
    } catch (error) {
      console.error("Error fetching courses:", error);
    }
  };

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const formData = new FormData(event.target);
      const response = await fetch(
        process.env.REACT_APP_API_CALLBACK + "/cources/add",
        {
          method: "POST",
          body: formData,
        }
      );

      if (response.ok) {
        fetchCourses();
        handleClose();
      } else {
        console.error("Error creating course:", response.statusText);
      }
    } catch (error) {
      console.error("Error creating course:", error);
    }
  };

  return (
   <>{ courses?<>
      <Container>
        <Row
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            margin: "40px 0px",
          }}
        >
          <h3 style={{ maxWidth: "fit-content" }}>All Courses</h3>
          <Button
            style={{ maxWidth: "fit-content" }}
            variant="primary"
            onClick={handleShow}
          >
            Add New +
          </Button>
        </Row>
      </Container>
      <Container>
        <Row style={{ gap: "50px" }}>
          {courses.map((course) => {
            // Convert the byte array into a Base64 string
            const base64String = btoa(
              new Uint8Array(course.image.data.data).reduce(
                (data, byte) => data + String.fromCharCode(byte),
                ""
              )
            );

            return (
              <Link to={`/adminCourse/${course._id}`} key={course._id} style={{maxWidth: "fit-content",textDecoration:'none'}}>
                <Card style={{ width: "18rem" }}>
                  <Card.Img
                    variant="top"
                    src={`data:image/jpeg;base64,${base64String}`}
                  />
                  <Card.Body>
                    <Card.Title>{course.name}</Card.Title>
                    <Card.Text>{course.description}</Card.Text>
                  </Card.Body>
                  <ListGroup className="list-group-flush">
                    <ListGroup.Item>{course.mode}</ListGroup.Item>
                    <ListGroup.Item>Start: {formatDate(course.startDate)}</ListGroup.Item>
                    <ListGroup.Item>End: {formatDate(course.endDate)}</ListGroup.Item>
                  </ListGroup>
                </Card>
              </Link>
            );
          })}
        </Row>
      </Container>
      <Modal
        style={{ zIndex: "99999999" }}
        show={show}
        onHide={handleClose}
        animation={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Add New Course</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Name *</Form.Label>
              <Form.Control type="text" name="name" required />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Description *</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                name="description"
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Start Date *</Form.Label>
              <Form.Control type="date" name="startDate" required />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>End Date *</Form.Label>
              <Form.Control type="date" name="endDate" required />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Mode Of Course *</Form.Label>
              <Form.Select aria-label="Mode Of Course" name="mode" required>
                <option value="Online">Online</option>
                <option value="Offline">Offline</option>
              </Form.Select>
            </Form.Group>
            <Form.Group controlId="formFile" className="mb-3">
              <Form.Label>Upload Course Image *</Form.Label>
              <Form.Control type="file" name="image" required />
            </Form.Group>
            <Button variant="primary" type="submit">
              Add New
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </>:<Loading/>}</>
  );
};
