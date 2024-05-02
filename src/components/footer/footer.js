import React from 'react';
import { Link } from 'react-router-dom';

export const Footer = () => {
  return (
    <>
  <div className="container p-0 m-0" style={{width:'100%',maxWidth:'2000px'}}>
    <footer
      className="text-center text-white"
      style={{ backgroundColor: "#070F2B" }}
    >
      <div className="container">
        <section className="mt-5">
          <div className="row text-center d-flex justify-content-center pt-5">
            <div className="col-md-2">
              <h6 className="text-uppercase font-weight-bold">
                <Link to="/about" className="text-white" style={{textDecoration:'none'}}>
                  About us
                </Link>
              </h6>
            </div>
            <div className="col-md-2">
              <h6 className="text-uppercase font-weight-bold">
                <Link to="/tandc" className="text-white" style={{textDecoration:'none'}}>
                  Terms And Conditions
                </Link>
              </h6>
            </div>
            <div className="col-md-2">
              <h6 className="text-uppercase font-weight-bold">
                <Link to="/privacy-policy" className="text-white" style={{textDecoration:'none'}}>
                  Privacy Policy
                </Link>
              </h6>
            </div>
            <div className="col-md-2">
              <h6 className="text-uppercase font-weight-bold">
                <Link to="/refund-policy" className="text-white" style={{textDecoration:'none'}}>
                  Refund Policy
                </Link>
              </h6>
            </div>
            <div className="col-md-2">
              <h6 className="text-uppercase font-weight-bold">
                <Link to="/contact" className="text-white" style={{textDecoration:'none'}}>
                  Contact
                </Link>
              </h6>
            </div>
          </div>
        </section>
        <hr className="my-5" style={{opacity:'0',position:'relative'}}/>
        <section className="mb-5">
          <div className="row d-flex justify-content-center">
            <div className="col-lg-8">
              <p>
              Education Point Prayagraj, Shaping Futures At Education Point, we go beyond textbooks. Our passionate faculty and modern facilities create an environment where students thrive. As the sun sets over Prayagraj, our students carry knowledge and values that light their paths for a lifetime. Join us a place where dreams take flight.
              </p>
            </div>
          </div>
        </section>
      </div>
      <div
        className="text-center p-3"
        style={{ backgroundColor: "rgba(0, 0, 0, 0.2)" }}
      >
        © 2024 Copyright: Education Point
      </div>
    </footer>
  </div>
</>

  );
};