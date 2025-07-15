import {patchSellerSocials} from "@/api/apis";
import Input from "@/components/Input";
import PrimaryButton from "@/components/PrimaryButton";
import {ThemedText} from "@/components/ThemedText";
import {Colors} from "@/constants/Colors";
import en from "@/constants/lang/en.json";
import fr from "@/constants/lang/fr.json";
import {RootState} from "@/store";
import {setUser} from "@/store/slices/userSlice";
import MaskedView from "@react-native-masked-view/masked-view";
import {useHeaderHeight} from "@react-navigation/elements";
import {useTheme} from "@react-navigation/native";
import {
  Check,
  ChevronLeft,
  Paperclip,
  SendHorizontal,
  X,
} from "@tamagui/lucide-icons";
import {useNavigation, useRouter} from "expo-router";
import {useLayoutEffect} from "react";
import {Controller, useForm} from "react-hook-form";
import {
  Alert,
  ImageSourcePropType,
  Platform,
  ScrollView,
  StyleSheet,
  TouchableHighlight,
} from "react-native";
import {useDispatch, useSelector} from "react-redux";
import {Button, Image, View, XStack, YStack} from "tamagui";
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
  const user = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch();

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

  const onSubmit = async (data: FormData) => {
    const socialInfo = extractSocialInfo(data.searchLink);
    if (socialInfo) {
      dispatch(
        setUser({
          ...user,
          socials: user.socials.map((social) =>
            socialInfo.platform === social.platform
              ? {
                  ...social,
                  username: socialInfo.username,
                  profile_url: data.searchLink,
                }
              : social
          ),
        })
      );
    }
  };

  const sendToApi = async () => {
    try {
      const socials = user.socials
        .filter((s) => s.username)
        .map((s) =>
          Number.isInteger(s.image_url) ? {...s, image_url: ""} : s
        );

      await patchSellerSocials({
        socials,
      });
    } catch (e: any) {
      const error = e.response;
      Alert.alert(
        "Error " + error.status,
        Object.values(e.response.data).flat().join("\n")
      );
    } finally {
      router.navigate("/location-picker");
    }
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
              rightIcon={
                <SendHorizontal
                  onPress={handleSubmit(onSubmit)}
                  size={22}
                  zIndex={1}
                  position="absolute"
                  top={10}
                  right={12}
                />
              }
              size={"$4"}
              backgroundColor={"transparent"}
              error={error}
              placeholder={t.app.socialNetwork.search}
              onChangeText={onChange}
              onBlur={onBlur}
              onSubmitEditing={handleSubmit(onSubmit)}
              returnKeyType={"send"}
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
          {user.socials.map((item, index) => (
            <SocialButton
              key={index.toString()}
              username={item.username}
              platform={item.platform}
              image_url={item.image_url}
            />
          ))}
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
        <PrimaryButton onPress={sendToApi}>
          <ThemedText type="labelBold">
            {t.registration.common.continue}
          </ThemedText>
        </PrimaryButton>
      </YStack>
    </View>
  );
}

const SocialButton = ({
  platform,
  image_url,
  username,
}: {
  platform?: string;
  image_url?: ImageSourcePropType | undefined | any;
  username?: string;
}) => {
  const {dark} = useTheme();
  const theme = dark ? "dark" : "light";

  return (
    <Button
      marginBottom={4}
      marginTop={4}
      flexDirection="row"
      width={"100%"}
      flex={1}
      height={"100%"}
      minHeight={80}
      justifyContent="flex-start"
      borderColor={Colors[theme].border}
      borderWidth={2}
      onPress={() => console.log({platform, image_url, username})}
    >
      <Image
        height={48}
        width={48}
        source={image_url}
        borderRadius={24}
        marginRight={12}
        alignItems="center"
        justifyContent="center"
      />
      {!username ? (
        <ThemedText type="bodySmallMedium">
          {capitalizeFirstLetter(platform?.toLocaleLowerCase() || "")}
        </ThemedText>
      ) : (
        <XStack alignItems="center" justifyContent="space-between" flex={1}>
          <YStack flex={1}>
            <ThemedText
              style={{paddingBottom: 4, paddingTop: 4}}
              type="bodySmallMedium"
            >
              {username}
            </ThemedText>
            <ThemedText
              style={{
                paddingBottom: 4,
                paddingTop: 4,
                color: Colors[theme].label,
              }}
              type="label"
            >
              {capitalizeFirstLetter(platform?.toLocaleLowerCase() || "")}
            </ThemedText>
          </YStack>
          <Check size={30} />
        </XStack>
      )}
    </Button>
  );
};

function capitalizeFirstLetter(str: string) {
  if (!str) return "";
  return str.charAt(0).toUpperCase() + str.slice(1);
}

function extractSocialInfo(url: string) {
  const patterns = {
    FACEBOOK: /^(https?:\/\/)?(?:\w+\.)?facebook\.com\/([^/?#]+)/i,
    TWITTER: /^(https?:\/\/)?(?:\w+\.)?(twitter|x)\.com\/([^/?#]+)/i,
    INSTAGRAM: /^(https?:\/\/)?(?:\w+\.)?instagram\.com\/([^/?#]+)/i,
    LINKEDIN: /^(https?:\/\/)?(?:\w+\.)?linkedin\.com\/in\/([^/?#]+)/i,
    YOUTUBE:
      /^(https?:\/\/)?(?:\w+\.)?youtube\.com\/(channel|user|c)\/([^/?#]+)/i,
    SNAPCHAT: /^(https?:\/\/)?(?:\w+\.)?snapchat\.com\/add\/([^/?#]+)/i,
    WHATSAPP: /^(https?:\/\/)?chat\.whatsapp\.com\/([^/?#]+)/i,
    TIKTOK: /^(https?:\/\/)?(?:\w+\.)?tiktok\.com\/@([^/?#]+)/i,
    TELEGRAM: /^(https?:\/\/)?(?:\w+\.)?(telegram|t)\.me\/([^/?#]+)/i,
    WECHAT: /^(https?:\/\/)?(?:www\.)?wechat\.com\/([^/?#]+)/i,
  };

  for (const [platform, regex] of Object.entries(patterns)) {
    const match = url.match(regex);
    if (match) {
      return {
        platform,
        username: match[3] || match[2],
      };
    }
  }

  return null;
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
