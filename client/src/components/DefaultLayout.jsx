import React from "react";
import MenuBar from "./MenuBar";
import { Outlet } from "react-router-dom";

export default function DefaultLayout() {
    return (
        <div className="card relative w-screen">
            <MenuBar />
            <div className="w-full flex justify-center mt-16 pt-4">
                <div className="w-full">
                    <div className="w-5/6 shadow-xl bg-white rounded-xl">
                        <Outlet />
                    </div>
                </div>
            </div>
        </div>
    );
}
