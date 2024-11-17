import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updatePassword,
} from "firebase/auth";
import firebaseApp from "./initialize";

const auth = getAuth(firebaseApp);

export async function checkTokenValidity(callback) {
  const user = auth.currentUser;
  if (user) {
    const idTokenResult = await user.getIdTokenResult();
    const isExpired = new Date().getTime() / 1000 > idTokenResult.expirationTime;

    //Todo: Logout after 5 minutes
    setTimeout(callback, 5 * 10000)

    callback(isExpired)
  }

  return false;
}


// Signed up
export default async function singUp(email, password) {
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );

    const user = userCredential.user;

    return user;
  } catch (error) {
    const errorMessage = error.message;
    console.log(errorMessage);
    throw new Error("Email Exceed");
  }
}

// Signed in

export async function signIn(email, password) {
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = userCredential.user;

    return user;
  } catch (error) {
    console.error(error.message);
    throw new Error("wrong password");
  }
}

// Update password

export async function setNewPassword(newPassword) {
  try {
    const response = await updatePassword(auth.currentUser, newPassword);
    console.log("Password updated!");
    console.log(response);
  } catch (error) {
    console.log(error);
    throw new Error("Error updating password");
  }
}
