import React, { useEffect, useState } from 'react';
import Loading from '../../loading/loading';
import { Container, Row, Table } from 'react-bootstrap'; // Assuming you are using Bootstrap for styling

const BuyRequest = () => {

  const [users, setUsers] = useState([]);
  const [courses, setCourses] = useState([]);
  const [id, setId] = useState([]);
  const [loading, setLoading] = useState(true); // Set loading state to true initially
  const [SNo, setSNo] = useState(0); // Initialize SNo state

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(process.env.REACT_APP_API_CALLBACK+'/cources/buyRequests');
        const data = await response.json();

        // Extract and store user and course data separately
        const usersData = data.map(item => item.userInfo);
        const coursesData = data.map(item => item.courseInfo);
        const ids = data.map(item => item.id);
        setUsers(usersData);
        setCourses(coursesData);
        setId(ids)
        setLoading(false); // Set loading to false after data fetching is complete
      } catch (error) {
        console.error('Error:', error);
        setLoading(false); // Set loading to false in case of error
      }
    };

    fetchData();
  }, []);
  const handleReject = async(id, email, courseName) => {
   try{
    const response = await fetch(process.env.REACT_APP_API_CALLBACK+'/cources/deleteBuyRequest', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email: email, id: id, name: courseName}),  // replace with the actual email
    });
    window.location.reload();
   }catch(error){
     console.log(error)
   }
  }
  
  const  handleGrant = async (userId, courseId, email, courseName, id) =>{
    try{
      const response = await fetch(process.env.REACT_APP_API_CALLBACK+'/cources/assignCourse', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ user: userId, course: courseId, email: email, name: courseName, id:id}),  // replace with the actual email
      });
      window.location.reload();
     }catch(error){
       console.log(error)
     }
  }
  return (
    <div style={{ minHeight: '100vh' }}>
      <Container>
        <Row
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            margin: "40px 0px",
          }}
        >
          <h3 style={{ maxWidth: "fit-content", textTransform: 'capitalize' }}>Requests For Courses</h3>
        </Row>
      </Container>
      {loading ? ( // Show loading component if data is being fetched
        <Loading />
      ) : (
        <Table style={{ marginTop: '40px' }} striped bordered hover>
          <thead>
            <tr>
              <th>Index</th>
              <th>email Id</th>
              <th>User</th>
              <th>phone</th>
              <th>Course</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {id.map((id, index) => (
              <tr key={id}>
                <td>{SNo + index + 1}</td> {/* Display the index */}
                <td>{users[index].email}</td>
                <td>{users[index].username}</td>
                <td>{users[index].phone}</td>
                <td>{courses[index].name}</td>
                <td style={{ display: 'flex', justifyContent: 'space-evenly', gap: '10px' }}>
                  <div href="#" style={{ color: 'green', cursor: 'pointer' }} onClick={()=>{if(window.confirm('Grant this request?')) handleGrant(users[index].id, courses[index].id, users[index].email, courses[index].name, id)}}>Grant</div>
                  <div style={{ color: 'red', cursor: 'pointer' }} onClick={()=>{if(window.confirm('Reject this request?')) handleReject(id, users[index].email, courses[index].name)}}>Reject</div>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </div>
  );
}

export default BuyRequest;
