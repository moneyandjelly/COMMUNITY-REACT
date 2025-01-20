import { useSelector } from "react-redux";
import { RootState } from "../../store/store";

function index() {
  const { isLoggedIn, nickname, account_id } = useSelector(
    (state: RootState) => state.auth
  );
  return (
    <div>
      {isLoggedIn ? <div>Welcome, {nickname}, AccountId, {account_id}</div> : <div>Please log in, {nickname}</div>}
    </div>
  );
}

export default index;
