import React from "react";
import { View } from "react-native";
import { useTranslation } from "react-i18next";
import GroupOverviewComponent from "./GroupOverviewComponent";
import ShowAllAtom from "../atom/ShowAllAtom";
import { groupName } from "../../stores/route_names";
import { styles } from "../../styles/styles";
import CustomText from "../atom/CustomText";
import { Group } from "../../stores/types";
import GroupOverviewComponentPlaceholder from "../placeholder/GroupOverviewComponentPlaceholder";

interface GroupOverviewProps {
  groups: Group[] | any;
  isLoading: boolean;
}

function GroupOverview({ groups, isLoading }: GroupOverviewProps) {
  const { t } = useTranslation();

  return (
    <View>
      <View style={styles.subHeadingMargin}>
        <CustomText style={styles.h2}>{t("common.groups.many")}</CustomText>
        <ShowAllAtom routeName={groupName}></ShowAllAtom>
      </View>
      <View style={styles.groupOverview}>
        {isLoading || !groups
          ? [1, 2, 3, 4, 5].map((key: number) => {
              return <GroupOverviewComponentPlaceholder index={key} />;
            })
          : groups.map((g: Group, key: number) => {
              {
                return(
                <GroupOverviewComponent
                index={key}
                  group_name={g.name}
                  image={g.icon}
                />);
              }
            })}
      </View>
    </View>
  );
}

export default GroupOverview;
