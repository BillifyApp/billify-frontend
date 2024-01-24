import { useTranslation } from "react-i18next";
import {
    GestureResponderEvent,
    Image,
    ImageSourcePropType,
    TouchableOpacity,
    View,
} from "react-native";
import { COLORS } from "../../../styles/colors";
import { styles } from "../../../styles/styles";
import CustomText from "../../atom/CustomText";
import { Group } from "../../../stores/types";
import { Icon } from "../../../styles/fonts";
import { GroupIcons } from "../../../utils/groupIcons";
import { useCallback, useState } from "react";
import { useFocusEffect } from "@react-navigation/native";

type Props = {
    group: Group;
    onPress: (event: GestureResponderEvent) => void;
};

export default function GroupScreenItem({ group, onPress }: Props) {
    const { t } = useTranslation();
    const [groupIcon, setGroupIcon] = useState<ImageSourcePropType | null>(
        null
    );
    function getGroupIcon() {
        GroupIcons.forEach((icon) => {
            if (icon.name === group.icon) {
                setGroupIcon(icon.source);
            }
        });
    }
    useFocusEffect(
        useCallback(() => {
            getGroupIcon();
        }, [])
    );
    return (
        <TouchableOpacity
            style={{
                alignItems: "center",
                justifyContent: "center",
                width: "100%",
            }}
            onPress={onPress}
        >
            <View
                style={{
                    flexDirection: "row",
                    width: "90%",
                    alignItems: "center",
                    justifyContent: "space-between",
                    borderBottomWidth: 1,
                    borderColor: COLORS.gray_dark,
                    padding: 15,
                }}
            >
                <View
                    style={{
                        flexDirection: "row",
                        alignItems: "center",
                        justifyContent: "center",
                    }}
                >
                    <Image
                        source={groupIcon ? groupIcon : GroupIcons[0].source}
                        style={{
                            width: 50,
                            height: 50,
                            borderRadius: 50,
                        }}
                    />
                    <View style={{ paddingLeft: 10 }}>
                        <CustomText style={styles.pMedium}>
                            {group.name}
                        </CustomText>
                        <View style={{ flexDirection: "row" }}>
                            <CustomText style={{ color: COLORS.gray_dark }}>
                                {t("common.groups.one") + " ·"}
                            </CustomText>
                            <CustomText
                                style={{
                                    paddingLeft: 5,
                                    color: COLORS.gray_dark,
                                }}
                            >
                                {group.users.length +
                                    1 +
                                    " " +
                                    t("groups.members")}
                            </CustomText>
                        </View>
                    </View>
                </View>
                <Icon name="pfeil_r" size={20} />
            </View>
        </TouchableOpacity>
    );
}
