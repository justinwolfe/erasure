import React, { useState, useEffect, useRef } from "react";

import _cloneDeep from "lodash.clonedeep";

export const useGestureOnPage = collection => {
  const [statefulCollection, setStatefulCollection] = useState(collection);
  const [currentGesture, setCurrentGesture] = useState(undefined);
  const [gestureStarted, setGestureStarted] = useState(false);
  const keyCache = useRef(new Set());

  const toggleWord2 = key => {
    const newCollection = [...statefulCollection];
    const word = getWord(key, newCollection);
    if (word) {
      if(typeof currentGesture === "undefined"){
        
      }
    }
  };

  const toggleWord = key => {
    const newCollection = _cloneDeep(statefulCollection);
    const [paragraphIndex, wordIndex] = key.split("-");
    if (newCollection[paragraphIndex].words[wordIndex]) {
      if (typeof currentGesture === "undefined") {
        newCollection[paragraphIndex].words[
          wordIndex
        ].isMarked = !statefulCollection[paragraphIndex].words[wordIndex]
          .isMarked;
      } else {
        newCollection[paragraphIndex].words[
          wordIndex
        ].isMarked = currentGesture;
      }
      setStatefulCollection(newCollection);
    }
  };

  const getWord = (id, page) => page.find(word => word.id === id);

  const mark = key => {
    if (!key || keyCache.current.has(key)) return;
    keyCache.current.add(key);
    const word = getWord(key, statefulCollection);
    if (typeof currentGesture === "undefined") {
      if (word) {
        setCurrentGesture(!word.isMarked);
      }
    }
    toggleWord(key, currentGesture);
  };

  const getWordKey = element => {
    if (element === null) return undefined;
    if (element.getAttribute("name")) {
      return element.getAttribute("name");
    }
    if (element.closest("[name]")) {
      return element.closest("[name]").getAttribute("name");
    }
    return undefined;
  };

  const handleMove = e => {
    const { clientX, clientY } =
      e.nativeEvent.type === "mousemove" ? e : e.changedTouches[0];
    if (
      (e.nativeEvent.type === "mousemove" && gestureStarted) ||
      e.nativeEvent.type === "touchmove"
    ) {
      const movedIntoElement = document.elementFromPoint(clientX, clientY);
      const wordKey = getWordKey(movedIntoElement);
      if (wordKey) {
        mark(wordKey);
      }
    }
  };

  const handleStart = e => {
    setGestureStarted(true);
  };

  const handleStop = e => {
    keyCache.current.clear();
    setGestureStarted(false);
    setCurrentGesture(undefined);
  };

  return {
    gestureStart: handleStart,
    gestureStop: handleStop,
    gestureMove: handleMove,
    gesture: currentGesture,
    gesturefulPage: statefulCollection,
    getWord,
    getWordKey
  };
};
