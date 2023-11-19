import styles from './css/button.css'


// consts go here


// Component for the big "Find bathroom" button, plus options
const Button_filters = () => {
    // use effect, whatever else goes here

    return (
        <form className="flex my-[300px] items-center" action="">
            {/* This is where the big button lives */}
            <div className='flex basis-1/2 justify-center'>
                {/* <button id="big-button">Find washrooms near me!</button> */}
                <input id="big-button" type="submit" value="Find washrooms near me!" />
            </div>

            <div className='flex flex-col basis-1/2 justify-center px-[10%] py-[10%]'>
                <div id="filters">
                    <h1 className='text-[40px]'>Filters</h1>
                    {/* This is where the other options are */}
                    <div className='flex flex-row justify-center my-[10px]'>
                        <input type="checkbox" id="wheel_access" name="wheel_access" value="wheel_access" />
                        <label for="wheel_access">Wheel accessible?</label>
                    </div>
                    <div className='flex flex-row justify-center my-[10px]'>
                        <input type="checkbox" id="24_hour" name="24_hour" value="24_hour" />
                        <label for="24_hour">All day availability?</label>
                    </div>
                </div>
            </div>
        </form>        
    )
};

export default Button_filters;
