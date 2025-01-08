import KakaoLogin from "@assets/images/kakao_login.png";
import styles from "./kakaologin.module.scss";
import { requestKakaoLoginUrl } from "@apis/api/KakaoAuth/requestloginurl";

function Index() {
  const onClick = async () => {
    try {
      const data = await requestKakaoLoginUrl();
      if (data) {
        window.location.href = data;
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <img
      onClick={onClick}
      src={KakaoLogin}
      className={styles.loginButton}
      alt="Kakao Login"
    />
  );
}

export default Index;
