import React, { useState, useEffect } from "react";
import { Button } from "primereact/button";
// import ProductGrid from './ProductGrid';
import { ProductAddDialog } from "./ProductAddDialog";
import { ProductEditDialog } from "./ProductEditDialog";
import { DialogDeleteProduct} from "./DialogDeleteProduct";
import { Card } from "primereact/card";
import {Toolbar} from "primereact/toolbar"
import productApi from "../../api/productApi";
import { toastContext } from "../../contexts/ToastProvider";

const ProductManagement = () => {
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [productDialogVisible, setProductDialogVisible] = useState(false);
  const [visibleEditDialog, setVisibleEditDialog] = useState(false);
  const [visibleDeleteDialog, setVisibleDeleteDialog] = useState(false);
  const [productId, setProductId] = useState("");
  const [productName, setProductName] = useState("");
  const [loading, setLoading] = useState(false);


  // const dataExample = [
  //   {
  //     name: "tra sua o long",
  //     category: "beverage",
  //     description: "San pham tra sua duoc lam tu nhung la che xanh ",
  //     basePrice: 12,
  //     variations: [
  //       {
  //         size: "S",
  //         price: 34,
  //       },
  //       {
  //         size: "M",
  //         price: 23,
  //       },
  //     ],
  //     image: trasua,
  //   },
  //   {
  //     name: "tra sua o long",
  //     category: "beverage",
  //     description: "San pham tra sua duoc lam tu nhung la che xanh ",
  //     basePrice: 12,
  //     variations: [
  //       {
  //         size: "S",
  //         price: 34,
  //       },
  //       {
  //         size: "M",
  //         price: 23,
  //       },
  //     ],
  //     image: trasua,
  //   },
  //   {
  //     name: "tra sua o long",
  //     category: "beverage",
  //     description: "San pham tra sua duoc lam tu nhung la che xanh ",
  //     basePrice: 12,
  //     variations: [
  //       {
  //         size: "S",
  //         price: 34,
  //       },
  //       {
  //         size: "M",
  //         price: 23,
  //       },
  //     ],
  //     image: trasua,
  //   },
  //   {
  //     name: "tra sua o long",
  //     category: "beverage",
  //     description: "San pham tra sua duoc lam tu nhung la che xanh ",
  //     basePrice: 12,
  //     variations: [
  //       {
  //         size: "S",
  //         price: 34,
  //       },
  //       {
  //         size: "M",
  //         price: 23,
  //       },
  //     ],
  //     image: trasua,
  //   },
  //   {
  //     name: "tra sua o long",
  //     category: "beverage",
  //     description: "San pham tra sua duoc lam tu nhung la che xanh ",
  //     basePrice: 12,
  //     variations: [
  //       {
  //         size: "S",
  //         price: 34,
  //       },
  //       {
  //         size: "M",
  //         price: 23,
  //       },
  //     ],
  //     image: trasua,
  //   },
  //   {
  //     name: "tra sua o long",
  //     category: "beverage",
  //     description: "San pham tra sua duoc lam tu nhung la che xanh ",
  //     basePrice: 12,
  //     variations: [
  //       {
  //         size: "S",
  //         price: 34,
  //       },
  //       {
  //         size: "M",
  //         price: 23,
  //       },
  //     ],
  //     image: trasua,
  //   },
  //   {
  //     name: "tra sua o long",
  //     category: "beverage",
  //     description: "San pham tra sua duoc lam tu nhung la che xanh ",
  //     basePrice: 12,
  //     variations: [
  //       {
  //         size: "S",
  //         price: 34,
  //       },
  //       {
  //         size: "M",
  //         price: 23,
  //       },
  //     ],
  //     image: trasua,
  //   },
  //   {
  //     name: "tra sua o long",
  //     category: "beverage",
  //     description: "San pham tra sua duoc lam tu nhung la che xanh ",
  //     basePrice: 12,
  //     variations: [
  //       {
  //         size: "S",
  //         price: 34,
  //       },
  //       {
  //         size: "M",
  //         price: 23,
  //       },
  //     ],
  //     image: trasua,
  //   },
  //   {
  //     name: "tra sua o long",
  //     category: "beverage",
  //     description: "San pham tra sua duoc lam tu nhung la che xanh ",
  //     basePrice: 12,
  //     variations: [
  //       {
  //         size: "S",
  //         price: 34,
  //       },
  //       {
  //         size: "M",
  //         price: 23,
  //       },
  //     ],
  //     image: trasua,
  //   },
  //   {
  //     name: "tra sua o long",
  //     category: "beverage",
  //     description: "San pham tra sua duoc lam tu nhung la che xanh ",
  //     basePrice: 12,
  //     variations: [
  //       {
  //         size: "S",
  //         price: 34,
  //       },
  //       {
  //         size: "M",
  //         price: 23,
  //       },
  //     ],
  //     image: trasua,
  //   },
  // ];

  const { toastSuccess, toastError } = toastContext();

  useEffect(() => {
    const fetchApi = async () => {
        setLoading(true);
        try {
            const response = await productApi.getAllProduct();
            if (response.data.type === "SUCCESS") {
                setProducts(response.data.products);
            }

            if (response.data.products.length < 1) {
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
    // Save or update the product to backend or any other data source
    // and update the products state
    // Example:
    // saveProduct(product);
    // const updatedProducts = fetchProducts();
    // setProducts(updatedProducts);

    // For this example, we'll just update the state directly
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
    // Delete the product from backend or any other data source
    // and update the products state
    // Example:
    // deleteProduct(product);
    // const updatedProducts = fetchProducts();
    // setProducts(updatedProducts);

    // For this example, we'll just update the state directly
    setSelectedProduct(product);
    setVisibleDeleteDialog(true);
  };

  const handleAddProduct = () => {
    setSelectedProduct(null);
    setProductDialogVisible(true);
  };

  return (
    <div className="Card flex flex-col mx-20 my-4">
      <Toolbar
        className="mb-4 bg-white"
        left={
          <>
            <button
              type="button"
              class="px-4 py-2 bg-red-400 hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-green-600 focus:ring-opacity-50 text-white rounded-md shadow-md"
              onClick={handleAddProduct}
            >
              <i class="pi pi-plus mr-1"></i>Add 
            </button>
          </>
        }
      ></Toolbar>

      {/* <ProductGrid products={products} onEdit={handleEditProduct} onDelete={handleDeleteProduct} /> */}
      <div className="grid min-[1200px]:grid-cols-3 min-[1440px]:grid-cols-4 min-[1700px]:grid-cols-5  gap-4 ">
        <>
          {products.length > 0 ? (
            products.map((product, index) => (
              <div key={product.id} className="flex flex-col justify-between">
                <Card
                  title={product.name}
                  subTitle={product.category}
                  footer={
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
                  }
                >
                  <div className="flex justify-center">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-auto"
                    />
                  </div>
                  <div className="mt-4">
                    <div>
                      <strong>Base price: </strong>
                      <span class="text-s text-red-500">₫</span>
                      {product.basePrice}
                    </div>
                  </div>
                  <div className="mt-4">
                    <div>
                      <strong>Size: </strong>
                      {product.variations.map((item) => item.size).join(' ')}
                    </div>
                  </div>
                  <div className="mt-4">
                    <div>
                      <strong>Price: </strong>
                      {product.variations.map((item) => item.price).join(' ')}
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
