import submitReport from "./reporttogithub";

const Report = () => {
  return (
    <button onClick={submitReport("Test number", "Test")}>
      Report an Error
    </button>
  );
};

export default Report;
