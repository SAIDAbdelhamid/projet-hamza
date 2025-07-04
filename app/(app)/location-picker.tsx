import {getCountriesCities} from "@/api/restcountries";
import PrimaryButton from "@/components/PrimaryButton";
import {ThemedText} from "@/components/ThemedText";
import {Colors} from "@/constants/Colors";
import en from "@/constants/lang/en.json";
import fr from "@/constants/lang/fr.json";
import MaskedView from "@react-native-masked-view/masked-view";
import {useHeaderHeight} from "@react-navigation/elements";
import {useTheme} from "@react-navigation/native";
import {ChevronDown, ChevronLeft, X} from "@tamagui/lucide-icons";
import * as Location from "expo-location";
import {useNavigation, useRouter} from "expo-router";
import React, {useEffect, useLayoutEffect, useState} from "react";
import {Platform, StyleSheet, TouchableHighlight} from "react-native";
import RNPickerSelect, {Item} from "react-native-picker-select";
import {View, YStack} from "tamagui";
import {LinearGradient} from "tamagui/linear-gradient";

export default function LocationPicker() {
  const t = false ? fr : en;
  const [location, setLocation] = useState<Location.LocationObject | null>(
    null
  );
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const router = useRouter();
  const navigation = useNavigation();
  const headerHeight = useHeaderHeight();
  const {dark} = useTheme();
  const theme = dark ? "dark" : "light";
  const [selectedCountry, setSelectedCountry] = useState<string>("");
  const [selectedCity, setSelectedCity] = useState("");
  const [countries, setCountries] = useState<
    {value: string; label: string; cities: string[]}[]
  >([]);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerStyle: {backgroundColor: Colors[theme].header},
      headerTitle: t.app.locationPicker.title,
      headerLeft: () =>
        Platform.OS === "ios" ? (
          <ChevronLeft
            onPress={() => navigation.goBack()}
            marginRight={20}
            size={24}
          />
        ) : undefined,
      headerRight: () => <X onPress={() => navigation.goBack()} size={24} />,
    });
  });

  useEffect(() => {
    getCountriesCities().then((response) => {
      const countriesList = response.data.map((c) => ({
        label: c.country,
        value: c.country,
        cities: c.cities,
      }));
      setCountries(countriesList);
    });
  }, []);

  async function getCurrentLocation() {
    let {status} = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      setErrorMsg("Permission to access location was denied");
      return;
    }

    let location = await Location.getCurrentPositionAsync({});
    setLocation(location);
  }
  return (
    <View
      flex={1}
      padding={24}
      paddingTop={24 + headerHeight}
      backgroundColor={Colors[theme].modal}
    >
      <YStack flex={1}>
        <PrimaryButton onPress={() => getCurrentLocation()}>
          <ThemedText type="labelBold">
            {t.app.locationPicker.useCurrent}
          </ThemedText>
        </PrimaryButton>
        {errorMsg && (
          <ThemedText
            style={{paddingTop: 4, color: Colors[theme].error}}
            type="label"
          >
            {errorMsg}
          </ThemedText>
        )}

        <ThemedText style={styles.selectTitle} type="label">
          {!location
            ? t.app.locationPicker.selectManually
            : "latitude : " +
              location.coords.latitude +
              " \n longitude : " +
              location.coords.longitude}
        </ThemedText>
        <Dropdown
          value={selectedCountry}
          onValueChange={(val) => {
            setSelectedCountry(val);
            console.log(val);
          }}
          items={countries}
          placeholder={{label: t.app.locationPicker.country, value: ""}}
        />

        <Dropdown
          value={selectedCity}
          onValueChange={(val) => setSelectedCity(val)}
          items={
            countries
              .find((c) => c.value === selectedCountry)
              ?.cities.map((city) => ({
                label: city,
                value: city,
              })) || []
          }
          placeholder={{label: t.app.locationPicker.city, value: ""}}
        />
      </YStack>
      <YStack height={160} paddingBottom={20} justifyContent="flex-end">
        <ThemedText style={styles.skipLabel} type="label">
          {t.app.common.later}
        </ThemedText>
        <TouchableHighlight
          onPress={() => navigation.goBack()}
          style={styles.skipBtnContainer}
        >
          <MaskedView
            maskElement={
              <ThemedText style={styles.textAlign} type="labelBold">
                {t.app.common.skip}
              </ThemedText>
            }
          >
            <LinearGradient
              width="100%"
              padding={14}
              alignItems="center"
              justifyContent="center"
              borderRadius={15}
              colors={[Colors[theme].gradientStart, Colors[theme].gradientEnd]}
              start={[0, 0]}
              end={[0.05, 2]}
              locations={[0, 0.65]}
            ></LinearGradient>
          </MaskedView>
        </TouchableHighlight>
        <PrimaryButton onPress={() => router.navigate("/social-network")}>
          <ThemedText type="labelBold">
            {t.registration.common.continue}
          </ThemedText>
        </PrimaryButton>
      </YStack>
    </View>
  );
}

export const Dropdown = ({
  items,
  placeholder,
  onValueChange,
  value,
}: {
  items: Item[];
  placeholder?: {} | Item | undefined;
  onValueChange: (value: any, index: number) => void;
  value?: any;
}) => {
  const {dark} = useTheme();
  const theme = dark ? "dark" : "light";
  const t = false ? fr : en;

  return (
    <View
      style={{
        ...styles.selectContainer,
        backgroundColor: Colors[theme].select,
        borderColor: Colors[theme].border,
        color: Colors[theme].background,
      }}
    >
      <RNPickerSelect
        placeholder={placeholder}
        useNativeAndroidPickerStyle={false}
        Icon={() => <ChevronDown size={18} />}
        style={{
          iconContainer: styles.iconContainer,
          placeholder: {color: Colors[theme].text},
          inputAndroidContainer: styles.inputAndroidContainer,
          inputIOSContainer: styles.inputIOSContainer,
          inputAndroid: {...styles.inputAndroid, color: Colors[theme].text},
          inputIOS: {...styles.inputIOS, color: Colors[theme].text},
        }}
        onValueChange={onValueChange}
        value={value}
        darkTheme={true}
        items={items}
        doneText={t.app.common.done}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  selectTitle: {textAlign: "center", paddingTop: 20, paddingBottom: 14},
  skipBtnContainer: {
    height: 48,
    justifyContent: "center",
    width: "50%",
    borderRadius: 24,
    alignSelf: "center",
    marginBottom: 8,
  },
  skipLabel: {textAlign: "center", paddingBottom: 8},
  selectContainer: {
    height: 48,
    borderRadius: 15,
    marginTop: 6,
    marginBottom: 6,
    borderWidth: 1,
    justifyContent: "center",
  },
  textAlign: {textAlign: "center"},
  inputAndroidContainer: {paddingLeft: 12, paddingRight: 30},
  inputIOSContainer: {
    paddingLeft: 12,
    height: "100%",
    justifyContent: "center",
  },
  inputAndroid: {paddingRight: 24},
  inputIOS: {paddingRight: 24},
  iconContainer: {top: 14, right: 8},
});
