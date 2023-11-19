import MapLogic from './maplogic';

const YourComponent = () => {
  return (
    <div>
      <h1>Your Next.js Mapbox App</h1>
      <MapLogic />

        let washroomsParsed;
        let washrooms;
        if (fs.existsSync("./public/public-washrooms.json")) {
        washrooms = fs.readFileSync("./public/public-washrooms.json")
    }

        if (washrooms) {
        washroomsParsed = new Washroom()

    }
    </div>
  );
};

export default YourComponent;
