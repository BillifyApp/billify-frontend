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
  h3: {
    fontSize: 17,
  },
  container: {
    //flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  input: {
    width: "80%",
    borderRadius: 25,
    padding: 10,
    paddingLeft: 20,
    margin: 5,
    backgroundColor: "#E0E0E0",
  },
  image: {
    //flex: 1,
    width: "100%",
    height: "100%",
  },
  button: {
    backgroundColor: "#E9E9E9",
    padding: 15,
    borderRadius: 25,
    alignItems: "center",
    margin: 5,
  },
  buttonText: {
    color: "#000",
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
