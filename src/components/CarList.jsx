// src/components/CarList.jsx
import { useCars } from "../context/CarsContext";
import { CarCard } from "./CarCard";
import styles from "./CarList.module.css";

const CarList = () => {
  const { cars } = useCars();

  return (
    <div className={styles.list}>
      {cars.map((car) => (
        <CarCard key={car.id} car={car} />
      ))}
    </div>
  );
};

export default CarList;
