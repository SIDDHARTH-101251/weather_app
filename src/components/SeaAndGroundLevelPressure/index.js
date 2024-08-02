import "./index.css";

const SeaAndGroundLevelPressure = (props) => {
  const { main } = props;
  const updatedData = {
    seaLevel: main.sea_level,
    grndLevel: main.grnd_level,
  };

  const { seaLevel, grndLevel } = updatedData;

  return (
    <div className="sea-and-ground-level-pressure-container">
      <div className="sea-level-pressure">
        <i className="fa-solid fa-water loc-icon-sea-and-ground"></i>
        <p className="pressure-text-sea-and-ground">Pressure</p>
        <p className="pressure-value-sea-and-ground">{seaLevel} hPa</p>
      </div>
      <div className="ground-level-pressure">
        <i className="fa-solid fa-mountain loc-icon-sea-and-ground"></i>
        <p className="pressure-text-sea-and-ground">Pressure</p>
        <p className="pressure-value-sea-and-ground">{grndLevel} hPa</p>
      </div>
    </div>
  );
};

export default SeaAndGroundLevelPressure;
