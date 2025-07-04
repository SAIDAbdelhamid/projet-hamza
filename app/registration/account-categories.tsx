import {
  getCategories,
  patchInterestedCategories,
  patchSellerCategories,
  TCategorie,
} from "@/api/apis";
import Input from "@/components/Input";
import PrimaryButton from "@/components/PrimaryButton";
import PrimarySelect from "@/components/PrimarySelect";
import {ThemedText} from "@/components/ThemedText";
import {ThemedView} from "@/components/ThemedView";
import {Colors} from "@/constants/Colors";
import en from "@/constants/lang/en.json";
import fr from "@/constants/lang/fr.json";
import {RootState} from "@/store";
import {setRegistration} from "@/store/slices/registrationSlice";
import {useHeaderHeight} from "@react-navigation/elements";
import {useTheme} from "@react-navigation/native";
import {ChevronLeft, Search} from "@tamagui/lucide-icons";
import {useNavigation, useRouter} from "expo-router";
import {useEffect, useLayoutEffect, useState} from "react";
import {ActivityIndicator, Alert, ScrollView, StyleSheet} from "react-native";
import {useDispatch, useSelector} from "react-redux";
import {View, YStack} from "tamagui";

export default function AccountCategories() {
  const router = useRouter();
  const headerHeight = useHeaderHeight();
  const navigation = useNavigation();
  const {dark} = useTheme();
  const [isFetching, setIsFetching] = useState(false);
  const [loading, setLoading] = useState(false);
  const theme = dark ? "dark" : "light";
  const t = false ? fr : en;
  const registration = useSelector((state: RootState) => state.registration);
  const dispatch = useDispatch();
  const [categories, setCategories] = useState<TCategorie[]>([]);
  const [selectedCategories, setSelectedCategories] = useState(
    registration.categories || []
  );
  const fetchAllCategories = async () => {
    setIsFetching(true);
    try {
      const categoriesResult = await getCategories();
      setCategories(categoriesResult.data);
    } catch (e: any) {
      const error = e.response.data;
      Alert.alert(
        "Error " + error.statusCode,
        error.error + " : " + error.message
      );
    } finally {
      setIsFetching(false);
    }
  };
  useEffect(() => {
    fetchAllCategories();
  }, []);
  const [search, setSearch] = useState("");

  const filteredResults = categories.filter((item) =>
    item.name.toLowerCase().includes(search.toLowerCase())
  );

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: t.registration.accountCategories.title,
      headerTintColor: Colors[theme].text,
      headerBackButtonDisplayMode: "minimal",
      headerLeft: () => (
        <ChevronLeft
          onPress={() =>
            navigation.canGoBack()
              ? navigation.goBack()
              : router.replace("/registration/account-type")
          }
          marginRight={20}
          size={24}
        />
      ),
    });
  });
  const onSubmit = async () => {
    setLoading(true);
    try {
      let response;
      if (registration.is_seller) {
        response = await patchSellerCategories({
          categories: selectedCategories,
        });
      } else {
        console.log(selectedCategories);
        response = await patchInterestedCategories({
          categories: selectedCategories,
        });
      }
      console.log(response);
      if (response.success) {
        dispatch(
          setRegistration({
            ...registration,
            step: "DONE",
            categories: selectedCategories,
          })
        );
        router.navigate("/(app)/home");
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
  };

  return (
    <ThemedView style={{paddingTop: headerHeight, ...styles.container}}>
      <ScrollView contentContainerStyle={styles.contentContainer}>
        <Input
          leftIcon={
            <Search
              size={22}
              zIndex={1}
              position="absolute"
              top={11}
              left={12}
            />
          }
          size={"$4"}
          onChangeText={(t) => setSearch(t)}
          placeholder={t.registration.accountCategories.search}
        />
        {isFetching ? (
          <View flex={1} alignItems="center" justifyContent="center">
            <ActivityIndicator color={"white"} />
          </View>
        ) : (
          <View gap={8} marginTop={24} flexDirection="row" flexWrap="wrap">
            {filteredResults.map((item, index) => (
              <PrimarySelect
                key={item.id.toString() + index.toString()}
                onPress={() => {
                  const isSelected = Boolean(
                    selectedCategories.find(
                      (selectedCategorie) => selectedCategorie === item.id
                    )
                  );
                  if (isSelected) {
                    setSelectedCategories(
                      selectedCategories.filter(
                        (selectedCategorie) => selectedCategorie !== item.id
                      )
                    );
                  } else {
                    setSelectedCategories([...selectedCategories, item.id]);
                  }
                }}
                unselected={
                  !Boolean(
                    selectedCategories.find(
                      (selectedCategorie) => selectedCategorie === item.id
                    )
                  )
                }
                style={styles.selectContainer}
              >
                <ThemedText style={styles.selectContent}>
                  {item.name}
                </ThemedText>
              </PrimarySelect>
            ))}
          </View>
        )}
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

const styles = StyleSheet.create({
  container: {flex: 1},
  contentContainer: {
    flexGrow: 1,
    padding: 20,
    justifyContent: "space-between",
    paddingTop: 40,
  },
  selectContainer: {height: 48},
  selectContent: {paddingLeft: 24, paddingRight: 24},
});
