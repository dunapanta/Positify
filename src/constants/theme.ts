import { Dimensions } from "react-native";
const { width, height } = Dimensions.get("window");

export const COLORS = {
    primary: "#f8d4aa",
    primaryLight: "#fadfc0",
    primaryLighter: "#faedde",
    primaryDark: "#fcc17c",
    primaryDarker: "#ffb866",
    secondary: "#424848",
    secondaryLight: "#4b5353",
    secondaryLighter: "#586261",
    secondaryDark: "#363a3a",
    secondaryDarker: "#242828",
    successAnswer: '#D9FFC8',
    successAnswerDark: '#008a0a',
    white: "#FFFFFF",
    black: "#000000",
    darkBackground: "#000000",
    wrongInputColor: "#8a2d06",
    wrongInputColorLight: "#914d30",

};

export const SIZES = {
    // global sizes
    base: 10,
    font: 14,
    radius: 12,
    padding: 24,
    margin: 20,

    // font sizes
    largeTitle: 40,
    h1: 30,
    h2: 22,
    h3: 17,
    h4: 14,
    h5: 12,
    body1: 30,
    body2: 22,
    body3: 16,
    body4: 14,
    body5: 12,
    stats: 26,
    bookTitle: 20,

    textInput: 17,
    textCoin: 17,
    welcomeUser: 28,
    subheader1: 17,
    subheader2: 14,
    // app dimensions
    width,
    height,
    buttonContainerHeight: height > 750 ? height * 0.073 : height * 0.083,
    marginResponsive:
        height > 1100
            ? height * 0.08
            : height > 900
                ? height * 0.05
                : height > 850
                    ? height * 0.053
                    : height > 740
                        ? height * 0.04
                        : height * 0.03,
    homeCurve:
        height > 1300
            ? height * 0.35
            : height > 1100
                ? height * 0.32
                : height > 900
                    ? height * 0.242
                    : height > 850
                        ? height * 0.235
                        : height > 740
                            ? height * 0.228
                            : height * 0.247,
};

export const FONTS = {
    largeTitle: {
        fontFamily: "Lato-Black",
        fontSize: SIZES.largeTitle,
    },
    h1: { fontFamily: "Lato-Black", fontSize: SIZES.h1, lineHeight: 36 },
    h2: { fontFamily: "Lato-Bold", fontSize: SIZES.h2, lineHeight: 30 },
    h3: { fontFamily: "Lato-Bold", fontSize: SIZES.h3, lineHeight: 22 },
    h4: { fontFamily: "Lato-Bold", fontSize: SIZES.h4, lineHeight: 22 },
    h5: { fontFamily: "Lato-Bold", fontSize: SIZES.h5, lineHeight: 22 },
    body1: { fontFamily: "Lato-Regular", fontSize: SIZES.body1, lineHeight: 36 },
    body2: { fontFamily: "Lato-Regular", fontSize: SIZES.body2, lineHeight: 30 },
    body3: { fontFamily: "Lato-Regular", fontSize: SIZES.body3, lineHeight: 22 },
    body4: { fontFamily: "Lato-Regular", fontSize: SIZES.body4, lineHeight: 22 },
    body5: { fontFamily: "Lato-Regular", fontSize: SIZES.body5, lineHeight: 22 },
    stats: { fontFamily: "Lato-Regular", fontSize: SIZES.stats, lineHeight: 28 },
    textInput: {
        fontFamily: "Lato-Regular",
        fontSize: SIZES.textInput,
        lineHeight: 22,
    },
    usernameText: { fontFamily: "Lato-Black", fontSize: SIZES.h2, lineHeight: 30 },
    subheader1: {
        fontFamily: "Lato-Black",
        fontSize: SIZES.subheader1,
        lineHeight: 18,
    },
    subheader2: {
        fontFamily: "Lato-Black",
        fontSize: SIZES.subheader2,
        lineHeight: 18,
    },

};

export const darkTheme = {
    backgroundColor: COLORS.darkBackground,
};

export const lightTheme = {
    backgroundColor: COLORS.white,
};

const appTheme = { COLORS, SIZES, FONTS };

export default appTheme;