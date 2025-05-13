import { useRef, useState, useContext } from 'react';
import { useNavigate } from "react-router-dom";

import { authFormStyles } from '../../styles/authFormStyles';
import { UserContext } from '../../store/user-context';

const LoginForm: React.FC<{ onSignup: () => void }> = (props) => {
  const userCtx = useContext(UserContext);
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  const [loginError, setLoginError] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    const email = emailRef.current!.value;
    const password = passwordRef.current!.value;

    const success = userCtx.login?.(email, password);

    if (!success) {
      setLoginError(true);
      return;
    } else {
      setLoginError(false);
      navigate('/');
    }
  };

  return (
    <div className={authFormStyles.container}>
      <form className={authFormStyles.form} onSubmit={handleSubmit}>
        <h2 className={authFormStyles.title}>Login</h2>

        <p className={authFormStyles.inputGroup}>
          <label htmlFor="email" className={authFormStyles.label}>Email</label>
          <input
            id="email"
            type="email"
            required
            className={authFormStyles.input}
            ref={emailRef}
          />
        </p>

        <p className={authFormStyles.inputGroup}>
          <label htmlFor="password" className={authFormStyles.label}>Password</label>
          <input
            id="password"
            type="password"
            required
            className={authFormStyles.input}
            ref={passwordRef}
          />
        </p>

        {loginError && <p className={authFormStyles.warning}>Invalid email or password</p>}

        <button type="submit" className={authFormStyles.button}>
          Login
        </button>

        <p>New here? <span onClick={props.onSignup} className="text-blue-500 cursor-pointer">Create an account</span></p>
      </form>
    </div>
  );
};

export default LoginForm;
