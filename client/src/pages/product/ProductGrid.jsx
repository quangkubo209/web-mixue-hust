// import React from 'react';
// import { DataTable } from 'primereact/datatable';
// import { Column } from 'primereact/column';

// const ProductGrid = ({ products, onEdit, onDelete }) => {
//   const renderActions = (rowData) => {
//     return (
//       <div>
//         <Button label="Edit" onClick={() => onEdit(rowData)} className="p-button-rounded p-button-success" />
//         <Button
//           label="Delete"
//           onClick={() => onDelete(rowData)}
//           className="p-button-rounded p-button-danger"
//         />
//       </div>
//     );
//   };

//   return (
//     <DataTable value={products}>
//       <Column field="name" header="Name" />
//       <Column field="category" header="Category" />
//       <Column field="image" header="Image" />
//       <Column field="variations" header="Variations" />
//       <Column body={renderActions} header="Actions" />
//     </DataTable>
//   );
// };

// export default ProductGrid;

import React from "react";
import { Card } from "primereact/card";

const ProductGrid = ({
  products,
  onEdit, 
  onDelete
}) => {
  return (
    // <div className="grid grid-cols-4 gap-4">
    //   {products.map((product) => (
    //     <div key={product.id} className="bg-white shadow-md p-4">
    //       <div className="mb-2">
    //         <strong>Name:</strong> {product.name}
    //       </div>
    //       <div className="mb-2">
    //         <strong>Category:</strong> {product.category}
    //       </div>
    //       <div className="mb-2">
    //         <strong>Image:</strong> <img src={product.image} alt={product.name} className="h-24 w-auto" />
    //       </div>
    //       <div className="mb-2">
    //         <strong>Price:</strong> {product.basePrice}
    //       </div>
    //       <div className="mb-2">
    //         <strong>Variations:</strong>
    //         {product.variations.map((item)=> {
    //             `${item.size} : ${item.price} `
    //         })}
    //       </div>
    //       <div>{renderActions(product)}</div>
    //     </div>
    //   ))}
    // </div>
    <div className="grid min-[1200px]:grid-cols-3 min-[1440px]:grid-cols-4 min-[1700px]:grid-cols-4  gap-4 mr-2 ml-2">
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
                        onClick={onEdit(product)}
                      >
                        <i className="pi pi-pencil" />
                      </div>
                      <div
                        className="text-red-500 cursor-pointer px-2 py-1 rounded border border-transparent hover:border-red-500 flex justify-center items-center"
                        onClick={onDelete(product)
                          // setProductId(product._id);
                          // setProductName(product.title);
                          // setVisibleDeleteDialog(true);
                        }
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
  );
};

export default ProductGrid;
