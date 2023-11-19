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
          <form className="flex flex-col items-center my-[30px]" onSubmit={handleButtonClick}>
            <div className='flex justify-center'>
              <input
                id="big-button"
                type="submit"
                value="Find washrooms near me!"
                style={{ backgroundColor: 'white', borderRadius: '8px', padding: '10px 20px', cursor: 'pointer', marginBottom: '20px' }}
              />
            </div>

            <div className='flex flex-col justify-center px-[10%] py-[10%]' style={{ backgroundColor: 'rgba(255, 255, 255, 0.9)', borderRadius: '10px', padding: '20px', marginBottom: '20px' }}>
              <div id="filters">
                <h2 className='mb-4 font-semibold'>Filters</h2>
                {/* This is where the other options are */}
                <input
                  type="checkbox"
                  id="wheel_access"
                  name="wheel_access"
                  value="wheel_access"
                  checked={wheelAccess}
                  onChange={() => setWheelAccess(!wheelAccess)}
                />
                <label htmlFor="wheel_access" style={{ fontSize: '14px' }}> Wheel accessible?</label>

                <br />

                <input
                  type="checkbox"
                  id="24_hour"
                  name="24_hour"
                  value="24_hour"
                  checked={twentyFourHour}
                  onChange={() => setTwentyFourHour(!twentyFourHour)}
                />
                <label htmlFor="24_hour" style={{ fontSize: '14px' }}> All day availability?</label>

              </div>
            </div>
          </form>
        )}

        {showMap && <Map filterWheelchair={wheelAccess} filter24h={twentyFourHour} />}

        {/* extra options (eg. report an error) */}
        <div className="flex h-[15%] w-[15%] justify-end ml-auto mr-0">
          <Report />
        </div>
      </main>
    </>
  );
}

