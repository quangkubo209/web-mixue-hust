import React, { useState, useEffect } from "react";
import { InputText } from "primereact/inputtext";
import { Dropdown } from "primereact/dropdown";
import { Dialog } from "primereact/dialog";
import ProductDialogFooter from "../product/ProductDialogFooter";
import authApi from "../../api/authApi";
import { toastContext } from "../../contexts/ToastProvider";
import { ProgressSpinner } from "primereact/progressspinner";
import { userStateContext } from "../../contexts/StateProvider";

export const DialogAddStaff = ({ visible, setVisible }) => {
    const { currentUser, setCurrentUser } = userStateContext();
  const { toastSuccess, toastError } = toastContext();
  const [loading, setLoading] = useState(false);
  const [image, setImage] = useState(undefined);
  const [preview, setPreview] = useState(undefined);
  const [staff, setStaff] = useState({
    name: "",
    username: "",
    password: "",
    role:"",
    basePrice: 0,
  });

  useEffect(() => {
    console.log("currentUser: ", currentUser);
    if (!image) {
      setPreview(undefined);
      return;
    }
    const imageUrl = URL.createObjectURL(image);
    setPreview(imageUrl);
  }, [image]);

  const handleAddStaff = async () => {
    setLoading(true);
    try {
      const formData = new FormData();

      formData.append("name", staff.name);
      formData.append("username", staff.username);
      formData.append("password", staff.password);
      formData.append("role", staff.role);
      formData.append("image", image);
      const response = await authApi.createStaff(formData);
      // console.log("variations: ", variations);
      // const response = await productApi.createProduct({...products, image, variations});
      if (response.data.status === "success") {
        // navigate(route.PRODUCTMANAGEMENT);
        setVisible(false);
        toastSuccess("Add new staff successfully");
      }
    } catch (err) {
      // toastError(err.response.data.error);
      console.log(err);
    }
    setLoading(false);
  };

  const handleSaveClick = () => {
    handleAddStaff();
  };

  const handleCancelClick = () => {
    setVisible(false);
  };

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setStaff((values) => ({ ...values, [name]: value }));
  };

  return (
    <>
      <Dialog
        visible={visible} //pass params as addVisible.
        className="sm:w-11/12 md:w-10/12 lg:w-3/4 xl:w-2/3 2xl:w-1/2 mx-auto"
        footer={
          <ProductDialogFooter
            Cancel={handleCancelClick}
            Save={handleSaveClick}
          />
        }
        onHide={() => {
          setVisible(false);
        }}
        header="Add Staff"
      >
        {loading && (
          <div className="flex justify-center items-center w-full h-[60vh]">
            <ProgressSpinner />
          </div>
        )}
        {!loading && (
          <div className="flex flex-col md:flex-row">
            {/* name  */}
            <div className="w-full md:w-1/2  mt-4 ">
              <div className="flex items-center flex-row   mb-8">
                <label
                  htmlFor="name"
                  className=" basis-1/3 block text-gray-700 font-bold mb-2 text-right mr-8 "
                >
                  Name
                </label>
                <InputText
                  placeholder="Enter name"
                  id="name"
                  name="name"
                  value={staff.name}
                  onChange={handleChange}
                  className="basis-2/3 mr-8"
                />
              </div>
              {/* category  */} 
              <div className="flex items-center flex-row  mb-8">
                <label
                  htmlFor="category"
                  className=" basis-1/3 block text-gray-700 font-bold mb-2 text-right mr-8"
                >
                  Category
                </label>
                <Dropdown
                  id="role"
                  name="role"
                  options={["ADMIN", "STAFF"]}
                  value={staff.role}
                  onChange={handleChange}
                  placeholder="Select a role"
                  className="basis-2/3 mr-8"
                />
              </div>
              <div className="flex items-center flex-row  mb-8">
                <label
                  htmlFor="username"
                  className=" basis-1/3 block text-gray-700 font-bold mb-2 text-right mr-8"
                >
                  Username
                </label>
                <InputText
                  id="username"
                  name="username"
                  value={staff.username}
                  onChange={handleChange}
                  placeholder="Enter a username"
                  className="basis-2/3 mr-8"
                />
              </div>
              <div className="flex items-center flex-row  mb-8">
                <label
                  htmlFor="password"
                  className=" basis-1/3 block text-gray-700 font-bold mb-2 text-right mr-8"
                >
                  Password
                </label>
                <InputText
                  id="password"
                  name="password"
                  value={staff.password}
                  onChange={handleChange}
                  placeholder="Enter a password"
                  className="basis-2/3 mr-8"
                />
              </div>
            </div>

            <div className="w-full md:w-1/2  flex flex-col py-4 mr-4 mb-4 rounded-lg ">
              {/* ---------------------- Image ------------------------- */}
              <div className="w-full mr-8">
                <label className="basis-1/3 block text-gray-700 font-bold mb-2 text-left ml-6">
                  Image
                </label>

                <img
                  src={preview}
                  alt="image"
                  className="rounded-md h-52 w-52 object-cover mx-auto shadow-xl"
                />

                <input
                  type="file"
                  id="product-main-image"
                  hidden
                  onChange={(event) => {
                    setImage(event.target.files[0]);
                    // setImage(URL.createObjectURL(event.target.files[0]));
                  }}
                />
                <label
                  htmlFor="product-main-image"
                  className="font-bold flex justify-center items-center h-12 w-1/4 mx-auto mt-6 mb-2 bg-gray-400 hover:bg-gray-500 text-white hover:cursor-pointer rounded-md"
                >
                  <div className="flex items-center my-2">
                    <i className="pi pi-image mr-4" /> <span>Add</span>
                  </div>
                </label>
              </div>
            </div>
          </div>
        )}
      </Dialog>
    </>
  );
};

