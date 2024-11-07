import useLocalStorage from "./localstorage";

function OpenAIKeyInput() {
  const [key, setKey] = useLocalStorage("openai-key");

  return (
    <input
      placeholder="ChatGPT API Key"
      type="text"
      value={key}
      onChange={({ target }) => {
        setKey(target.value);
      }}
    />
  );
}

export default OpenAIKeyInput;
