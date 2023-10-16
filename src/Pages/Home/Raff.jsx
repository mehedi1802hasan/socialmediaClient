// import React, { useState, useEffect } from 'react';
// import DateTimePicker from 'react-datetime-picker';

// const Raff = () => {
//   const [media, setMedia] = useState([]);
//   const [dateTime, setDateTime] = useState(new Date());

//   useEffect(() => {
//     // Fetch media data from the API link
//     fetch('https://socile-media-server-mm0pmc2ou-mehedi1802hasan.vercel.app/media')
//       .then(response => response.json())
//       .then(data => {
//         // Sort the data by the "time" field in descending order
//         data.sort((a, b) => new Date(b.time) - new Date(a.time));
//         // Update the state with the fetched and sorted media data
//         setMedia(data);
//       })
//       .catch(error => {
//         console.error('Error fetching media data:', error);
//       });
//   }, []);

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     const selectedDateTime = dateTime.toISOString();
//     console.log('Selected DateTime:', selectedDateTime);
//   };

//   return (
//     <div>
//       <h1>Media List</h1>
//       <table className="min-w-full divide-y divide-gray-200">
//         <thead className="bg-gray-50">
//           <tr>
//             <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//               Image
//             </th>
//             <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//               Time
//             </th>
//             <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//               Text
//             </th>
//             <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//               Likes
//             </th>
//           </tr>
//         </thead>
//         <tbody className="bg-white divide-y divide-gray-200">
//           {media.map((item, index) => (
//             <tr key={item._id}>
//               <td className="px-6 py-4 whitespace-nowrap">
//                 <img src={item.imageUrl} alt={`Image ${index}`} style={{ width: '100px', height: '100px' }} />
//               </td>
//               <td className="px-6 py-4 whitespace-nowrap">
//                 {item.time}
//               </td>
//               <td className="px-6 py-4 whitespace-nowrap">
//                 {item.textarea}
//               </td>
//               <td className="px-6 py-4 whitespace-nowrap">
//                 {item.like}
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//       <form onSubmit={handleSubmit}>
//         <div className="mb-4">
//           <DateTimePicker
//             onChange={setDateTime}
//             value={dateTime}
//           />
//         </div>
//         <button type='submit' className='bg-blue-500 text-white px-4 py-2 rounded-md'>Submit</button>
//       </form>
//     </div>
//   );
// };

// export default Raff;
