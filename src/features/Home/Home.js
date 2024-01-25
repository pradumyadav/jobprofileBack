import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  createInstructurAsync,
  getAllInstructorAsync,
  selectAllInstructor,
} from "./homeSlice";
import "./Home.css";

import { getUserAsync, selectLoggedInUser, selectUser } from "../auth/authSlice";

function Home() {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const instructors = useSelector(selectAllInstructor);
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [instructorData, setInstructorData] = useState({
    Categories: "",
    jobtypes: "",
    jobtlisting: "",
  });
  const [submittedData, setSubmittedData] = useState(null);

  const handleInputChange = (e) => {
    setInstructorData({
      ...instructorData,
      [e.target.name]: e.target.value,
    });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      await dispatch(createInstructurAsync(instructorData));
      setSubmittedData({ ...instructorData });
      setInstructorData({
        Categories: "",
        jobtypes: "",
        jobtlisting: "",
      });
      setIsFormVisible(false);
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  useEffect(() => {
    dispatch(getAllInstructorAsync());
    dispatch(getUserAsync());
  }, [dispatch]);

  return (
    <div className="container">
      <div className="form-container">
        {user?.role === "admin" && (
          <button onClick={() => setIsFormVisible(!isFormVisible)}>
            Add Jobs
          </button>
        )}

        {isFormVisible && (
          <>
            <form onSubmit={handleFormSubmit}>
              <label>
                Categories
                <input
                  type="text"
                  name="Categories"
                  value={instructorData.Categories}
                  placeholder="Categories"
                  onChange={handleInputChange}
                  required
                />
              </label>
              <br />

              <label>
                jobtypes
                <input
                  type="text"
                  name="jobtypes"
                  value={instructorData.jobtypes}
                  onChange={handleInputChange}
                  placeholder="jobtypes"
                  required
                />
              </label>
              <br />
              
              <button type="submit">Submit</button>
            </form>
          </>
        )}
      </div>

      <h1>List of Jobs</h1>
            <br/>
      {instructors && (
        <table>
          <thead>
            <tr>
              <th>Categories</th>
              <th>Job Types</th>
          
            </tr>
          </thead>
          <tbody>
            {instructors.map((instructor, index) => (
              <tr key={index}>
                <td>{instructor.Categories}</td>
                <td>{instructor.jobtypes}</td>
              
              </tr>
            ))}
          </tbody>
        </table>
      )}

    
    </div>
  );
}

export default Home;


