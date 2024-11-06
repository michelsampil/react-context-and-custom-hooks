// useCars.js
import React, { createContext, useContext, useState, useEffect } from "react";

// Create the CarsContext
const CarsContext = createContext();

// CarsProvider component to wrap around parts of the app that need car data
export const CarsProvider = ({ children }) => {
  const [cars, setCars] = useState([]);

  // Fetch cars from the JSON server on component mount
  useEffect(() => {
    fetch("http://localhost:3000/cars")
      .then((response) => response.json())
      .then((data) => setCars(data))
      .catch((error) => console.error("Error fetching cars:", error));
  }, []);

  // Function to add a new car
  const addCar = (car) => {
    fetch("http://localhost:3000/cars", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(car),
    })
      .then((response) => response.json())
      .then((newCar) => setCars((prevCars) => [...prevCars, newCar]));
  };

  // Function to edit an existing car
  const editCar = (id, updatedCar) => {
    fetch(`http://localhost:3000/cars/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedCar),
    })
      .then((response) => response.json())
      .then(() =>
        setCars((prevCars) =>
          prevCars.map((car) => (car.id === updatedCar.id ? updatedCar : car))
        )
      );
  };

  // Function to delete a car
  const deleteCar = (carId) => {
    fetch(`http://localhost:3000/cars/${carId}`, {
      method: "DELETE",
    }).then(() =>
      setCars((prevCars) => prevCars.filter((car) => car.id !== carId))
    );
  };

  // Provide cars data and CRUD functions to context consumers
  return (
    <CarsContext.Provider value={{ cars, addCar, editCar, deleteCar }}>
      {children}
    </CarsContext.Provider>
  );
};

// Custom hook to access CarsContext values
export const useCars = () => {
  const context = useContext(CarsContext);
  if (!context) {
    throw new Error("useCars must be used within a CarsProvider");
  }
  return context;
};
