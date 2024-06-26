import React from "react";

const MenuCom = () => {
  return (
    <label>
      <div class="w-9 h-10 cursor-pointer flex flex-col items-center justify-center">
        <input class="hidden peer" type="checkbox" />
        <div class="w-[50%] h-[2px] bg-black rounded-sm transition-all duration-300 origin-left translate-y-[0.45rem] peer-checked:rotate-[-45deg]"></div>
        <div class="w-[50%] h-[2px] bg-black rounded-md transition-all duration-300 origin-center peer-checked:hidden"></div>
        <div class="w-[50%] h-[2px] bg-black rounded-md transition-all duration-300 origin-left -translate-y-[0.45rem] peer-checked:rotate-[45deg]"></div>
      </div>
    </label>
  );
};

export default MenuCom;
