import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./ReadBoard.scss";
import { requestReadPost } from "../../../../apis/api/Board/requestReadPost";

interface BoardData {
  boardId: number;
  title: string;
  nickname: string;
  createDate: string;
  content: string;
}

const ReadBoard: React.FC = () => {
  const { boardId } = useParams<{ boardId: string }>();
  const navigate = useNavigate();
  const [boardData, setBoardData] = useState<BoardData | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");

  const getBoardInfo = async () => {
    try {
      setIsLoading(true);
      if (!boardId) {
        setError("잘못된 접근입니다.");
        return;
      }
      const response = await requestReadPost(boardId);

      if (response) {
        setBoardData(response);
      }
    } catch (err) {
      setError("게시글을 불러오는데 실패했습니다.");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleList = () => {
    navigate("/board/list");
  };

  useEffect(() => {
    getBoardInfo();
  }, [boardId]);

  if (isLoading) return <div>로딩 중...</div>;
  if (error) return <div>{error}</div>;
  if (!boardData) return <div>게시글을 찾을 수 없습니다.</div>;

  return (
    <div className="read-board-container">
      <div className="read-board-header">
        <h1 className="post-title">{boardData.title}</h1>
        <div className="post-meta">
          <span className="author">작성자: {boardData.nickname}</span>
          <span className="created-at">작성일: {boardData.createDate}</span>
        </div>
      </div>

      <div className="post-content">{boardData.content}</div>

      <div className="post-actions">
        <button
          className="action-button edit"
          onClick={() => navigate(`/board/edit/${boardId}`)}
        >
          수정
        </button>
        <button
          className="action-button delete"
          onClick={() => {
            if (window.confirm("정말 삭제하시겠습니까?")) {
              // 삭제 API 호출 로직
            }
          }}
        >
          삭제
        </button>
        <button className="action-button list" onClick={handleList}>
          목록
        </button>
      </div>
    </div>
  );
};

export default ReadBoard;
