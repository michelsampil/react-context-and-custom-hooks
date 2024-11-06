// src/components/CarCard.jsx
import { useState } from "react";
import { useCars } from "../context/CarsContext";
import { EditCarModal } from "./EditCarModal";
import styles from "./CarCard.module.css";

export const CarCard = ({ car }) => {
  const { removeCar } = useCars();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <div className={styles.card}>
      <div className={styles.icon}>{car.picture}</div>
      <div className={styles.details}>
        {car.make} {car.model} ({car.year})
      </div>
      <div className={styles.buttons}>
        <button onClick={() => removeCar(car.id)}>Delete</button>
        <button onClick={openModal}>Edit</button>
      </div>

      {isModalOpen && <EditCarModal car={car} closeModal={closeModal} />}
    </div>
  );
};

export default CarCard;
