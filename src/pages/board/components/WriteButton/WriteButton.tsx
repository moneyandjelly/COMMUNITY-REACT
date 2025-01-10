import "./WriteButton.scss";
import { useNavigate } from "react-router-dom";

function WriteButton() {
  const navigate = useNavigate();
  const handleWriteClick = () => {
    navigate("/board/register");
  };
  return (
    <button onClick={handleWriteClick} className="write-button">
      글쓰기
    </button>
  );
}

export default WriteButton;
