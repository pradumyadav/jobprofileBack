import React, { useState } from 'react';
import axios from "axios"
const JobForm= () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    resume: null,
    coverLetter: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleFileChange = (e) => {
    setFormData({
      ...formData,
      resume: e.target.files[0]
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const formDataToSend = new FormData();
      formDataToSend.append('name', formData.name);
      formDataToSend.append('email', formData.email);
      formDataToSend.append('phone', formData.phone);
      formDataToSend.append('address', formData.address);
      formDataToSend.append('resume', formData.resume); // Pass the file directly
      formDataToSend.append('coverLetter', formData.coverLetter);
  
      const response = await axios.post('http://localhost:8080/jobform/submit', formDataToSend, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
  
      console.log(response.data);
      // Reset form
      setFormData({
        name: '',
        email: '',
        phone: '',
        address: '',
        resume: null,
        coverLetter: ''
      });
    } catch (error) {
      console.error(error);
      // Handle error
    }
  };
  
  
  return (
    <div>
      <h2>Job Application Form</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Name:
          <input type="text" name="name" value={formData.name} onChange={handleChange} required />
        </label>
        <br />
        <label>
          Email:
          <input type="email" name="email" value={formData.email} onChange={handleChange} required />
        </label>
        <br />
        <label>
          Phone Number:
          <input type="tel" name="phone" value={formData.phone} onChange={handleChange} required />
        </label>
        <br />
        <label>
          Address:
          <textarea name="address" value={formData.address} onChange={handleChange} required />
        </label>
        <br />
        <label>
          Upload Resume:
          <input type="file" name="resume" onChange={handleFileChange} accept=".pdf,.doc,.docx" required />
        </label>
        <br />
        <label>
          Cover Letter:
          <textarea name="coverLetter" value={formData.coverLetter} onChange={handleChange} />
        </label>
        <br />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default JobForm;
