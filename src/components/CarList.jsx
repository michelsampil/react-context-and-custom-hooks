import { useCars } from "../context/CarsContext";
import { CarCard } from "./CarCard";
import { useTheme } from "../context/ThemeContext";
import styles from "./CarList.module.css";

const CarList = () => {
  const { cars } = useCars();
  const { darkMode } = useTheme();

  return (
    <div className={`${styles.list} ${darkMode ? styles.dark : styles.light}`}>
      {cars.map((car) => (
        <CarCard key={car.id} car={car} />
      ))}
    </div>
  );
};

export default CarList;
