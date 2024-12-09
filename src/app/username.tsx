import {
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    TextInput,
    View,
    Image,
    Button,
} from "react-native";
import { useRef, useState } from "react";
import { router } from "expo-router";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useTranslation } from "react-i18next";
import { Controller, useForm } from "react-hook-form";
import Lottie from 'lottie-react-native';
import Svg, { Path } from "react-native-svg";
import Toast from "react-native-toast-message";

import { COLORS, FONTS, SIZES, icons, images } from "@/src/constants";
import TextButton from "@/src/components/shared/TextButton";
import { useStorage } from "@/src/store";
import { IconButton, SelectLangModal } from "../components/shared";


type FormValues = {
    username: string;
};

const Username = () => {
    const { top } = useSafeAreaInsets();
    const { t } = useTranslation();
    const [loading, setLoading] = useState(false);

    const { setIsOnBoardCompleted, setUsername } = useStorage((state) => state);
    //const { setUserId } = useAuthStore();
    const controllX = SIZES.width / 2; //Control center points x coordinate

    const {
        control,
        handleSubmit,
        formState: { errors },
    } = useForm<FormValues>();

    //Language
    const { language } = useStorage();
    const selectLangModalRef = useRef<any>(null);
    const openLangModal = () => {
        selectLangModalRef.current.openModal();
    };

    const onSubmit = async (data: FormValues) => {
        router.replace("/questions");
        setUsername(data.username);
        /*  try {
             setLoading(true);
             const response = await bookaiApi.post<CreateUserResponse>("/user", {
                 username: data.username,
             });
             const id = response.data.data.id;
             setIsOnBoardCompleted();
             setUsername(data.username);
             setUserId(id);
             router.replace("/(tabs)/home");
         } catch (error) {
             //console.error(error);
             Toast.show({
                 type: "error",
                 text1: t("onboarding.usernameErrorTitle"),
                 text2: t("onboarding.usernameErrorSubtitle"),
             });
         } finally {
             setLoading(false);
         } */
    };
    return (
        <View
            style={{
                flex: 1,
                backgroundColor: COLORS.primaryLighter,
            }}
        >
            <StatusBar
                translucent
                barStyle="dark-content"
                backgroundColor="transparent"
            />

            {/* Language */}
            <View
                style={{
                    zIndex: 10,
                    position: "absolute",
                    backgroundColor: "transparent",
                    flexDirection: "row",
                    top: top + 10,
                    right: 40,
                }}
            >
                <IconButton
                    iconStyle={{
                        width: 28,
                        height: 28,
                    }}
                    containerStyle={{
                        width: 50,
                        height: 50,
                        alignItems: "center",
                        justifyContent: "center",
                        borderWidth: 1,
                        borderColor: COLORS.primaryDarker,
                        borderRadius: 25,
                        backgroundColor: COLORS.primaryLighter,
                    }}
                    onPress={openLangModal}
                    icon={language === "es" ? icons.es : icons.us}
                />
            </View>

            <View style={{ overflow: "hidden" }}>
                <Image
                    source={images.onBoardBackground}
                    style={{
                        width: "100%",
                        height: "100%",
                        resizeMode: "cover",
                        position: "absolute",
                        top: 0,
                        left: 0,
                    }}
                />
                {/* Curve - calculate center point of curve so it works on all screens */}
                <Svg
                    style={{
                        position: "absolute",
                        //top: 200
                        top: SIZES.homeCurve,
                    }}
                    width={SIZES.width}
                    height={100}
                >
                    <Path
                        d={`M 0 20 Q ${controllX} 130 ${SIZES.width} 20 L ${SIZES.width} 100 L 0 100 Z`}
                        fill={COLORS.primaryLighter}
                    />
                </Svg>
                {/* Animation */}
                <View
                    style={{
                        top: SIZES.height * 0.05,
                        paddingVertical: SIZES.height * 0.08,
                    }}
                >
                    <Lottie
                        source={require("@/src/assets/animations/hello.json")}
                        autoPlay
                        loop
                        style={{
                            width: SIZES.width * 0.35,
                            height: SIZES.width * 0.35,
                            alignSelf: "center",
                        }}
                    />
                    {/* <Skottie
                        source={require("@/src/assets/animations/hello.json")}
                        autoPlay
                        loop
                        style={{
                            width: SIZES.width * 0.35,
                            height: SIZES.width * 0.35,
                            alignSelf: "center",
                        }}
                    /> */}
                </View>
            </View>
            <Toast />

            <KeyboardAwareScrollView
                style={{ width: "100%" }}
                extraHeight={80}
                showsVerticalScrollIndicator={false}
            >
                <ScrollView
                    style={{
                        flex: 1,
                        paddingHorizontal: SIZES.padding,
                    }}
                >
                    {/* Text */}
                    <View
                        style={{
                            marginTop: SIZES.marginResponsive,
                        }}
                    >
                        <Text
                            style={{
                                ...FONTS.largeTitle,
                                color: COLORS.secondaryDarker,
                                marginBottom: SIZES.margin,
                            }}
                        >
                            {t("onboarding.usernameTitle")}
                        </Text>

                        <Text style={{ ...FONTS.body2, color: COLORS.secondaryDarker }}>
                            {t("onboarding.usernameSubtitle")}
                        </Text>
                    </View>

                    {/* Input Username */}
                    <View style={{ paddingVertical: SIZES.padding + 10 }}>
                        <Controller
                            control={control}
                            render={({ field }) => {
                                const { onBlur, onChange, value } = field;
                                return (
                                    <TextInput
                                        style={
                                            errors.username
                                                ? {
                                                    ...styles.input,
                                                    borderColor: COLORS.wrongInputColor,
                                                }
                                                : styles.input
                                        }
                                        onBlur={onBlur}
                                        onChangeText={(value) => onChange(value.trim())}
                                        value={value}
                                        placeholder={t("onboarding.usernamePlaceholder")}
                                        autoCapitalize="none"
                                        autoCorrect={false}
                                    />
                                );
                            }}
                            name="username"
                            rules={{ required: true, pattern: /^[a-zA-Z]{3,10}$/ }}
                            defaultValue=""
                        />

                        {errors.username?.type === "required" && (
                            <Text style={styles.textError}>
                                {t("onboarding.usernameErrorEmpty")}
                            </Text>
                        )}
                        {errors.username?.type === "pattern" && (
                            <Text style={styles.textError}>
                                {t("onboarding.usernameErrorLength")}
                            </Text>
                        )}
                    </View>
                    {/* Button */}
                    {/*  <View
                        style={{
                            flexDirection: "row",
                            height: SIZES.buttonContainerHeight,
                        }}
                    >
                        <TextButton
                            label={t("onboarding.usernameButton")}
                            contentContainerStyle={{
                                flex: 1,
                                borderRadius: SIZES.radius,
                                backgroundColor: loading
                                    ? COLORS.secondaryLighter
                                    : COLORS.secondaryDarker,
                            }}
                            labelStyle={{
                                ...FONTS.h3,
                                color: COLORS.primaryLighter,
                            }}
                            onPress={handleSubmit(onSubmit)}
                            disabled={loading}
                        />
                    </View>
                    <View style={{ marginTop: SIZES.padding }} /> */}
                </ScrollView>
            </KeyboardAwareScrollView>
            <View
                style={{
                    marginTop: SIZES.margin,
                    height: SIZES.height * 0.14,
                    backgroundColor: COLORS.primaryLighter,
                    alignItems: "center",
                    paddingHorizontal: SIZES.padding,

                }}
            >
                <View
                    style={{
                        flexDirection: "row",
                        height: SIZES.buttonContainerHeight,
                    }}
                >
                    <TextButton
                        label={t("onboarding.usernameButton")}
                        contentContainerStyle={{
                            flex: 1,
                            borderRadius: SIZES.radius,
                            backgroundColor: loading
                                ? COLORS.secondaryLighter
                                : COLORS.secondaryDarker,
                        }}
                        labelStyle={{
                            ...FONTS.h3,
                            color: COLORS.primaryLighter,
                        }}
                        onPress={handleSubmit(onSubmit)}
                        disabled={loading}
                    />
                </View>
            </View>
            {/* Bottom Sheet Lang */}
            <SelectLangModal ref={selectLangModalRef} />
        </View>
    );
};

const styles = StyleSheet.create({
    input: {
        width: "100%",
        backgroundColor: "white",
        borderColor: COLORS.secondary,
        color: COLORS.secondaryDarker,
        borderWidth: 3,
        borderRadius: 10,
        height: 60,
        fontSize: SIZES.textInput,
        paddingHorizontal: SIZES.padding / 2,
    },
    textError: {
        fontWeight: "bold",
        fontSize: SIZES.body3,
        color: COLORS.wrongInputColor,
    },
});

export default Username;
