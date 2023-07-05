import React, { useState, useEffect } from "react";
import { Button } from "primereact/button";
// import ProductGrid from './ProductGrid';
import { ProductAddDialog } from "./ProductAddDialog";
import { ProductEditDialog } from "./ProductEditDialog";
import { DialogDeleteProduct } from "./DialogDeleteProduct";
import { Card } from "primereact/card";
import { Toolbar } from "primereact/toolbar";
import productApi from "../../api/productApi";
import { toastContext } from "../../contexts/ToastProvider";
import { ProgressSpinner } from "primereact/progressspinner";
import { userStateContext } from "../../contexts/StateProvider";

const ProductManagement = () => {
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [productDialogVisible, setProductDialogVisible] = useState(false);
  const [visibleEditDialog, setVisibleEditDialog] = useState(false);
  const [visibleDeleteDialog, setVisibleDeleteDialog] = useState(false);
  const [productId, setProductId] = useState("");
  const [productName, setProductName] = useState("");
  const [loading, setLoading] = useState(false);
  const { currentUser, setCurrentUser } = userStateContext();

  const { toastSuccess, toastError } = toastContext();

  useEffect(() => {
    const fetchApi = async () => {
      setLoading(true);
      try {
        const response = await productApi.getAllProduct();
        if (response.data.status === "success") {
          setProducts(response.data.data);
        }

        if (response.data.data.length < 1) {
          console.log("No product founddd!");
        }
      } catch (err) {
        toastError(err.message);
        // console.log(err);
        setProducts([]);
      }
      setLoading(false);
    };

    fetchApi();
  }, [productDialogVisible, visibleDeleteDialog, visibleEditDialog]);

  const handleSaveProduct = (product) => {
    if (selectedProduct) {
      const updatedProducts = products.map((p) =>
        p.id === selectedProduct.id ? product : p
      );
      setProducts(updatedProducts);
    } else {
      const newProduct = { ...product, id: generateProductId() };
      setProducts([...products, newProduct]);
    }

    setProductDialogVisible(false);
  };

  const handleEditProduct = (product) => {
    setSelectedProduct(product);
    setVisibleEditDialog(true);
  };

  const handleDeleteProduct = (product) => {
    setSelectedProduct(product);
    setVisibleDeleteDialog(true);
  };

  const handleAddProduct = () => {
    setSelectedProduct(null);
    setProductDialogVisible(true);
  };

  return (
    <div className="Card flex flex-col mx-20 my-4">
      {currentUser.role === "ADMIN" && <Toolbar
        className="mb-4 bg-white"
        left={
          <>
            <button
              type="button"
              className="px-4 py-2 bg-red-400 hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-green-600 focus:ring-opacity-50 text-white rounded-md shadow-md"
              onClick={handleAddProduct}
            >
              <i className="pi pi-plus mr-1"></i>Add
            </button>
          </>
        }
      ></Toolbar>
}

      {loading && (
        <div className="w-full h-[600px] flex justify-center items-center">
          <ProgressSpinner className=" w-full" />
        </div>
      )}

      {/* <ProductGrid products={products} onEdit={handleEditProduct} onDelete={handleDeleteProduct} /> */}
      <div className="grid min-[1200px]:grid-cols-3 min-[1440px]:grid-cols-3 min-[1700px]:grid-cols-4  gap-4 ">
        <>
          {products.length > 0 ? (
            products.map((product, index) => (
              <div key={product._id} className="flex flex-col justify-between">
                <Card
                  title={product.name}
                  subTitle={product.category}
                  footer={
                    currentUser.role ==="ADMIN" ? 
                    <div className="flex justify-between text-[14px]">
                      <span className="flex items-center">
                        <div
                          className="text-red-500 cursor-pointer px-2 py-1 rounded border border-transparent hover:border-red-500 flex justify-center items-center"
                          onClick={handleEditProduct}
                        >
                          <i className="pi pi-pencil" />
                        </div>
                        <div
                          className="text-red-500 cursor-pointer px-2 py-1 rounded border border-transparent hover:border-red-500 flex justify-center items-center"
                          onClick={() => {
                            setProductId(product._id);
                            setProductName(product.name);
                            setVisibleDeleteDialog(true);
                          }}
                        >
                          <i className="pi pi-trash" />
                        </div>
                      </span>
                    </div>
                    : 
                    <></>
                  }
                >
                  <div className="flex justify-center">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full object-contain h-[200px]"
                    />
                  </div>
                  <div className="mt-4">
                    {/* <div>
                      <strong>Base price: </strong>
                      <span class="text-s text-red-500 pb-2">₫</span>
                      {new Intl.NumberFormat().format(product.basePrice)}
                    </div> */}
                    <span className="text-3xl font-bold text-red-700">
                      {new Intl.NumberFormat().format(
                        product.basePrice
                      )}
                      <span className="text-sm text-red-500 pb-2">đ</span>
                    </span>
                  </div>
                  <div className="mt-4">
                    <div>
                      <strong>Size: </strong>
                      {product.variations.map((item) => item.size).join(" ")}
                    </div>
                  </div>
                  <div className="mt-4">
                    <div>
                      <strong>Price: </strong>
                      {product.variations.map((item) => new Intl.NumberFormat().format(item.price)).join(" ")}
                    </div>
                  </div>
                </Card>
              </div>
            ))
          ) : (
            <div className="font-semibold text-3xl text-red">
              No products found
            </div>
          )}
        </>
      </div>

      {productDialogVisible && (
        <ProductAddDialog
          visible={productDialogVisible}
          setVisible={setProductDialogVisible}
          // product={selectedProduct}
          // onSave={handleSaveProduct}
        />
      )}
      {visibleEditDialog && (
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
      )}
    </div>
  );
};

export default ProductManagement;
