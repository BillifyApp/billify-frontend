import React from "react";
import { Text, TouchableOpacity, View, Image } from "react-native";
import FlexImage from "../atom/FlexImage";
import { styles } from "../../styles/styles";
import UserIconImage from "../atom/UserIconImage";
import CustomText from "../atom/CustomText";
import { Icon } from "../../styles/fonts";

interface GroupOverviewComponentProps {
  group_name: string;
  image: string;
  index: number;
  onPress: Function;
}

function GroupOverviewComponent({
  group_name,
  image,
  index,
  onPress,
}: GroupOverviewComponentProps) {
  return (
    <TouchableOpacity key={index} onPress={()=>{
      onPress();
    }}>
      <View style={styles.groupOverviewItem}>
          <Image source={{uri: image}} style={{width:50, height:50, borderRadius: 25}}/>
        <CustomText style={{flex: 2, marginLeft: 20}}>{group_name}</CustomText>
        <Icon name="pfeil_r" size={20} style={{marginRight: 5}}/>
      </View>
    </TouchableOpacity>
  );
}

export default GroupOverviewComponent;
