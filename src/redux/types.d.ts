interface IDog {
  breed: string;
  srcImage: string;
}
type MyTeamState = {
  dogs: IDog[];
};
type MyTeamAction = {
  type: string;
  payload: IDog;
};
type DispatchType = (args: MyTeamAction) => MyTeamAction;
