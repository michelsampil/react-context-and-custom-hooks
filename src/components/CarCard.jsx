import { useState } from "react";
import { useCars } from "../context/CarsContext";
import { EditCarModal } from "./EditCarModal";
import { useTheme } from "../context/ThemeContext";
import styles from "./CarCard.module.css";

export const CarCard = ({ car }) => {
  const { removeCar } = useCars();
  const { darkMode } = useTheme();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <div className={`${styles.card} ${darkMode ? styles.dark : styles.light}`}>
      <div className={styles.icon}>{car.picture}</div>
      <div className={styles.details}>
        {car.make} {car.model} ({car.year})
      </div>
      <div className={styles.buttons}>
        <button
          onClick={() => removeCar(car.id)}
          className={`${styles.deleteButton} ${
            darkMode ? styles.deleteDark : styles.deleteLight
          }`}
        >
          Delete
        </button>
        <button
          onClick={openModal}
          className={`${styles.editButton} ${
            darkMode ? styles.editDark : styles.editLight
          }`}
        >
          Edit
        </button>
      </div>

      {isModalOpen && <EditCarModal car={car} closeModal={closeModal} />}
    </div>
  );
};

export default CarCard;
