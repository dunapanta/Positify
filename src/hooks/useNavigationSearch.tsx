import { useLayoutEffect, useState } from "react";
import { SearchBarProps } from "react-native-screens";

import { COLORS } from "@/src/constants";
import { useNavigation } from "expo-router";

const defaultSearchOptions: SearchBarProps = {
  tintColor: COLORS.secondaryDarker,
  hideWhenScrolling: false,
};
export const useNavigationSearch = ({
  searchBarOptions,
}: {
  searchBarOptions?: SearchBarProps;
}) => {
  const [search, setSearch] = useState("");
  const navigation = useNavigation();

  const handleOnChangeText: SearchBarProps["onChangeText"] = ({
    nativeEvent: { text },
  }) => {
    setSearch(text);
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      headerSearchBarOptions: {
        ...defaultSearchOptions,
        ...searchBarOptions,
        onChangeText: handleOnChangeText,
      },
    });
  }, [navigation, searchBarOptions]);

  return search;
};
