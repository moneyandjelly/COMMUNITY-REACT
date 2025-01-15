import "./WriteButton.scss";
import { useNavigate } from "react-router-dom";

function WriteButton() {
  const navigate = useNavigate();
  const getLocalStorageItem = (key) => {
    const itemStr = localStorage.getItem(key);
    if (!itemStr) {
      console.log("유저 토큰 없음");
      return navigate("/login");
    }

    const item = JSON.parse(itemStr);
    const now = new Date();

    if (now.getTime() > item.expireTime) {
      console.log("유저 토큰 시간 만료");
      localStorage.removeItem(key);
      return navigate("/login");
    }
    return navigate("/board/register");
  };
  const handleWriteClick = () => {
    getLocalStorageItem("userToken");
  };
  return (
    <button onClick={handleWriteClick} className="write-button">
      글쓰기
    </button>
  );
}

export default WriteButton;
