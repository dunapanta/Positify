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
    rateBookBackground: "#D9FFC8",
    downloadIcon: "#008fd1",
    downloadBackground: "#91d9fa",
    rateBookIcon: "#008a0a",
    reportBookBackground: "#fcedc5",
    reportBookIcon: "#d4ab3b",
    deleteBookBackground: "#fccfc5",
    deleteBookIcon: "#ff6347",
    white: "#FFFFFF",
    darkBackground: "#000000",
    activeTab: "#d67200",
    wrongInputColor: "#8a2d06",

    //genres colors
    dramaLight: "#F1DEDE",
    dramaDark: "#a89b9b",
    fantasyLight: "#81d4fa",
    fantasyDark: "#5a94af",
    comedyLight: "#ffe082",
    comedyDark: "#b29c5b",
    adventureLight: "#a5d6a7",
    adventureDark: "#739574",
    fictionLight: "#90caf9",
    fictionDark: "#5d99c6",
    romanceLight: "#f48fb1",
    romanceDark: "#aa647b",
    mysteryLight: "#ffab91",
    mysteryDark: "#b27765",
    horrorLight: "#bdbdbd",
    horrorDark: "#7a7a7a",
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
    bookCardTitle: 15,
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
    onBoardUsernameCurve:
        height > 1300
            ? height * 0.45
            : height > 1100
                ? height * 0.4
                : height > 900
                    ? height * 0.34
                    : height > 850
                        ? height * 0.261
                        : height > 740
                            ? height * 0.275
                            : height * 0.31,
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
};

export const darkTheme = {
    backgroundColor: COLORS.darkBackground,
};

export const lightTheme = {
    backgroundColor: COLORS.white,
};

const appTheme = { COLORS, SIZES, FONTS };

export default appTheme;