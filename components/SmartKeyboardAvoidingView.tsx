// components/SmartKeyboardAvoidingView.tsx
import React, {useEffect, useState} from "react";
import {
  Dimensions,
  GestureResponderEvent,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  View,
} from "react-native";

type Props = {
  footer?: React.ReactNode;
  children: React.ReactNode;
  safeZoneAboveKeyboard?: number;
};

const SmartKeyboardAvoidingView = ({
  footer,
  children,
  safeZoneAboveKeyboard = 80,
}: Props) => {
  const [keyboardHeight, setKeyboardHeight] = useState(0);

  useEffect(() => {
    const showSub = Keyboard.addListener("keyboardDidShow", (e) => {
      setKeyboardHeight(e.endCoordinates.height);
    });
    const hideSub = Keyboard.addListener("keyboardDidHide", () => {
      setKeyboardHeight(0);
    });

    return () => {
      showSub.remove();
      hideSub.remove();
    };
  }, []);

  const handleTouch = (e: GestureResponderEvent) => {
    const {locationY} = e.nativeEvent;
    const screenHeight = Dimensions.get("window").height;
    const protectedZoneStart =
      screenHeight - keyboardHeight - safeZoneAboveKeyboard;

    if (keyboardHeight > 0 && locationY > protectedZoneStart) {
      return false;
    }

    Keyboard.dismiss();
    return false;
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{flex: 1}}
    >
      <View
        style={{flex: 1}}
        onStartShouldSetResponder={() => true}
        onResponderRelease={handleTouch}
      >
        {children}
        {footer && <View>{footer}</View>}
      </View>
    </KeyboardAvoidingView>
  );
};

export default SmartKeyboardAvoidingView;
