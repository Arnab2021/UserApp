export default class Helper {
  static setTabBarName(routeName) {
    //const {routeName} = navigation.state;
    if (routeName === 'Home') {
      return 'Home';
    } else if (routeName === 'My Orders') {
      return 'My Orders';
    } else if (routeName === 'My Cart') {
      return 'My Cart';
    } else if (routeName === 'Search') {
      return 'Search';
    } else if (routeName === 'Profile') {
      return 'Profile';
    }
  }

  static setTabBarSource(routeName) {
    //const {routeName} = navigation.state;
    if (routeName === 'Home') {
      return require('../assets/chef-app-images/home.png');
    } else if (routeName === 'My Orders') {
      return require('../assets/chef-app-images/my-order.png');
    } else if (routeName === 'My Cart') {
      return require('../assets/chef-app-images/my-cart.png');
    } else if (routeName === 'Search') {
      return require('../assets/chef-app-images/search.png');
    } else if (routeName === 'Profile') {
      return require('../assets/chef-app-images/Profile.png');
    }
  }
}
