

// import React from 'react';
// import { useState } from 'react';
// import { Avatar } from 'primereact/avatar';
// import { Link } from 'react-router-dom';
// import logo from '../assets/images/baycho.jpg';

// const VerticalMenuBar = () => {
//   const [selectedMenu, setSelectedMenu] = useState('dashboard');

//   const menuItems = [
//     { id: 'dashboard', label: 'Dashboard', icon: 'pi pi-home' },
//     { id: 'orders', label: 'Orders', icon: 'pi pi-shopping-cart' },
//     { id: 'manage', label: 'Manage Page', icon: '' },
//     { id: 'help', label: 'Help', icon: 'pi pi-question' },
//   ];

//   const handleMenuClick = (menuId) => {
//     setSelectedMenu(menuId);
//   };

//   return (
//     <div className="flex h-screen">
//       <div className="bg-red-200 w-full flex flex-col justify-between">
//         <div className="p-4">
//           <div className="mb-8 border-b border-gray-400">
//             {/* Phần hiển thị avatar và admin */}
//             <Avatar image={logo} size="large" shape="circle" className="mx-auto mb-2" />
//             <div className="text-4xl text-center">Admin</div>
//           </div>
//           <nav>
//             {/* Menu */}
//             <ul>
//               {menuItems.map((menuItem) => (
//                 <li
//                   key={menuItem.id}
//                   className={`p-2 cursor-pointer hover:bg-gray-300 hover:rounded-xl ${
//                     selectedMenu === menuItem.id ? 'bg-gray-300 rounded-xl' : ''
//                   }`}
//                   onClick={() => handleMenuClick(menuItem.id)}
//                 >
//                   <div className="flex items-center">
//                     <i className={menuItem.icon}></i>
//                     <span className="ml-2 text-lg font-bold">{menuItem.label}</span>
//                   </div>
//                 </li>
//               ))}
//             </ul>
//           </nav>
//         </div>
//         <div className="p-4 border-t border-gray-400 mx-4 p-8">
//           {/* Phần log out */}
//           <button className="p-2 w-full bg-red-500 text-white rounded">Log Out</button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default VerticalMenuBar;


import React from 'react';
import { useState } from 'react';
import { Avatar } from 'primereact/avatar';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../assets/images/baycho.jpg';
import route from "../constants/route";

const VerticalMenuBar = () => {
  const [selectedMenu, setSelectedMenu] = useState('dashboard');
  const navigate = useNavigate();

  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: 'pi pi-home', url:route.DASHBOARD },
    { id: 'orders', label: 'Orders', icon: 'pi pi-shopping-cart', url:null },
    { id: 'manage', label: 'Management', icon: 'pi pi-database', url:route.PRODUCTMANAGEMENT},
    { id: 'setting', label: 'Setting', icon: 'pi pi-cog', url:null },
    { id: 'help', label: 'Help', icon: 'pi pi-question', url:null},
  ];

  const handleMenuClick = (id) => {
    setSelectedMenu(id);
  };

  return (
    <div className="flex h-screen text-white ">
      <div className=" bg-gradient-to-b from-red-400 via-red-400 to-red-300 w-full flex flex-col justify-between rounded-tr-xl">
        <div className="p-4">
          <div className="mb-8 p-8 border border-gray-400 bg-red-100 flex flex-row items-center rounded-xl">
            {/* Phần hiển thị avatar và admin */}
            <Avatar image={logo} size="large" shape="circle" className="mx-auto my-2" />
            <div className='ml-2'>
                <span className='font-bold text-gray-500'>Admin</span>
                <span className="block  text-gray-400 m-auto text-sm  font-bold">admin@mixuehust.com</span>
            </div>
          </div>


          <nav >
            {/* Menu */}
            <ul className="space-y-1 ">
              {menuItems.map((menuItem) => (
                <li
                  key={menuItem.id}
                  className={`p-2 cursor-pointer hover:bg-gray-300 hover:rounded-xl focus:outline-none ${
                    selectedMenu === menuItem.id ? 'bg-gray-300 rounded-xl' : ''
                  }`}
                  onClick={() => handleMenuClick(menuItem.id)}
                >
                  {/* <div className="flex items-center space-x-2">
                    <i className={menuItem.icon}></i>
                    <span className="text-xl font-bold">{menuItem.label}</span>
                  </div> */}
                  <Link className='flex items-center space-x-2' to={menuItem.url}>
                  <i className={menuItem.icon}></i>
                    <span className="text-xl font-bold">{menuItem.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
        <div className="px-16 py-8 mb-4 border rounded-lg border-gray-400 mx-4 bg-gray-200">
  {/* Phần log out */}
  <button className="flex flex-row items-center p-2 px-4 bg-gray-500 text-white rounded hover:bg-gray-700">
    <i className='pi pi-sign-out mr-2'></i>
    <span className='font-bold text-lg'>Log Out</span>
  </button>

  {/* Biểu tượng */}
  <div flex flex-col items-center>
  <div className="flex items-center justify-center mt-4">
    <a href="https://www.facebook.com"><i className="pi pi-facebook mx-2 text-blue-500 text-2xl hover:text-blue-700"></i></a>
    <a href="https://www.instagram.com"><i className="pi pi-instagram mx-2 text-pink-500 text-2xl hover:text-pink-700"></i></a>
    <a href="https://www.twitter.com"><i className="pi pi-twitter mx-2 text-black text-2xl hover:text-gray-500"></i></a>
  </div>
  <span className="text-gray-500 text-sm">© 2023 MixueHust</span>
  </div>
</div>

      </div>
    </div>
  );
};

export default VerticalMenuBar;
