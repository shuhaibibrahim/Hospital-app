import React from "react";
import { StyleSheet, View, Image } from "react-native";
import {
  Avatar,
  Title,
  Caption,
  Paragraph,
  Drawer,
  Text,
  TouchableRipple,
  Switch,
} from "react-native-paper";
import { DrawerContentScrollView, DrawerItem } from "@react-navigation/drawer";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

export default function Menu(props) {
  return (
    <View style={{ flex: 1 }}>
      <DrawerContentScrollView {...props}>
        <View style={styles.drawerContent}>
          <View style={styles.userInfoSection}>
            <View style={{ flexDirection: "row", marginTop: 15 }}>
              <Avatar.Image source={require("")} size={50} />

              <View style={{ marginLeft: 15, flexDirection: "column" }}>
                <Title style={styles.title}>Username</Title>
                <Caption style={styles.title}>email</Caption>
                <DrawerItem style={{ marginLeft: 15, flexDirection: "column" }}
                  icon={({ color, size }) => (
                    <Icon name="edit-outline" color={color} size={size} />
                  )}
                  label="Edit"
                  onPress={() => {}}
                />
              </View>
            </View>
          </View>
          <Drawer.Section style={styles.drawerSection}>
            <DrawerItem
              icon={({ color, size }) => (
                <Icon name="home-outline" color={color} size={size} />
              )}
              label="Home"
              onPress={() => {}}
            />
            <DrawerItem
              icon={({ color, size }) => (
                <Icon name="prescription-outline" color={color} size={size} />
              )}
              label="Prescription"
              onPress={() => {
                props.navigation.navigate("PatHome");
              }}
            />
            <DrawerItem
              icon={({ color, size }) => (
                <Icon name="message-outline" color={color} size={size} />
              )}
              label="Docquora"
              onPress={() => {}}
            />
            <DrawerItem
              icon={({ color, size }) => (
                <Icon name="about-outline" color={color} size={size} />
              )}
              label="About Us"
              onPress={() => {}}
            />
            <DrawerItem
              icon={({ color, size }) => (
                <Icon name="contact-outline" color={color} size={size} />
              )}
              label="Contact Us"
              onPress={() => {}}
            />
          </Drawer.Section>
        </View>
      </DrawerContentScrollView>
      <Drawer.Section style={styles.bottomDrawerSection}>
        <DrawerItem
          icon={({ color, size }) => (
            <Icon name="exit-to-app" color={color} size={size} />
          )}
          label="Sign Out"
          onPress={() => {}}
        />
      </Drawer.Section>
    </View>
  );
}

const styles = StyleSheet.create({
  drawerContent: {
    flex: 1,
  },
  userInfoSection: {
    paddingLeft: 20,
    backgroundColor: colour.PRI_COL,
  },
  title: {
    fontSize: 16,
    marginTop: 3,
    fontWeight: "bold",
  },
  caption: {
    fontSize: 14,
    lineHeight: 14,
  },
  row: {
    marginTop: 20,
    flexDirection: "row",
    alignItems: "center",
  },
  section: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 15,
  },
  paragraph: {
    fontWeight: "bold",
    marginRight: 3,
  },
  drawerSection: {
    marginTop: 15,
  },
  bottonDrawerSection: {
    marginBottom: 15,
    borderTopColor: "#f4f4f4",
    borderTopWidth: 1,
  },
  preference: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
});
