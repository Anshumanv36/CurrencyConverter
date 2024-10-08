// import React, { useEffect, useState } from "react";
// import { View, Keyboard, Dimensions, StyleSheet } from "react-native";

// const styles = StyleSheet.create({
//   container: {
//     left: 0,
//     right: 0,
//     bottom: 0,
//     height: 0,
//   },
// });

// export const KeyboardSpacer = ({ onToggle }) => {
//   const [keyboardSpace, setKeyboardSpace] = useState(0);
//   useEffect(() => {
//     const showListner = Keyboard.addListener("keyboardDidShow", (event) => {
//       console.log("keyboardDidShow", event);
//       const screenHeight = Dimensions.get("window").height;
//       const endY = event.endCoordinates.screenY;

//       setKeyboardSpace(screenHeight - endY + 20);
//       onToggle(true);
//     });
//     const hideListner = Keyboard.addListener("keyboardDidHide", () => {
//       setKeyboardSpace(0);
//       onToggle(false);
//     });

//     return () => {
//       showListner.remove();
//       hideListner.remove();
//     };
//   }, []);

//   return <View style={[styles.container, { height: keyboardSpace }]} />;
// };

///////////////////////////////////////////////////////////////////////////////////////////////

import React, { useState, useEffect } from "react";
import { Keyboard, View, Dimensions, Platform, StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    left: 0,
    right: 0,
    bottom: 0,
  },
});

export const KeyboardSpacer = ({ style, onToggle = () => null }) => {
  const [keyboardSpace, setKeyboardSpace] = useState(0);

  useEffect(() => {
    const updateKeyboardSpace = (event) => {
      if (!event.endCoordinates) {
        return;
      }

      const screenHeight = Dimensions.get("window").height;
      const newKeyboardSpace = screenHeight - event.endCoordinates.screenY;
      setKeyboardSpace(newKeyboardSpace);
      onToggle(true, newKeyboardSpace);
    };
    const showEvt =
      Platform.OS === "android" ? "keyboardDidShow" : "keyboardWillShow";
    const showListener = Keyboard.addListener(showEvt, updateKeyboardSpace);

    const resetKeyboardSpace = () => {
      setKeyboardSpace(0);
      onToggle(false, 0);
    };
    const hideEvt =
      Platform.OS === "android" ? "keyboardDidHide" : "keyboardWillHide";
    const hideListener = Keyboard.addListener(hideEvt, resetKeyboardSpace);

    return () => {
      showListener.remove();
      hideListener.remove();
    };
  }, []);

  return <View style={[styles.container, { height: keyboardSpace }, style]} />;
};
