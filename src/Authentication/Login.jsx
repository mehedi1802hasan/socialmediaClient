import React, { useContext, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from './Provider';
import Swal from 'sweetalert2';
import Navbar from '../SharedComponent/Navbar';
import { FaGoogle } from 'react-icons/fa';

const Login = () => {

    const navigate=useNavigate();
    const location=useLocation();
    const from = location.state?.from?.pathname || '/';
    const {LoginUser,googleLogin}=useContext(AuthContext)
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const handleLogin = (event) => {
      event.preventDefault();
      const form=event.target;
      const email=form.email.value;
      const password =form.password.value;
      console.log(email,password);
       LoginUser(email,password)
       .then(result=>{
        const signinUser=result.user;
        console.log(signinUser);
        setEmail('');
        setPassword('');
    
        Swal.fire({
          title: 'Great!',
          text: 'Successfully Login ',
          icon: 'success',
          confirmButtonText: 'Done'
        });
        navigate(from, { replace: true }); 
  
       })
       .catch(error=>{
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Login Failed!',
        })
       })
      
    };
    const handleGoogleLogin=()=>{
      googleLogin()
      .then(result=>{
        const googlelogged=result.user;
        
        /////
        const saveUser={name:googlelogged.displayName,email: googlelogged.email}
        fetch('https://socile-media-server-mm0pmc2ou-mehedi1802hasan.vercel.app/users',{
          method:"POST",
          headers:{
            'content-type':'application/json'
          },
          body:JSON.stringify(saveUser)
        })
        .then(res=>res.json())
        .then(()=>{
        
             // navigate(from, { replace: true });
  
          
        })
        ////
        console.log(googlelogged)
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'Google Login successfully',
          showConfirmButton: false,
          timer: 1500
        })
      })
       .catch(error=>{
        console.log(error.message)
       })
    }
  
    return (
        <div>
   <Navbar></Navbar>
        <form onSubmit={handleLogin} className="hero min-h-screen bg-base-100">
    <div className="hero-content flex-col lg:flex-row">
      <div className="text-center lg:text-left">
       <img src="https://i.ibb.co/By3vB3N/tablet-login-concept-illustration-114360-7883.jpg" alt="" />
      </div>
      <div className="card flex-shrink-0 w-full max-w-sm  bg-base-100">
        <div className="card-body font-serif">
         <div className='mb-2'>

  
         <h3 className='text-2xl mb-2 font-bold font-serif'>Sign In </h3>
          <p className='text-xl'>Enter your details to Login.</p>
         </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Email</span>
            </label>
            <input type="text" name="email" placeholder="email" className="input input-bordered" />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Password</span>
            </label>
            <input type="password" name='password' placeholder="password" className="input input-bordered" />
            <label className="label">
              <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
            </label>
          </div>
          <div className="form-control mt-6">
            <button className="btn  btn-warning">Login</button>
          </div>
          <h3 className='mt-3'>Already have an account? <Link className='text-blue-500 font-serif' to='/registration'>Sign Up</Link> </h3>
          <button className="mx-auto mb-3 w-52 btn btn-warning hover:bg-orange-500" onClick={handleGoogleLogin}>
              <FaGoogle />Google
            </button>
        </div>
      </div>
    </div>
  </form>
      </div>
    );
};

export default Login;