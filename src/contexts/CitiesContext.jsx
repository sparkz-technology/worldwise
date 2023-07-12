import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useReducer,
} from "react";
import PropTypes from "prop-types";
CitiesProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
const CitiesContext = createContext();
const BASE_URL = "http://localhost:8000";
const initialState = {
  cities: [],
  isLoading: false,
  currentCity: {},
  error: "",
};
function reducer(state, action) {
  switch (action.type) {
    case "loading":
      return { ...state, isLoading: true };
    case "cities/loader":
      return { ...state, isLoading: false, cities: action.payload };
    case "city/loader":
      return { ...state, isLoading: false, currentCity: action.payload };
    case "city/created":
      return {
        ...state,
        isLoading: false,
        cities: [...state.cities, action.payload],
        currentCity: action.payload,
      };
    case "city/deleted":
      return {
        ...state,
        isLoading: false,
        cities: state.cities.filter((city) => city.id !== action.payload),
        currentCity: {},
      };
    case "rejected":
      return { ...state, isLoading: false, error: action.payload };
    default:
      throw new Error("Invalid action");
  }
}
function CitiesProvider({ children }) {
  const [{ cities, isLoading, currentCity, error }, dispatch] = useReducer(
    reducer,
    initialState
  );
  useEffect(function () {
    async function fetchData() {
      dispatch({ type: "loading" });

      try {
        const response = await fetch(`${BASE_URL}/cities`);
        const data = await response.json();
        dispatch({ type: "cities/loader", payload: data });
      } catch {
        dispatch({
          type: "rejected",
          payload: "There was an error fetching cities: ",
        });
      }
    }
    fetchData();
  }, []);
  const getCity = useCallback(
    async function getCity(id) {
      if (Number(id) === currentCity.id) return;
      dispatch({ type: "loading" });
      try {
        const response = await fetch(`${BASE_URL}/cities/${id}`);
        const data = await response.json();
        dispatch({ type: "city/loader", payload: data });
      } catch {
        dispatch({
          type: "rejected",
          payload: "There was an error fetching city ",
        });
      }
    },
    [currentCity.id]
  );
  async function createCity(newCity) {
    dispatch({ type: "loading" });
    try {
      const response = await fetch(`${BASE_URL}/cities`, {
        method: "POST",
        body: JSON.stringify(newCity),
        headers: { "Content-Type": "application/json" },
      });
      const data = await response.json();
      dispatch({ type: "city/created", payload: data });
    } catch {
      dispatch({
        type: "rejected",
        payload: "There was an error creating city ",
      });
    }
  }
  async function deleteCity(id) {
    dispatch({ type: "loading" });

    try {
      await fetch(`${BASE_URL}/cities/${id}`, {
        method: "DELETE",
      });
      dispatch({ type: "city/deleted", payload: id });
    } catch {
      dispatch({
        type: "rejected",
        payload: "There was an error deleting city ",
      });
    }
  }
  const value = useMemo(() => {
    return {
      createCity,
      cities,
      isLoading,
      error,
      currentCity,
      getCity,
      deleteCity,
    };
  }, [cities, currentCity, error, getCity, isLoading]);
  return (
    <CitiesContext.Provider value={value}>{children}</CitiesContext.Provider>
  );
}
function useCities() {
  const context = useContext(CitiesContext);
  if (context === undefined)
    throw new Error("CitiesContext was used outside the CitiesProvider");
  return context;
}
// eslint-disable-next-line react-refresh/only-export-components
export { useCities, CitiesProvider };
