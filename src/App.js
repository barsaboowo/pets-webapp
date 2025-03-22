import React, { useEffect, useState } from "react";

function App() {
  const [pets, setPets] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://my-pet-worker.sam-barber.workers.dev/")
      .then((response) => response.json())
      .then((data) => {
        setPets(data.results); // Update state with fetched data
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching pets:", error);
        setLoading(false);
      });
  }, []);

  return (
    <div style={{ textAlign: "center", padding: "20px" }}>
      <h1>My Pet List</h1>
      <p>Hi Everyone and welcome to my pets page!</p>
      {loading ? (
        <p>Loading pets...</p>
      ) : (
        <table border="1" style={{ margin: "0 auto", width: "50%" }}>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Type</th>
              <th>Gender</th>
              <th>Image</th>
            </tr>
          </thead>
          <tbody>
            {pets.length > 0 ? (
              pets.map((pet) => (
                <tr key={pet.pet_id}>
                  <td>{pet.pet_id}</td>
                  <td>{pet.pet_name}</td>
                  <td>{pet.pet_type}</td>
                  <td>{pet.pet_gender}</td>
                  <td><img src={pet.pet_image} alt="my pet"></img></td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4">No pets found</td>
              </tr>
            )}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default App;