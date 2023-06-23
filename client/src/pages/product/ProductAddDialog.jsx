import React, { useState, useEffect } from "react";
import { InputText } from "primereact/inputtext";
import { Dropdown } from "primereact/dropdown";
import { Button } from "primereact/button";
import { InputNumber } from "primereact/inputnumber";
import { Dialog } from "primereact/dialog";
import ProductDialogFooter from "./ProductDialogFooter";
import { InputTextarea } from "primereact/inputtextarea";
import productApi from "../../api/productApi";
import { toastContext } from "../../contexts/ToastProvider";
import { ProgressSpinner } from "primereact/progressspinner";

export const ProductAddDialog = ({ visible, setVisible }) => {
  const { toastSuccess, toastError } = toastContext();
  // const [name, setName] = useState("");
  // const [category, setCategory] = useState("");
  // const [description, setDescription] = useState("");
  // const [basePrice, setBasePrice] = useState(null);
  const [loading, setLoading] = useState(false);
  const [image, setImage] = useState("");
  const [variations, setVariations] = useState([]);
  const [preview, setPreview] = useState(undefined);
  const [products, setProducts] = useState({
    name: "",
    category: "",
    description: "",
    basePrice: null,
    // variations: [],
  });

  useEffect(() => {
    if (!image) {
        setPreview(undefined);
        return;
    }
    const imageUrl = URL.createObjectURL(image);
    setPreview(imageUrl);
}, [image]);

  const handelAddProduct = async () => {
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("name", products.name);
      formData.append("description", products.description);
      formData.append("basePrice", products.basePrice);
      formData.append("category", products.category);
      formData.append("image", image);
      formData.append("variations", variation);
      const response = await productApi.addProduct({
        // ...products,
        // image,
        // variations,
        formData
      });
      if (response.data.type === "Success") {
        navigate(route.PRODUCTMANAGEMENT);
        toastSuccess(response.data.message);
      }
    } catch (err) {
      // toastError(err.response.data.message);
      console.log(err);
    }
    setLoading(false);
  };

  const handleSaveClick = () => {
    handelAddProduct();
  };

  const handleCancelClick = () => {
    setVisible(false);
  };

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setProducts((values) => ({ ...values, [name]: value }));
  };

  const handleAddVariation = () => {
    const newVariation = { size: "", price: null };
    setVariations([...variations, newVariation]);
  };

  const handleRemoveVariation = (index) => {
    const updatedVariations = [...variations];
    updatedVariations.splice(index, 1);
    setVariations(updatedVariations);
  };

  const handleVariationSizeChange = (index, value) => {
    const updatedVariations = [...variations];
    updatedVariations[index].size = value;
    setVariations(updatedVariations);
  };

  const handleVariationPriceChange = (index, value) => {
    const updatedVariations = [...variations];
    updatedVariations[index].price = value;
    setVariations(updatedVariations);
  };

  return (
    <>
      <Dialog
        visible={visible} //pass params as addVisible.
        style={{ width: "60%" }}
        className="h-auto"
        footer={
          <ProductDialogFooter
            Cancel={handleCancelClick}
            Save={handleSaveClick}
          />
        }
        onHide={() => {
          setVisible(false);
        }}
        header="Add Product"
      >
        {loading && (
          <div className="flex justify-center items-center w-full h-[60vh]">
            <ProgressSpinner />
          </div>
        )}
        {!loading && 
                <div className="flex flex-row  rounded-lg">
                {/* name  */}
                <div className="w-1/2 flex flex-col  py-8 mr-4 mb-2 rounded-lg ">
                  <div className="flex flex-row  items-center mb-8">
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
                      value={products.name}
                      onChange={handleChange}
                      className="basis-2/3 mr-8"
                    />
                  </div>
                  {/* category  */}
                  <div className="flex items-center mb-6">
                    <label
                      htmlFor="category"
                      className=" basis-1/3 block text-gray-700 font-bold mb-2 text-right mr-8"
                    >
                      Category
                    </label>
                    <Dropdown
                      id="category"
                      name="category"
                      options={["ice-cream", "beverage"]}
                      value={products.category}
                      onChange={handleChange}
                      placeholder="Select a category"
                      className="basis-2/3 mr-8"
                    />
                  </div>
                  <div className="flex items-center mb-6">
                    <label
                      htmlFor="description"
                      className=" basis-1/3 block text-gray-700 font-bold mb-2 text-right mr-8"
                    >
                      Description
                    </label>
                    <InputTextarea
                      id="description"
                      name="description"
                      value={products.description}
                      rows={4}
                      cols={30}
                      placeholder="Enter description"
                      onChange={handleChange}
                      className="basis-2/3 mr-8"
                    />
                  </div>
                  <div className="flex items-center mb-6">
                    <label
                      htmlFor="basePrice"
                      className="basis-1/3 block text-gray-700 font-bold mb-2 text-right mr-8"
                    >
                      Base Price
                    </label>
                    <InputNumber
                      id="basePrice"
                      name="basePrice"
                      placeholder="Enter base price"
                      value={products.basePrice}
                      onValueChange={handleChange}
                      className="basis-2/3 mr-8"
                    />
                  </div>
                </div>
      
                <div className="w-1/2 flex flex-col  py-8 mr-4 mb-2 rounded-lg ">
                  {/* ---------------------- Image ------------------------- */}
                  <div className="w-full mr-8">
                    <label className="basis-1/3 block text-gray-700 font-bold mb-2 text-left ml-6">
                      Image
                    </label>
                    <img
                      // src={URL.createObjectURL(image)}
                      src = {preview}
                      alt="preview"
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
                      className="font-bold flex justify-center items-center h-12 w-1/4 mx-auto mt-6 mb-2 bg-blue-500 text-white hover:cursor-pointer rounded-md"
                    >
                      <div className="flex items-center my-2">
                        <i className="pi pi-image mr-4" /> <span>Add</span>
                      </div>
                    </label>
                  </div>
      
                  {/* ------------------------ add variation  */}
                  <div className="mb-6">
                    <label className="basis-1/3 block text-gray-700 font-bold mb-2 text-left mr-4 ml-5 ">
                      Variations
                    </label>
                    {variations.map((variation, index) => (
                      <div key={index} className="flex items-center mb-6">
                        <div className="flex  mr-2 ml-6 basis-1/3">
                          <Dropdown
                            value={variation.size}
                            // options={variation.size}
                            placeholder="Select size"
                            options={["S", "M", "L"]}
                            onChange={(e) =>
                              handleVariationSizeChange(index, e.target.value)
                            }
                            className=" w-full mr-2"
                          />
                        </div>
      
                        <div className="flex items-center mr-4 basis-1/3">
                          <InputNumber
                            value={variation.price}
                            placeholder="Enter price"
                            onValueChange={(e) =>
                              handleVariationPriceChange(index, e.target.value)
                            }
                            className="ml-2 w-full"
                          />
                        </div>
      
                        <div className="cursor-pointer text-red-500 ml-4 mr-4">
                          <span onClick={() => handleRemoveVariation(index)}>
                            <i className="pi pi-trash"></i>
                          </span>
                        </div>
                      </div>
                    ))}
                    <Button
                      label="New"
                      onClick={handleAddVariation}
                      icon="pi pi-plus"
                      className=" ml-6 rounded-full bg-purple-500 hover:bg-purple-800"
                    />
                  </div>
      
                  {/* -------------------------------- */}
                </div>
              </div>}
      </Dialog>
    </>
  );
};

// export footerDialog;
