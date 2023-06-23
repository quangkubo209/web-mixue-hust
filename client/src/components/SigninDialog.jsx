import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { Link, Navigate, useNavigate } from "react-router-dom";
import route from "../constants/route";
import { useState } from "react";
// import authApi from "../../api/authApi";
import { userStateContext } from "../contexts/StateProvider";
import { Dialog } from "primereact/dialog";
import authApi from "../api/authApi";

export default function Signin({ visible, setVisible }) {
  const navigate = useNavigate();
  const { currentUser, setCurrentUser } = userStateContext();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  
  const handleSignin = () => {
    const submit = async () => {
      try {
        const data = {
          username,
          password,
        };
        const response = await authApi.signin(data);
        if(response.data.success){
          setCurrentUser(response.data.admin);
          localStorage.setItem("ADMINID", response.data.admin._id);
          localStorage.setItem("TOKEN", response.data.token);
          return navigate(route.ADMINPAGE);
          console.log(currentUser);
        }
      } catch (err) {
        console.log(err);
      }
    };

    submit();
  };
  return (
    <Dialog
      visible={visible}
      style={{ width: "30%" }}
      onHide={() => {
        setVisible(false);
      }}
      header="Admin Sign In"
      className=" h-auto"
    >
      <div className="w-full px-16">
        <div className="flex flex-col mt-4 mx-4">
          <label htmlFor="username" className="m-2 text-lg font-medium">
            Username
          </label>
          <InputText
            aria-describedby="username-help"
            id="username"
            type="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="flex flex-col mt-4 mx-4">
          <label htmlFor="password" className="m-2 text-lg font-medium">
            Password
          </label>
          <InputText
            aria-describedby="username-help"
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
                  <Link
          // to={route.FORGOTPASSWORD}
          className="text-sm block text-blue-700 mt-2 "
        >
  <span class="hover:underline">Forgot Password</span>
        </Link>
        </div>
      </div>
      <div className="flex flex-col justify-center items-center mt-10 mb-2 w-full">
        <button
          className="px-10 py-4 text-lg font-semibold text-white bg-red-400 rounded-full hover:bg-red-600 "
          raised
          onClick={() => handleSignin()}
        >
          <span className="hover:underline">Sign in</span>
        </button>
      </div>
    </Dialog>
  );
}
