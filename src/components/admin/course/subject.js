import { useEffect, useState } from "react";
import { Button, Container, Modal, Row, Table, Form } from "react-bootstrap";
import { Link, useLocation } from "react-router-dom";
import { formatDate } from "../admin";
import Loading, { LoadingBuffer } from "../../loading/loading";

export const Subject = () => {
  const location = useLocation();
  const [showModal, setShowModal] = useState(false);
  const [newChapterName, setNewChapterName] = useState("");
  const [subject, setSubject] = useState(null);
  const [course, setCourse] = useState(null);
  const [selectedChapter, setSelectedChapter] = useState(null);
  const [updatin,setUpdating] = useState(false);

  useEffect(() => {
    // Fetch the course data from your backend server
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: location.state.course._id })  // send the id in the body of the request
    };
    fetch(process.env.REACT_APP_API_CALLBACK + `/cources/courseInfo`, requestOptions)
        .then(response => response.json())
        .then(data => {
          console.log(data)
            setCourse(data);
            data.subjects.forEach(element => {
              if(element && element.title === location.state.subject.title){
                setSubject(element);
              }
            });
            window.scrollTo(0, 0);
        })
        .catch(error => console.error('Error:', error));

}, [location.state.course._id]);

  const handleShow = () => {
      setShowModal(true);
  };

  const handleClose = () => {
      setShowModal(false);
      setSelectedChapter(null);
      setNewChapterName("");
  };

  const handleInputChange = (event) => {
      setNewChapterName(event.target.value);
  };

  const handleEditChapter = (chapter) => {
      setSelectedChapter(chapter);
      setNewChapterName(chapter.title);
      setShowModal(true);
  };

  const handleSubmit = () => {
      const requestBody = {
          courseId: course._id,
          subjectId: subject._id,
          chapterId: selectedChapter ? selectedChapter._id : null,
          chapterName: newChapterName
      };
setUpdating(true)
      fetch(process.env.REACT_APP_API_CALLBACK + '/cources/addChapter', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json'
          },
          body: JSON.stringify(requestBody)
      })
      .then(response => {
          if (response.ok) {
              return response.json();
          }
          throw new Error('Network response was not ok.');
      })
      .then(async data => {
          console.log('Chapter updated successfully:', data);
          handleClose();
          if (selectedChapter) {
              const updatedChapters = subject.chapters.map(chapter => {
                  if (chapter._id === selectedChapter._id) {
                      return { ...chapter, title: newChapterName };
                  }
                  return chapter;
              });
              setSubject({ ...subject, chapters: updatedChapters });
          } else {
              setSubject({ ...subject, chapters: [...subject.chapters, data.newChapter] });
          }
          setUpdating(false);
          window.location.reload();
      })
      .catch(error => {
          console.error('Error updating chapter:', error);
      });
  };

  const handleDeleteChapter = (chapterId) => {
    if (window.confirm('Are you sure you want to delete this chapter?')) {
        // Prepare the request body
        const requestBody = {
            courseId: course._id,
            subjectId: subject._id,
            chapterId: chapterId
        };
        setUpdating(true);
        // Send a POST request to delete the chapter
        fetch(process.env.REACT_APP_API_CALLBACK + '/cources/deleteChapter', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(requestBody)
        })
        .then(response => {
            if (response.ok) {
                return response.json();
            }
            throw new Error('Network response was not ok.');
        })
        .then(data => {
            console.log('Chapter deleted successfully:', data);
            // Update the state to reflect the deleted chapter
            const updatedChapters = subject.chapters.filter(chapter => chapter._id !== chapterId);
            setSubject({ ...subject, chapters: updatedChapters });
            setUpdating(false);
            window.location.reload();
        })
        .catch(error => {
            console.error('Error deleting chapter:', error);
            // Handle error
            setUpdating(false);
        });
    }
};


  return (
      <>{(course && subject)?<div style={{minHeight:'100vh'}}>
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
                  <h3 style={{ maxWidth: "fit-content", textTransform:'capitalize'}}>{course.name} / {subject.title}/ chapters</h3>
                  <Button
                      style={{ maxWidth: "fit-content" }}
                      variant="primary"
                      onClick={handleShow}
                  >
                      Add New +
                  </Button>
              </Row>
          </Container>
          <Table style={{ marginTop: '40px' }} striped bordered hover>
              <thead>
                  <tr>
                      <th>#</th>
                      <th>Name</th>
                      <th>Created On</th>
                      <th>Links</th>
                  </tr>
              </thead>
              <tbody>
                  {subject.chapters && subject.chapters.map((chapter, index) => (
                      <tr key={index}>
                          <td>{index + 1}</td>
                          <td>{chapter.title}</td>
                          <td>{formatDate(chapter.createdAt)}</td>
                          <td style={{ display: 'flex', justifyContent: 'space-evenly', gap: '10px' }}>
                              <Link to="/adminVideos" state={{course,subject,chapter}}>Lectures</Link>
                              <Link to="/adminNotes" state={{course,subject,chapter}}>Notes</Link>
                              <div onClick={() => handleEditChapter(chapter)} style={{ cursor: 'pointer',color: 'purple' }}>Edit</div>
                              <div onClick={() => handleDeleteChapter(chapter._id)} style={{ cursor: 'pointer',color: 'red' }}>Delete</div>
                          </td>
                      </tr>
                  ))}
              </tbody>
          </Table>

          <Modal show={showModal} onHide={handleClose} style={{ zIndex: '99999' }}>
              <Modal.Header closeButton>
                  <Modal.Title>{selectedChapter ? "Edit Chapter" : "Add New Chapter"}</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                  <Form.Group controlId="newChapterName">
                      <Form.Label>Chapter Name</Form.Label>
                      <Form.Control
                          type="text"
                          placeholder="Enter chapter name"
                          value={newChapterName}
                          onChange={handleInputChange}
                      />
                  </Form.Group>
              </Modal.Body>
              <Modal.Footer>
                  <Button variant="secondary" onClick={handleClose}>
                      Cancel
                  </Button>
                  <Button variant="primary" onClick={handleSubmit}>
                      {selectedChapter ? "Save Changes" : "Add"}
                  </Button>
              </Modal.Footer>
          </Modal>
      </div>:<Loading></Loading>}</>
      
  );
};