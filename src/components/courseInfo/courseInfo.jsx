import React, { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom';
import { Button, Col, Container, Form, Modal, Row } from "react-bootstrap";
import {jwtDecode} from 'jwt-decode';

import './courseInfo.css'
function CourseInfo({user}) {
    const { id } = useParams(); // Extract the course ID from the URL
    const [course, setCourse] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const[buyClicked, setIsBuyClicked] = useState(false)
    useEffect(() => {
      // Fetch the course data from your backend server
    try {
      setIsLoading(true);
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
            if (data.image.data) {
                const base64 = btoa(
                  new Uint8Array(data.image.data.data).reduce(
                    (data, byte) => data + String.fromCharCode(byte),
                    '',
                  ),
                );
                data.image.data = 'data:' + data.image.contentType + ';base64,' + base64;
              }
          setCourse(data);
          setIsLoading(false);

          console.log(data);
        })
        
     }catch (error) {
            console.error('Error:', error);
            setIsLoading(false);
     }
    }, [id]);
    
      
    const handleBuy = async() =>{
        setIsBuyClicked(true);
        const userId = user._id; // Replace with your user ID
        const courseId = id; // Replace with your params
        const userName = user.name;
        const courseName = course.name
         console.log("clicked")
        try {
          const response = await fetch(process.env.REACT_APP_API_CALLBACK+'/cources/buyCourse', { // Replace with your route
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ userId, userName, courseId, courseName  }),
          });
          console.log("request sent")
          const data = await response.json();
          console.log(data);
        } catch (error) {
          console.error('Error:', error);
        }
    }
      
  return (
    <div>
        { isLoading ? (
          <p>Loading...</p>) : (
         
          <>
          
          <div className="contCard">
            <img src={course.image.data} alt="sample"></img>
            <div className="text-wrap">
              <h4>{course.name}</h4>
              <div className="text">{course.description}</div>
              <div className="text">{course.price}</div>
              {buyClicked ? (
                  <button type="button" class="btn btn-warning" onClick={handleBuy}>Request Pending...</button>
                ) : (
                  <button type="button" class="btn btn-info" onClick={handleBuy}>Buy</button>
                )}      
            </div>
          </div>
          <Container style={{ marginTop: "40px"}}>
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
            </Row>
          </Container>
          </>
      )}
    </div>
  )
}

export default CourseInfo