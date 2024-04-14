import { createUserWithEmailAndPassword, sendEmailVerification, updateProfile } from "firebase/auth";
import auth from "../../firebase.config";
import { useState } from "react";
import { FaEye, FaRegEyeSlash } from "react-icons/fa";
import { Link } from "react-router-dom";

const Register = () => {
  const [registerError, setRegisterError] = useState("");
  const [success, setSuccess] = useState("");
  const [showPasswords, setShowPasswords] = useState(false);

  const handelRegister = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;
    const accept = e.target.terms.checked;
    const name = e.target.name.value;
    console.log(name,email, password,accept);

    // reset error message
    setRegisterError("");
    setSuccess("");

    if (password.length < 6) {
      setRegisterError(
        "Firebase: Password should be at least 6 characters (auth/weak-password)."
      );
      return;
    } else if (!/[A-Z]/.test(password)) {
      setRegisterError(
        "Firebase: Password should contain at least one uppercase letter (auth/weak-password)."
      );
      return;
    }
    else if (!accept){
        setRegisterError(
        "Firebase: You must accept the terms and conditions (auth/weak-password).")
        return;
    }

    // crete users
    createUserWithEmailAndPassword(auth, email, password)
      .then((result) => {
        console.log(result.user);
        setSuccess("user added successfully");

        // update profile
        updateProfile(result.user, {
            displayName: name,
            photoURL: "https://example.com/jane-q-user/profile.jpg"
        })
        .then(() => console.log("profile updated successfully"))
        .catch()
        // send verification email
        sendEmailVerification(result.user)
        .then(()=>{
        alert('please check your email and verify')
        })
      })
      .catch((error) => {
        console.error(error);
        setRegisterError(error.message);
      });
  };
  return (
    <div className="mx-auto md:w-1/2">
      <h2 className="text-3xl mb-8">please register</h2>
      <form onSubmit={handelRegister}>
        <input
          className="mb-4 w-full py-2 px-4 input input-bordered"
          type="text"
          placeholder=" enter your name"
          name="name"
          id=""
          required
        />
        <br />
        <input
          className="mb-4 w-full py-2 px-4 input input-bordered"
          type="email"
          placeholder="email address"
          name="email"
          id=""
          required
        />
        <br />
        <div className="relative mb-4">
          <input
            className=" w-full py-2 px-4 input input-bordered "
            type={showPasswords ? "text" : "password"}
            placeholder="password"
            name="password"
            id=""
            required
          />
          <span className="absolute top-4 right-2" onClick={() => setShowPasswords(!showPasswords)}>
            {
                showPasswords? <FaRegEyeSlash  /> : <FaEye />
  
            }
          </span>
        </div>
        <br />
        <div className="mb-2">
            <input type="checkbox" name="terms" id="terms" />
            <label className="ml-2" htmlFor="terms">Accept our <a href="">terms and condition</a></label>
        </div>
        <br />
        <input
          className="btn btn-secondary mb-4 w-full py-2 px-4 border-amber-600"
          type="submit"
          value="Register"
        />
      </form>
      {registerError && (
        <p className="text-red-500 text-center">{registerError}</p>
      )}
      {success && <p className="text-green-500 text-center">{success}</p>}
      <p>already have an account ? please <Link to="/login"><button className="btn btn-primary">logIn</button></Link></p>
    </div>
  );
};

export default Register;
