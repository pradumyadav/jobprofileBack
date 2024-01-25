

import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  createLectureAsync,
  getLectureAsync,
  selectAllLecture,
  clearError
} from "./lectureSlice";
import { getUserAsync, selectUser } from "../auth/authSlice";
import "./Lecture.css"
const LectureForm = () => {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const [isFormVisible, setIsFormVisible] = useState(false);

  const lectures = useSelector(selectAllLecture);
  const [lectureData, setLectureData] = useState({
    title: "",
    companyDetails: "",
    description: "",
    tagas: "",
    skills: "",
    experienceRequired: "",
    salary: 0,
    extraInformation: ""
  });

  const handleInputChange = (e) => {
    setLectureData({
      ...lectureData,
      [e.target.name]: e.target.value,
    });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      await dispatch(createLectureAsync(lectureData));
      setTimeout(() => {
        dispatch(clearError());
      }, 3000);
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  useEffect(() => {
    dispatch(getLectureAsync());
    dispatch(getUserAsync());
  }, []);

  const handleApply = () => {
    console.log("Sending email...");
    // Implement email sending logic here
  };

  return (
    <div className="lecture-form-container">
      {user?.role === "admin" && (
        <button onClick={() => setIsFormVisible(!isFormVisible)}>
          Add Job Details
        </button>
      )}
      {isFormVisible && (
        <form onSubmit={handleFormSubmit} className="lecture-form">
          <label>
            Title:
            <input
              type="text"
              name="title"
              value={lectureData.title}
              placeholder="Title"
              onChange={handleInputChange}
            />
          </label>
          <br />

          <label>
            Company details:
            <input
              type="text"
              name="companyDetails"
              value={lectureData.companyDetails}
              placeholder="Company Details"
              onChange={handleInputChange}
            />
          </label>
          <br />

          <label>
            Description:
            <textarea
              name="description"
              placeholder="Description"
              value={lectureData.description}
              onChange={handleInputChange}
            />
          </label>
          <br />

          <label>
            Tagas:
            <input
              type="text"
              name="tagas"
              value={lectureData.tagas}
              placeholder="Tagas"
              onChange={handleInputChange}
            />
          </label>
          <br />

          <label>
            Skills:
            <input
              type="text"
              name="skills"
              value={lectureData.skills}
              placeholder="Skills"
              onChange={handleInputChange}
            />
          </label>
          <br />

          <label>
            Experience Required:
            <input
              type="text"
              name="experienceRequired"
              value={lectureData.experienceRequired}
              placeholder="Experience Required"
              onChange={handleInputChange}
            />
          </label>
          <br />

          <label>
            Salary:
            <input
              type="number"
              name="salary"
              value={lectureData.salary}
              placeholder="Salary"
              onChange={handleInputChange}
            />
          </label>
          <br />

     
          <label>
            Extra Information:
            <input
              type="text"
              name="extraInformation"
              value={lectureData.extraInformation}
              placeholder="Extra Information"
              onChange={handleInputChange}
            />
          </label>
          <br />

          <button type="submit">Submit</button>
        </form>
      )}

{user && user.role !== "admin" && (
        <button onClick={handleApply}>Apply</button>
      )}

      <div className="table-container">
        <table className="data-table">
          <thead>
            <tr>
              <th>Title</th>
              <th>Company Details</th>
              <th>Description</th>
              <th>Tagas</th>
              <th>Skills</th>
              <th>Experience Required</th>
              <th>Salary</th>
              <th>Extra Information</th>
            </tr>
          </thead>
          <tbody>
            {lectures?.map((item) => (
              <tr key={item._id}>
                <td>{item.title}</td>
                <td>{item.companyDetails}</td>
                <td>{item.description}</td>
                <td>{item.tagas}</td>
                <td>{item.skills}</td>
                <td>{item.experienceRequired}</td>
                <td>{item.salary}</td>
                <td>{item.extraInformation}</td> 
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default LectureForm;




