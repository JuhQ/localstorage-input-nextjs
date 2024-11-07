import useLocalStorage from "./localstorage";

function OpenAIKeyInput() {
  const [key, setKey] = useLocalStorage("openai-key");

  return (
    <input
      placeholder="ChatGPT API Key"
      type="text"
      value={window.localStorage.getItem("key") || key}
      onChange={({ target }) => {
        setKey(target.value);
        window.localStorage.setItem("key", target.value);
      }}
    />
  );
}

export default OpenAIKeyInput;
