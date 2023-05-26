import React from "react";

const NewsLetter = () => {
  return (
    <div className="bg-[#71b15d] w-full">
      <div className="w-full max-w-7xl py-12 mx-auto flex flex-col lg:flex-row gap-8 px-6 min-h-[40vh] lg:h-[40vh]">
        <div>
          <h1 className="text-white text-2xl lg:text-5xl font-medium">
            Subscribe to our newsletter
          </h1>
          <p className="text-white lg:text-lg pt-4 font-light">
            Leave us with your email and never miss a single update.
          </p>
          {/* input and suscribe, side by side */}
          <div className="bg-[#639952] flex flex-col lg:flex-row gap-4 mt-6 border-[0.8px] border-[#C5D5FD] border-opacity-20 py-2 rounded px-4 hover:border-white">
            <input
              type="text"
              placeholder="YOUR EMAIL ADDRESS"
              className="appearance-none bg-transparent flex-1 border-none ring-0 focus:outline-none text-white placeholder:text-white"
            />
            <button className="btn-black px-2 lg:px-8 py-3 h-full">
              Subscribe
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewsLetter;
