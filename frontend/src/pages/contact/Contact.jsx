import React, { useState } from "react";
import "./contact.css";

export default function Contact() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleFormSubmit = (e) => {
    e.preventDefault();
    // Process the form submission here (e.g., send email, save to database)
    console.log("Name:", name);
    console.log("Email:", email);
    console.log("Message:", message);
    // Reset the form fields
    setName("");
    setEmail("");
    setMessage("");
  };

  return (
    <>
      <div className="contact">
        <h1 className="center-text">Contact Us</h1>
        <div className="contactForm">
          <h2 className="center-text">Send us a message</h2>
          <form onSubmit={handleFormSubmit}>
            <input
              type="text"
              placeholder="Your Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
            <input
              type="email"
              placeholder="Your Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <textarea
              placeholder="Your Message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              required
            ></textarea>
            <button type="submit">Send</button>
          </form>
        </div>
        <div className="contactDetails">
          <div className="companyInfo">
            <h3>FlavorHands</h3>
            <p></p>
            <p class="line-spacing">Shornur</p>
            <p class="line-spacing">Cheruthuruthy, Kerala, 679531</p>
            <p class="line-spacing">Email: info@foodblogco.com</p>
            <p class="line-spacing">Phone: 04884 259 000</p>
          </div>
          <div className="mapContainer">
            {/* Insert your map component or embed code here */}
            <iframe
              title="Map"
              className="map"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3920.090335508201!2d76.28777251480035!3d10.727515692354698!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ba7dcdc5d78c9a1%3A0x37f9c68d4eb72174!2sJyothi%20Engineering%20College%2C%20Cheruthuruthy%2C%20Thrissur!5e0!3m2!1sen!2sin!4v1685180702744!5m2!1sen!2sin://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3920.090335546262!2d76.28738627466862!3d10.7275156894183!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ba7dcdc5d78c9a1%3A0x37f9c68d4eb72174!2sJyothi%20Engineering%20College%2C%20Cheruthuruthy%2C%20Thrissur!5e0!3m2!1sen!2sin!4v1685179089102!5m2!1sen!2sin"
              allowFullScreen
            ></iframe>
          </div>
        </div>
      </div>
    </>
  );
}
