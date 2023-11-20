// consts go here

import React from "react";

const Navbar = () => {
    // use effect, whatever else goes here

    return (
        <div className = "mt-2">
            <nav className="flex flex-row items-center justify-center px-[20px] bg-[rgb(var(--secondary-rgb))]">
                {/* logo image */}
                <div className="h-[40px] w-[40px] flex basis-1/3">
                    <img src="/logo.png" />
                </div>

                {/* Title */}
                <div className="flex basis-1/3 items-center justify-center">
                    {/* <img src="/header_new.png" /> */}
                </div>

                {/* Extra links */}
                <div style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'flex-end', paddingRight: '0px' }}>
                    {/* Adjust margin for spacing */}
                    {/* <div style={{ margin: '0px' }}> */}
                    {/* Link wrapping the image without default styling */}
                    <a href="https://github.com/DoiBoi/nwPlus-Project" target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none' }}>
                        <img style={{ width: '20%', height: '20%', border: 'none' }} src="/github-mark.png" alt="GitHub Logo" />
                    </a>
                    {/* </div> */}
                </div>
            </nav>
        </div>
    )

};

export default Navbar;
