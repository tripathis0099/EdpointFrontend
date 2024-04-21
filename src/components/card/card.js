import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import './card.css';
import { Link } from 'react-router-dom';
export function BasicCard({img, title, text}) {
  return (
    <Card className='card' style={{width: '18rem',backgroundColor:'#1B1A55',color:'#fff' }}>
      <Card.Img variant="top" src={img} />
      <Card.Body>
        <Card.Title>{title}</Card.Title>
        <Card.Text>
          {text}
        </Card.Text>
      </Card.Body>
    </Card>
  );
}

export function BasicCardButton({id, img, title, text}) {
    return (
      <Link to={`/${id}`} style={{ textDecoration: 'none' }}>
        <Card className='card' style={{ width: '18rem',backgroundColor:'#1B1A55',color:'#fff'}}>
        <Card.Img variant="top" src={img} />
        <Card.Body>
          <Card.Title>{title}</Card.Title>
          <Card.Text>
            {text}
          </Card.Text>
          <Button variant="primary">Go somewhere</Button>
        </Card.Body>
      </Card>
      </Link>
    );
  }
  