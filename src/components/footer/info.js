import React from 'react';
import { Container, Card } from 'react-bootstrap';

export const AboutUsComponent = () => {
  return (
    <Container className='info-container'>
      <Card>
        <Card.Body>
          <Card.Title>Welcome to Education Point</Card.Title>
          <Card.Text>
            Your one-stop destination for quality online education. Founded by President Rajnish Panday, Education Point is dedicated to providing comprehensive learning solutions for students preparing for JEE, NEET, and classes 6th to 12th.
          </Card.Text>
          <Card.Text>
            At Education Point, we believe in fostering academic excellence through innovative teaching methods and personalized attention. Our team of experienced educators and subject matter experts is committed to empowering students with the knowledge and skills necessary to succeed in their academic pursuits.
          </Card.Text>
          <Card.Text>
            Whether you prefer online or offline learning, Education Point offers a wide range of courses tailored to meet your needs. From interactive online classes to offline study materials, we strive to create a conducive learning environment that promotes academic growth and success.
          </Card.Text>
          <Card.Text>
            Join us at Education Point and embark on a journey towards academic excellence!
          </Card.Text>
        </Card.Body>
      </Card>
    </Container>
  );
};

export const PrivacyPolicyComponent = () => {
    return (
      <Container className='info-container'>
        <Card>
          <Card.Body>
            <Card.Title>Privacy Policy:</Card.Title>
            <Card.Text>
              At Education Point, we understand the importance of safeguarding your privacy and are committed to protecting the personal information you share with us. Our Privacy Policy outlines how we collect, use, and safeguard your information when you interact with our website and services.
            </Card.Text>
            <Card.Text>
              <strong>Information Collection:</strong> We may collect personal information such as name, email address, and contact number when you register for our courses or subscribe to our newsletter. We may also collect non-personal information such as browser type, operating system, and IP address for analytical purposes.
            </Card.Text>
            <Card.Text>
              <strong>Use of Information:</strong> The information we collect is used to personalize your learning experience, improve our services, and communicate with you about course updates and promotions. We do not sell or share your personal information with third parties without your consent.
            </Card.Text>
            <Card.Text>
              <strong>Security Measures:</strong> We implement industry-standard security measures to protect your personal information from unauthorized access, disclosure, alteration, or destruction.
            </Card.Text>
            <Card.Text>
              <strong>Cookie Policy:</strong> We may use cookies to enhance your browsing experience and analyze website traffic. You have the option to accept or decline cookies through your browser settings.
            </Card.Text>
            <Card.Text>
              By using our website and services, you consent to the terms outlined in our Privacy Policy.
            </Card.Text>
          </Card.Body>
        </Card>
      </Container>
    );
};

export const TermsAndConditionsComponent = () => {
return (
    <Container className='info-container'>
    <Card>
        <Card.Body>
        <Card.Title>Terms & Conditions:</Card.Title>
        <Card.Text>
            By accessing and using the Education Point website and services, you agree to comply with the following terms and conditions:
        </Card.Text>
        <Card.Text>
            <strong>Registration:</strong> You must be at least 18 years old to register for our courses. By registering, you agree to provide accurate and complete information and to update your information as necessary.
        </Card.Text>
        <Card.Text>
            <strong>Course Access:</strong> Upon registration, you will receive access to the courses you have enrolled in. Course materials are for personal use only and may not be shared or distributed without prior consent.
        </Card.Text>
        <Card.Text>
            <strong>Payment:</strong> Payment for courses must be made in full at the time of registration. We accept various payment methods, including credit/debit cards and online transfers.
        </Card.Text>
        <Card.Text>
            <strong>Copyright:</strong> All course materials, including text, videos, and images, are the property of Education Point and may not be reproduced or distributed without permission.
        </Card.Text>
        <Card.Text>
            <strong>Cancellation and Refund:</strong> Cancellation and refund policies vary depending on the course. Please refer to our Refund Policy for more information.
        </Card.Text>
        <Card.Text>
            <strong>User Conduct:</strong> You agree to abide by our community guidelines and refrain from engaging in any conduct that is unlawful, abusive, or disruptive to other users.
        </Card.Text>
        <Card.Text>
            Education Point reserves the right to modify these terms and conditions at any time without prior notice.
        </Card.Text>
        </Card.Body>
    </Card>
    </Container>
);
};

export const RefundPolicyComponent = () => {
    return (
      <Container className='info-container'>
        <Card>
          <Card.Body>
            <Card.Title>Refund Policy:</Card.Title>
            <Card.Text>
              At Education Point, we strive to provide high-quality courses and exceptional customer service. If you are not satisfied with your purchase, we offer a refund policy outlined below:
            </Card.Text>
            <Card.Text>
              <strong>Course Refunds:</strong> Refunds are available for courses within a specified timeframe from the date of purchase. The refund period varies depending on the course and is clearly stated at the time of purchase.
            </Card.Text>
            <Card.Text>
              <strong>Refund Process:</strong> To request a refund, please contact our customer support team with your purchase details. Refunds will be issued to the original payment method within a reasonable timeframe.
            </Card.Text>
            <Card.Text>
              <strong>Exceptions:</strong> Certain courses may have non-refundable deposits or fees. Please review the course details and refund policy before making a purchase.
            </Card.Text>
            <Card.Text>
              <strong>Cancellation:</strong> If you wish to cancel your enrollment in a course, please notify us as soon as possible. Refunds may be subject to cancellation fees or prorated based on the amount of course material accessed.
            </Card.Text>
            <Card.Text>
              Education Point reserves the right to modify this refund policy at any time without prior notice.
            </Card.Text>
          </Card.Body>
        </Card>
      </Container>
    );
  };

export const ContactUsComponent = () => {
  return (
    <Container className='info-container'>
      <Card>
        <Card.Body>
          <Card.Title>Contact Us:</Card.Title>
          <Card.Text>
            <strong>Email:</strong> educationpointnaini@gmail.com<br />
            <strong>Phone:</strong> +918707242287<br />
            <strong>Address:</strong> AM - 14, ADA Road Near Maharishi Chauraha, Naini Prayagraj, Uttar Pradesh, India.
          </Card.Text>
        </Card.Body>
      </Card>
    </Container>
  );
};
  