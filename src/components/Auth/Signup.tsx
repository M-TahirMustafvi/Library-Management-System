import {useRef, useState, useContext} from 'react';
import { useNavigate } from "react-router-dom";

import { authFormStyles } from '../../styles/authFormStyles';
import { UserContext } from '../../store/user-context';


const SignupForm : React.FC<{onLogin: ()=>void}> = (props) => {

  const userCtx = useContext(UserContext);
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const [pwdWarning, setPwdWarning] = useState<boolean>(false);
  const [EmailWarning, setEmailWarning] = useState<boolean>(false);

  const navigate = useNavigate();
  const handleSubmit = (event: React.FormEvent) => {
    
    event.preventDefault();
    
    const email = emailRef.current!.value;
    const password = passwordRef.current!.value;

    if( password.trim().length < 8) {
      setPwdWarning(true);
      return;
    }
      setPwdWarning(false);

    if(!userCtx.signUp(email, password)) {
      setEmailWarning(true);
      return;
    }
    else
      setEmailWarning(false);


    navigate('/');
  }

  return (
    <div className={authFormStyles.container}>
      <form method="post" className={authFormStyles.form} onSubmit={handleSubmit}>
        <h2 className={authFormStyles.title}>Signup</h2>

        <p className={authFormStyles.inputGroup}>
          <label htmlFor="email" className={authFormStyles.label}>
            Email
          </label>
          <input
            id="email"
            type="email"
            name="email"
            required
            className={authFormStyles.input}
            ref = {emailRef}
          />
        </p>

        <p className={authFormStyles.inputGroup}>
          <label htmlFor="password" className={authFormStyles.label}>
            Password
          </label>
          <input
            id="password"
            type="password"
            name="password"
            required
            className={authFormStyles.input}
            ref= {passwordRef}
          />
        </p>
        {pwdWarning && (<p className={authFormStyles.warning}>Password must be 8 character long</p>)}
        {EmailWarning && (<p className={authFormStyles.warning}>Email already Exists</p>)}

        <button type="submit" className={authFormStyles.button}>
          Creat Account
        </button>
        
        <p>Already registered? <span onClick={props.onLogin} className="text-blue-500 cursor-pointer">Login</span></p>
      </form>
    </div>
  );
}

export default SignupForm;