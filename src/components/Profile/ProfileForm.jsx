import { setNewPassword } from '../../Firebase/authFun';
import classes from './ProfileForm.module.css';

const ProfileForm = () => {
  const handlePasswordChange = async (event) => {
    event.preventDefault();

    const newPassword = event.target.newPassword.value;

    try{
      
      await setNewPassword(newPassword)

    } catch(e){
      // console.error(e.message);
      alert(e.message);
    }

    event.target.reset();
  }
  return (
    <form onSubmit={handlePasswordChange} className={classes.form}>
      <div className={classes.control}>
        <label htmlFor='new-password'>New Password</label>
        <input type='password' name='newPassword' id='new-password' />
      </div>
      <div className={classes.action}>
        <button>Change Password</button>
      </div>
    </form>
  );
}

export default ProfileForm;
