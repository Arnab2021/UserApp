/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {Component} from 'react';
import {
  Text,
  View,
  Dimensions,
  Image,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
//navigation
import {
  NavigationContainer,
  getFocusedRouteNameFromRoute,
} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {
  createDrawerNavigator,
  DrawerContentScrollView,
} from '@react-navigation/drawer';

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {ifIphoneX, getBottomSpace} from 'react-native-iphone-x-helper';

import { getData } from './src/Services/LocalStorage';

//Screens
import {
  SignInScreen,
  ForgotPasswordScreen,
  RegistrationScreen,
  FoodScreen,
  OrderDetailScreen,
  ProfileScreen,
  PaymentsScreen,
  ViewOrdersScreen,
  ChatScreen,
  RateScreen,
  DishDescriptionScreen,
  AddCartScreen,
  PlaceOrderScreen,
  SearchScreen,
  MessagesScreen,
  ReviewAndRateList,
} from './src/screens';
//assets
import colors from './src/assets/Colors';
import Helper from './src/Services/Helper';
import SplashScreen from './src/components/SplasScreen';
import DrawerContent from './src/components/DrawerContent';
import messaging, { firebase } from '@react-native-firebase/messaging';
import { navigationRef } from './src/Services/CustomNavigation';

const {width, height} = Dimensions.get('window');

const SignInStack = createStackNavigator();
function SignInStackScreen() {
  return (
    <SignInStack.Navigator headerMode="none">
      <SignInStack.Screen name="SignIn" component={SignInScreen} />
      <SignInStack.Screen
        name="ForgotPassword"
        component={ForgotPasswordScreen}
      />
      <SignInStack.Screen name="Registration" component={RegistrationScreen} />
    </SignInStack.Navigator>
  );
}

const HomeStack = createStackNavigator();

function HomeStackScreen() {
  return (
    <HomeStack.Navigator>
      <HomeStack.Screen name="FoodScreen" component={FoodScreen} />
      <HomeStack.Screen
        name="DishDescription"
        component={DishDescriptionScreen}
      />
    </HomeStack.Navigator>
  );
}

const MyCartStack = createStackNavigator();

function MyCartStackScreen() {
  return (
    <MyCartStack.Navigator>
      <MyCartStack.Screen name="AddCart" component={AddCartScreen} />
      <MyCartStack.Screen name="PlaceOrder" component={PlaceOrderScreen} />
      <MyCartStack.Screen name="Payment" component={PaymentsScreen} />
    </MyCartStack.Navigator>
  );
}

const OrdersStack = createStackNavigator();

function OrdersStackScreen() {
  return (
    <OrdersStack.Navigator>
      <OrdersStack.Screen name="ViewOrders" component={ViewOrdersScreen} />
      <OrdersStack.Screen name="OrderDetail" component={OrderDetailScreen} />
      <OrdersStack.Screen name="Chat" component={ChatScreen} />
      <OrdersStack.Screen name="Rate" component={RateScreen} />
      <OrdersStack.Screen name="Message" component={MessagesScreen} />
      <OrdersStack.Screen name="ReviewRateList" component={ReviewAndRateList} />
    </OrdersStack.Navigator>
  );
}

const SearchStack = createStackNavigator();

function SearchStackScreen() {
  return (
    <SearchStack.Navigator screenOptions={{}} tabBarOptions={{tabBarHideOnKeyboard: true}}>
      <SearchStack.Screen name="Search" component={SearchScreen} options={{headerShown: false}} />
      <SearchStack.Screen
        name="DishDescription"
        component={DishDescriptionScreen}
      />
    </SearchStack.Navigator>
  );
}

const ProfileStack = createStackNavigator();

function ProfileStackScreen() {
  return (
    <ProfileStack.Navigator headerMode="none">
      <ProfileStack.Screen name="Profile" component={ProfileScreen} />
    </ProfileStack.Navigator>
  );
}

const Tab = createBottomTabNavigator();

const Root = () => {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={({route}) => ({
        tabBarIcon: ({focused, color, size}) => {
          if (focused) {
            return (
              <View
                style={{
                  flex: 1,
                  alignSelf: 'stretch',
                  justifyContent: 'center',
                  alignItems: 'center',
                  backgroundColor: colors.black,
                }}>
                <Image
                  source={Helper.setTabBarSource(route.name)}
                  style={{height: wp('8%'), width: wp('8%')}}
                  resizeMode="contain"
                />
                <Text
                  style={{
                    color: colors.white,
                    fontFamily: 'futurastd-medium',
                    fontSize: width / 35,
                    marginTop: 3,
                  }}>
                  {Helper.setTabBarName(route.name)}
                </Text>
              </View>
            );
          }
          return (
            <View
              style={{
                flex: 1,
                alignSelf: 'stretch',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Image
                source={Helper.setTabBarSource(route.name)}
                style={{height: wp('8%'), width: wp('8%')}}
                resizeMode="contain"
              />
              <Text
                style={{
                  color: colors.white,
                  fontFamily: 'futurastd-medium',
                  fontSize: width / 35,
                  marginTop: 3,
                }}>
                {Helper.setTabBarName(route.name)}
              </Text>
            </View>
          );
        },
      })}
      tabBarOptions={{
        showIcon: true,
        showLabel: false,
        style: {
          backgroundColor: colors.green,
          ...ifIphoneX(
            {
              height: hp('9%') + getBottomSpace(),
            },
            {
              height: hp('9%'),
            },
          ),
        },
        tabStyle: {},
        keyboardHidesTabBar: true
      }}>
      <Tab.Screen name="Home" component={HomeStackScreen} />
      <Tab.Screen
        name="My Orders"
        component={OrdersStackScreen}
       /*options={({route}) => ({
          tabBarVisible:
            getFocusedRouteNameFromRoute(route) === 'Chat' ? false : true,
        })}*/
      />
      <Tab.Screen name="My Cart" component={MyCartStackScreen} />
      <Tab.Screen name="Search" component={SearchStackScreen} />
      <Tab.Screen name="Profile" component={ProfileStackScreen} />
    </Tab.Navigator>
  );
};

function CustomDrawerContent(props) {
  return <DrawerContent props={props} />;
}

const Drawer = createDrawerNavigator();

function DrawerRoutes() {
  return (
    <Drawer.Navigator
      drawerType="slide"
      drawerContent={CustomDrawerContent}
      screenOptions={{
        headerShown: false,
      }}>
      <Drawer.Screen name="Home" component={Root} />
    </Drawer.Navigator>
  );
}

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isDone: false,
      isLogin: false
    };
  }

  async requestUserPermission() {
    const authStatus = await messaging().requestPermission();
    const enabled =
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL;
  
    if (enabled) {
      console.log('Authorization status:', authStatus);
    }
  }

  
  async componentDidMount() {
    setTimeout(() => {
      this.setState({
        isDone: true,
      });
    }, 3000);

    await this.requestUserPermission()
    
    const  rememberme = await getData('rememberme')
    console.log(rememberme);
    if(rememberme == 1){
      this.setState({
        isLogin: true
      })
    }
  }

  render() {
    if (!this.state.isDone) {
      return <SplashScreen />;
    }
    const RootStack = createStackNavigator();
    return (
      <NavigationContainer ref={navigationRef}>
        <RootStack.Navigator headerMode="none" initialRouteName={(this.state.isLogin)?'Root':'SignInStack'}>
          <RootStack.Screen name="SignInStack" component={SignInStackScreen} />
          <RootStack.Screen name="Root" component={DrawerRoutes} />
        </RootStack.Navigator>
      </NavigationContainer>
    );
  }
}

//<RootStack.Screen name="SignInStack" component={SignInStackScreen} />
