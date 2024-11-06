import { createContext, useContext, useReducer, useEffect } from "react";
import axios from "axios";

const CarsContext = createContext();

const carsReducer = (state, action) => {
  switch (action.type) {
    case "SET_CARS":
      return action.payload;
    case "ADD_CAR":
      return [...state, action.payload];
    case "REMOVE_CAR":
      return state.filter((car) => car.id !== action.payload);
    case "UPDATE_CAR":
      return state.map((car) =>
        car.id === action.payload.id ? action.payload : car
      );
    default:
      return state;
  }
};

export const CarsProvider = ({ children }) => {
  const [cars, dispatch] = useReducer(carsReducer, []);

  useEffect(() => {
    const fetchCars = async () => {
      try {
        const response = await axios.get("http://localhost:3000/cars");
        dispatch({ type: "SET_CARS", payload: response.data });
      } catch (error) {
        console.error("Failed to fetch cars:", error);
      }
    };

    fetchCars();
  }, []);

  const addCar = async (car) => {
    try {
      const response = await axios.post("http://localhost:3000/cars", car);
      dispatch({ type: "ADD_CAR", payload: response.data });
    } catch (error) {
      console.error("Failed to add car:", error);
    }
  };

  const removeCar = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/cars/${id}`);
      dispatch({ type: "REMOVE_CAR", payload: id });
    } catch (error) {
      console.error("Failed to remove car:", error);
    }
  };

  const updateCar = async (id, updatedCar) => {
    try {
      const response = await axios.patch(
        `http://localhost:3000/cars/${updatedCar.id}`,
        updatedCar
      );
      dispatch({ type: "UPDATE_CAR", payload: response.data });
    } catch (error) {
      console.error("Failed to update car:", error);
    }
  };

  return (
    <CarsContext.Provider value={{ cars, addCar, removeCar, updateCar }}>
      {children}
    </CarsContext.Provider>
  );
};

export const useCars = () => useContext(CarsContext);
