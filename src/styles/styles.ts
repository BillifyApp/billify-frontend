import { StyleSheet } from "react-native";
import { COLORS } from "./colors";
export const styles = StyleSheet.create({
  h1: {
    fontSize: 25,
    fontWeight: "bold",
    color: COLORS.black
  },
  h2: {
    fontSize: 20,
    fontWeight: "bold",
    color: COLORS.black,
  },
  h3: {
    fontSize: 17,
    color: COLORS.black,
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
    marginLeft: 15,
    marginTop: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "baseline",
  },
  categoryItem:{
    backgroundColor: '#F6F6F6',
    paddingHorizontal: 25,
    height: 50,
    borderRadius: 30,
    marginHorizontal: 10,
    alignItems: 'center',
    justifyContent: 'center',
    
  },
  groupOverview:{
    width: "93%",
    alignSelf: 'center',
  },
  groupOverviewItem:{
    backgroundColor: '#F6F6F6',
    width: "100%",
    height: 60,
    borderRadius: 50,
    marginVertical: 5,
    paddingHorizontal: 15,
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  horizontalDivider:{
    width: "100%",
    height: 1,
    backgroundColor: '#ddd',
    marginVertical: 5,
  }
});