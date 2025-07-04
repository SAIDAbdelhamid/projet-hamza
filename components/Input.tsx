import {Colors} from "@/constants/Colors";
import {useTheme} from "@react-navigation/native";
import {Eye, EyeOff} from "@tamagui/lucide-icons";
import React, {ReactNode, useState} from "react";
import {FieldError} from "react-hook-form";
import {StyleSheet, TextInput} from "react-native";
import {Input as TAMInput, InputProps as TAMInputProps, YStack} from "tamagui";
import {ThemedText} from "./ThemedText";

type InputProps = TAMInputProps & {
  ref?: React.Ref<TextInput> | undefined;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  isPassword?: boolean;
  error?: FieldError;
  label?: string;
};

export default function Input({
  ref,
  leftIcon,
  rightIcon,
  isPassword = false,
  error,
  label,
  ...props
}: InputProps) {
  const {dark} = useTheme();
  const theme = dark ? "dark" : "light";
  const [showPassword, setShowPassword] = useState(false);

  return (
    <>
      {label ? (
        <ThemedText
          style={{
            ...styles.caption,
            color: error ? Colors[theme].error : Colors[theme].text,
          }}
          type="caption"
        >
          {label}
        </ThemedText>
      ) : (
        <></>
      )}
      <YStack>
        {leftIcon ? leftIcon : <></>}
        <TAMInput
          ref={ref}
          {...props}
          paddingLeft={leftIcon ? 48 : undefined}
          paddingRight={rightIcon ? 48 : undefined}
          secureTextEntry={isPassword && !showPassword}
          borderColor={error ? Colors[theme].error : undefined}
        />
        {isPassword ? (
          showPassword ? (
            <EyeOff
              onPress={() => setShowPassword(!showPassword)}
              size={22}
              zIndex={1}
              position="absolute"
              top={10}
              right={12}
            />
          ) : (
            <Eye
              onPress={() => setShowPassword(!showPassword)}
              size={22}
              zIndex={1}
              position="absolute"
              top={10}
              right={12}
            />
          )
        ) : (
          <></>
        )}
        {rightIcon ? rightIcon : <></>}
      </YStack>

      {error && (
        <ThemedText
          style={{color: Colors[theme].error, paddingTop: 4}}
          type="caption"
        >
          {error.message}
        </ThemedText>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  caption: {paddingBottom: 4, paddingTop: 20},
});
