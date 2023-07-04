import React, { useState, useEffect } from "react";
import { Button } from "primereact/button";
import { Card } from "primereact/card";
import { Toolbar } from "primereact/toolbar";
import authApi from "../../api/authApi";
import { toastContext } from "../../contexts/ToastProvider";
import { ProgressSpinner } from "primereact/progressspinner";
import { DialogAddStaff } from "./DialogAddStaff";

const HumanResource = () => {

//   const { toastSuccess, toastError } = toastContext();
const [loading, setLoading] = useState(false);
const [visibleStaff, setVisibleStaff] = useState(false);
const [visibleEditDialog, setVisibleEditDialog] = useState(false);
const [visibleDeleteDialog, setVisibleDeleteDialog] = useState(false);
const [staffs, setStaffs] = useState([]);

  useEffect(() => {
    const fetchApi = async () => {
      setLoading(true);
      try {
        const response = await authApi.getAllStaff();
        if (response.data.status === "success") {
          setStaffs(response.data.data);
        }
      } catch (err) {
        // toastError(err.message);
        console.log(err);
        setStaffs([]);
      }
      setLoading(false);
    };

    fetchApi();
  }, [visibleStaff, visibleDeleteDialog, visibleEditDialog]);

//   const handleSaveProduct = (product) => {
//     if (selectedProduct) {
//       const updatedProducts = products.map((p) =>
//         p.id === selectedProduct.id ? product : p
//       );
//       setProducts(updatedProducts);
//     } else {
//       const newProduct = { ...product, id: generateProductId() };
//       setProducts([...products, newProduct]);
//     }

//     setProductDialogVisible(false);
//   };

//   const handleEditProduct = (product) => {
//     setSelectedProduct(product);
//     setVisibleEditDialog(true);
//   };

//   const handleDeleteProduct = (product) => {
//     setSelectedProduct(product);
//     setVisibleDeleteDialog(true);
//   };

  const handleAddStaff = () => {
    // setSelectedProduct(null);
    setVisibleStaff(true);
  };

  return (
    // <div>Human resource page</div>
    <div className="Card flex flex-col mx-20 my-4">
      <Toolbar
        className="mb-4 bg-white"
        left={
          <>
            <button
              type="button"
              className="px-4 py-2 bg-red-400 hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-green-600 focus:ring-opacity-50 text-white rounded-md shadow-md"
              onClick={handleAddStaff}
            >
              <i className="pi pi-plus mr-1"></i>Create new staff
            </button>
          </>
        }
      ></Toolbar>

      {loading && (
        <div className="w-full h-[600px] flex justify-center items-center">
          <ProgressSpinner className=" w-full" />
        </div>
      )}

      <div className="grid min-[1200px]:grid-cols-1 min-[1440px]:grid-cols-2 min-[1700px]:grid-cols-2  gap-4 ">
        <>
          {staffs.length > 0 ? (
            staffs.map((staff, index) => (
              <div key={staff._id} className="flex flex-col justify-between">
                <Card
                  title={staff.name}
                  footer={
                    <div className="flex justify-between text-[14px]">
                      <span className="flex items-center">
                        <div
                          className="text-red-500 cursor-pointer px-2 py-1 rounded border border-transparent hover:border-red-500 flex justify-center items-center"
                          // onClick={handleEditProduct}
                        >
                          <i className="pi pi-pencil" />
                        </div>
                        <div
                          className="text-red-500 cursor-pointer px-2 py-1 rounded border border-transparent hover:border-red-500 flex justify-center items-center"
                          onClick={() => {
                            // setProductId(product._id);
                            // setProductName(product.name);
                            // setVisibleDeleteDialog(true);
                          }}
                        >
                          <i className="pi pi-trash" />
                        </div>
                      </span>
                    </div>
                  }
                >
                  <div className="flex justify-center">
                    <img
                      src={staff.profileImage}
                      alt={staff.name}
                      className="w-full object-contain h-[200px]"
                    />
                  </div>
                </Card>
              </div>
            ))
          ) : (
            <div className="font-semibold text-3xl text-red">
              No staff found
            </div>
          )}
        </>
      </div>

       {visibleStaff && (
        <DialogAddStaff
          visible={visibleStaff}
          setVisible={setVisibleStaff}
          // product={selectedProduct}
          // onSave={handleSaveProduct}
        />
      )}
      {/* {visibleEditDialog && (
        <ProductEditDialog
          visible={visibleEditDialog}
          setVisible={setVisibleEditDialog}
          // product={selectedProduct}
          productId={productId}
        />
      )}

      {visibleDeleteDialog && (
        <DialogDeleteProduct
          id={productId}
          name={productName}
          visible={visibleDeleteDialog}
          setVisible={setVisibleDeleteDialog}
        />
      )} */}
    </div>
  );
};

export default HumanResource;
