import React from 'react';
import Swal from 'sweetalert2';
import { FaRegEdit } from 'react-icons/fa';
import useMenu from '../../hook/useMenu';

const UpdateModal = ({ item, fetchComments }) => {
  const handleSubmit = (e) => {
    // const [menu,refetch]=useMenu();
    // e.preventDefault();
    const form = e.target;
    const name = form.name.value;
    const address = form.address.value;
    const university = form.university.value;
    const image = form.image.value;
    console.log(name, address, university, image);
    const addFood={
        name,address,university,image
        }
    fetch(`https://socile-media-server-mm0pmc2ou-mehedi1802hasan.vercel.app/users/${item._id}`,{
        method:"PUT",
        headers:{
            'content-type':'application/json'
        },
        body:JSON.stringify(addFood)
    })
    .then(res=>res.json())
    .then(data=>{
        console.log(data)
      if(data.modifiedCount>0){
        // refetch();
        fetchComments();
        Swal.fire({
            title: 'Well-done!!',
            text: 'Updated  successfully ',
            icon: 'success',
            confirmButtonText: 'Okay'
          }) 
      }
    })


  };

  const closeModal = () => {
    const modal = document.getElementById(`my_modal_4-${item._id}`);
    modal.close(); // Close the dialog
  };

  return (
    <div>
       <button
        className=" text-lg  text-green-500"
        onClick={() => document.getElementById(`my_modal_4-${item._id}`).showModal()}
      >
<p className='btn btn-outline btn-success text-3xl flex items-center gap-2'>       <FaRegEdit/>Edit
</p>      </button>
      <dialog id={`my_modal_4-${item._id}`} className="modal">
        <div className="modal-box">
        <button
              className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
              onClick={closeModal}
            >
             X
            </button>
          <form onSubmit={handleSubmit} method="dialog">
           
           <div className='md:flex lg:flex gap-4'>
           <div className="form-control">
              <label className="label">
                <span className="label-text">Name</span>
              </label>
              <input
                type="text"
                name="name"
                placeholder="Enter your Product name"
                className="input input-bordered rounded-2xl"
                defaultValue={item.name}
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Address</span>
              </label>
              <input
                type="text"
                name="address"
                placeholder="Enter your address"
                className="input input-bordered rounded-2xl"
                defaultValue={item.address}
              />
            </div>
           </div>
           <div className='md:flex lg:flex gap-4 '>
           <div className="form-control">
              <label className="label">
                <span className="label-text">university</span>
              </label>
              <input
                type="text"
                name="university"
                placeholder="Enter your university name"
                className="input input-bordered rounded-2xl"
                defaultValue={item.university}
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Image</span>
              </label>
              <input
                type="text"
                name="image"
                placeholder="Enter your Product name"
                className="input input-bordered rounded-2xl"
                defaultValue={item.image}
              />
            </div>
           </div>
            <div className="form-control hidden">
              <label className="label">
                <span className="label-text">Id</span>
              </label>
              <input
                type="text"
                name="id"
                placeholder="Enter your id name"
                className="input input-bordered rounded-2xl"
                defaultValue={item._id}
              />
            </div>
            <div className="flex justify-center items-center">
              <button className="btn btn-outline btn-secondary my-4">Update</button>
            </div>
          </form>
        </div>
      </dialog>
    </div>
  );
};

export default UpdateModal;
