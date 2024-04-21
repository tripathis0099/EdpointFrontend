import { useState } from "react";
import "./cource_assets.css";
import Nav from "react-bootstrap/Nav";
import { Link } from "react-router-dom";
export const CourseSubjects = ({ subjects }) => {
  console.log(subjects)
  return (
    <div className="subjectCont">
  <div className="text-wrap" style={{ "max-width": "450px" }}>
    <h4>Our Remarkable Achievements</h4>
  </div>
  <div className="subjectFlex">
    {Array.isArray(subjects) && subjects.map((item, index) => {
      return item && <Link to={"/chapters"} key={index} className="subject" style={{textDecoration:"none"}}>{item.title}</Link>;
    })}
  </div>
</div>

  );
};


export const Chapters = () =>{
    return(
        <div style={{display:'flex',flexDirection:'column',minHeight:'100vh',backgroundColor:'#1b1a55'}}>
            
            <h4 style={{margin:'20px',color:"#fff"}}>Course Name</h4>
            
            <div style={{display:'flex',gap:'10px',alignItems:'center',color:'#fff',padding:'10px',justifyContent:'space-between',borderTop:'1px solid #ffffff52'}}>
                <div style={{display:'flex',flexDirection:'column'}}>
                    <h5>Video name</h5>
                    <span style={{fontSize:'12px'}}>March 12th 2024</span>
                </div>
                <div style={{height:'40px',width:'40px'}}>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-box-arrow-right" viewBox="0 0 16 16">
                    <path fill-rule="evenodd" d="M10 12.5a.5.5 0 0 1-.5.5h-8a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 .5.5v2a.5.5 0 0 0 1 0v-2A1.5 1.5 0 0 0 9.5 2h-8A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h8a1.5 1.5 0 0 0 1.5-1.5v-2a.5.5 0 0 0-1 0z"/>
                    <path fill-rule="evenodd" d="M15.854 8.354a.5.5 0 0 0 0-.708l-3-3a.5.5 0 0 0-.708.708L14.293 7.5H5.5a.5.5 0 0 0 0 1h8.793l-2.147 2.146a.5.5 0 0 0 .708.708z"/>
                </svg>
                </div>
            </div>
       
        </div>
    )
}

export const VideosSlide = ()=>{
    return(
        <div style={{display:'flex',flexDirection:'column',minHeight:'100vh',backgroundColor:'#1b1a55'}}>
            
            <div style={{display:'flex',gap:'16px',alignItems:'center',color:'#fff',padding:'10px',borderBottom:'1px solid #ffffff52'}}>
                <img style={{width:'124px',height:'auto',borderRadius:'5px'}} src='https://img.youtube.com/vi/tgbNymZ7vqY/default.jpg'/>
                <div style={{display:'flex',flexDirection:'column'}}>
                    <h5>Video name</h5>
                    <span style={{fontSize:'12px'}}>March 12th 2024</span>
                </div>
            </div>
        </div>
    )
}

export const NotesSlide = ()=>{
    return(
        <div style={{display:'flex',flexDirection:'column',minHeight:'100vh',backgroundColor:'#1b1a55'}}>
            
            <div style={{display:'flex',gap:'10px',alignItems:'center',color:'#fff',padding:'10px',justifyContent:'space-between',borderBottom:'1px solid #ffffff52'}}>
                <div style={{display:'flex',flexDirection:'column'}}>
                    <h5>Video name</h5>
                    <span style={{fontSize:'12px'}}>March 12th 2024</span>
                </div>
                <div style={{height:'40px',width:'40px'}}>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-folder2-open" viewBox="0 0 16 16">
                <path d="M1 3.5A1.5 1.5 0 0 1 2.5 2h2.764c.958 0 1.76.56 2.311 1.184C7.985 3.648 8.48 4 9 4h4.5A1.5 1.5 0 0 1 15 5.5v.64c.57.265.94.876.856 1.546l-.64 5.124A2.5 2.5 0 0 1 12.733 15H3.266a2.5 2.5 0 0 1-2.481-2.19l-.64-5.124A1.5 1.5 0 0 1 1 6.14zM2 6h12v-.5a.5.5 0 0 0-.5-.5H9c-.964 0-1.71-.629-2.174-1.154C6.374 3.334 5.82 3 5.264 3H2.5a.5.5 0 0 0-.5.5zm-.367 1a.5.5 0 0 0-.496.562l.64 5.124A1.5 1.5 0 0 0 3.266 14h9.468a1.5 1.5 0 0 0 1.489-1.314l.64-5.124A.5.5 0 0 0 14.367 7z"/>
                </svg>
                </div>
            </div>
 
        </div>
    )
}

export const VideoNotes = () => {

    const [isVideo,setIsVideo] = useState(true);

  return (
    <div style={{minHeight:'100vh',display:'flex',flexDirection:'column'}}>
      <Nav justify variant="tabs" style={{backgroundColor:'#1b1a559a',borderBottomColor:'#ffffff52'}}>
        <Nav.Item>
          <Nav.Link active={isVideo} onClick={()=>{setIsVideo(!isVideo)}}>Lectures</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link active={!isVideo} onClick={()=>{setIsVideo(!isVideo)}}>Notes</Nav.Link>
        </Nav.Item>
      </Nav>

      {isVideo?<VideosSlide/>:<NotesSlide/>}
    </div>
  );
};
