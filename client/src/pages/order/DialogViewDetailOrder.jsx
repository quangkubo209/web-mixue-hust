import React from 'react';
import { Dialog } from 'primereact/dialog';

const DialogViewDetailOrder = ({ visible, onHide, selectedOrder }) => {
    console.log("selected order: ", selectedOrder);
  const renderProductDetails = () => {
    return selectedOrder.orderLine.map((product, index) => (
      <div key={index}>
        <h4>{product.products}</h4>
        <p>Toppings: {product.toppingList.map(tl => tl.toppingId.name + "-"+ tl.toppingId.price + " ")}</p>
        <p>Size: {product.sizeProduct && product.sizeProduct.size}</p>
        <p>Quantity: {product.quantityProduct}</p>
        <p>Subtotal: {product.subTotal}</p>
        <hr />
      </div>
    ));
  };

  return (
    <Dialog
      visible={visible}
      onHide={onHide}
      header="Order Details"
      style={{ width: '50vw' }}
    >
      {selectedOrder && (
        <div>
          {renderProductDetails()}
          <button className="p-button p-button-secondary" onClick={onHide}>
            Close
          </button>
        </div>
      )}
    </Dialog>
  );
};

export default DialogViewDetailOrder;
