import { ETextWeight } from "@/types/TextType";

import { StyleSheet, View } from "react-native";
import { ActionButton } from "./ActionButton";
import { ETextType } from "@/types/TextType";
import { Text } from "@/components/Text";
import { w } from "@/utils/Dimensions";
import { h } from "@/utils/Dimensions";
import { backgroundLight } from "@/constants/Colors";

interface HomeHeaderProps {
    onProfilePress: () => void;
    onFilterPress: () => void;
    onNotificationPress: () => void;
}

const HomeHeader = ({ onProfilePress, onFilterPress, onNotificationPress }: HomeHeaderProps) => {
    return (
        <View style={styles.header}>
            <View style={styles.headerTop}>
                <ActionButton
                    icon="person-circle-outline"
                    onPress={onProfilePress}
                    style={styles.profileButton}
                />
                <Text variant={ETextType.H2} weight={ETextWeight.Bold}>
                    Discover
                </Text>
                <View style={styles.headerActions}>
                    <ActionButton
                        icon="filter"
                        onPress={onFilterPress}
                        style={styles.filterButton}
                    />
                    <ActionButton
                        icon="notifications-outline"
                        badge={3}
                        onPress={onNotificationPress}
                    />
                </View>
            </View>


        </View>
    );
};

export default HomeHeader;

const styles = StyleSheet.create({
    header: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        paddingTop: h(60),
        paddingHorizontal: w(24),
        zIndex: 2,
        backgroundColor: backgroundLight,
    },
    headerTop: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: h(24),
    },
    headerActions: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: w(12),
    },
    profileButton: {
        backgroundColor: 'rgba(0, 0, 0, 0.05)',
    },
    filterButton: {
        marginRight: w(8),
    },
    storiesContainer: {
        flexDirection: 'row',
        marginBottom: h(24),
    },

});