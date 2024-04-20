import { BasicCard, BasicCardButton } from "../card/card";
import NavScrollExample from "../navbar/navbar"
import Carousel from 'react-bootstrap/Carousel';
import React, { useEffect, useState } from "react";
import './home.css'
function Crausal() {
    return (
      <Carousel className="crau" >
        <Carousel.Item>
          <img
            className="d-block w-100"
            src="/poster1.jpg" // Replace this URL with your actual image URL
            alt="First slide"
          />
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src="/slide2.jpg" // Replace this URL with your actual image URL
            alt="First slide"
          />
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src="/slide3.jpg" // Replace this URL with your actual image URL
            alt="First slide"
          />
        </Carousel.Item>
      </Carousel>
    );
  }

export const Home = ()=>{

  const [courses, setCourses] = useState(null);
  const [bestCourses, setBestCourses] = useState(null);
  useEffect(() => {
    fetchCourses();
  }, []);
  const fetchCourses = async () => {
    try {
      const response = await fetch(
        process.env.REACT_APP_API_CALLBACK + "/cources/"
      );
      const data = await response.json();
      data.forEach(course => {
        if (course.image.data) {
          const base64 = btoa(
            new Uint8Array(course.image.data.data).reduce(
              (data, byte) => data + String.fromCharCode(byte),
              '',
            ),
          );
          course.image.data = 'data:' + course.image.contentType + ';base64,' + base64;
        }
      });
      setCourses(data);
      console.log(data);
      setBestCourses(data.slice(0,3));
    
      
      console.log(data);
    } catch (error) {
      console.error("Error fetching courses:", error);
    }
  };
    return(
        <div className="body">
         <Crausal/>

         <div className="contCard">
            <img src='/rjsir.jpg' alt="sample"></img>
            <div className="text-wrap">
                <h4>Guiding Minds, Igniting Futures: Meet the Visionary Director of Education Point</h4>
                <div className="text">
                In the hallowed halls of Education Point, where knowledge blooms and aspirations take flight, there exists a luminary who orchestrates this academic symphony. Sir Rajneesh Panday, the esteemed Director, a chemistry virtuoso, and the driving force behind countless success stories. His classroom is a crucible where elements of curiosity, dedication, and inspiration react to form brilliant minds. With a penchant for simplifying complex concepts, Rajneesh sir transforms the seemingly arcane world of chemistry into a captivating adventure. But his influence extends beyond the classroom walls. As the creator of the popular YouTube channel “Chemical Lotcha,” he demystifies chemical reactions, making them accessible to learners worldwide.
                </div>
            </div>
         </div>

         <div className="selfCard">
            <h2>Best Courses</h2>
            <div className="flex-scroll">
                 
                {bestCourses && bestCourses.map((course, index) => (
                    <div key={index}>


                       <BasicCardButton id= {course._id} img={course.image.data} title={course.name} text={course.description}/>
                    
                    </div>
                  ))
                }
           
            </div>
         </div>
          <section id='offline'>
          <div className="contCard">
         <div className="text-wrap" style={{"max-width":"450px"}}>
                <h4>Our Remarkable Achievements</h4>
                <div className="text">At Education Point, our achievements speak volumes. From top exam ranks to transformative success stories, we celebrate every milestone. Our students’ victories are our own, fueling our commitment to excellence.</div>
         </div>
            <div className="styleFlexParent">
                <div className="cont4">
                    <div className="cont2">
                        <div className="smallBox">10+ Cources</div>
                        <div className="recBox">100+ Toppers</div>
                    </div>
                    <div className="cont2">
                        <div className="recBox">200+ Notes</div>
                        <div className="smallBox"> 1000+ <br/>Videos</div>

                    </div>
                </div>
                <div className="bigBox">
                    1000+<br/>Students
                </div>
                
            </div>
         </div>

          </section>
         
         <div className="selfCard">
            <h2>Offline Courses</h2>
            <div className="flex-scroll">
            {courses && courses.map((course, index) => (
                course.mode === "Offline" && (
                  <div key={index}>
                    <BasicCardButton id= {course._id} img={course.image.data} title={course.name} text={course.description}/>
                  </div>
                )
              ))}

                {/* <BasicCardButton img={'/physics.webp'} title={'Prayas Batch'} text={"Some quick example text to build on the card title and make up the bulk of the card's content."}/>
                <BasicCardButton img={'/class.webp'} title={'Ramanujan Batch'} text={"Some quick example text to build on the card title and make up the bulk of the card's content."}/>
                <BasicCardButton img={'/physics.webp'} title={'Eklavya Batch'} text={"Some quick example text to build on the card title and make up the bulk of the card's content."}/>
                <BasicCardButton img={'/class.webp'} title={'Arjuna Batch'} text={"Some quick example text to build on the card title and make up the bulk of the card's content."}/> */}
            </div>
         </div>
          <section id="teachers">

          </section>
         <div className="contCard">
         <div className="text-wrap" style={{"max-width":"450px"}}>
                <h4>Guiding Stars: Our Inspirational Teachers</h4>
                <div className="text">Our teachers, those everyday heroes, illuminate our paths with knowledge and kindness. They ignite curiosity, shape futures, and leave an indelible mark. Let us celebrate these remarkable souls who nurture minds and build dreams.  </div>
         </div>
         <div className="flex-scroll" style={{width:'fit-content'}}>
            <div className="img">
                <img src='/teacher1.jpg' alt='t1'></img>
            </div>
            <div className="img">
            <img src='/teacher3.jpg' alt='t1'></img>
            </div>
            <div className="img">
            <img src='/teacher2.jpg' alt='t1'></img>

            </div>
         </div>
         </div>

         
         <div className="selfCard">
            <h2>Online Courses</h2>
            <div className="flex-scroll">
            {courses && courses.map((course, index) => (
               course.mode === "Online" && (
                 <div key={index}>
                   <BasicCardButton id= {course._id} img={course.image.data} title={course.name} text={course.description}/>
                 </div>
               )
             ))}
            </div>
         </div>

        </div>
       
    )
}
