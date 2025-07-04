import {patchUserType} from "@/api/apis";
import PrimaryButton from "@/components/PrimaryButton";
import {ThemedText} from "@/components/ThemedText";
import {ThemedView} from "@/components/ThemedView";
import {Colors} from "@/constants/Colors";
import en from "@/constants/lang/en.json";
import fr from "@/constants/lang/fr.json";
import {RootState} from "@/store";
import {setRegistration} from "@/store/slices/registrationSlice";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import {useHeaderHeight} from "@react-navigation/elements";
import {useTheme} from "@react-navigation/native";
import {ChevronLeft, User} from "@tamagui/lucide-icons";
import {useNavigation, useRouter} from "expo-router";
import {useLayoutEffect, useState} from "react";
import {
  Alert,
  GestureResponderEvent,
  ScrollView,
  StyleSheet,
} from "react-native";
import {useDispatch, useSelector} from "react-redux";
import {Button, View, YStack} from "tamagui";
import {LinearGradient} from "tamagui/linear-gradient";

export default function AccountType() {
  const router = useRouter();
  const headerHeight = useHeaderHeight();
  const navigation = useNavigation();
  const {dark} = useTheme();
  const [loading, setLoading] = useState(false);
  const theme = dark ? "dark" : "light";
  const t = false ? fr : en;
  const registration = useSelector((state: RootState) => state.registration);
  const dispatch = useDispatch();
  const [isSeller, setIsSeller] = useState(registration.is_seller);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: t.registration.accountType.title,
      headerTintColor: Colors[theme].text,
      headerBackButtonDisplayMode: "minimal",
      headerLeft: () => (
        <ChevronLeft
          onPress={() =>
            navigation.canGoBack()
              ? navigation.goBack()
              : router.replace("/registration/general-information")
          }
          marginRight={20}
          size={24}
        />
      ),
    });
  });

  const onSubmit = async () => {
    if (isSeller) {
      setLoading(true);
      try {
        const response = await patchUserType({
          is_seller: isSeller,
        });
        if (response.success) {
          dispatch(
            setRegistration({
              ...registration,
              step: "ACCOUNT_CATEGORIES",
              is_seller: isSeller,
            })
          );
          router.navigate("/registration/account-categories");
        }
      } catch (e: any) {
        const error = e.response.data;
        Alert.alert(
          "Error " + error.statusCode,
          error.error + " : " + error.message
        );
      } finally {
        setLoading(false);
      }
    } else {
      dispatch(
        setRegistration({
          ...registration,
          step: "ACCOUNT_CATEGORIES",
          is_seller: isSeller,
        })
      );

      router.navigate("/registration/account-categories");
    }
  };

  return (
    <ThemedView style={{paddingTop: headerHeight, ...styles.container}}>
      <ScrollView contentContainerStyle={styles.contentContainer}>
        <YStack flex={1} justifyContent="center">
          <ItemType
            onPress={() => setIsSeller(false)}
            selected={!isSeller}
            type="standard"
          />
          <ItemType
            onPress={() => setIsSeller(true)}
            selected={isSeller}
            type="business"
          />
        </YStack>
        <YStack flex={1} paddingBottom={20} justifyContent="flex-end">
          <PrimaryButton
            loading={loading}
            disabled={loading}
            onPress={onSubmit}
          >
            <ThemedText type="labelBold">
              {t.registration.common.continue}
            </ThemedText>
          </PrimaryButton>
        </YStack>
      </ScrollView>
    </ThemedView>
  );
}
function ItemType({
  selected,
  type,
  onPress,
}: {
  selected?: boolean;
  type: "business" | "standard";
  onPress?: ((event: GestureResponderEvent) => void) | null | undefined;
}) {
  const {dark} = useTheme();
  const theme = dark ? "dark" : "light";
  const t = false ? fr : en;

  return (
    <Button
      marginBottom={20}
      flexDirection="column"
      width={"100%"}
      height={134}
      borderColor={selected ? Colors[theme].gradientEnd : Colors[theme].border}
      borderWidth={selected ? 3 : 2}
      onPress={onPress}
    >
      {selected ? (
        <LinearGradient
          height={48}
          width={48}
          alignItems="center"
          justifyContent="center"
          borderRadius={24}
          colors={[Colors[theme].gradientStart, Colors[theme].gradientEnd]}
          start={[0, 0]}
          end={[0.05, 2]}
          locations={[0, 0.65]}
        >
          {type === "standard" ? (
            <User size="24" color={Colors[theme].text} />
          ) : (
            <FontAwesome6
              name="business-time"
              size={20}
              color={Colors[theme].text}
            />
          )}
        </LinearGradient>
      ) : (
        <View
          height={48}
          width={48}
          alignItems="center"
          justifyContent="center"
          backgroundColor={Colors[theme].header}
          borderRadius={24}
        >
          {type === "standard" ? (
            <User size="24" color={Colors[theme].text} />
          ) : (
            <FontAwesome6
              name="business-time"
              size={20}
              color={Colors[theme].text}
            />
          )}
        </View>
      )}
      <ThemedText>
        {type === "standard"
          ? t.registration.accountType.typeStandard
          : t.registration.accountType.typeBusiness}
      </ThemedText>
      <ThemedText>
        {type === "standard"
          ? t.registration.accountType.roleUser
          : t.registration.accountType.roleOwner}
      </ThemedText>
    </Button>
  );
}

const styles = StyleSheet.create({
  container: {flex: 1},
  contentContainer: {
    flexGrow: 1,
    padding: 20,
    justifyContent: "space-between",
    paddingTop: 40,
  },
});
