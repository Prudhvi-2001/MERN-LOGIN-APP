import { validations } from "../Login";
export const fetchData = (username) => {
    return (dispatch) => {
        //provide the Api End Point here.
      fetch(`http://localhost:8080/getdetails/${username}`)
        .then((response) => response.json())
        .then((data) => dispatch({ type: 'FETCH_DATA_SUCCESS', payload: data }))
        .catch((error) => dispatch({ type: 'FETCH_DATA_FAILURE', payload: error }));
    };
  };
  