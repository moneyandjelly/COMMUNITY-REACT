import { BrowserRouter, Routes, Route } from "react-router-dom";
// 페이지 컴포넌트
import LoginPage from "@pages/login/index";
import BoardListPage from "@pages/board/index";
// 리다이렉트
import KakaoRedirect from "@pages/redirect/kakaologin/index";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />}></Route>
        <Route
          path="/kakao-oauth/redirect-access-token"
          element={<KakaoRedirect />}
        ></Route>
        <Route path="/board/list" element={<BoardListPage />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
