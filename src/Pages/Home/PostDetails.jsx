import React, { useContext, useEffect, useState } from 'react';
import { useLoaderData } from 'react-router-dom';
import Swal from 'sweetalert2';
import { AuthContext } from '../../Authentication/Provider';

const PostDetails = () => {
    const [comment,setComment]=useState([]);
    const {user} =useContext(AuthContext)
    const loader=useLoaderData();
    const _id=loader._id;
    // useEffect(()=>{
    //     fetch('https://socile-media-server-mm0pmc2ou-mehedi1802hasan.vercel.app/comment')
    //     .then(res=>res.json())
    //     .then(data=>setComment(data))
    // },[])

    useEffect(() => {
      fetch('https://socile-media-server-mm0pmc2ou-mehedi1802hasan.vercel.app/comment')
          .then((res) => res.json())
          .then((data) => setComment(data.filter((cmnt) => cmnt.Post_id === _id)));
  }, [_id]);

    
    const handleComment=(e)=>{
        e.preventDefault();
        // console.log('comment')
        const comment=e.target.comment.value;
        console.log(comment)

        const addComment = {
        Post_id:_id,comment,image:user.photoURL

        
        }
      
      fetch('https://socile-media-server-mm0pmc2ou-mehedi1802hasan.vercel.app/comment', {
          method: 'POST',
          headers: {
              'content-type': 'application/json',
          },
          body: JSON.stringify(addComment),
      })
      .then((res) => res.json())
      .then((data) => {
          if (data.insertedId) {
            Swal.fire({
              title: 'Great!',
              text: 'your media Successfully Posted ',
              icon: 'success',
              confirmButtonText: 'Done'
            })
          }
      })
      .catch((error) => {
console.log('error')      });



    }


    return (
        <div className='my-10'>
           <div className='mb-8  '>
           <h3><img  className='w-[500px] h-[500px] mx-auto rounded-3xl' src={loader.imageUrl} alt="" /></h3>
           </div>
           <h3 className='w-[900px] mx-auto'><span className='font-bold font-serif text-2xl'>Text: </span> {loader.textarea}</h3>
           <div className='w-[900px] mx-auto mt-12 '>
            <h3 className='font-bold font-serif text-3xl '>Comment :</h3>
            <div>
            <form onSubmit={handleComment} className="form-control">
  <label className="label">
    <span className="label-text">Comment</span>
  </label>
  <label className="input-group">
    <input type="text" name='comment' placeholder="enter your comment" className="input input-bordered h-[70px] w-[500px]" />
    <button type='submit' className='bg-green-500 w-24 '>Send</button>
  </label>
</form>
<h3 className='text-xl font-bold mt-9 mb-3'>Total Comment:{comment.length} </h3>
<div className='space-y-10'>

{
    comment.map((cmnt,i)=><>
   <div className='flex items-center gap-4'>
    <div className='flex gap-2 items-center'><p>{i+1}</p>
   <h3><img className='w-10 h-10 rounded-full' src={cmnt.image} alt=" img" /></h3></div>
    <h3>{cmnt.comment}</h3>
   </div>
    </>)
}
</div>
            </div>
           </div>
        </div>
    );
};

export default PostDetails;