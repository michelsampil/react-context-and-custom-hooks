import { useState } from "react";
import { useCars } from "../context/CarsContext";
import { useTheme } from "../context/ThemeContext";
import styles from "./Modal.module.css";

export const CreateCarModal = ({ closeModal }) => {
  const { addCar } = useCars();
  const { darkMode } = useTheme();
  const [formData, setFormData] = useState({
    make: "",
    model: "",
    year: "",
    picture: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newCar = {
      make: formData.make,
      model: formData.model,
      year: formData.year,
      picture: formData.picture,
    };

    addCar(newCar);
    closeModal();
  };

  return (
    <div className={`${styles.modal} ${darkMode ? styles.dark : styles.light}`}>
      <h2>Add New Car</h2>
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
        <br />
        <label>
          Picture:
          <input
            type="text"
            name="picture"
            value={formData.picture}
            onChange={handleChange}
            placeholder="Enter an emoji (e.g., 🚕)"
          />
        </label>
        <div className={styles.buttonGroup}>
          <button type="submit">Add Car</button>
          <button type="button" onClick={closeModal}>
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateCarModal;
