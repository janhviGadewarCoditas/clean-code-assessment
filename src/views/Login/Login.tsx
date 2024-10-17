import { useState } from "react";
import styles from "./Login.module.scss";
import { loginUser } from "../../services/login.service";

const Login = () => {
    const [username, setUserName] = useState("");
    const [password, setPassword] = useState("");

 const  handleLogin = async () => {
        try {
            // using userData as data
            const userData = await loginUser(username, password);
        } catch (error) {
        //    we can use react toastify
        }
    };


    return (
        <>
            <div data-testid="login-component" className={styles.Login}>
                <div className={styles.Tagline}>
                    <h1>Transforming Lives With</h1>
                    <h2>Compassionate Care</h2>
                </div>
                <form
                    className={styles.LoginForm}
                    onSubmit={(e) => {
                        e.preventDefault();
                        handleLogin();
                    }}
                >
                    <img src="src/assets/images-removebg-preview (2).png" alt="" />
                    <input
                        type="text"
                        name="username"
                        value={username}
                        placeholder="Enter username"
                        onChange={(e) => setUserName(e.target.value)}
                    />
                    <input
                        type="password"
                        placeholder="Enter password"
                        name="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <button className={styles.LoginPageBtns} type="submit">
                        Login
                    </button>
                </form>
            </div>
        </>
    );
};

export default Login;
