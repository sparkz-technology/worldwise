import { createContext, useContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
CitiesProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
const CitiesContext = createContext();
const BASE_URL = "http://localhost:8000";
function CitiesProvider({ children }) {
  const [cities, setCities] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const [currentCity, setCurrentCity] = useState();
  useEffect(function () {
    async function fetchData() {
      try {
        setLoading(true);
        const response = await fetch(`${BASE_URL}/cities`);
        const data = await response.json();
        setCities(data);
      } catch (err) {
        alert("There was an error fetching cities: " + err.message);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);
  async function getCity(id) {
    try {
      setLoading(true);
      const response = await fetch(`${BASE_URL}/cities/${id}`);
      const data = await response.json();
      setCurrentCity(data);
    } catch (err) {
      alert("There was an error fetching cities: " + err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <CitiesContext.Provider value={{ cities, isLoading, currentCity, getCity }}>
      {children}
    </CitiesContext.Provider>
  );
}
function useCities() {
  const context = useContext(CitiesContext);
  if (context === undefined)
    throw new Error("CitiesContext was used outside the CitiesProvider");
  return context;
}
export { useCities, CitiesProvider };
