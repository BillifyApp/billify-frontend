import React from "react";
import {
    TouchableOpacity,
    View,
    Image,
    ImageSourcePropType,
} from "react-native";
import { styles } from "../../styles/styles";
import CustomText from "../atom/CustomText";
import { Icon } from "../../styles/fonts";
import { GroupIcons } from "../../utils/groupIcons";

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
    const [groupIcon, setGroupIcon] =
        React.useState<ImageSourcePropType | null>(null);
    function getGroupIcon() {
        GroupIcons.forEach((icon) => {
            if (icon.name === image) {
                setGroupIcon(icon.source);
            }
        });
    }
    React.useEffect(() => {
        getGroupIcon();
    }, []);
    return (
        <TouchableOpacity
            key={index}
            onPress={() => {
                onPress();
            }}
        >
            <View style={styles.groupOverviewItem}>
                <Image
                    source={groupIcon ? groupIcon : GroupIcons[0].source}
                    style={{ width: 50, height: 50, borderRadius: 25 }}
                />
                <CustomText style={{ flex: 2, marginLeft: 20 }}>
                    {group_name}
                </CustomText>
                <Icon
                    name="pfeil_r"
                    size={20}
                    style={{ marginRight: 5 }}
                    color="#25282B"
                />
            </View>
        </TouchableOpacity>
    );
}

export default GroupOverviewComponent;
