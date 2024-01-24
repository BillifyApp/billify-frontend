import { StyleSheet } from "react-native";
import { COLORS } from "./colors";
import { rh, rw } from "../utils/responsiveDimenstions";

export const styles = StyleSheet.create({
  h1: {
    fontSize: 25,
    color: COLORS.black,
    fontFamily: "Poppins-SemiBold",
  },
  h2: {
    fontSize: 22,
    color: COLORS.black,
    fontFamily: "Poppins-Medium",
  },
  h3: {
    fontSize: 17,
    color: COLORS.black,
    fontFamily: "Poppins-Regular",
  },
  p: {
    fontSize: 15,
    color: COLORS.black,
    fontFamily: "Poppins-Regular",
  },
  pMedium: {
    fontSize: 15,
    color: COLORS.black,
    fontFamily: "Poppins-Medium",
  },
  container: {
    //flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  image: {
    //flex: 1,
    width: "100%",
    height: "100%",
  },
  headingMargin: {
    width: "90%",
    marginLeft: 20,
    marginTop: 40,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "baseline",
  },
  subHeadingMargin: {
    width: "90%",
    marginLeft: 20,
    marginTop: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "baseline",
  },
  categoryItem: {
    backgroundColor: "#F6F6F6",
    paddingHorizontal: 25,
    height: 50,
    borderRadius: 30,
    marginHorizontal: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  groupOverview: {
    width: "93%",
    alignSelf: "center",
  },
  groupOverviewItem: {
    backgroundColor: "#F6F6F6",
    width: "100%",
    height: 60,
    borderRadius: 50,
    marginVertical: 5,
    paddingHorizontal: 15,
    alignItems: "center",
    justifyContent: "space-between",
    flexDirection: "row",
  },
  horizontalDivider: {
    width: rw(90),
    height: rh(0.2),
    backgroundColor: COLORS.gray_light,
    marginVertical: 5,
  },
});
