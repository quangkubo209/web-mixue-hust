// import React from "react";
// import { userStateContext } from "../contexts/StateProvider";
// import { Link, Navigate, useNavigate } from "react-router-dom";
// import logo from "../assets/images/logo.png";


// export default function Home() {
//   const navigate = useNavigate();
//   const handleLogin = () => {
//     navigate(route.SIGNIN);
//   }

//   return (
//     <div
//       class="w-screen h-screen  mx-auto  "
//       style={{
//         background:
//           "linear-gradient(70deg, rgba(255, 32, 32, 1) 24%, rgba(255, 126, 126, 1) 58%, rgba(255, 186, 186, 1) 100%)",
//       }}
      
//     >
//       <div className="fixed  flex flex-col items-center bottom-10 left-0 right-0 ">
//         <img
//           class="lg:w-2/6 md:w-3/6 w-5/6  object-cover object-center "
//           alt="logo"
//           src={logo}
//         />
//         <div class="text-center lg:w-5/12 w-full ">
//           <h1 className="my-2 text-4xl font-semibold leading-tight text-white">
//             WELCOME TO MANAGEMENT PAGE OF MIXUE HUST
//           </h1>
//           <p className="text-md  mb-10 underline">
//             POWERED BY GROUP 19
//           </p>
//           <div className="flex justify-center mx-auto">
//             <button className="ml-4 hover:underline bg-white text-gray-800 font-bold rounded-full  py-4 px-8"
//             onClick={handleLogin}>
//               Log in
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }


import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/images/logo.png";
import route from "../constants/route";
import SigninDialog from "../components/SigninDialog";

export default function Home() {
  const navigate = useNavigate();
  const [visibleSignin, setVisibleSignin] = useState(false);

  const handleLogin = () => {
    setVisibleSignin(true);
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gradient-to-r from-red-700 via-red-400 to-red-300">
      <div className="text-center">
        <img
          className="w-96 mx-auto mb-8"
          src={logo}
          alt="logo"
        />
        <h1 className="text-4xl font-semibold text-white">
          WELCOME TO THE MANAGEMENT PAGE OF MIXUE HUST
        </h1>
        <p className="mt-4 text-sm text-white underline">
          POWERED BY GROUP 19
        </p>
        <div className="mt-8">
          <button
            className="px-8 py-4 text-lg font-semibold text-red-500 bg-white rounded-full hover:bg-red-100"
            onClick={handleLogin}
          >
            Sign in
          </button>
        </div>
      </div>
      {visibleSignin && (
        <SigninDialog 
        visible={visibleSignin}
        setVisible ={setVisibleSignin} />
      )}

    </div>
  );
}
