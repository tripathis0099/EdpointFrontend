// Import necessary dependencies
import React, { useState } from "react";
import { Button, Container, Modal, Row, Table, Form } from "react-bootstrap";
import { useLocation } from "react-router-dom";
import { formatDate } from "../admin";
import { LoadingBuffer } from "../../loading/loading";

export const Videos = () => {
    const location = useLocation();
    const [showModal, setShowModal] = useState(false);
    const [subject, setSubject] = useState(location.state ? location.state.subject : {});
    const [course, setCourse] = useState(location.state ? location.state.course : {});
    const [selectedChapter, setSelectedChapter] = useState(location.state ? location.state.chapter : {});
    const [newVideoName, setNewVideoName] = useState("");
    const [newVideoUrl, setNewVideoUrl] = useState("");
    const [editVideoId, setEditVideoId] = useState(null);
    const [editedVideoName, setEditedVideoName] = useState("");
    const [editedVideoUrl, setEditedVideoUrl] = useState("");
    const [updatin,setUpdating] = useState(false);

    const handleShow = () => {
        setShowModal(true);
    };

    const handleClose = () => {
        setShowModal(false);
        setEditVideoId(null);
        setEditedVideoName("");
        setEditedVideoUrl("");
    };

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        if (name === "videoName") {
            setNewVideoName(value);
        } else if (name === "videoUrl") {
            setNewVideoUrl(value);
        } else if (name === "editedVideoName") {
            setEditedVideoName(value);
        } else if (name === "editedVideoUrl") {
            setEditedVideoUrl(value);
        }
    };

    const handleAddVideo = () => {
        // Prepare the request body
        const requestBody = {
            courseId: course._id,
            subjectId: subject._id,
            chapterId: selectedChapter._id,
            videoName: newVideoName,
            videoUrl: newVideoUrl
        };
        setUpdating(true);
        // Send a POST request to add the video
        fetch(process.env.REACT_APP_API_CALLBACK + '/cources/addVideo', {
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
            console.log('Video added successfully:', data);
            // Close the modal
            handleClose();
            // Update the state to reflect the new video
            setSelectedChapter({...selectedChapter,
              videos: [...selectedChapter.videos, data.newVideo]
            });
        setUpdating(false);

        })
        .catch(error => {
            console.error('Error adding video:', error);
        setUpdating(false);

        });
    };

    const handleEditVideo = (videoId, videoName, videoUrl) => {
        setEditVideoId(videoId);
        setEditedVideoName(videoName);
        setEditedVideoUrl(videoUrl);
    };

    const handleUpdateVideo = () => {
        // Prepare the request body
        const requestBody = {
            courseId:course._id,
            subjectId: subject._id,
            chapterId: selectedChapter._id,
            videoId: editVideoId,
            newVideoName: editedVideoName,
            newVideoUrl: editedVideoUrl
        };
        setUpdating(true);

        // Send a POST request to update the video details
        fetch(process.env.REACT_APP_API_CALLBACK + '/cources/updateVideo', {
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
            console.log('Video updated successfully:', data);
            // Close the modal
            handleClose();
            // Update the state to reflect the updated video details
            const updatedVideos = selectedChapter.videos.map(video => {
                if (video._id === editVideoId) {
                    return { ...video, title: editedVideoName, url: editedVideoUrl };
                }
        setUpdating(false);

                return video;
            });
            setSelectedChapter({...selectedChapter, videos: updatedVideos});
            // Clear the editing state variables
            setEditVideoId(null);
            setEditedVideoName("");
            setEditedVideoUrl("");
        setUpdating(false);

        })
        .catch(error => {
            console.error('Error updating video:', error);
        setUpdating(false);

        });
    };

    const handleDeleteVideo = (videoId) => {
      // Show confirmation dialog before deleting
      if (window.confirm('Are you sure you want to delete this video?')) {
          // Send a DELETE request to delete the video
        setUpdating(true);
          
          fetch(`${process.env.REACT_APP_API_CALLBACK}/cources/deleteVideo`, {
              method: 'POST',
              headers: {
                  'Content-Type': 'application/json'
              },
              body: JSON.stringify({
                  courseId: course._id,
                  subjectId: subject._id,
                  chapterId: selectedChapter._id,
                  videoId: videoId
              })
          })
          .then(response => {
              if (response.ok) {
                  // Remove the video from the state
                  const updatedVideos = selectedChapter.videos.filter(video => video._id !== videoId);
                  setSelectedChapter({...selectedChapter, videos: updatedVideos});
                  console.log('Video deleted successfully');
              } else {
                  throw new Error('Network response was not ok.');
              }
        setUpdating(false);

          })
          .catch(error => {
              console.error('Error deleting video:', error);
        setUpdating(false);

          });
      }
  };
  
    return (
        <div style={{minHeight:'100vh'}}>
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
                    <h3 style={{ maxWidth: "fit-content",textTransform:'capitalize' }}>{course.name} / {subject.title} / {selectedChapter.title} / Videos</h3>
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
                        <th>Uploaded On</th>
                        <th>Link</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {/* Iterate over videos and display them */}
                    {selectedChapter.videos && selectedChapter.videos.map((video, videoIndex) => {
                        return (
                            <tr key={video._id}>
                                <td>{videoIndex + 1}</td>
                                <td>{video.title}</td>
                                <td>{formatDate(video.createdAt)}</td>
                                <td>{video.url}</td>
                                <td style={{ display: 'flex', justifyContent: 'space-evenly', gap: '10px' }}>
                                    <div href="#" style={{ color: 'green',cursor:'pointer' }} onClick={() => handleEditVideo(video._id, video.title, video.url)}>Edit</div>
                                    <div onClick={()=>{handleDeleteVideo(video._id)}} style={{ color: 'red',cursor:'pointer' }}>Delete</div>
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </Table>

            {/* Modal for adding new video */}
            <Modal show={showModal} onHide={handleClose} style={{ zIndex: '99999' }}>
                <Modal.Header closeButton>
                    <Modal.Title>Add New Video</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form.Group controlId="newVideoName">
                        <Form.Label>Video Name</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter video name"
                            name="videoName"
                            value={newVideoName}
                            onChange={handleInputChange}
                        />
                    </Form.Group>
                    <Form.Group controlId="newVideoUrl">
                        <Form.Label>Video URL</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter video URL"
                            name="videoUrl"
                            value={newVideoUrl}
                            onChange={handleInputChange}
                        />
                    </Form.Group>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Cancel
                    </Button>
                    <Button variant="primary" onClick={handleAddVideo}>
                        Add
                    </Button>
                </Modal.Footer>
            </Modal>

            {/* Modal for editing existing video */}
            <Modal show={editVideoId !== null} onHide={handleClose} style={{ zIndex: '99999' }}>
                <Modal.Header closeButton>
                    <Modal.Title>Edit Video</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form.Group controlId="editedVideoName">
                        <Form.Label>Video Name</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter video name"
                            name="editedVideoName"
                            value={editedVideoName}
                            onChange={handleInputChange}
                        />
                    </Form.Group>
                    <Form.Group controlId="editedVideoUrl">
                        <Form.Label>Video URL</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter video URL"
                            name="editedVideoUrl"
                            value={editedVideoUrl}
                            onChange={handleInputChange}
                        />
                    </Form.Group>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Cancel
                    </Button>
                    <Button variant="primary" onClick={handleUpdateVideo}>
                        Update
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export const Notes = () => {
  const location = useLocation();
  const [showModal, setShowModal] = useState(false);
  const [subject, setSubject] = useState(location.state ? location.state.subject : {});
  const [course, setCourse] = useState(location.state ? location.state.course : {});
  const [selectedChapter, setSelectedChapter] = useState(location.state ? location.state.chapter : {});
  const [newnoteName, setNewnoteName] = useState("");
  const [newnoteUrl, setNewnoteUrl] = useState("");
  const [editnoteId, setEditnoteId] = useState(null);
  const [editednoteName, setEditednoteName] = useState("");
  const [editednoteUrl, setEditednoteUrl] = useState("");

  const handleShow = () => {
      setShowModal(true);
  };

  const handleClose = () => {
      setShowModal(false);
      setEditnoteId(null);
      setEditednoteName("");
      setEditednoteUrl("");
  };

  const handleInputChange = (event) => {
      const { name, value } = event.target;
      if (name === "noteName") {
          setNewnoteName(value);
      } else if (name === "noteUrl") {
          setNewnoteUrl(value);
      } else if (name === "editednoteName") {
          setEditednoteName(value);
      } else if (name === "editednoteUrl") {
          setEditednoteUrl(value);
      }
  };

  const handleAddnote = () => {
      // Prepare the request body
      const requestBody = {
          courseId: course._id,
          subjectId: subject._id,
          chapterId: selectedChapter._id,
          noteName: newnoteName,
          noteUrl: newnoteUrl
      };

      // Send a POST request to add the note
      fetch(process.env.REACT_APP_API_CALLBACK + '/cources/addnote', {
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
          console.log('note added successfully:', data);
          // Close the modal
          handleClose();
          // Update the state to reflect the new note
          setSelectedChapter({...selectedChapter,
            notes: [...selectedChapter.notes, data.newnote]
          });
      })
      .catch(error => {
          console.error('Error adding note:', error);
      });
  };

  const handleEditnote = (noteId, noteName, noteUrl) => {
      setEditnoteId(noteId);
      setEditednoteName(noteName);
      setEditednoteUrl(noteUrl);
  };

  const handleUpdatenote = () => {
      // Prepare the request body
      const requestBody = {
          courseId:course._id,
          subjectId: subject._id,
          chapterId: selectedChapter._id,
          noteId: editnoteId,
          newnoteName: editednoteName,
          newnoteUrl: editednoteUrl
      };

      // Send a POST request to update the note details
      fetch(process.env.REACT_APP_API_CALLBACK + '/cources/updatenote', {
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
          console.log('note updated successfully:', data);
          // Close the modal
          handleClose();
          // Update the state to reflect the updated note details
          const updatednotes = selectedChapter.notes.map(note => {
              if (note._id === editnoteId) {
                  return { ...note, title: editednoteName, url: editednoteUrl };
              }
              return note;
          });
          setSelectedChapter({...selectedChapter, notes: updatednotes});
          // Clear the editing state variables
          setEditnoteId(null);
          setEditednoteName("");
          setEditednoteUrl("");
      })
      .catch(error => {
          console.error('Error updating note:', error);
      });
  };

  const handleDeletenote = (noteId) => {
    // Show confirmation dialog before deleting
    if (window.confirm('Are you sure you want to delete this note?')) {
        // Send a DELETE request to delete the note
        fetch(`${process.env.REACT_APP_API_CALLBACK}/cources/deletenote`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                courseId: course._id,
                subjectId: subject._id,
                chapterId: selectedChapter._id,
                noteId: noteId
            })
        })
        .then(response => {
            if (response.ok) {
                // Remove the note from the state
                const updatednotes = selectedChapter.notes.filter(note => note._id !== noteId);
                setSelectedChapter({...selectedChapter, notes: updatednotes});
                console.log('note deleted successfully');
            } else {
                throw new Error('Network response was not ok.');
            }
        })
        .catch(error => {
            console.error('Error deleting note:', error);
        });
    }
};

  return (
      <div style={{minHeight:'100vh'}}>
          <Container>
              <Row
                  style={{
                      display: "flex",
                      flexDirection: "row",
                      justifyContent: "space-between",
                      margin: "40px 0px",
                  }}
              >
                  <h3 style={{ maxWidth: "fit-content",textTransform:'capitalize' }}>{course.name} / {subject.title} / {selectedChapter.title} / notes</h3>
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
                      <th>Uploaded On</th>
                      <th>Link</th>
                      <th>Action</th>
                  </tr>
              </thead>
              <tbody>
                  {/* Iterate over notes and display them */}
                  {selectedChapter.notes && selectedChapter.notes.map((note, noteIndex) => {
                      return (
                          <tr key={note._id}>
                              <td>{noteIndex + 1}</td>
                              <td>{note.title}</td>
                              <td>{formatDate(note.createdAt)}</td>
                              <td>{note.url}</td>
                              <td style={{ display: 'flex', justifyContent: 'space-evenly', gap: '10px' }}>
                                  <div href="#" style={{ color: 'green',cursor:'pointer' }} onClick={() => handleEditnote(note._id, note.title, note.url)}>Edit</div>
                                  <div onClick={()=>{handleDeletenote(note._id)}} style={{ color: 'red',cursor:'pointer' }}>Delete</div>
                              </td>
                          </tr>
                      );
                  })}
              </tbody>
          </Table>

          {/* Modal for adding new note */}
          <Modal show={showModal} onHide={handleClose} style={{ zIndex: '99999' }}>
              <Modal.Header closeButton>
                  <Modal.Title>Add New note</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                  <Form.Group controlId="newnoteName">
                      <Form.Label>note Name</Form.Label>
                      <Form.Control
                          type="text"
                          placeholder="Enter note name"
                          name="noteName"
                          value={newnoteName}
                          onChange={handleInputChange}
                      />
                  </Form.Group>
                  <Form.Group controlId="newnoteUrl">
                      <Form.Label>note URL</Form.Label>
                      <Form.Control
                          type="text"
                          placeholder="Enter note URL"
                          name="noteUrl"
                          value={newnoteUrl}
                          onChange={handleInputChange}
                      />
                  </Form.Group>
              </Modal.Body>
              <Modal.Footer>
                  <Button variant="secondary" onClick={handleClose}>
                      Cancel
                  </Button>
                  <Button variant="primary" onClick={handleAddnote}>
                      Add
                  </Button>
              </Modal.Footer>
          </Modal>

          {/* Modal for editing existing note */}
          <Modal show={editnoteId !== null} onHide={handleClose} style={{ zIndex: '99999' }}>
              <Modal.Header closeButton>
                  <Modal.Title>Edit note</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                  <Form.Group controlId="editednoteName">
                      <Form.Label>note Name</Form.Label>
                      <Form.Control
                          type="text"
                          placeholder="Enter note name"
                          name="editednoteName"
                          value={editednoteName}
                          onChange={handleInputChange}
                      />
                  </Form.Group>
                  <Form.Group controlId="editednoteUrl">
                      <Form.Label>note URL</Form.Label>
                      <Form.Control
                          type="text"
                          placeholder="Enter note URL"
                          name="editednoteUrl"
                          value={editednoteUrl}
                          onChange={handleInputChange}
                      />
                  </Form.Group>
              </Modal.Body>
              <Modal.Footer>
                  <Button variant="secondary" onClick={handleClose}>
                      Cancel
                  </Button>
                  <Button variant="primary" onClick={handleUpdatenote}>
                      Update
                  </Button>
              </Modal.Footer>
          </Modal>
      </div>
  );
};