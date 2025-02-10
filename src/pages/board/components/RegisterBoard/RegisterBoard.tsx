import React, { useState } from "react";
import "./RegisterBoard.scss";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { requestRegisterPost } from "./../../../../apis/api/Board/requestRegisterPost";
import { requestAddFile } from "./../../../../apis/api/S3/requestAddFile";
import axios from "axios";

const RegisterBoard: React.FC = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [s3url, setS3Url] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      if (file) {
        await handleUpload();
      }
      const userToken = localStorage.getItem("userToken");
      const data = await requestRegisterPost(
        title,
        content,
        userToken,
        s3url || undefined
      );
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

    const fileName = `${Date.now()}-${file.name}`;

    try {
      const { presignedUrl, s3url } = await requestAddFile(fileName);

      await axios.put(presignedUrl, file, {
        headers: {
          "Content-Type": file.type,
        },
      });

      console.log("Uploaded S3 URL:", s3url);
      setS3Url(s3url);
      alert(`업로드 성공!\n파일 URL: ${s3url}`);
    } catch (error) {
      console.error("Error uploading file:", error);
      toast.error("파일 업로드에 실패했습니다.");
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.target as HTMLInputElement;
    const files = input.files;
    if (files) {
      const selectedFile = files.item(0);
      if (selectedFile) {
        setFile(selectedFile);
      }
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
        <input type="file" onChange={handleFileChange} />
      </div>
    </div>
  );
};

export default RegisterBoard;
