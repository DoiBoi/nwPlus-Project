"use client"
import React, { useState } from "react";
import Map from "./map";
import Navbar from "./navbar";
import Report from "./report";

export default function Home() {
  const [showMap, setShowMap] = useState(false);
  const [wheelAccess, setWheelAccess] = useState(false);
  const [twentyFourHour, setTwentyFourHour] = useState(false);

  const handleButtonClick = () => {
    setShowMap(true);
  };

  return (

    <>
      <main className="flex min-h-screen flex-col">
        {/* logo, title, about the team */}
        <Navbar />



        {!showMap && (
          <form className="flex flex-col items-center justify-center h-full" onSubmit={handleButtonClick}>
            <img className='mt-15' src="/header_new.png" />

            <div className='flex justify-center'>
              <input
                id="big-button"
                type="submit"
                value="Find washrooms near me!"
                className="font-bold"
                style={{
                  backgroundColor: 'white',
                  borderRadius: '8px',
                  padding: '10px 20px',
                  cursor: 'pointer',
                  marginBottom: '50px',
                  marginTop: '50px',
                  boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)', // Add this line for the shadow
                }}
              />

            </div>

            <div className='flex flex-col justify-center px-[10%] py-[10%]' style={{ backgroundColor: 'rgba(255, 255, 255, 0.9)', borderRadius: '10px', padding: '20px', marginBottom: '20px' }}>
              <div id="filters">
                <h2 className='mb-4 font-semibold'>Accessibility Filters</h2>
                {/* This is where the other options are */}
                <input
                  type="checkbox"
                  id="wheel_access"
                  name="wheel_access"
                  value="wheel_access"
                  checked={wheelAccess}
                  onChange={() => setWheelAccess(!wheelAccess)}
                />
                <label htmlFor="wheel_access" style={{ fontSize: '14px' }}> Require wheelchair accessiblity?</label>

                <br />

                <input
                  type="checkbox"
                  id="24_hour"
                  name="24_hour"
                  value="24_hour"
                  checked={twentyFourHour}
                  onChange={() => setTwentyFourHour(!twentyFourHour)}
                />
                <label htmlFor="24_hour" style={{ fontSize: '14px' }}> Requir 24 hour availability?</label>

              </div>
            </div>
          </form>
        )}

        {showMap && <div className="flex flex-col items-center justify-center h-full">
          <img className='mt-15' src="/header_new.png" />
          <Map filterWheelchair={wheelAccess} filter24h={twentyFourHour} className="mt-10 bt-10" />
        </div>}

        {/* extra options (eg. report an error) */}
        <div className="flex h-[15%] w-[15%] justify-end ml-auto mr-0">
          <Report />
        </div>
      </main>
    </>
  );
}

