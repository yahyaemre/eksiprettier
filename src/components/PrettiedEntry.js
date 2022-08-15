import React, { useEffect, createRef } from "react";
import { useScreenshot } from 'use-react-screenshot'

function PrettiedEntry({ results, setResults }) {

  const ref = createRef(null)
  const downloadRef = createRef(null)
  const [image, takeScreenshot] = useScreenshot()
  const getImage = async () =>  takeScreenshot(ref.current)

  useEffect(() => {
    if (image) {
      downloadRef.current.click();
    }
  })
  return (
    <div className="mt-7">
      {results.title ? (
        <div
        ref={ref}
          id="prettied"
          className="border-2 rounded-xl bg-[#6ca43d]  mx-auto w-[380px] h-[340px] overflow-hidden items-center justify-center  text-white font-normal p-[10px]"
        >
          <p className="block mt-9 justify-center items-center">
            <span className="font-bold text-xl">{results.title}</span>
            <br />
            <span className="text-sm">{results.date}</span>
            {results.body
              ? results.body.replace(/<\/?[^>]+(>|$)/g, "").slice(0, 340)
              : null}

            <h2

              width="120" 
              className="flex font-semibold mt-[10px] text-xl"
            >
              <span className="text-black">ekşi</span><span className="text-[#81cf41]">sözlük</span>
            </h2>
            {results.author ? (
              <div className=" float-right mt-[-22px]  mr-4">
                {" "}
                - {results.author}
              </div>
              
            ) : null}
            
        
          </p>
          <center>
              <img id='prettied-as-img' className="flex float-left"/>
          </center> 

          
        </div>
        
      ) : null}

    {results.body &&
    <div>
      <center>
      <a onClick={getImage} ref={downloadRef} className="block rounded-sm text-white hover:opacity-90 hover:transition-opacity mt-3 bg-[#81c14b] w-20 cursor-pointer" href={image} download="entry.png">indireyim</a>
      </center>
    </div>
    }
     
    </div>
  );
}
export default PrettiedEntry;
