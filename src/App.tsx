import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// 페이지 컴포넌트
import LoginPage from "@pages/login/index";
import BoardListPage from "@pages/board/index";
import RegisterBoard from "@/pages/board/components/RegisterBoard/RegisterBoard";
// 리다이렉트
import KakaoRedirect from "@pages/redirect/kakaologin/index";

function App() {
  return (
    <BrowserRouter>
      <ToastContainer />
      <Routes>
        <Route path="/login" element={<LoginPage />}></Route>
        <Route
          path="/kakao-oauth/redirect-access-token"
          element={<KakaoRedirect />}
        ></Route>
        <Route path="/board/list" element={<BoardListPage />}></Route>
        <Route path="/board/register" element={<RegisterBoard />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
