import "./index.css";

const Clouds = (props) => {
  const { weather } = props;
  const cloud = weather?.[0];
  let { description } = cloud || {};

  if (!description) {
    description = "Loading...";
  }

  return (
    <div className="clouds-container">
      <i className="fa-solid fa-cloud cloud-icon"></i>
      <p className="weather">Weather</p>
      <p className="description">{description}</p>
    </div>
  );
};

export default Clouds;
