"use client";
import { useState } from "react";

function Dropdown({ children, trigger, className, dropdownClassName }) {
  const [open, setOpen] = useState(false);

  return (
    <div
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
      className={`relative ${className}`}
    >
      {/* 觸發器 */}
      <div className="cursor-pointer">{trigger}</div>

      {/* 下拉菜單 */}
      {open && (
        <div
          className={`absolute rounded-md left-1/2 top-12 bg-zinc-100 text-white -translate-x-1/2 z-50 ${dropdownClassName}`}
        >
          {/* 增加隱形的接觸面積 */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-8 bg-transparent" />
          <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 rotate-45 bg-white" />
          <div>{children}</div>
        </div>
      )}
    </div>
  );
}

export default Dropdown;
