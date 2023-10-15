import React, { useContext, useEffect, useState } from 'react';
import { GiSelfLove } from 'react-icons/gi';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import { AuthContext } from '../../Authentication/Provider';

const Media = () => {
  const {user}=useContext(AuthContext)
  const [media, setMedia] = useState([]);
  const [buttonDisabled, setButtonDisabled] = useState([]);

  useEffect(() => {
    // Load the disabled button states from localStorage on component mount
    const storedButtonDisabled = JSON.parse(localStorage.getItem('buttonDisabled')) || [];
    setButtonDisabled(storedButtonDisabled);

    fetch('https://socile-media-server-mm0pmc2ou-mehedi1802hasan.vercel.app/media')
      .then((res) => res.json())
      .then((data) => setMedia(data));
  }, []);

  //////
const handleLike=(post)=>{
  const addLike={
    like:post.like +1} 
fetch(`https://socile-media-server-mm0pmc2ou-mehedi1802hasan.vercel.app/media/${post._id}`,{
    method:"PUT",
    headers:{
        'content-type':'application/json'
    },
    body:JSON.stringify(addLike)
})
.then(res=>res.json())
.then(data=>{
    console.log(data)
  if(data.modifiedCount>0){
    Swal.fire({
        title: 'Well-done!!',
        text: 'Updated  successfully ',
        icon: 'success',
        confirmButtonText: 'Okay'
      }) 
  }
})
///////////////



}
const handleBtnDisable = (index) => {
  if (user) {
    const updatedButtonDisabled = [...buttonDisabled];
    updatedButtonDisabled[index] = true;
    setButtonDisabled(updatedButtonDisabled);
    // Save the updated disabled button states to localStorage
    localStorage.setItem('buttonDisabled', JSON.stringify(updatedButtonDisabled));
  } else {
    // Redirect to the login route or perform any other action as needed
    // Example of redirection to the login route:
    window.location.href = '/login';
  }
};



  return (
    <div className='mx-10 mt-5'>
      <h3 className='text-center font-serif text-2xl font-semibold my-10'>Total Available Post: {media.length}</h3>
      <div className='grid grid-cols-2 md:grid-cols-4 gap-y-10 '>
        {media.map((post, index) => (
          <div className="card w-72 bg-base-100 shadow-xl " key={index}>
            <figure>
              <img className='h-44 w-64' src={post.imageUrl} alt="image" />
            </figure>
            <div className='flex justify-between items-center mt-4 my-3 mx-5 72'>
              <h3 className="w-60">
                {post.textarea && post.textarea.split(' ').slice(0, 5).join(' ')}..
              </h3>
              <div onClick={() => handleBtnDisable(index)} className=" text-red-500">
                <button onClick={()=>handleLike(post)} disabled={buttonDisabled[index]} className='btn btn-outline text-3xl'>
                  <GiSelfLove />
                </button>
              </div>
            </div>
            <Link to={`/media/${post._id}`} className='btn btn-outline btn-sm mb-3 w-1/2 mx-auto'>details</Link>

          </div>
        ))}
      </div>
    </div>
  );
};

export default Media;