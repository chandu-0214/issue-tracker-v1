import React from "react";

const Copyright = () => {
  return (
    <footer className="bg-white text-gray-800 py-2 m-2 fixed bottom-0 left-0 w-full">
      <div className="border-t border-gray-300 mt-2 pt-2 flex justify-between items-center">
        <p className="text-xs">
          &copy; {new Date().getFullYear()} Chandrashekhar. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Copyright;
