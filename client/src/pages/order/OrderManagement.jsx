import React, { useState, useEffect } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';

const OrderManagementPage = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    // Lấy danh sách đơn hàng từ API
    setOrders(fakeData);
    fetchOrders();
  }, []);

  const fakeData = [
    {
        id: 1,
        customerName: "Kubo",
        status: "pending"
    },
    {
        id: 1,
        customerName: "Kubo",
        status: "pending"
    },
    {
        id: 1,
        customerName: "Kubo",
        status: "pending"
    },
    {
        id: 1,
        customerName: "Kubo",
        status: "pending"
    },
    {
        id: 1,
        customerName: "Kubo",
        status: "pending"
    },
    {
        id: 1,
        customerName: "Kubo",
        status: "pending"
    },
    {
        id: 1,
        customerName: "Kubo",
        status: "pending"
    },
  ]

  const fetchOrders = () => {
    // Gọi API để lấy danh sách đơn hàng từ backend
    // Ví dụ:
  }

  const renderOrderDetails = (rowData) => {
    // Trang chi tiết đơn hàng
    // Hiển thị thông tin chi tiết của đơn hàng
  };

  return (
    // <div className="p-d-flex p-jc-center">
    <div className='Card flex flex-col mx-20 my-4'>
        
      <div className="p-shadow-4 p-p-4 p-mt-4 h-[100vh]">
        <h1 className='text-3xl text-gray-500 font-bold p-4'>Danh sách đơn hàng</h1>
        <DataTable value={orders}>
          <Column field="id" header="ID"></Column>
          <Column field="customerName" header="Customer"></Column>
          <Column field="status" header="Status"></Column>
          <Column body={renderOrderDetails}></Column>
        </DataTable>
      </div>
    </div>
  );
};

export default OrderManagementPage;
