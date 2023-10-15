import React, { useContext} from 'react';
import Swal from 'sweetalert2'
import { AuthContext } from '../../Authentication/Provider';

const UploadSection = () => {
    const {user} =useContext(AuthContext);
    const handleSubmit=(e)=>{
        e.preventDefault();
        const form=e.target;
        const textarea=form.textarea.value;
        const imageUrl=form.image.value;
        const like=form.like.value;
        console.log(textarea,imageUrl);



    if( user){ 
          const addMedia={
        textarea,imageUrl,like
      }
      console.log(addMedia)
      fetch('https://socile-media-server-mm0pmc2ou-mehedi1802hasan.vercel.app/media',{
          method:"POST",
          headers:{
              'content-type':'application/json'
          },
          body:JSON.stringify(addMedia)
      })
      .then(res=>res.json())
      .then(data=>{
          console.log(data)
          if(data.insertedId){
            Swal.fire({
              title: 'Great!',
              text: 'your media Successfully Posted ',
              icon: 'success',
              confirmButtonText: 'Done'
            })
          }
      })}
      else{
        window.location.href = '/login';

      }



    }
    return (
      <div className='md:w-96 mx-auto '>
          <form onSubmit={handleSubmit} className='my-16 shadow-md shadow-orange-100 px-16 py-7'>


<div> <h3>Text:</h3>
    <textarea placeholder="enter the text" name='textarea' className="textarea textarea-bordered textarea-sm w-full max-w-xs" required ></textarea>
</div>
<div className=''>
    <h3 className=''>image link:</h3>
    <input type="text" name="image" placeholder="enter the image link" className="input input-bordered w-full max-w-xs" required/>
  <input className='hidden' type="text"name="like" defaultValue='0' />
{/* <input type="text"  className='border-blue-500 border-2' name="image"  required /> */}

</div>
{/* <div className='hidden'>
    <input type="file" className="file-input file-input-bordered file-input-warning w-full max-w-xs" />
</div> */}
<button className='btn btn-outline btn-md my-4' type='submit'>Submit</button>
</form>
      </div>

    );
};

export default UploadSection;