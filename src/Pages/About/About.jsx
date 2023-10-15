import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../Authentication/Provider';
import { BiEdit } from 'react-icons/bi';
import UpdateModal from './UpdateModal';
import useMenu from '../../hook/useMenu';

const About = () => {
  const [menu]=useMenu()
    const {user}=useContext(AuthContext);
    const [information,setInformation]=useState([]);
    // useEffect(()=>{
    //   fetch('https://socile-media-server-mm0pmc2ou-mehedi1802hasan.vercel.app/users')
    //   .then(res=>res.json())
    //   .then((data) => setInformation(data.filter((inf) => inf.email === user.email)));
    
    // },[user.email])
    useEffect(() => {
      fetchComments();
  }, [user.email]);
    const fetchComments = () => {
    
      fetch('https://socile-media-server-mm0pmc2ou-mehedi1802hasan.vercel.app/users')
      .then(res=>res.json())
      .then((data) => setInformation(data.filter((inf) => inf.email === user.email)))

      .catch((error) => {
        console.log('Error fetching comments:', error);
    })
    
     
    }


    return (
      <div className='mb-7 mx-5 '>
      
        {/* <h3 className='text-2xl font-serif text-green-700 mt-3 mb-8 flex  btn btn-outline btn-success items-center justify-center gap-2'><span className='text-3xl'><BiEdit/></span> Edit</h3> */}
    
     
          <div className=''>
          
      
     {
        information.map(inf=><>
         <div className='flex justify-center items-center gap-5 md:gap-20 mt-4 mb-8'>
       <h3 className=' text-2xl font-serif text-red-700'>My Information</h3>
                <h3 ><UpdateModal key={inf._id} item={inf} fetchComments={fetchComments}></UpdateModal></h3>
                </div>

      <div className='flex justify-center items-center gap-12'>
      <div>
       <img className='md:h-52 lg:w-64 md:w-64 rounded-2xl' src={inf.image} alt="image" />
       </div>
      <div>
      <h3><span className='font-bold font-serif text-xl'>Name:</span> {inf.name}</h3>
      <h3><span className='font-bold font-serif text-xl'> Email:</span> {user.email}</h3>
      <h3><span className='font-bold font-serif text-xl'>Adress:</span>{inf.address}</h3>
      <h3><span className='font-bold font-serif text-xl'>University:</span> {inf.university}</h3>
      </div>
      </div>
        </>)
      }</div>
    
    
      </div>
    );
};

export default About;