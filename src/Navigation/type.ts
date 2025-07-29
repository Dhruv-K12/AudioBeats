import { NativeStackNavigationProp } from "@react-navigation/native-stack";

export type routeAuthStackParamList = {
  Intro: undefined;
  Login: undefined;
  SignUp: undefined;
};
export type navigationType =
  NativeStackNavigationProp<routeAuthStackParamList>;
