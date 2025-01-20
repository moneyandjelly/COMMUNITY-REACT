import { useEffect } from "react";
import { requestAccessToken } from "@apis/api/KakaoAuth/requestaccesstoken";
import { requestUserInfo } from "@apis/api/AccountProfile/requestUserInfo";
import { useDispatch } from "react-redux";
import { login } from "../../../store/slices/authSlice";
import { useNavigate } from "react-router-dom";
function Index() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    const fetchAccessToken = async () => {
      const code = new URL(document.location.toString()).searchParams.get(
        "code"
      );

      if (!code) return;

      try {
        const response = await requestAccessToken(code);
        if (!response) return;

        const setLocalStorageTimer = (
          key: string,
          value: any,
          time: number
        ) => {
          const item = {
            value,
            expireTime: Date.now() + time,
          };
          localStorage.setItem(key, JSON.stringify(item));
        };

        const expirationTime = 43200000;
        setLocalStorageTimer("userToken", response, expirationTime);

        const storedToken = localStorage.getItem("userToken");
        if (!storedToken) return;

        const parsedToken = JSON.parse(storedToken);
        const userInfo = await requestUserInfo(storedToken);
        console.log("parsedToken.value 값", parsedToken.value);
        console.log(userInfo);
        dispatch(
          login({
            token: parsedToken.value,
            nickname: userInfo.nickname,
            account_id: userInfo.id,
          })
        );
        navigate("/");
      } catch (error) {
        console.error("Error during login:", error);
      }
    };

    fetchAccessToken();
  }, [dispatch]);

  return (
    <div>
      <h1>로그인 처리 중...</h1>
    </div>
  );
}

export default Index;
