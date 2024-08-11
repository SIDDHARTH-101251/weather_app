import ReactMarkdown from "react-markdown";
import "./index.css";
import axios from "axios";
import { useState, useRef, useEffect } from "react";
import { BeatLoader } from "react-spinners";

function ChatElement(props) {
  const { weatherData } = props;

  const [prompt, setPrompt] = useState("");
  const [responses, setResponses] = useState([]); // Initialize state to hold the list of responses
  const [loading, setLoading] = useState(false); // Loading state
  const inputRef = useRef(null);

  // Function to generate the initial prompt based on weatherData
  useEffect(() => {
    if (weatherData) {
      const { name, main, weather } = weatherData;
      const temperature = main.temp;
      const condition = weather[0].description;
      const initialPrompt = `Give me health tips, food tips, and exercise tips for ${name}. It's currently ${temperature}°C and ${condition}.`;
      setPrompt(initialPrompt);
    }
  }, [weatherData]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!prompt.trim()) return; // Avoid empty prompts

    console.log(process.env.REACT_APP_BACKEND_URL); // Log the backend URL

    setLoading(true); // Start loading
    setResponses([...responses, { prompt, response: <BeatLoader /> }]); // Append the prompt with a loading status

    axios
      .post(`${process.env.REACT_APP_BACKEND_URL}/chat`, { prompt })
      .then((res) => {
        setResponses((prevResponses) => {
          const newResponses = [...prevResponses];
          newResponses[newResponses.length - 1].response = res.data; // Update the last response with the actual response
          return newResponses;
        });
        setPrompt(""); // Clear the prompt after submitting
      })
      .catch((err) => {
        console.log(err);
        setResponses((prevResponses) => {
          const newResponses = [...prevResponses];
          newResponses[newResponses.length - 1].response =
            "Error fetching data.";
          return newResponses;
        });
      })
      .finally(() => {
        setLoading(false); // Stop loading
      });
  };

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.style.height = "auto"; // Reset height to auto to recalculate
      inputRef.current.style.height = `${inputRef.current.scrollHeight}px`; // Set height based on scrollHeight
    }
  }, [prompt]);

  return (
    <div className="chat-container-large-devices">
      <div className="input-element-chat-container-large-devices">
        <form
          onSubmit={handleSubmit}
          className="form-style-chat-element-large-device"
        >
          <textarea
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="Chat with your Tenali Rama..."
            className="chat-input-element-style-large-devices"
            ref={inputRef}
            rows="1"
          />
          <button
            type="submit"
            className="get-advice-button-style"
            disabled={loading}
          >
            {loading ? <BeatLoader size={8} /> : "Get Advice"}
          </button>
        </form>
      </div>

      <div className="response-container">
        {responses.length === 0 ? (
          <>
            <img
              src="/tenali_response.jpeg"
              alt="Loading..."
              className="tenali-greeting-image"
            />
            <p className="tenali-greeting-text">Tenali is amazing!!</p>
          </>
        ) : (
          responses
            .slice()
            .reverse()
            .map((res, index) => (
              <div
                key={index}
                className={
                  index % 2 === 0 ? "response-item-1" : "response-item-2"
                }
              >
                <p className="prompt-style-large-device">
                  {res.prompt}
                  <img
                    src="/tenali_thinking.jpeg"
                    className="tenali-thinking"
                    alt="tenali-thinking"
                  />
                </p>
                <p className="response-style-large-device">
                  <img
                    src="/tenali_response.jpeg"
                    alt="tenali-response"
                    className="tenali-response"
                  />
                  {loading ? (
                    <BeatLoader size={8} />
                  ) : (
                    <ReactMarkdown>{String(res.response)}</ReactMarkdown>
                  )}
                </p>
              </div>
            ))
        )}
      </div>
    </div>
  );
}

export default ChatElement;
