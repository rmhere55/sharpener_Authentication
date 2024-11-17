import { useContext, useState } from 'react';
import classes from './AuthForm.module.css';
import singUp, { signIn } from '../../Firebase/authFun';
import { authContext } from '../../store/authContext';

const AuthForm = () => {
  
  const [isLogin, setIsLogin] = useState(true);
  const [message, setMessage] = useState("");
  const {login} = useContext(authContext)

  const switchAuthModeHandler = () => {
    setIsLogin((prevState) => !prevState);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const email = event.target.email.value
    const password = event.target.password.value
    try {

      if (isLogin) {
        // Login logic
        const user =  await signIn(email, password)

        // console.log(user.uid); // token
        login(user.uid)
        
      } else {
        // Sign up logic
        setMessage("Sending request...");
        
        await singUp(email, password)
      }
    } catch (error) {
      console.error(error);
      alert(error.message)
    }
    
    setMessage("");
    event.target.reset();
  }


  return (
    <section className={classes.auth}>
      <h1>{isLogin ? 'Login' : 'Sign Up'}</h1>
      <br />

      <form onSubmit={handleSubmit}>
        <div className={classes.control}>
          <label htmlFor='email'>Your Email</label>
          <input type='email' name="email" id='email' required />
        </div>
        <div className={classes.control}>
          <label htmlFor='password'>Your Password</label>
          <input
            type='password'
            name="password"
            id='password'
            required
          />
        </div>

        {
          message ?
            <p >{message}</p>
            :
            <div className={classes.actions}>
              <button type='submit'>
                {isLogin ? 'Login' : 'Sign Up'}
              </button>
            </div>
        }

        <div className={classes.actions}>
          <button
            type='button'
            className={classes.toggle}
            onClick={switchAuthModeHandler}
          >
            {isLogin ? 'Create new account' : 'Login with existing account'}
          </button>
        </div>
      </form>
    </section>
  );
};

export default AuthForm;
