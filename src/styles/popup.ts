import { StyleSheet } from "react-native";
import { COLORS } from "./colors";
import { rh } from "../utils/responsiveDimenstions";
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
    height: rh(100),
    paddingBottom: 50,
    justifyContent: 'flex-end',
    alignItems: "flex-end",
    position: 'absolute',
  }
});
