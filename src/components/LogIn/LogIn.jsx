import { sendPasswordResetEmail, signInWithEmailAndPassword } from "firebase/auth";
import auth from "../../firebase.config";
import { useRef, useState } from "react";
import { Link } from "react-router-dom";

const LogIn = () => {
  const [registerError, setRegisterError] = useState("");
  const [success, setSuccess] = useState("");
  const emailRef=useRef(null)

  const handleLogIn = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;
    console.log(email, password);

    // reset error message
    setRegisterError("");
    setSuccess("");

    // add validation
    signInWithEmailAndPassword(auth, email, password)
      .then((result) => {
        console.log(result.user);
        if(result.user.emailVerified){
            setSuccess("User login successfully");
        }
        else{
            alert("Please verify your email");
        }
      })
      .catch((error) => {
        console.error(error);
        setRegisterError(error.message);
      });
  };
  const handleForgetPassword = () => {
        const email =emailRef.current.value
        if(!email){
            console.log ('please provide a valid email',emailRef.current.value)
            return;
        }
        else if(!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email)){
            {
                console.log('please enter a valid email address');
                return;
            }

        }

        // send validation email
        sendPasswordResetEmail(auth,email)
        .then(()=>{
             alert('please check your email');
            
 
        })
        .catch((error)=>{
             console.error(error);
             
         })

  };
  return (
    <div className="hero min-h-screen bg-base-200">
      <div className="hero-content flex-col lg:flex-row-reverse">
        <div className="text-center lg:text-left">
          <h1 className="text-5xl font-bold">Login now!</h1>
          <p className="py-6">
            Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda
            excepturi exercitationem quasi. In deleniti eaque aut repudiandae et
            a id nisi.
          </p>
        </div>
        <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
          <form onSubmit={handleLogIn} className="card-body">
            <div className="form-control">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                type="email"
                name="email"
                ref={emailRef}
                placeholder="email"
                className="input input-bordered"
                required
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <input
                type="password"
                name="password"
                placeholder="password"
                className="input input-bordered"
                required
              />
              <label className="label">
                <a onClick={handleForgetPassword} href="#" className="label-text-alt link link-hover">
                  Forgot password?
                </a>
              </label>
            </div>
            <div className="form-control mt-6">
              <button className="btn btn-primary">Login</button>
            </div>
          </form>
          {registerError && (
            <p className="text-red-500 text-center">{registerError}</p>
          )}
          {success && <p className="text-green-500 text-center">{success}</p>}
          <p>new to this website ? please <Link to="/register"><button className="btn btn-secondary">register</button></Link></p>
        </div>
      </div>
    </div>
  );
};

export default LogIn;
