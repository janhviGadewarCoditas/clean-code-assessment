import styles from './Header.module.scss';
import { use } from '../../context/Context'; 

const Header = () => {
  const { verify, setVerify, handleLogout } = use();

  return (
    <div className={styles.Header}>
      <span>
        <img src="src/assets/images-removebg-preview (2).png" alt="Logo" />
      </span>
      <span className={styles.NavBtns}>
        <button onClick={() => setVerify(!verify)}>Verify</button>
        <button onClick={handleLogout}>Logout</button>
      </span>
    </div>
  );
};

export default Header;
