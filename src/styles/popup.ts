import { StyleSheet } from "react-native";
import { COLORS } from "./colors";
export const popup = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 25,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  bottomView:{
    width: '100%',
    height: 150,
    justifyContent: 'center',
    alignItems: "flex-end",
    position: 'absolute',
    bottom: 75,
    right: 20,
  
  }
});
