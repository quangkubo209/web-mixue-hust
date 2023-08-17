import React, { useState, useEffect } from "react";
import { InputText } from "primereact/inputtext";
import { Dropdown } from "primereact/dropdown";
import { Button } from "primereact/button";
import { InputNumber } from "primereact/inputnumber";
import { Dialog } from "primereact/dialog";
import ProductDialogFooter from "./ProductDialogFooter";
import { InputTextarea } from "primereact/inputtextarea";
import productApi from "../../api/productApi";
import { ProgressSpinner } from "primereact/progressspinner";
import { Checkbox } from "primereact/checkbox";
import {MultiSelect} from "primereact/multiselect";

export const ProductEditDialog = ({
  visible,
  setVisible,
  productId,
  toppingOptions,
  categoryOptions,
}) => {
  const [loading, setLoading] = useState(false);
  const [image, setImage] = useState(undefined);
  const [selectedCategory, setSelectedCategory] = useState([]);
  const [sizeList, setSizeList] = useState([]);
  const [preview, setPreview] = useState(undefined);
  const [topping, setTopping] = useState([]);
  const [selectedOptions, setSelectedOptions] = useState([]); //topping
  const [products, setProducts] = useState({
    name: "",
    description: "",
    basePrice: 0,
  });

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        console.log("topping options: ", toppingOptions);
        const response = await productApi.getProductById(productId);
        if (response.data.status === "success") {
          const productCurrent = response.data.data;
          setProducts(productCurrent);
          setSelectedCategory(productCurrent.category.map(item => item.title));
          setImage(productCurrent.image);
          setPreview(productCurrent.image);
          setSizeList(productCurrent.sizeList.map(item => item.sizeId).map(item => ({price: item.price, size:item.size})));
          setSelectedOptions(productCurrent.toppingList.map(item => ({_id: item.toppingId._id, name: item.toppingId.name})));
        }
      } catch (err) {
        console.log(err);
      }
      setLoading(false);
    };
    fetchData();
  }, [visible]);

  //update another fields of products
  const handleUpdateProduct = async () => {
    try {
      // console.log(productId);
      // const data = products;
      const formData = new FormData();

      formData.append("name", products.name);
      formData.append("description", products.description);
      formData.append("basePrice", products.basePrice);
      // formData.append("category", selectedCategory);
      formData.append("image", image);
      // formData.append("toppingList", selectedOptions);
      // formData.append("sizeList", JSON.stringify(sizeList));

      const response = await productApi.updateProductById(productId, formData);
      if (response.data.status === "success") {
        setVisible(false);
        toastSuccess("success", "Product updated successfully");
      }
    } catch (err) {
      // toastError("error", "Failed to update product");
      console.log("Error");
    }
  };

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setProducts((values) => ({ ...values, [name]: value }));
  };

  const handleCategoryChange = (event) => {
    setSelectedCategory(event.value);
    // setCategory(event.value._id);
  };

  const handleSaveClick = () => {
    handleUpdateProduct();
  };

  const handleCancelClick = () => {
    setVisible(false);
  };

  const handleAddVariation = () => {
    const newVariation = { size: "", price: null };
    setSizeList([...sizeList, newVariation]);
  };

  const handleRemoveVariation = (index) => {
    const updatedVariations = [...sizeList];
    updatedVariations.splice(index, 1);
    setSizeList(updatedVariations);
  };

  const handleVariationSizeChange = (index, value) => {
    const updatedVariations = [...sizeList];
    updatedVariations[index].size = value;
    setSizeList(updatedVariations);
  };

  const handleVariationPriceChange = (index, value) => {
    const updatedVariations = [...sizeList];
    updatedVariations[index].price = value;
    setSizeList(updatedVariations);
  };


  const handleOptionChange = (e) => {
    const { value, checked } = e.target;

    if (checked) {
      setSelectedOptions((prevSelected) => [...prevSelected, value]);
    } else {
      setSelectedOptions((prevSelected) =>
        prevSelected.filter((item) => item._id !== value._id)
      );
    }
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
        header="Edit Product"
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
              <div className="flex   mb-8">
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
              <div className="flex  mb-8">
                <label
                  htmlFor="category"
                  className=" basis-1/3 block text-gray-700 font-bold mb-2 text-right mr-8"
                >
                  Category
                </label>
                <MultiSelect
                  id="category"
                  name="category"
                  options={categoryOptions.map(item => item.title)}
                  value={selectedCategory}
                  onChange={handleCategoryChange}
                  placeholder="Select categories"
                  // optionLabel="title"
                  className="basis-2/3 mr-8 overflow-hidden"
                />
              </div>
              <div className="flex  mb-8">
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
              <div className="flex  mb-8">
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
              <div className="flex flex-col">
                <label
                  htmlFor="basePrice"
                  className="basis-1/3 block text-gray-700 font-bold mb-2 text-left ml-4 mr-8"
                >
                  Select topping
                </label>
                <div className="">
                  {/* ----------------------------------------------------------------------------- check box------------------------------------------------ */}
                  {toppingOptions.map((option) => (
                    <div key={option._id} className="mt-2 ml-8 flex flex-row gap-4 ">
                      <Checkbox
                        inputId={option._id}
                        value={option}
                        label={option.name}
                        onChange={handleOptionChange}
                        checked={selectedOptions.map(item => item._id).includes(option._id)}
                      />
                      <label htmlFor={option.name} className="p-checkbox-label">
                        {option.name} - {option.price}
                      </label>
                    </div>
                  ))}
                </div>
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
                    setPreview(URL.createObjectURL(event.target.files[0]));
                    // setImage(URL.createObjectURL(event.target.files[0]));
                  }}
                />
                <label
                  htmlFor="product-main-image"
                  className="font-bold flex justify-center items-center h-12 w-1/4 mx-auto mt-6 mb-2 bg-gray-400 hover:bg-gray-500 text-white hover:cursor-pointer rounded-md px-2"
                >
                  <div className="flex items-center my-2">
                    <i className="pi pi-image mr-4" /> <span>Update</span>
                  </div>
                </label>
              </div>

              {/* ------------------------ add variation  */}
              <div className="mb-6">
                <label className="basis-1/3 block text-gray-700 font-bold mb-2 text-left mr-4 ml-6 mb-8">
                  Size list
                </label>
                {sizeList &&
                  sizeList &&
                  sizeList.map((variation, index) => (
                    <div
                      key={index}
                      className="ml-6 flex flex-row items-center justify-start mb-4 relative"
                    >
                      {/* Size Dropdown */}
                      <div className="w-1/3 mr-2">
                        <Dropdown
                          value={variation.size}
                          placeholder="Size"
                          options={["S", "M", "L", "XL"]}
                          onChange={(e) =>
                            handleVariationSizeChange(index, e.target.value)
                          }
                          className="w-full"
                        />
                      </div>

                      {/* Price InputNumber */}
                      <div className="w-1/3 mr-4">
                        <InputNumber
                          value={variation.price}
                          placeholder="Price"
                          onValueChange={(e) =>
                            handleVariationPriceChange(index, e.target.value)
                          }
                          className="w-full"
                        />
                      </div>

                      {/* Delete Button */}
                      <div className="cursor-pointer text-red-500 absolute right-2">
                        <span onClick={() => handleRemoveVariation(index)}>
                          <i className="pi pi-trash"></i>
                        </span>
                      </div>
                    </div>
                  ))}
                <span
                  className="ml-8 text-white font-bold hover:bg-gray-500 cursor-pointer rounded-lg border p-2 bg-gray-400"
                  onClick={() => handleAddVariation()}
                >
                  <i className="pi pi-plus mr-2 "></i>
                  Add variation
                </span>
              </div>

              {/* -------------------------------- */}
            </div>
          </div>
        )}
      </Dialog>
    </>
  );
};

// export footerDialog;
