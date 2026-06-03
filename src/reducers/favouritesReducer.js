export const initialState = JSON.parse(
  localStorage.getItem("favourites")
) || [];

 export function favouritesReducer(state, action) {
  switch (action.type) {
    case "TOGGLE_FAVOURITE": {
      const exists = state.includes(action.payload);

      if (exists) {
        return state.filter(
          (id) => id !== action.payload
        );
      }

      return [...state, action.payload];
    }

    default:
      return state;
  }
}