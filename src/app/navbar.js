// consts go here

const Navbar = () => {
    // use effect, whatever else goes here

    return (
        <div>
            <nav className="flex flex-row items-center justify-center px-[20px] bg-[rgb(var(--secondary-rgb))]">
                {/* logo image */}
                <div className="h-[50px] w-[50px] flex basis-1/3">
                    <img src="/test-logo.png" />
                </div>

                {/* Title */}
                <div className="flex basis-1/3 items-center justify-center">
                    <h1 className="text-xl">Washroom wayfinder</h1>
                </div>

                {/* Extra links */}
                <ul className="flex basis-1/3">
                    <li className="flex ml-auto mr-0">
                        <a>About the team</a>
                    </li>
                </ul>
            </nav>
        </div>
    )

};

export default Navbar;
