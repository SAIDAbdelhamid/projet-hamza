import Input from "@/components/Input";
import PrimaryButton from "@/components/PrimaryButton";
import {ThemedText} from "@/components/ThemedText";
import {Colors} from "@/constants/Colors";
import en from "@/constants/lang/en.json";
import fr from "@/constants/lang/fr.json";
import MaskedView from "@react-native-masked-view/masked-view";
import {useHeaderHeight} from "@react-navigation/elements";
import {useTheme} from "@react-navigation/native";
import {ChevronLeft, Paperclip, X} from "@tamagui/lucide-icons";
import {useNavigation, useRouter} from "expo-router";
import {useLayoutEffect} from "react";
import {Controller, useForm} from "react-hook-form";
import {
  Platform,
  ScrollView,
  StyleSheet,
  TouchableHighlight,
} from "react-native";
import {Button, Image, View, YStack} from "tamagui";
import {LinearGradient} from "tamagui/linear-gradient";

type FormData = {
  searchLink: string;
};
export default function SocialNetwork() {
  const t = false ? fr : en;
  const {dark} = useTheme();
  const theme = dark ? "dark" : "light";
  const router = useRouter();
  const navigation = useNavigation();
  const headerHeight = useHeaderHeight();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerStyle: {backgroundColor: Colors[theme].header},
      headerTitle: t.app.socialNetwork.title,
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

  const {control, handleSubmit} = useForm<FormData>({
    defaultValues: {
      searchLink: "",
    },
  });

  const rules = {
    searchLink: {
      // FACEBOOK: /^(https?://)(?:\w+.)?facebook.com/./i,
      // TWITTER: /^(https?://)(?:\w+.)?(twitter|x).com/./i,
      // INSTAGRAM: /^(https?://)(?:\w+.)?instagram.com/./i,
      // LINKEDIN: /^(https?://)(?:\w+.)?linkedin.com/./i,
      // YOUTUBE: /^(https?://)(?:\w+.)?youtube.com/./i,
      // SNAPCHAT: /^(https?://)(?:\w+.)?snapchat.com/./i,
      // WHATSAPP: /^(https?://)?chat.whatsapp.com/./i,
      // TIKTOK: /^(https?://)(?:\w+.)?tiktok.com/./i,
      // TELEGRAM: /^(https?://)(?:\w+.)?(telegram|t).me/./i,
      // WECHAT: /^(https?://)?(www.)?wechat.com/./i,`
    },
  };

  return (
    <View
      flex={1}
      padding={24}
      paddingTop={24 + headerHeight}
      backgroundColor={Colors[theme].modal}
    >
      <Controller
        name={"searchLink"}
        control={control}
        rules={rules.searchLink}
        render={({field: {onChange, onBlur, value}, fieldState: {error}}) => (
          <>
            <ThemedText style={styles.titleLink} type="subTitle">
              {t.app.socialNetwork.linkSocial}
            </ThemedText>
            <Input
              leftIcon={
                <Paperclip
                  size={22}
                  zIndex={1}
                  position="absolute"
                  top={11}
                  left={12}
                />
              }
              size={"$4"}
              error={error}
              placeholder={t.app.socialNetwork.search}
              onChangeText={onChange}
              onBlur={onBlur}
              value={value ? value.toString() : undefined}
            />
          </>
        )}
      />
      <ThemedText style={styles.titleConnection} type="subTitle">
        {t.app.socialNetwork.connectSocial}
      </ThemedText>
      <YStack flex={1}>
        <ScrollView>
          <Button
            marginBottom={4}
            marginTop={4}
            flexDirection="row"
            width={"100%"}
            height={80}
            justifyContent="flex-start"
            borderColor={Colors[theme].border}
            borderWidth={2}
            onPress={() => console.log("Twitter")}
          >
            <Image
              height={48}
              width={48}
              source={require("../../assets/images/twitter.png")}
              borderRadius={24}
              marginRight={12}
              alignItems="center"
              justifyContent="center"
            />
            <ThemedText type="bodySmallMedium">Twitter</ThemedText>
          </Button>
          <Button
            marginBottom={4}
            marginTop={4}
            flexDirection="row"
            width={"100%"}
            height={80}
            justifyContent="flex-start"
            borderColor={Colors[theme].border}
            borderWidth={2}
            onPress={() => console.log("Facebook")}
          >
            <Image
              height={48}
              width={48}
              source={require("../../assets/images/facebook.png")}
              borderRadius={24}
              marginRight={12}
              alignItems="center"
              justifyContent="center"
            />
            <ThemedText type="bodySmallMedium">Facebook</ThemedText>
          </Button>
          <Button
            marginBottom={4}
            marginTop={4}
            flexDirection="row"
            width={"100%"}
            height={80}
            justifyContent="flex-start"
            borderColor={Colors[theme].border}
            borderWidth={2}
            onPress={() => console.log("LinkedIn")}
          >
            <Image
              height={48}
              width={48}
              source={require("../../assets/images/linkedin.png")}
              borderRadius={24}
              marginRight={12}
              alignItems="center"
              justifyContent="center"
            />
            <ThemedText type="bodySmallMedium">LinkedIn</ThemedText>
          </Button>
          <Button
            marginBottom={4}
            marginTop={4}
            flexDirection="row"
            justifyContent="flex-start"
            width={"100%"}
            height={80}
            borderColor={Colors[theme].border}
            borderWidth={2}
            onPress={() => console.log("WhatsApp")}
          >
            <Image
              height={48}
              width={48}
              source={require("../../assets/images/whatsapp.png")}
              borderRadius={24}
              marginRight={12}
              alignItems="center"
              justifyContent="center"
            />
            <ThemedText type="bodySmallMedium">WhatsApp</ThemedText>
          </Button>
        </ScrollView>
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
        <PrimaryButton onPress={() => router.navigate("/location-picker")}>
          <ThemedText type="labelBold">
            {t.registration.common.continue}
          </ThemedText>
        </PrimaryButton>
      </YStack>
    </View>
  );
}

const styles = StyleSheet.create({
  titleLink: {paddingBottom: 4},
  titleConnection: {paddingTop: 24},
  skipLabel: {textAlign: "center", paddingBottom: 8},
  skipBtnContainer: {
    height: 48,
    justifyContent: "center",
    width: "50%",
    borderRadius: 24,
    alignSelf: "center",
    marginBottom: 8,
  },
  textAlign: {textAlign: "center"},
});
