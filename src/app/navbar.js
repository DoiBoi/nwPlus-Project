// consts go here

import React from "react";

const Navbar = () => {
    // use effect, whatever else goes here

    return (
        <div>
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
                <div className="flex basis-1/3 items-right justify-right">
                    <a href="https://github.com/DoiBoi/nwPlus-Project" target="_blank" rel="noopener noreferrer">
                        <img style={{ width: '50%', height: '50%' }} src="/github-mark.png" alt="GitHub Logo" />
                    </a>
                </div>
            </nav>
        </div>
    )

};

export default Navbar;
