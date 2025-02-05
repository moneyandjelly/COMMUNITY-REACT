import React, { useState } from "react";
import "./RegisterBoard.scss";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { requestRegisterPost } from "./../../../../apis/api/Board/requestRegisterPost";
import axios from "axios";

const RegisterBoard: React.FC = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [file, setFile] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const userToken = localStorage.getItem("userToken");
      const data = await requestRegisterPost(title, content, userToken);
      if (data) {
        toast.success("등록이 완료되었습니다", {
          position: "top-right",
          autoClose: 3000,
        });
        navigate("/board/list");
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("등록에 실패했습니다");
    }
  };

  const handleUpload = async () => {
    if (!file) return;

    try {
      const fileName = `${Date.now()}-${file.name}`;
      const { data: presignedUrl } = await axios.get(
        `http://localhost:7777/presigned-url?fileName=${fileName}`
      );
      console.log("Presigned URL:", presignedUrl);

      const response = await axios.put(presignedUrl, file, {
        headers: { "Content-Type": file.type },
      });
      console.log("Upload response:", response);

      alert("업로드 성공!");
    } catch (error) {
      console.error("Upload error:", error);
      alert("업로드 실패");
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
      <div>
        <input type="file" onChange={(e) => setFile(e.target.files[0])} />
        <button onClick={handleUpload}>Upload</button>
      </div>
    </div>
  );
};

export default RegisterBoard;
