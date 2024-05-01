import { useEffect, useState } from "react";
import { Button, Col, Container, Form, Modal, Row } from "react-bootstrap";
import { Link, useParams } from "react-router-dom";
import Loading, { LoadingBuffer } from "../../loading/loading";

export const AdminCourse = () => {
  const { id } = useParams(); // Extract the course ID from the URL
  const [course, setCourse] = useState(null);
  const [courseImage, setCourseImage] = useState(null); // State to hold the course image file
  const [showModal, setShowModal] = useState(false);
  const [newSubjectName, setNewSubjectName] = useState("");
  const [updatin, setUpdating] = useState(false);

  useEffect(() => {
    // Fetch the course data from your backend server
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: id }), // send the id in the body of the request
    };
    fetch(
      process.env.REACT_APP_API_CALLBACK + `/cources/courseInfo`,
      requestOptions
    )
      .then((response) => response.json())
      .then((data) => {
        setCourse(data);
        console.log(data);
        window.scrollTo(0, 0);
      })
      .catch((error) => console.error("Error:", error));
  }, [id]);

  const fetchFresh = () => {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: id }), // send the id in the body of the request
    };
    fetch(
      process.env.REACT_APP_API_CALLBACK + `/cources/courseInfo`,
      requestOptions
    )
      .then((response) => response.json())
      .then((data) => {
        setCourse(data);
        console.log(data);
        return data;
      })
      .catch((error) => console.error("Error:", error));
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setCourse((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file.size > 150 * 1024) {
      // Check if file size is greater than 150kb
      alert("File size should be less than 150kb");
      event.target.value = ""; // Reset file input field
    } else {
      setCourseImage(file);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append("id", id);
    formData.append("name", course.name);
    formData.append("description", course.description);
    formData.append("startDate", course.startDate);
    formData.append("endDate", course.endDate);
    formData.append("price", course.price || 0);
    formData.append("discount", course.discount || 0);
    formData.append("notes", course.notes);
    if (courseImage) {
      formData.append("image", courseImage);
    }
    setUpdating(true);
    // Make API call to update the course)
    fetch(process.env.REACT_APP_API_CALLBACK + `/cources/updateCourse`, {
      method: "POST",
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Course updated successfully:", data);
        setUpdating(false);

        // You may want to handle success, e.g., show a success message
      })
      .catch((error) => console.error("Error:", error));
  };

  const handleAddSubject = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleSubjectNameChange = (event) => {
    setNewSubjectName(event.target.value);
  };

  const handleCreateSubject = () => {
    // Make API call to create the new subject
    fetch(process.env.REACT_APP_API_CALLBACK + "/cources/createSubject", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: newSubjectName, id: id }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("New subject created:", data);
        // You may want to handle success, e.g., show a success message
        setShowModal(false); // Close the modal after creating the subject
        setCourse((prevState) => ({
          ...prevState,
          subjects: [...prevState.subjects, data],
        }));
      })
      .catch((error) => console.error("Error:", error));
  };

  const getimg = () => {
    if (course && course.image) {
      const d = btoa(
        new Uint8Array(course.image.data.data).reduce(
          (data, byte) => data + String.fromCharCode(byte),
          ""
        )
      );
      return d;
    }

    return null;
  };

  return (
    <>
      {course ? (
        <>
          {updatin && <LoadingBuffer />}
          <div className="contCard">
            <img src={`data:image/jpeg;base64,${getimg()}`} alt="sample"></img>
            <div className="text-wrap">
              <h4>{course.name}</h4>
              <div className="text">{course.description}</div>
              <Row style={{ display: "flex", gap: "43px" }}>
                <Button style={{ maxWidth: "fit-content" }} variant="success">
                  {course.enrolled||0} Students
                </Button>
                <Button style={{ maxWidth: "fit-content" }} variant="danger">
                  Go Live
                </Button>
              </Row>
            </div>
          </div>
          <Container style={{ marginTop: "40px" }}>
            <h4>Subjects</h4>
            <Row style={{ gap: "1px" }}>
              {course.subjects
                ?.filter((element) => element !== null)
                .map((element) =>
                  element ? (
                    <Link
                      to={"/adminSubject"}
                      state={{ course: course, subject: element }}
                      key={element._id}
                      style={{ maxWidth: "fit-content" }}
                    >
                      <Button
                        style={{ maxWidth: "fit-content" }}
                        variant="success"
                      >
                        {element.title}
                      </Button>
                    </Link>
                  ) : null
                )}

              <Button
                style={{ maxWidth: "fit-content" }}
                variant="primary"
                onClick={handleAddSubject}
              >
                New Subject +
              </Button>
            </Row>
          </Container>
          <Container style={{ marginTop: "40px" }}>
            <Form>
              <Row>
                <Col>
                  <Form.Group controlId="courseName">
                    <Form.Label>Course Name</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter course name"
                      name="name"
                      value={course.name || ""}
                      onChange={handleChange}
                    />
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group controlId="description">
                    <Form.Label>Description</Form.Label>
                    <Form.Control
                      as="textarea"
                      rows={3}
                      placeholder="Enter course description"
                      name="description"
                      value={course.description || ""}
                      onChange={handleChange}
                    />
                  </Form.Group>
                </Col>
              </Row>
              <Row>
                <Col>
                  <Form.Group controlId="formFile" className="mb-3">
                    <Form.Label>Upload Course Image *</Form.Label>
                    <Form.Control
                      type="file"
                      onChange={(event) => {
                        handleFileChange(event);
                      }}
                    />
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group controlId="startDate">
                    <Form.Label>Start Date</Form.Label>
                    <Form.Control
                      type="date"
                      name="startDate"
                      value={
                        new Date(course.startDate || null)
                          .toISOString()
                          .split("T")[0] || ""
                      }
                      onChange={handleChange}
                    />
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group controlId="endDate">
                    <Form.Label>End Date</Form.Label>
                    <Form.Control
                      type="date"
                      name="endDate"
                      value={
                        new Date(course.endDate || null)
                          .toISOString()
                          .split("T")[0] || ""
                      }
                      onChange={handleChange}
                    />
                  </Form.Group>
                </Col>
              </Row>
              <Row>
                <Col>
                  <Form.Group controlId="price">
                    <Form.Label>Price</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter price"
                      name="price"
                      value={course.price || 0}
                      onChange={handleChange}
                    />
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group controlId="discount">
                    <Form.Label>Discount</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter discount"
                      name="discount"
                      value={course.discount || 0}
                      onChange={handleChange}
                    />
                  </Form.Group>
                </Col>
              </Row>
              <Form.Group controlId="notes">
                <Form.Label>Notes</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  placeholder="Enter additional notes"
                  name="notes"
                  value={course.notes || ""}
                  onChange={handleChange}
                />
              </Form.Group>
              <Button variant="primary" onClick={handleSubmit}>
                Update
              </Button>{" "}
            </Form>
          </Container>
          <Modal
            show={showModal}
            onHide={handleCloseModal}
            style={{ zIndex: "9999999" }}
          >
            <Modal.Header closeButton>
              <Modal.Title>Add New Subject</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form.Group controlId="newSubjectName">
                <Form.Label>Subject Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter subject name"
                  value={newSubjectName}
                  onChange={handleSubjectNameChange}
                />
              </Form.Group>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleCloseModal}>
                Cancel
              </Button>
              <Button variant="primary" onClick={handleCreateSubject}>
                Create
              </Button>
            </Modal.Footer>
          </Modal>
        </>
      ) : (
        <Loading />
      )}
    </>
  );
};
