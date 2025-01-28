import React from 'react';
import { Link } from 'react-router-dom';

const AboutUs = () => {
  return (
    <div className="container mx-auto mt-10 px-4 py-6 bg-gray-100 rounded-lg shadow-md">
      <h1 className="text-4xl font-bold mb-4 text-center text-purple-600">About Us</h1>
      <p className="text-lg mb-4">
        Welcome to Sattva Flow, your go-to application for yoga enthusiasts! Our mission is to provide a platform where users can easily register for yoga classes, connect with instructors, and enhance their well-being through the practice of yoga.
      </p>
      <p className="text-lg mb-4">
        At Sattva Flow, we believe in the transformative power of yoga. Whether you are a beginner or an experienced yogi, our classes are designed to cater to all levels. Join us to explore various styles of yoga, improve your flexibility, and find your inner peace.
      </p>
      <p className="text-lg mb-4">
        Our dedicated team is committed to creating a supportive and inclusive community for all yogis. We are here to guide you on your journey to wellness and mindfulness.
      </p>
      <p className="text-lg mb-4">
        Thank you for choosing Sattva Flow. We look forward to helping you achieve your yoga goals!
      </p>
      <div className="text-center mt-6">
        <Link to="/login" className="text-blue-500 hover:underline mr-4">Login</Link>
        <Link to="/signup" className="text-blue-500 hover:underline">Sign Up</Link>
      </div>
    </div>
  );
};

export default AboutUs;
