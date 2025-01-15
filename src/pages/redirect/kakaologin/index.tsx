import { useEffect } from "react";
import { requestAccessToken } from "@apis/api/KakaoAuth/requestaccesstoken";

function Index() {
  useEffect(() => {
    const fetchAccessToken = async () => {
      const code = new URL(document.location.toString()).searchParams.get(
        "code"
      );
      console.log("코드 출력", code);
      if (code) {
        try {
          const response = await requestAccessToken(code);
          if (response) {
            console.log(response);

            const setLocalStorageTimer = (key, value, time) => {
              let now = new Date();
              let item = {
                value: value,
                expireTime: now.getTime() + time,
              };
              localStorage.setItem(key, JSON.stringify(item));
            };

            const expirationTime = 43200000;
            setLocalStorageTimer("userToken", response, expirationTime);

            window.location.href = "/";
          }
        } catch (error) {
          console.error("Error:", error);
        }
      }
    };

    fetchAccessToken();
  }, []);

  return <div>로그인 처리 중</div>;
}
export default Index;
