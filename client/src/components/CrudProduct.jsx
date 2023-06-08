import React, { useState, useRef, useEffect } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";
import { Dropdown } from "primereact/dropdown";
import { Toast } from "primereact/toast";
import {Toolbar} from "primereact/toolbar";
import { useNavigate } from "react-router-dom";

export default function CrudProduct() {
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [dialogVisible, setDialogVisible] = useState(false);
  const [isNewProduct, setIsNewProduct] = useState(false);
  const navigate = useNavigate();
  const dataSample = [
    {
      id: 1,
      name: "Product 1",
      category: "Ice Cream",
      description: "Description 1",
      basePrice: 10,
      variation: [
        { size: "Small", price: 8 },
        { size: "Medium", price: 10 },
        { size: "Large", price: 12 },
      ],
      image: "https://example.com/image1.jpg",
      dateCreated: "2023-06-01",
    },
    {
      id: 2,
      name: "Product 2",
      category: "Beverage",
      description: "Description 2",
      basePrice: 5,
      variation: [
        { size: "Regular", price: 5 },
        { size: "Large", price: 7 },
      ],
      image: "https://example.com/image2.jpg",
      dateCreated: "2023-06-02",
    },
    {
      id: 2,
      name: "Product 2",
      category: "Beverage",
      description: "Description 2",
      basePrice: 5,
      variation: [
        { size: "Regular", price: 5 },
        { size: "Large", price: 7 },
      ],
      image: "https://example.com/image2.jpg",
      dateCreated: "2023-06-02",
    },
    {
      id: 2,
      name: "Product 2",
      category: "Beverage",
      description: "Description 2",
      basePrice: 5,
      variation: [
        { size: "Regular", price: 5 },
        { size: "Large", price: 7 },
      ],
      image: "https://example.com/image2.jpg",
      dateCreated: "2023-06-02",
    },
    {
      id: 2,
      name: "Product 2",
      category: "Beverage",
      description: "Description 2",
      basePrice: 5,
      variation: [
        { size: "Regular", price: 5 },
        { size: "Large", price: 7 },
      ],
      image: "https://example.com/image2.jpg",
      dateCreated: "2023-06-02",
    },
    // Thêm các sản phẩm khác tại đây
  ]
  const [productForm, setProductForm] = useState({
    name: "",
    category: null,
    description: "",
    basePrice: 0,
    variation: [],
    image: "",
    dateCreated: new Date(),
  });

  useEffect(() => {
    const fetchApi = async () => {
        // setLoading(true);
        try {
            // const response = await productApi.getAllProduct();
            // // console.log(response);
            // if (response.data.type === "Success") {
            //     setProducts(response.data.products);
            // }

            // if (response.data.products.length < 1) {
            //     console.log("No product founddd!");
            // }
            setProducts(dataSample);
        } catch (err) {
            setProducts([]);
            // console.log(err);
        }
        // setLoading(false);
    };

    fetchApi();
}, []);

  const categories = [
    { label: "Ice Cream", value: "ice-cream" },
    { label: "Beverage", value: "beverage" },
  ];

  const clearForm = () => {
    setProductForm({
      name: "",
      category: null,
      description: "",
      basePrice: 0,
      variation: [],
      image: "",
      dateCreated: new Date(),
    });
    setIsNewProduct(false);
  };

  const saveProduct = () => {
    if (isNewProduct) {
      setProducts([...products, productForm]);
      showToast("success", "Product added successfully");
    } else {
      const updatedProducts = [...products];
      const index = updatedProducts.findIndex(
        (product) => product === selectedProduct
      );
      updatedProducts[index] = productForm;
      setProducts(updatedProducts);
      showToast("success", "Product updated successfully");
    }
    clearForm();
    setDialogVisible(false);
  };

  const deleteProduct = () => {
    const updatedProducts = products.filter(
      (product) => product !== selectedProduct
    );
    setProducts(updatedProducts);
    showToast("success", "Product deleted successfully");
    setSelectedProduct(null);
  };

  const showToast = (severity, summary) => {
    toast.current.show({ severity, summary, life: 3000 });
  };

  const renderVariation = (rowData) => {
    return (
      <ul>
        {rowData.variation.map((item, index) => (
          <li key={index}>
            {item.size} - {item.price}
          </li>
        ))}
      </ul>
    );
  };

  const actionTemplate = (rowData) => {
    return (

      <div className="flex">
        <Button
          icon="pi pi-pencil"
          className="p-button-rounded bg-red-300 border-red-300 "
          onClick={() => {
            setSelectedProduct(rowData);
            setProductForm({ ...rowData });
            setIsNewProduct(false);
            setDialogVisible(true);
          }}
        />
        <Button
          icon="pi pi-trash"
          className="p-button-rounded p-button-danger p-button-outlined ml-2"
          onClick={() => {
            setSelectedProduct(rowData);
            setDialogVisible(true);
          }}
        />
      </div>
    );
  };

  const dialogFooter = (
    <div className="flex justify-end">
      <Button
        label="Cancel"
        className="p-button-outlined p-button-secondary mr-2"
        onClick={() => {
          clearForm();
          setDialogVisible(false);
        }}
      />
      <Button label="Save" onClick={saveProduct} />
    </div>
  );

  const toast = useRef(null);

  return (
    <>
      <div className="w-full h-screen shadow-xl bg-white rounded-xl">
      <Toolbar
        className="mb-4 "
        left={
          <>
            <button
              type="button"
              className="px-4 py-2 bg-pink-500 hover:bg-pink-600 focus:outline-none focus:ring-2 focus:ring-green-600 focus:ring-opacity-50 text-white rounded-full shadow-md"
              onClick={() => {
                clearForm();
                setIsNewProduct(true);
                setDialogVisible(true);
              }}
            >
              <i className="pi pi-plus mr-1"></i>New 
            </button>
            <button
              type="button"
              className="ml-4 px-4 py-2 bg-purple-500 hover:bg-purple-600 focus:outline-none focus:ring-2 focus:ring-green-600 focus:ring-opacity-50 text-white rounded-full shadow-md"
              onClick={() => {
                clearForm();
                navigate("/");
              }}
            >
              <i className="pi pi-home mr-1"></i>Back to home 
            </button>
          </>
        }
      ></Toolbar>
        <DataTable
          value={products}
          selectionMode="single"
          selection={selectedProduct}
          onSelectionChange={(e) => setSelectedProduct(e.value)}
          className="p-datatable-sm "
          paginator
          rowsPerPageOptions={[5,10,15]}
        >
          <Column field="name" header="Name" ></Column>
          <Column field="category" header="Category" ></Column>
          <Column field="description" header="Description" ></Column>
          <Column field="basePrice" header="Base Price" sortable></Column>
          <Column
            field="variation"
            header="Variation"
            body={renderVariation}
          ></Column>
          <Column body={actionTemplate}></Column>
        </DataTable>
        <Dialog
          visible={dialogVisible}
          onHide={() => {
            clearForm();
            setDialogVisible(false);
          }}
          header={`${isNewProduct ? "Add" : "Edit"} Product`}
          footer={dialogFooter}
          className="w-1/2"
        >
          <div className="p-fluid">
            <div className="p-field">
              <label htmlFor="name">Name</label>
              <InputText
                id="name"
                value={productForm.name}
                onChange={(e) =>
                  setProductForm({ ...productForm, name: e.target.value })
                }
              />
            </div>
            <div className="p-field">
              <label htmlFor="category">Category</label>
              <Dropdown
                id="category"
                options={categories}
                value={productForm.category}
                onChange={(e) =>
                  setProductForm({ ...productForm, category: e.value })
                }
                placeholder="Select a category"
              />
            </div>
            <div className="p-field">
              <label htmlFor="description">Description</label>
              <InputText
                id="description"
                value={productForm.description}
                onChange={(e) =>
                  setProductForm({ ...productForm, description: e.target.value })
                }
              />
            </div>
            <div className="p-field">
              <label htmlFor="basePrice">Base Price</label>
              <InputText
                id="basePrice"
                value={productForm.basePrice}
                onChange={(e) =>
                  setProductForm({ ...productForm, basePrice: e.target.value })
                }
              />
            </div>
            <div className="p-field">
              <label htmlFor="variation">Variation</label>
              <DataTable value={productForm.variation}>
                <Column field="size" header="Size"></Column>
                <Column field="price" header="Price"></Column>
              </DataTable>
            </div>
            <div className="p-field">
              <label htmlFor="image">Image</label>
              <InputText
                id="image"
                value={productForm.image}
                onChange={(e) =>
                  setProductForm({ ...productForm, image: e.target.value })
                }
              />
            </div>
            <div className="p-field">
              <label htmlFor="dateCreated">Date Created</label>
              <InputText
                id="dateCreated"
                value={productForm.dateCreated}
                onChange={(e) =>
                  setProductForm({ ...productForm, dateCreated: e.target.value })
                }
              />
            </div>
          </div>
        </Dialog>
        <Dialog
          visible={dialogVisible}
          onHide={() => setDialogVisible(false)}
          header="Confirm"
          footer={
            <div className="flex justify-end">
              <Button
                label="No"
                className="p-button-outlined p-button-secondary mr-2"
                onClick={() => setDialogVisible(false)}
              />
              <Button
                label="Yes"
                className="p-button-outlined p-button-danger"
                onClick={deleteProduct}
              />
            </div>
          }
        >
          <p>Are you sure you want to delete this product?</p>
        </Dialog>
        <Toast ref={toast} />
      </div>
    </>
  );
}


