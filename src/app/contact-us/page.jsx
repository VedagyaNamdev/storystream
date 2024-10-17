"use client"
import React, { useState } from 'react';
import Header from '../_components/Header';
import { Button } from '@nextui-org/react';
import { Input } from "/src/components/ui/input"; // Adjust import based on your structure
import { Label } from "/src/components/ui/label"; // Adjust import based on your structure

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    // Simple validation
    if (!formData.name || !formData.email || !formData.message) {
      setError('Please fill in all required fields.');
      return;
    }

    // Send data to API or service
    const response = await fetch('/api/contact', { // Create an API route to handle this
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });

    if (response.ok) {
      setSuccess('Your message has been sent successfully!');
      setFormData({ name: '', email: '', subject: '', message: '' }); // Reset form
    } else {
      setError('Failed to send message. Please try again later.');
    }
  };

  return (
    <div>
        <Header maxWidth='full' />
    

    <div className="max-w-4xl mx-auto p-6 space-y-6">
        
      <h1 className="text-3xl font-bold mb-6">Contact Us</h1>
      {error && <p className="text-red-500">{error}</p>}
      {success && <p className="text-green-500">{success}</p>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <Label htmlFor="name">Name</Label>
          <Input
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Your Name"
            required
          />
        </div>
        <div>
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Your Email"
            required
          />
        </div>
        <div>
          <Label htmlFor="subject">Subject</Label>
          <Input
            id="subject"
            name="subject"
            value={formData.subject}
            onChange={handleChange}
            placeholder="Subject"
          />
        </div>
        <div>
          <Label htmlFor="message">Message</Label>
          <Input
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            placeholder="Your Message"
            required
            type="text" // or 'textarea' for larger inputs
            className="h-32" // Add height for better visibility
          />
        </div>
        <Button type="submit" color="primary">
          Send Message
        </Button>
      </form>
    </div>
    </div>
  );
};

export default ContactUs;
