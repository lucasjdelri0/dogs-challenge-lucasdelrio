export const loadState = () => {
  try {
    const serializedData = localStorage.getItem("myTeamData");
    if (serializedData === null) {
      return undefined;
    }
    return JSON.parse(serializedData);
  } catch (error) {
    return undefined;
  }
};
export const saveState = (state: any) => {
  try {
    let serializedData = JSON.stringify(state);
    localStorage.setItem("myTeamData", serializedData);
  } catch (error) {}
};
