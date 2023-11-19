// consts go here

const Navbar = () => {
    // use effect, whatever else goes here

    return (
        <div>
            <nav className="flex flex-row items-center justify-center bg-white">
                {/* logo image */}
                <div className="h-[50px] w-[50px]">
                    <img src="/test-logo.png" />
                </div>

                <div className="flex basis-1/2 items-center justify-center">
                    <h1 className="text-xl">Washroom wayfinder</h1>
                </div>

                <ul className="flex basis-1/3">
                    <li className="flex float-right">
                        <a>About the team</a>
                    </li>
                </ul>
            </nav>
        </div>
    )

};

export default Navbar;
