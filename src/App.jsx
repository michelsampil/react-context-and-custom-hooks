import { ThemeProvider } from "./context/ThemeContext";
import { CarsProvider } from "./context/CarsContext";
import { CarsPage } from "./components/CarsPage";

const App = () => {
  return (
    <ThemeProvider>
      <CarsProvider>
        <CarsPage />
      </CarsProvider>
    </ThemeProvider>
  );
};

export default App;
