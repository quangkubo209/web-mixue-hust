import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import productApi from "./../../api/productApi";
import { toastContext } from "./../../contexts/ToastProvider";
import { useState } from "react";
import { ProgressSpinner } from "primereact/progressspinner";

export  function DialogDeleteProduct({ id, name, visible, setVisible
 }) {
    const { toastError, toastSuccess } = toastContext();
    const [loading, setLoading] = useState(false);

    const handleDelete = async () => {
        setLoading(true);
        try {
            const response = await productApi.deleteProduct(id);
            if (response.data.status === "success") {
                toastSuccess("Delete product seccessfully!");
                setVisible(false);
            }
        } catch (err) {
            // toastError(err.response.data.message);
            console.log(err);
        }
        setLoading(false);
    };

    const footerContent = (
        <div>
            <Button
                label="Delete"
                icon="pi pi-trash"
                onClick={() => handleDelete()}
                autoFocus
                severity="danger"
            />
            <Button
                icon="pi pi-times"
                label="Cancel"
                onClick={() => setVisible(false)}
                className="p-button-text"
            />
        </div>
    );

    return (
        <div className="card flex justify-content-center">
            <Dialog
                header="Delete Product"
                visible={visible}
                style={{ width: "50vw", height: "30vh" }}
                onHide={() => setVisible(false)}
                footer={footerContent}
            >
                {!loading && (
                    <span>Are you sure to delete <span className="text-red-500">{name}</span>? 
                    </span>
                )}
                {loading && (
                    <div className="w-full h-full flex justify-center items-center">
                        <ProgressSpinner className="" />
                    </div>
                )}
            </Dialog>
        </div>
    );
}
