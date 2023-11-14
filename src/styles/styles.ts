import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  h1: {
    fontSize: 25,
    fontWeight: "bold",
  },
  h2: {
    fontSize: 20,
    fontWeight: "bold",
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
  button: {
    backgroundColor: "#3498db",
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
    margin: 5,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
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
    backgroundColor: '#eee',
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
    backgroundColor: '#eee',
    width: "100%",
    height: 60,
    borderRadius: 15,
    marginVertical: 5,
    paddingHorizontal: 15,
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
});
