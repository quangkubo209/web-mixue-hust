import React from "react";
import logo from "../../assets/images/baycho.jpg";
import { Avatar } from "primereact/avatar";
import { OverlayPanel } from "primereact/overlaypanel";
import { useRef } from "react";
import useHover from "../../hooks/useHover";

function MessageCard() {
  const op = useRef(null);
  const hoverCard = useRef(null);
  const isHover = useHover(hoverCard);
  return (
    <div
      className=" px-1 py-4 flex flex-row w-full border-b border-gray-200 cursor-pointer hover:border-gray-300 hover:shadow-md hover:bg-gray-100 transition-all duration-200 ease-in-out relative"
      ref={hoverCard}
    >
      <div className="relative">
        <Avatar
          image={logo}
          size="xlarge"
          shape="circle"
          className="flex-shrink-0 self-center"
        />
        <div
          className=" absolute right-1 bottom-1 h-4 w-4 rounded-full bg-green-400
            border-2 border-white flex justify-center items-center"
        ></div>
      </div>
      <div className="ml-4 flex-row flex justify-between flex-grow">
        <div className="flex flex-col justify-between flex-grow">
          <div className="text-xl line-clamp-1">
            <span className="font-semibold">
              Bay tro Bay tro Bay tro Bay tro Bay tro Bay tro{" "}
            </span>
          </div>
          <div className="flex flex-row items-baseline">
            <div className=" text-sm line-clamp-1">
              You: Bay tro Bay tro Bay tro Bay tro Bay tro Bay tro
            </div>
            <span className="text-red-400">46m</span>
          </div>
          {/* <div className="text-red-400">46 minutes ago</div> */}
        </div>
        <div className="ml-2 w-3 h-3 rounded-full bg-red-400 self-center block flex-shrink-0 whitespace-nowrap"></div>
      </div>
      {isHover ? (
        <div
          className="
      absolute
        hover:bg-gray-200
        top-1
        right-0
        rounded-full
        p-1
        w-8
        h-8
        flex justify-center items-center
      "
          onClick={(e) => op.current.toggle(e)}
        >
          <i className="pi pi-ellipsis-v"></i>
        </div>
      ) : (
        ""
      )}
      <OverlayPanel ref={op}>
        <div className="flex flex-col">
          {["Mark as read", "Mute notifications", "Delete Chat"].map(
            (item, index) => {
              return (
                <div
                  className="p-2 hover:bg-gray-200 cursor-pointer"
                  key={index}
                >
                  {item}
                </div>
              );
            }
          )}
        </div>
      </OverlayPanel>
    </div>
  );
}

export default MessageCard;
