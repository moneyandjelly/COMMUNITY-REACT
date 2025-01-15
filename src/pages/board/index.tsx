import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./styles/index.scss";
import { requestBoardList } from "./../../apis/api/Board/requestboardlist";
import WriteButton from "./components/WriteButton/WriteButton";

interface BoardItem {
  boardId: number;
  title: string;
  nickname: string;
  createDate: string;
}

const Board: React.FC = () => {
  const navigate = useNavigate();
  const [boardData, setBoardData] = useState<BoardItem[]>([]);
  const [totalPages, setTotalPages] = useState(1);

  const getBoardList = async () => {
    const page = 1;
    const perPage = 10;
    const data = await requestBoardList(page, perPage);
    console.log(data);
    if (data) {
      setBoardData(data.boardList);
      setTotalPages(data.totalPages);
    }
  };

  useEffect(() => {
    getBoardList();
  }, []);

  const handlePostClick = (boardId: number) => {
    navigate(`/board/read/${boardId}`);
  };

  return (
    <div className="board-container">
      <h2 className="board-title">게시판</h2>

      <div className="board-header">
        <WriteButton />
      </div>

      <table className="board-table">
        <thead>
          <tr>
            <th>번호</th>
            <th>제목</th>
            <th>작성자</th>
            <th>작성일</th>
          </tr>
        </thead>
        <tbody>
          {boardData.map((item) => (
            <tr
              key={item.boardId}
              onClick={() => handlePostClick(item.boardId)}
              style={{ cursor: "pointer" }}
              className="board-row"
            >
              <td>{item.boardId}</td>
              <td className="title-cell">{item.title}</td>
              <td>{item.nickname}</td>
              <td>{item.createDate}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="pagination">
        <button>&lt;</button>
        {[...Array(totalPages)].map((_, i) => (
          <button className="active" key={i + 1}>
            {i + 1}
          </button>
        ))}
        <button>&gt;</button>
      </div>
    </div>
  );
};

export default Board;
