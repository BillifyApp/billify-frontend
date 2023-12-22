import React from "react";
import { Text, TouchableOpacity, View, Image } from "react-native";
import FlexImage from "../atom/FlexImage";
import { styles } from "../../styles/styles";
import UserIconImage from "../atom/UserIconImage";
import CustomText from "../atom/CustomText";

interface GroupOverviewComponentProps {
  group_name: string;
  image: string;
  index: number;
}

function GroupOverviewComponent({
  group_name,
  image,
  index,
}: GroupOverviewComponentProps) {
  return (
    <TouchableOpacity key={index} onPress={()=>{
      console.log("todo redirect to group details")
    }}>
      <View style={styles.groupOverviewItem}>
          <Image source={{uri: image}} style={{width:50, height:50, borderRadius: 25}}/>
        <CustomText style={{flex: 2, marginLeft: 20}}>{group_name}</CustomText>
        <Image source={require("../../assets/arrow-forward.png")}/>
      </View>
    </TouchableOpacity>
  );
}

export default GroupOverviewComponent;
