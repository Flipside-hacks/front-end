import Image from "next/image"
import { useState } from "react";

const Loader = ({children,setOpen}:any) => {
    return (
        <>    

              <div className="loader fixed h-full z-50 w-full text-white ">
                <button onClick={()=>setOpen(false)} className="bg-red-500 absolute right-6 top-10 z-10 rounded-lg">
                    <Image src="/close-button.png" alt="close" width={30} height={30}/>
                </button>
                <div className="backdrop bg-black opacity-80 h-full w-full  grid place-content-center ">

                {children}
                </div>
              </div>
        </>
      );
}
 
export default Loader;