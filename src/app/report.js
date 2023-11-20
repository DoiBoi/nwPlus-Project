import { report } from "./css/report.css";

const Report = (props) => {
  // const [showError, setShowError] = useState(true);

  return (
    <div id="report">
      <div className="flex flex-col justify-center align-center">
          <h1 className="flex text-5xl mb-[10px]">Oh no! Please tell us what went wrong!</h1>
          <h1 className="flex justify-center">Contact us at washroomwayfinder@gmail.com</h1>
          <h2 className="flex justify-center">Alternatively, make a GitHub issue at https://github.com/DoiBoi/nwPlus-Project/issues</h2>
          <h1 className="flex justify-center mt-[10px] underline cursor-pointer" onClick={() => {
              props.setShowError(false);
          }}>Click here to close</h1>
      </div>
    </div>
  );
};

export default Report;
