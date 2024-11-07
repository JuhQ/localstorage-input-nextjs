"use client";

import { useCallback, useEffect, useState } from "react";

function getItemFromLocalstorage<T>(key: string): null | T {
  const item = global?.window?.localStorage.getItem(key);

  if (item) {
    return JSON.parse(item);
  }

  return null;
}

const eventName = "localstorage-change";

function setValue<T>(key: string, setInnerValue: (newValue: T) => void) {
  return (newValue: T) => {
    global?.window?.localStorage.setItem(key, JSON.stringify(newValue));
    global?.window?.dispatchEvent(new Event(eventName));

    setInnerValue(newValue);
  };
}

function useLocalStorage<T>(key: string): [null | T, (newValue: T) => void] {
  // because of nextjs
  try {
    const [value, setInnerValue] = useState<null | T>(
      getItemFromLocalstorage<T>(key) // nextjs issues
    );

    const handleEvent = useCallback(() => {
      const item = getItemFromLocalstorage<T>(key);

      if (item) {
        setInnerValue(item);
      }
    }, [key, setInnerValue]);

    useEffect(() => {
      const item = getItemFromLocalstorage<T>(key);

      if (item) {
        setInnerValue(item);
      }

      global?.window?.addEventListener("storage", handleEvent);
      global?.window?.addEventListener(eventName, handleEvent);

      return () => {
        global?.window?.removeEventListener("storage", handleEvent);
        global?.window?.removeEventListener(eventName, handleEvent);
      };
    }, [key, handleEvent]);

    return [value, setValue(key, setInnerValue)];
  } catch (error) {
    return [null, () => {}];
  }
}

export default useLocalStorage;
