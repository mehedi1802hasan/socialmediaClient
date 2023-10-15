import React from 'react';
import Swal from 'sweetalert2'

const UploadSection = () => {
    const handleSubmit=(e)=>{
        e.preventDefault();
        const form=e.target;
        const textarea=form.textarea.value;
        const imageUrl=form.image.value;
        console.log(textarea,imageUrl);



        const addMedia={
            textarea,imageUrl
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
          })



    }
    return (
      <div className='w-96 mx-auto '>
          <form onSubmit={handleSubmit} className='my-16 shadow-md shadow-orange-100 px-16 py-7'>


<div> <h3>Text:</h3>
    <textarea placeholder="enter the text" name='textarea' className="textarea textarea-bordered textarea-sm w-full max-w-xs" required ></textarea>
</div>
<div className=''>
    <h3 className=''>image link:</h3>
    <input type="text" name="image" placeholder="enter the image link" className="input input-bordered w-full max-w-xs" required/>

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