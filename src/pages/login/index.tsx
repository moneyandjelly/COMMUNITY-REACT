import styles from "./styles/index.module.scss";
import KakaoLogin from "./components/kakaologin";

function Index() {
  return (
    <div className={styles.page}>
      <div className={styles.page__contents}>
        <KakaoLogin />
      </div>
    </div>
  );
}

export default Index;
