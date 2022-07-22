import * as actionTypes from "./actionTypes";
import { message } from "antd";

const initialState: MyTeamState = {
  dogs: [],
};

const reducer = (
  state: MyTeamState = initialState,
  action: MyTeamAction
): MyTeamState => {
  switch (action.type) {
    case actionTypes.ADD_DOG:
      const breedOccurrences = state.dogs.reduce((total, { breed }) => {
        if (breed === action.payload.breed) {
          return (total += 1);
        } else {
          return total;
        }
      }, 0);
      const isAlreadyInTeam = state.dogs.some(
        ({ srcImage }) => srcImage === action.payload.srcImage
      );
      if (!isAlreadyInTeam && breedOccurrences < 3 && state.dogs.length < 10) {
        message.success("Dog successfully added");
        return {
          ...state,
          dogs: [
            ...state.dogs,
            { breed: action.payload.breed, srcImage: action.payload.srcImage },
          ],
        };
      } else {
        message.error(
          "This dog is already in your team, or you exceed breed limit, or maybe your team is complete"
        );
        return {
          ...state,
        };
      }
    case actionTypes.DELETE_DOG:
      const dogs = state.dogs.filter(
        ({ srcImage }) => srcImage != action.payload.srcImage
      );
      message.success("Dog successfully removed");
      return !!dogs.length
        ? {
            ...state,
            dogs: dogs,
          }
        : { ...initialState };
  }
  return state;
};

export default reducer;
