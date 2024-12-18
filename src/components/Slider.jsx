"use client";

import { ArrowLeft, ArrowRight } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";

const slides = [
  {
    id: 1,
    title: "text",
    description:
      "  Lorem ipsum dolor sit, amet consectetur adipisicing elit.  Lorem ipsum dolor sit, amet consectetur adipisicing elit.",
    img: "https://images.unsplash.com/photo-1631709497146-a239ef373cf1?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    url: "",
    bg: " bg-gradient-to-tr  from-brown-200 to-brown-300",
  },
  {
    id: 2,
    title: "text",
    description:
      "  Lorem ipsum dolor sit, amet consectetur adipisicing elit. Lorem ipsum dolor sit, amet consectetur adipisicing elit.",
    img: "https://images.unsplash.com/photo-1447078806655-40579c2520d6?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    url: "",
    bg: " bg-gradient-to-tr  from-brown-200 to-brown-300",
  },
  {
    id: 3,
    title: "text",
    description:
      "  Lorem ipsum dolor sit, amet consectetur adipisicing elit. Lorem ipsum dolor sit, amet consectetur adipisicing elit. ",
    img: "https://images.unsplash.com/photo-1700510967977-c325c426dd33?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    url: "",
    bg: " bg-gradient-to-tr  from-brown-200 to-brown-300",
  },
  {
    id: 4,
    title: "text",
    description:
      "  Lorem ipsum dolor sit, amet consectetur adipisicing elit.  Lorem ipsum dolor sit, amet consectetur adipisicing elit.",
    img: "https://images.unsplash.com/photo-1711915408248-e30b20613316?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    url: "",
    bg: " bg-gradient-to-tr  from-brown-200 to-brown-300",
  },
];

function Slider() {
  const [current, setCurrent] = useState(0);

  const next = () => {
    setCurrent((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  };
  const prev = () => {
    setCurrent((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="h-[500px] max-w-7xl w-full m-auto overflow-hidden relative mt-16">
      {/* 外層容器 */}

      <div
        className="flex h-full w-full transition-transform duration-1000 ease-in-out"
        style={{ transform: `translateX(-${current * 100}%)` }}
      >
        {slides.map((slide, index) => (
          <div key={slide.id} className="relative flex-shrink-0 w-full h-full">
            <Image
              src={slide.img}
              alt={`Slide ${index + 1}`}
              fill
              className="object-cover"
            />
            {/* 文字內容 */}
            <div className="absolute top-[80px] right-[100px] text-brown-50 flex flex-col gap-3 text-end  w-[300px]">
              <h2 className="text-2xl ">{slide.title}</h2>
              <div className="text-sm whitespace-normal break-words leading-7">
                {slide.description}
              </div>
            </div>
            <div className="absolute top-1/2 right-0 text-brown-50 px-4 text-sm sm:text-lg cursor-pointer">
              <ArrowRight size={45} onClick={next} />
            </div>
            <div className="absolute top-1/2 left-0 text-brown-50 px-4 text-sm sm:text-lg cursor-pointer">
              <ArrowLeft size={45} onClick={prev} />
            </div>
          </div>
        ))}
      </div>

      {/* 點點導航 */}
      <div className="absolute left-1/2 bottom-8 transform -translate-x-1/2 flex gap-4">
        {slides.map((slide, index) => (
          <div
            className={`w-3 h-3 rounded-full  cursor-pointer ${
              current === index ? " bg-brown-150" : "bg-brown-50"
            }`}
            key={slide.id}
            onClick={() => setCurrent(index)}
          ></div>
        ))}
      </div>
    </div>
  );
}

export default Slider;
