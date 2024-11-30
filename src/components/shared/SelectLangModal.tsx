import {
  forwardRef,
  useCallback,
  useImperativeHandle,
  useMemo,
  useRef,
  useState,
} from "react";
import { Image, Switch, Text, View } from "react-native";
import BottomSheet, { BottomSheetBackdrop } from "@gorhom/bottom-sheet";
import { useTranslation } from "react-i18next";

import { COLORS, SIZES, FONTS, icons } from "@/src/constants";
import { useStorage } from "@/src/store";

export const SelectLangModal = forwardRef((props, ref) => {
  const { t } = useTranslation();
  const { language, setLanguage } = useStorage();
  const [isEnabled, setIsEnabled] = useState(false);

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
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              paddingHorizontal: SIZES.padding,
            }}
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
            <Switch
              trackColor={{
                false: COLORS.darkBackground,
                true: COLORS.primaryDark,
              }}
              thumbColor={isEnabled ? '#f5dd4b' : '#f4f3f4'}
              ios_backgroundColor={COLORS.secondary}
              onValueChange={() => setLanguage("es")}
              value={language === "es"}
              style={{
                padding: 10,
                transform: [{ scaleX: 1.5 }, { scaleY: 1.5 }],
              }}
            />
          </View>
          {/* Option English */}
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              paddingHorizontal: SIZES.padding,
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
            <Switch
              trackColor={{
                false: COLORS.secondary,
                true: COLORS.primaryDark,
              }}
              thumbColor={isEnabled ? '#f5dd4b' : '#f4f3f4'}
              ios_backgroundColor={COLORS.secondary}
              onValueChange={() => setLanguage("en")}
              value={language === "en"}
              style={{
                padding: 10,
                transform: [{ scaleX: 1.5 }, { scaleY: 1.5 }],
              }}
            />
          </View>
        </View>
      </View>
    </BottomSheet>
  );
});
