import React from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableWithoutFeedback,
  Keyboard,
  Image,
  Platform,
  StatusBar,
  TextInput,
  Button,
  TouchableNativeFeedback,

} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import {
  FlatList,
  ScrollView,
  TouchableHighlight,
} from "react-native-gesture-handler";
import { color } from "react-native-reanimated";
import { KeyboardAvoidingView } from "react-native";
import colour from "../colors";


const DismissKeyboard = ({ children }) => (
  <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
    {children}
  </TouchableWithoutFeedback>
);

export default function App() {
  return (
    <ScrollView style={styles.scrollView}>
        <KeyboardAvoidingView >
        <DismissKeyboard>
      <View style={styles.container}>
        <View style={styles.topbar}>
          <View style={styles.logo}>
            <Image
              style={{ width: 30, height: 30 }}
              source={require("../../images/logo.png")}
            />
          </View>
          <View style={styles.box}>
            <Text
              style={{
                alignSelf: "center",
                fontWeight: "bold",
                paddingTop: 10,
              }}
            >
              Set An Appointment
            </Text>

            <TextInput
              style={{
                height: 40,
                top: 30,
                paddingLeft: 30,
                paddingRight: 30,
                borderColor: "gray",
                borderWidth: 1,
                borderRadius: 30,
                width: 300,
                alignSelf: "center",
              }}
              placeholder="First Name"
            />
            <TextInput
              style={{
                height: 40,
                top: 50,
                paddingLeft: 30,
                paddingRight: 30,
                borderColor: "gray",
                borderWidth: 1,
                borderRadius: 30,
                width: 300,
                alignSelf: "center",
              }}
              placeholder="Last Name"
            />

            <TextInput
              style={{
                height: 40,
                top: 70,
                paddingLeft: 30,
                paddingRight: 30,
                borderColor: "gray",
                borderWidth: 1,
                borderRadius: 30,
                width: 300,
                alignSelf: "center",
              }}
              placeholder="Email"
            />
            <TextInput
              style={{
                height: 40,
                top: 90,
                paddingLeft: 30,
                paddingRight: 30,
                borderColor: "gray",
                borderWidth: 1,
                borderRadius: 30,
                width: 300,
                alignSelf: "center",
              }}
              placeholder="Phone Number"
            />

            <TextInput
              style={{
                height: 90,
                top: 180,
                paddingLeft: 30,
                paddingRight: 30,
                borderColor: "gray",
                borderWidth: 1,
                borderRadius: 20,
                width: 300,
                alignSelf: "center",
              }}
              placeholder="Problem(opitional)"
            />
            <View style={{ paddingTop: 15, paddingLeft: 15 }}>
              <TouchableHighlight>
                <Text>Available Date</Text>
              </TouchableHighlight>
              <TouchableHighlight>
                <Text>Avaliable Time</Text>
              </TouchableHighlight>
              <TouchableHighlight>
                <Text>Token Number</Text>
              </TouchableHighlight>
            </View>

            <View style={styles.button}>
              <TouchableHighlight>
                <Text style={{ alignSelf: "center", color: colour.GREEN_COL }}>
                  Set An Appointment
                </Text>
              </TouchableHighlight>
            </View>
          </View>
        </View>
      </View>
    </DismissKeyboard>
    </KeyboardAvoidingView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    height: "100%",
    backgroundColor: colour.BACKGROUND_COL,
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight + 5 : 0,
    //    alignItems: 'center',
    //    justifyContent: 'center',
  },
  logo: {
    alignItems: "center",
    justifyContent: "center",
  },
  box: {
    backgroundColor: colour.BOX_COL,
    borderRadius: 10,
    width: 320,
    height: 580,
    position: "relative",
    top: 20,
    alignSelf: "center",
  },
  button: {
    justifyContent: "center",
    borderRadius: 20,
    top: 140,
    alignSelf: "center",
    backgroundColor: colour.BACKGROUND_COL,
    height: 35,
    width: 280,
  },
  scrollView: {
      backgroundColor: '#ECF0F3',
      marginBottom: 0
  }
});
