// src/components/EditCarModal.jsx
import { useState } from "react";
import { useCars } from "../context/CarsContext";

export const EditCarModal = ({ car, closeModal }) => {
  const { updateCar } = useCars();
  const [formData, setFormData] = useState({ ...car });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const updatedCar = {
      id: car.id,
      make: formData.make,
      model: formData.model,
      year: formData.year,
    };

    console.log("updatedCar", updatedCar);
    updateCar(car.id, updatedCar);
    closeModal();
  };

  return (
    <div
      style={{
        position: "fixed",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        background: "white",
        padding: "20px",
        borderRadius: "5px",
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
      }}
    >
      <h2>Edit Car</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Make:
          <input
            type="text"
            name="make"
            value={formData.make}
            onChange={handleChange}
          />
        </label>
        <br />
        <label>
          Model:
          <input
            type="text"
            name="model"
            value={formData.model}
            onChange={handleChange}
          />
        </label>
        <br />
        <label>
          Year:
          <input
            type="number"
            name="year"
            value={formData.year}
            onChange={handleChange}
          />
        </label>
        <br />
        <button type="submit">Save</button>
        <button type="button" onClick={closeModal}>
          Cancel
        </button>
      </form>
    </div>
  );
};

export default EditCarModal;
