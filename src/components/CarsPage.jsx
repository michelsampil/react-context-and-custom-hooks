import CarList from "./CarList";
import { useState } from "react";
import { useTheme } from "../context/ThemeContext";
import { CreateCarModal } from "./CreateCardModal";

export const CarsPage = () => {
  const { darkMode, toggleTheme } = useTheme();
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  const toggleCreateModal = () => setIsCreateModalOpen(!isCreateModalOpen);

  return (
    <div className={darkMode ? "dark-mode" : "light-mode"}>
      <button onClick={toggleTheme}>
        {darkMode ? "Light Mode ☀️" : "Dark Mode 🌙"}
      </button>
      <button onClick={toggleCreateModal}>Add Car</button>
      <CarList />
      {isCreateModalOpen && <CreateCarModal closeModal={toggleCreateModal} />}
    </div>
  );
};
