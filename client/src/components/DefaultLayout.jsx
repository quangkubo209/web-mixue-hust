import React from "react";
import MenuBar from "./MenuBar";
import { Outlet } from "react-router-dom";

export default function DefaultLayout() {
    return (
        <div className="card relative w-screen bg-white" >
            <div className="w-full flex justify-center ">
                <div className="w-full flex ">
                    <div className="w-1/6 md:min-w-[300px]  h-screen">
                        <MenuBar />
                    </div>
                    <div className="w-5/6 shadow-xl bg-white rounded-xl">
                        <Outlet />
                    </div>
                </div>
            </div>
        </div>
    );
}
