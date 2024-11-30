import {
  forwardRef,
  useCallback,
  useImperativeHandle,
  useMemo,
  useRef,
  useState,
} from "react";
import { Image, Pressable, Text, View } from "react-native";
import * as Haptics from "expo-haptics";
import BottomSheet, { BottomSheetBackdrop } from "@gorhom/bottom-sheet";
import { useTranslation } from "react-i18next";

import { COLORS, SIZES, FONTS, icons } from "@/src/constants";
import { useStorage } from "@/src/store";

export const SelectLangModal = forwardRef((props, ref) => {
  const { t } = useTranslation();
  const { language, setLanguage } = useStorage();

  const snapPoints = useMemo(() => ["60%"], []);
  const bottomSheetRef = useRef<BottomSheet>(null);
  const handleOpenLangModal = () => bottomSheetRef.current?.expand();
  const renderBackdrop = useCallback(
    (props: any) => (
      <BottomSheetBackdrop
        appearsOnIndex={0}
        disappearsOnIndex={-1}
        {...props}
      />
    ),
    []
  );

  useImperativeHandle(ref, () => ({
    openModal: handleOpenLangModal,
  }));

  return (
    <BottomSheet
      ref={bottomSheetRef}
      index={-1}
      snapPoints={snapPoints}
      enablePanDownToClose={true}
      backgroundStyle={{
        backgroundColor: COLORS.white,
      }}
      backdropComponent={renderBackdrop}
    >
      <View
        style={{
          flex: 1,
          paddingHorizontal: SIZES.padding,
          backgroundColor: "rgba(250, 237, 222, 0.6)",
        }}
      >
        {/* Language */}
        <View
          style={{
            backgroundColor: COLORS.white,
            marginTop: SIZES.margin,
            borderRadius: SIZES.padding / 2,
            paddingVertical: SIZES.padding / 3,
            borderWidth: 2,
            borderColor: COLORS.primary,
          }}
        >
          <Text
            style={{
              color: COLORS.secondaryDarker,
              ...FONTS.h2,
              textAlign: "center",
              paddingVertical: SIZES.padding / 2,
            }}
          >
            {t("langModal.language")}
          </Text>
          {/* Option Spanish */}
          <Pressable
            style={{
              backgroundColor: language === "es" ? COLORS.successAnswer : COLORS.white,
              borderColor: language === "es" ? COLORS.successAnswerDark : COLORS.white,
              marginVertical: SIZES.margin / 2,
              marginHorizontal: SIZES.margin,
              borderWidth: 2,
              borderRadius: SIZES.radius + 2,
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              paddingHorizontal: SIZES.padding,
            }}
            onPress={() => {
              Haptics.selectionAsync();
              setLanguage("es")
            }
            }
          >
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <Image
                source={icons.es}
                resizeMode="contain"
                style={{
                  width: 40,
                  height: 40,
                }}
              />
              <Text
                style={{
                  color: COLORS.secondaryDark,
                  ...FONTS.h3,
                  textAlign: "center",
                  margin: SIZES.margin,
                }}
              >
                {t("langModal.es")}
              </Text>
            </View>
            {language === "es" && <Image
              source={icons.check}
              tintColor={COLORS.successAnswerDark}
              resizeMode="contain"
              style={{
                width: 30,
                height: 30,
              }}
            />}
          </Pressable>
          {/* Option English */}
          <Pressable
            style={{
              backgroundColor: language === "en" ? COLORS.successAnswer : COLORS.white,
              borderColor: language === "en" ? COLORS.successAnswerDark : COLORS.white,
              marginVertical: SIZES.margin / 2,
              marginHorizontal: SIZES.margin,
              borderWidth: 2,
              borderRadius: SIZES.radius + 2,
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              paddingHorizontal: SIZES.padding,
            }}
            onPress={() => {
              Haptics.selectionAsync()
              setLanguage("en")
            }}
          >
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <Image
                source={icons.us}
                resizeMode="contain"
                style={{
                  width: 40,
                  height: 40,
                }}
              />
              <Text
                style={{
                  color: COLORS.secondaryDark,
                  ...FONTS.h3,
                  textAlign: "center",
                  margin: SIZES.margin,
                }}
              >
                {t("langModal.us")}
              </Text>
            </View>
            {language === "en" && <Image
              source={icons.check}
              tintColor={COLORS.successAnswerDark}
              resizeMode="contain"
              style={{
                width: 30,
                height: 30,
              }}
            />}
          </Pressable>
        </View>
      </View>
    </BottomSheet>
  );
});
