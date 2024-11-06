import { useState } from "react";
import { useCars } from "../context/CarsContext";
import { useTheme } from "../context/ThemeContext";
import styles from "./Modal.module.css";

export const EditCarModal = ({ car, closeModal }) => {
  const { updateCar } = useCars();
  const { darkMode } = useTheme(); // Assuming you have a theme context
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
    <div className={`${styles.modal} ${darkMode ? styles.dark : styles.light}`}>
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
        <label>
          Model:
          <input
            type="text"
            name="model"
            value={formData.model}
            onChange={handleChange}
          />
        </label>
        <label>
          Year:
          <input
            type="text"
            name="year"
            value={formData.year}
            onChange={handleChange}
          />
        </label>
        <div className={styles.buttonGroup}>
          <button type="submit">Save</button>
          <button type="button" onClick={closeModal}>
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditCarModal;
