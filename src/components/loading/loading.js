import Spinner from 'react-bootstrap/Spinner';

function Loading() {
  return (
    <div style={{display:'flex',height:'100vh',width:'100vw',justifyContent:'center',alignItems:'center'}}>
 <Spinner animation="border" role="status">
      <span className="visually-hidden">Loading...</span>
    </Spinner>
    </div>
   
  );
}

export function LoadingBuffer() {
  return (
    <div style={{display:'flex',height:'100vh',width:'100vw',justifyContent:'center',alignItems:'center', opacity:'0.4', backgroundColor:'white', position:'fixed', zIndex:'9999999999999'}}>
 <Spinner animation="border" role="status">
      <span className="visually-hidden">Loading...</span>
    </Spinner>
    </div>
   
  );
}
export default Loading;