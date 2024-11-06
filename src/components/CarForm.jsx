import { useState } from "react";
import { useCars } from "../context/CarsContext";

const CarForm = ({ car = {}, onClose }) => {
  const [formData, setFormData] = useState({
    make: car.make || "",
    model: car.model || "",
    year: car.year || "",
  });
  const { addCar, updateCar } = useCars();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (car.id) {
      updateCar({ ...formData, id: car.id });
    } else {
      addCar(formData);
    }
    onClose();
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        name="make"
        value={formData.make}
        onChange={handleChange}
        placeholder="Make"
      />
      <input
        name="model"
        value={formData.model}
        onChange={handleChange}
        placeholder="Model"
      />
      <input
        name="year"
        value={formData.year}
        onChange={handleChange}
        placeholder="Year"
      />
      <button type="submit">Save</button>
    </form>
  );
};

export default CarForm;
