import NavBar from "../../components/NavBar";
import "animate.css";
import "./index.css";
import ChatElement from "../../components/ChatElement";
const Chat = () => {
  const weatherData = JSON.parse(localStorage.getItem("weatherData"));
  return (
    <div className="animate__animated animate__fadeIn animate__slower chat-container-small-devices">
      <ChatElement weatherData={weatherData} />
      <NavBar />
    </div>
  );
};

export default Chat;
