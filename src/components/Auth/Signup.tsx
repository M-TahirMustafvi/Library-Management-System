import { useRef, useState, useContext } from 'react';
import { useNavigate } from "react-router-dom";
import { authFormStyles } from '../../styles/library-styles';
import { DataContext } from '../../store/data-context';

const SignupForm: React.FC<{ onLogin: () => void }> = (props) => {
  const dataCtx = useContext(DataContext);
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const [selectedLibrary, setSelectedLibrary] = useState<string>("");
  const [pwdWarning, setPwdWarning] = useState<boolean>(false);
  const [emailWarning, setEmailWarning] = useState<boolean>(false);
  const [libraryWarning, setLibraryWarning] = useState<boolean>(false);

  const navigate = useNavigate();

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    const email = emailRef.current!.value;
    const password = passwordRef.current!.value;
    const library = selectedLibrary;
    // console.log(library);
    if (password.trim().length < 8) {
      setPwdWarning(true);
      return;
    }
    setPwdWarning(false);

    if (!selectedLibrary) {
      setLibraryWarning(true);
      return;
    }
    setLibraryWarning(false);

    if (!dataCtx.signUp(email, password, library)) {
      setEmailWarning(true);
      return;
    }
    setEmailWarning(false);

    alert('Signup successful!');
    navigate('/');
  };

  return (
    <div className={authFormStyles.container}>
      <form method="post" className={authFormStyles.form} onSubmit={handleSubmit}>
        <h2 className={authFormStyles.title}>Signup</h2>

        {/* Email */}
        <p className={authFormStyles.inputGroup}>
          <label htmlFor="email" className={authFormStyles.label}>Email</label>
          <input
            id="email"
            type="email"
            name="email"
            required
            className={authFormStyles.input}
            ref={emailRef}
          />
        </p>

        {/* Password */}
        <p className={authFormStyles.inputGroup}>
          <label htmlFor="password" className={authFormStyles.label}>Password</label>
          <input
            id="password"
            type="password"
            name="password"
            required
            className={authFormStyles.input}
            ref={passwordRef}
          />
        </p>

        {/* Library Selection */}
        <p className={authFormStyles.inputGroup}>
          <label htmlFor="library" className={authFormStyles.label}>Select Library</label>
          <select
            id="library"
            className={authFormStyles.input}
            value={selectedLibrary}
            onChange={(e) => setSelectedLibrary(e.target.value)}
            required
          >
            <option value="">-- Select a Library --</option>
            {dataCtx.library.map(lib => (
              <option key={lib.id} value={lib.name}>{lib.name}</option>
            ))}
          </select>
        </p>

        {pwdWarning && (<p className={authFormStyles.warning}>Password must be at least 8 characters long</p>)}
        {libraryWarning && (<p className={authFormStyles.warning}>Please select a library</p>)}
        {emailWarning && (<p className={authFormStyles.warning}>Email already exists</p>)}

        <button type="submit" className={authFormStyles.button}>Create Account</button>

        <p>Already registered? <span onClick={props.onLogin} className="text-blue-500 cursor-pointer">Login</span></p>
      </form>
    </div>
  );
};

export default SignupForm;
