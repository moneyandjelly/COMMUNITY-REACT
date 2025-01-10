import React, { useState } from "react";
import "./RegisterBoard.scss";
import { requestRegisterPost } from "./../../../../apis/api/Board/requestRegisterPost";
const RegisterBoard: React.FC = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const handleSubmit = async () => {
    try {
      const userToken = localStorage.getItem('userToken');
      const data = await requestRegisterPost(title, content, userToken);
      if (data) {
        console.log(data)
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="register-board-container">
      <h2 className="register-board-title">게시글 작성</h2>
      <form onSubmit={handleSubmit} className="register-board-form">
        <div className="form-group">
          <label htmlFor="title">제목</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>  
        <div className="form-group">
          <label htmlFor="content">내용</label>
          <textarea
            id="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="submit-button">
          등록
        </button>
      </form>
    </div>
  );
};

export default RegisterBoard;
