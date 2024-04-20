import React, { useEffect, useState } from 'react';
import Loading from '../../loading/loading';
import { Container, Row, Table } from 'react-bootstrap'; // Assuming you are using Bootstrap for styling

const BuyRequest = () => {

  const [users, setUsers] = useState([]);
  const [courses, setCourses] = useState([]);
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
        setUsers(usersData);
        setCourses(coursesData);
        setLoading(false); // Set loading to false after data fetching is complete
      } catch (error) {
        console.error('Error:', error);
        setLoading(false); // Set loading to false in case of error
      }
    };

    fetchData();
  }, []);

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
              <th>User</th>
              <th>Course</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr key={user.id}>
                <td>{SNo + index + 1}</td> {/* Display the index */}
                <td>{user.username}</td>
                <td>{courses[index].name}</td>
                <td style={{ display: 'flex', justifyContent: 'space-evenly', gap: '10px' }}>
                  <div href="#" style={{ color: 'green', cursor: 'pointer' }} >Grant</div>
                  <div style={{ color: 'red', cursor: 'pointer' }} >Reject</div>
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
