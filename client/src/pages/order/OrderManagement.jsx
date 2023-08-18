// import React, { useState, useEffect } from 'react';
// import { DataTable } from 'primereact/datatable';
// import { Column } from 'primereact/column';
// import orderApi from "../../api/orderApi";

// const OrderManagementPage = () => {
//   const [orders, setOrders] = useState([]);
//   const [loading, setLoading ] = useState(false);

//   useEffect(() => {
//     const fetchApi = async () => {
//       setLoading(true);
//       try {
//         const response = await orderApi.getAllOrders();
//         if (response.data.status === "success") {
//           setOrders(response.data.data);
//         }

//         if (response.data.data.length < 1) {
//           console.log("No orders founddd!");
//         }
//       } catch (err) {
//         toastError(err.message);
//         // console.log(err);
//         setOrders([]);
//       }
//       setLoading(false);
//     };

//     fetchApi();
//   }, []);



//   const renderOrderDetails = (rowData) => {
//     // Trang chi tiết đơn hàng
//     // Hiển thị thông tin chi tiết của đơn hàng
//   };

//   return (
//     // <div className="p-d-flex p-jc-center">
//     <div className='Card flex flex-col mx-20 my-4'>
        
//       <div className="p-shadow-4 p-p-4 p-mt-4 h-[100vh]">
//         <h1 className='text-3xl text-gray-500 font-bold p-4'>Danh sách đơn hàng</h1>
//         <DataTable value={orders}>
//           <Column field="id" header="ID"></Column>
//           <Column field="createdAt" header="Created date"></Column>
//           <Column field="shippingMethod" header="shipping Method"></Column>
//           <Column field="status" header="Status"></Column>
//           <Column body={renderOrderDetails}></Column>
//         </DataTable>
//       </div>
//     </div>
//   );
// };

// export default OrderManagementPage;
import React, { useState, useEffect } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import orderApi from "../../api/orderApi";
import DialogViewDetailOrder from './DialogViewDetailOrder';

const OrderManagementPage = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showDetailsDialog, setShowDetailsDialog] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);

  useEffect(() => {
    const fetchApi = async () => {
      setLoading(true);
      try {
        const response = await orderApi.getAllOrders();
        if (response.data.status === "success") {
          setOrders(response.data.data);
        }

        if (response.data.data.length < 1) {
          console.log("No orders found!");
        }
      } catch (err) {
        // Handle error
      }
      setLoading(false);
    };

    fetchApi();
  }, []);

  const renderActions = (rowData) => {
    const handleStatusChange = async (orderId) => {
      try {
        // Call API to update order status
        await orderApi.updateOrderStatus(orderId, 'successed');

        // Update orders list
        const updatedOrders = orders.map((order) =>
          order.id === orderId ? { ...order, status: 'successed' } : order
        );
        setOrders(updatedOrders);
      } catch (err) {
        // Handle error
      }
    };

    return (
      <div className="p-d-flex p-jc-center">
        {rowData.status === 'pending' && (
          <Button
            label="Accept"
            icon="pi pi-check"
            className="p-button-success"
            onClick={() => handleStatusChange(rowData.id)}
          />
        )}
        <Button
          icon="pi pi-eye"
          onClick={() => {
            setSelectedOrder(rowData);
            setShowDetailsDialog(true);
          }}
        />
      </div>
    );
  };

  const onHideDetailsDialog = () => {
    setShowDetailsDialog(false);
  };

  return (
    <div className='Card flex flex-col mx-20 my-4'>
      <div className="p-shadow-4 p-p-4 p-mt-4 h-[100vh]">
        <h1 className='text-3xl text-gray-500 font-bold p-4'>Danh sách đơn hàng</h1>
        <DataTable value={orders}>
          <Column field="_id" header="ID" />
          <Column field="createdAt" header="Created date" />
          <Column
    field="customerId.fullname"
    header="Customer"
    className="truncate"
  />
          <Column field="shippingMethod" header="Shipping Method" />
          <Column field="total" header="total" />
          <Column field="status" header="Status" />
          <Column body={renderActions}></Column>
        </DataTable>
        {/* <Dialog
          visible={showDetailsDialog}
          onHide={onHideDetailsDialog}
          header="Order Details"
        > */}
          <DialogViewDetailOrder
          visible={showDetailsDialog}
          onHide={() => setShowDetailsDialog(false)}
          selectedOrder={selectedOrder}
        />
          {/* Render order details here using selectedOrder */}
        {/* </Dialog> */}
      </div>
    </div>
  );
};

export default OrderManagementPage;

