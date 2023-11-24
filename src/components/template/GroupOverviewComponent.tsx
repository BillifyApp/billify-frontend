import React from "react";
import { Text, TouchableOpacity, View, Image } from "react-native";
import FlexImage from "../atom/FlexImage";
import { styles } from "../../styles/styles";
import UserIconImage from "../atom/UserIconImage";

interface GroupOverviewComponentProps {
  group_name: string;
  images: string[];
}

function GroupOverviewComponent({
  group_name,
  images,
}: GroupOverviewComponentProps) {
  return (
    <TouchableOpacity>
      <View style={styles.groupOverviewItem}>
        <View style={{flexDirection: "row"}}>
          {images.map((path, key) => (
            <UserIconImage
              key={key}
              path={path}
              width={30}
              height={30}
              offset={key * 10}
            ></UserIconImage>
          ))}
        </View>
        <Text style={{flex: 2}}>{group_name}</Text>
        <Image source={require("../../assets/arrow-forward.png")}/>
      </View>
    </TouchableOpacity>
  );
}

export default GroupOverviewComponent;
