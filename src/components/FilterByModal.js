import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
  Platform,
  FlatList,
} from 'react-native';
import Modal from 'react-native-modalbox';
import Icon from 'react-native-vector-icons/Entypo';
import CheckIcon from 'react-native-vector-icons/Feather';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scrollview';

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { CheckBox } from 'react-native-elements';

import colors from '../assets/Colors';
import { TextInput } from 'react-native-gesture-handler';

export default class FilterByModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedFilter: 1,
      selectedPriceRange: [
        { name: '10 - 20', checked: false },
        { name: '20 - 30', checked: false },
        { name: '30 - 40', checked: false },
      ],
      selectedCuisines: [
        { name: 'Australian', checked: false },
        { name: 'Chinese', checked: false },
        { name: 'European', checked: false },
        { name: 'Greek', checked: false },
        { name: 'Indian', checked: false },
        { name: 'Italian', checked: false },
        { name: 'Japanese', checked: false },
        { name: 'Korean', checked: false },
        { name: 'Mexican', checked: false },
        { name: 'Middle Eastern', checked: false },
        { name: 'Modern', checked: false },
        { name: 'Other (please specify)', checked: false },
        { name: 'Spanish', checked: false },
        { name: 'Thai', checked: false },
        { name: 'Vietnamese', checked: false },
      ],
      selectedDishType: [
        { name: 'Baked goods', checked: false },
        { name: 'Meal', checked: false },
        { name: 'Dessert', checked: false },
        { name: 'Snacks', checked: false },
      ],
      selectedDietaryPreference: [
        { name: 'Free Range', checked: false },
        { name: 'Gluten Free', checked: false },
        { name: 'Halal', checked: false },
        { name: 'Healthy', checked: false },
        { name: 'Kosher', checked: false },
        { name: 'Lactose Free', checked: false },
        { name: 'Organic', checked: false },
        { name: 'Peanut Free', checked: false },
        { name: 'Vegan', checked: false },
        { name: 'Vegetarian', checked: false },
      ],
      selectedOrderType: [
        { name: 'All Orders', checked: false },
        { name: 'Made on order', checked: false },
        { name: 'Pre-order', checked: false },
        { name: 'Pre-made', checked: false },
      ],

      dishName: '',
      ingrediants: '',
      chef_name: ''
    };
  }

  returnFilterTypeContent = () => {
    const { selectedFilter } = this.state;
    if (selectedFilter === 0) {
      return this.PriceRangeData();
    }
    if (selectedFilter === 1) {
      return this.cuisineData();
    }
    if (selectedFilter === 2) {
      return this.dishnameData();
    }
    if (selectedFilter === 4) {
      return this.dishTypeData();
    }
    if (selectedFilter === 5) {
      return this.dietaryPreferenceData();
    }
    if (selectedFilter === 6) {
      return this.ingrediantsData();
    }
    if (selectedFilter === 7) {
      return this.chefNameData();
    }
    if (selectedFilter === 8) {
      return this.ordertypeData();
    }
    return null;
  };


  PriceRangeData = () => {
    return this.state.selectedPriceRange.map((item, index) => {
      return (
        <TouchableOpacity
          style={styles.filterTypeContent}
          onPress={() => this.updatePriceRange(item, index)} key={index}>
          <CheckBox
            containerStyle={styles.checkBox}
            uncheckedColor={colors.softText}
            checked={item.checked}
            checkedColor={colors.green}
            onPress={() => this.updatePriceRange(item, index)}
          />
          <Text
            style={
              item.checked ? styles.selectedCuisineText : styles.cuisineText
            }>
            ${item.name}
          </Text>
        </TouchableOpacity>
      );
    });
  };

  cuisineData = () => {
    return this.state.selectedCuisines.map((item, index) => {
      return (
        <TouchableOpacity
          style={styles.filterTypeContent}
          onPress={() => this.updateChecked(item, index)} key={index}>
          <CheckBox
            containerStyle={styles.checkBox}
            uncheckedColor={colors.softText}
            checked={item.checked}
            checkedColor={colors.green}
            onPress={() => this.updateChecked(item, index)}
          />
          <Text
            style={
              item.checked ? styles.selectedCuisineText : styles.cuisineText
            }>
            {item.name}
          </Text>
        </TouchableOpacity>
      );
    });
  };

  dishnameData = () => {
    return (
      <KeyboardAwareScrollView>
        <TextInput style={{ borderColor: '#000', borderWidth: 2 }} placeholder="Enter dish name...." value={this.state.dishName} onChangeText={e => this.setState({ dishName: e })} />
      </KeyboardAwareScrollView>
    )
  }

  dishTypeData = () => {
    return this.state.selectedDishType.map((item, index) => {
      return (
        <TouchableOpacity
          style={styles.filterTypeContent}
          onPress={() => this.updateCheckedDishType(item, index)} key={index}>
          <CheckBox
            containerStyle={styles.checkBox}
            uncheckedColor={colors.softText}
            checked={item.checked}
            checkedColor={colors.green}
            onPress={() => this.updateCheckedDishType(item, index)}
          />
          <Text
            style={
              item.checked ? styles.selectedCuisineText : styles.cuisineText
            }>
            {item.name}
          </Text>
        </TouchableOpacity>
      );
    });
  };
  dietaryPreferenceData = () => {
    return this.state.selectedDietaryPreference.map((item, index) => {
      return (
        <TouchableOpacity
          style={styles.filterTypeContent}
          onPress={() => this.updateCheckedDietaryPreference(item, index)} key={index}>
          <CheckBox
            containerStyle={styles.checkBox}
            uncheckedColor={colors.softText}
            checked={item.checked}
            checkedColor={colors.green}
            onPress={() => this.updateCheckedDietaryPreference(item, index)}
          />
          <Text
            style={
              item.checked ? styles.selectedCuisineText : styles.cuisineText
            }>
            {item.name}
          </Text>
        </TouchableOpacity>
      );
    });
  };

  ingrediantsData = () => {
    return (
      <KeyboardAwareScrollView>
        <TextInput style={{ borderColor: '#000', borderWidth: 2 }} placeholder="Ingrediants...." value={this.state.ingrediants} onChangeText={e => this.setState({ ingrediants: e })} />
      </KeyboardAwareScrollView>
    )
  }

  chefNameData = () => {
    return (
      <KeyboardAwareScrollView>
        <TextInput style={{ borderColor: '#000', borderWidth: 2 }} placeholder="Chef name...." value={this.state.chef_name} onChangeText={e => this.setState({ chef_name: e })} />
      </KeyboardAwareScrollView>
    )
  }

  ordertypeData = () => {
    return this.state.selectedOrderType.map((item, index) => {
      return (
        <TouchableOpacity
          style={styles.filterTypeContent}
          onPress={() => this.updateCheckedOrdertype(item, index)} key={index}>
          <CheckBox
            containerStyle={styles.checkBox}
            uncheckedColor={colors.softText}
            checked={item.checked}
            checkedColor={colors.green}
            onPress={() => this.updateCheckedOrdertype(item, index)}
          />
          <Text
            style={
              item.checked ? styles.selectedCuisineText : styles.cuisineText
            }>
            {item.name}
          </Text>
        </TouchableOpacity>
      );
    });
  }


  updatePriceRange = (item, index) => {
    let newArray = [...this.state.selectedPriceRange];
    newArray[index].checked = !newArray[index].checked;
    this.setState({ array: newArray });
  };
  updateChecked = (item, index) => {
    let newArray = [...this.state.selectedCuisines];
    newArray[index].checked = !newArray[index].checked;
    this.setState({ array: newArray });
  };
  updateCheckedDishType = (item, index) => {
    let newArray = [...this.state.selectedDishType];
    newArray[index].checked = !newArray[index].checked;
    this.setState({ array: newArray });
  };
  updateCheckedDietaryPreference = (item, index) => {
    let newArray = [...this.state.selectedDietaryPreference];
    newArray[index].checked = !newArray[index].checked;
    this.setState({ array: newArray });
  };
  updateCheckedOrdertype = (item, index) => {
    let newArray = [...this.state.selectedOrderType];
    newArray[index].checked = !newArray[index].checked;
    this.setState({ array: newArray });
  };
  accumuateAllData() {

    const { closeFilterByModalVisible } = this.props

    let price_range = []
    this.state.selectedPriceRange.map((x, i) => {
      if (x.checked === true) {
        price_range.push(x.name)
      }
    })

    let cusine = []
    this.state.selectedCuisines.map((x, i) => {
      if (x.checked === true) {
        cusine.push(x.name)
      }
    })

    let dish_name = this.state.dishName

    let dish_type = []
    this.state.selectedDishType.map((x, i) => {
      if (x.checked === true) {
        dish_type.push(x.name)
      }
    })

    let dietary_pref = []
    this.state.selectedDietaryPreference.map((x, i) => {
      if (x.checked === true) {
        dietary_pref.push(x.name)
      }
    })

    let ingredient = this.state.ingrediants
    let chef_name = this.state.chef_name

    let order_type = []
    this.state.selectedOrderType.map((x, i) => {
      if (x.checked === true) {
        order_type.push(x.name)
      }
    })

    const data = {
      price_range: price_range,
      cuisine: cusine,
      dish_name: dish_name,
      postcode: '',
      dish_type: dish_type,
      dietary_pref: dietary_pref,
      ingredient: ingredient,
      chef_name: chef_name,
      order_type: order_type
    }

    closeFilterByModalVisible(data)

  }

  render() {
    const { filterByModalVisible } = this.props;
    const { selectedFilter } = this.state;
    return (
      <Modal
        isOpen={filterByModalVisible}
        useNativeDriver={false}
        style={{ flex: 1 }}>
        <ImageBackground
          style={styles.main}
          source={require('../assets/chef-app-images/pasta.jpeg')}>
          <View style={styles.content}>
            <View style={styles.header}>
              <View style={styles.filterByView}>
                <Text style={styles.filterByText}>Filter By</Text>
              </View>
              <TouchableOpacity
                onPress={() => this.accumuateAllData()}
                style={styles.crossIconView}>
                <Icon name="cross" style={styles.crossIcon} />
              </TouchableOpacity>
            </View>
            <View style={styles.filterContent}>
              <View style={styles.filterHeader}>
                <TouchableOpacity
                  style={
                    selectedFilter === 0
                      ? styles.selectedFilterType
                      : styles.filterType
                  }
                  onPress={() => {
                    this.setState({
                      selectedFilter: 0,
                    });
                  }}>
                  <Text
                    style={
                      selectedFilter === 0
                        ? styles.selectedFilterText
                        : styles.filterText
                    }>
                    Price Range
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={
                    selectedFilter === 1
                      ? styles.selectedFilterType
                      : styles.filterType
                  }
                  onPress={() => {
                    this.setState({
                      selectedFilter: 1,
                    });
                  }}>
                  <Text
                    style={
                      selectedFilter === 1
                        ? styles.selectedFilterText
                        : styles.filterText
                    }>
                    Cuisine
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={
                    selectedFilter === 2
                      ? styles.selectedFilterType
                      : styles.filterType
                  }
                  onPress={() => {
                    this.setState({
                      selectedFilter: 2,
                    });
                  }}>
                  <Text
                    style={
                      selectedFilter === 2
                        ? styles.selectedFilterText
                        : styles.filterText
                    }>
                    Dish Name
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={
                    selectedFilter === 3
                      ? styles.selectedFilterType
                      : styles.filterType
                  }
                  onPress={() => {
                    this.setState({
                      selectedFilter: 3,
                    });
                  }}>
                  <Text
                    style={
                      selectedFilter === 3
                        ? styles.selectedFilterText
                        : styles.filterText
                    }>
                    Postcode
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={
                    selectedFilter === 4
                      ? styles.selectedFilterType
                      : styles.filterType
                  }
                  onPress={() => {
                    this.setState({
                      selectedFilter: 4,
                    });
                  }}>
                  <Text
                    style={
                      selectedFilter === 4
                        ? styles.selectedFilterText
                        : styles.filterText
                    }>
                    Dish Type
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={
                    selectedFilter === 5
                      ? styles.selectedFilterType
                      : styles.filterType
                  }
                  onPress={() => {
                    this.setState({
                      selectedFilter: 5,
                    });
                  }}>
                  <Text
                    style={
                      selectedFilter === 5
                        ? styles.selectedFilterText
                        : styles.filterText
                    }>
                    Dietary Preference
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={
                    selectedFilter === 6
                      ? styles.selectedFilterType
                      : styles.filterType
                  }
                  onPress={() => {
                    this.setState({
                      selectedFilter: 6,
                    });
                  }}>
                  <Text
                    style={
                      selectedFilter === 6
                        ? styles.selectedFilterText
                        : styles.filterText
                    }>
                    Ingrediants
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={
                    selectedFilter === 7
                      ? styles.selectedFilterType
                      : styles.filterType
                  }
                  onPress={() => {
                    this.setState({
                      selectedFilter: 7,
                    });
                  }}>
                  <Text
                    style={
                      selectedFilter === 7
                        ? styles.selectedFilterText
                        : styles.filterText
                    }>
                    Home Chef Name
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={
                    selectedFilter === 8
                      ? styles.selectedFilterType
                      : styles.filterType
                  }
                  onPress={() => {
                    this.setState({
                      selectedFilter: 8,
                    });
                  }}>
                  <Text
                    style={
                      selectedFilter === 8
                        ? styles.selectedFilterText
                        : styles.filterText
                    }>
                    Order Type
                  </Text>
                </TouchableOpacity>
              </View>
              <View style={styles.filterTypes}>
                {this.returnFilterTypeContent()}
              </View>
            </View>
          </View>
        </ImageBackground>
      </Modal>
    );
  }
}


const styles = StyleSheet.create({
  main: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  cuisineText: {
    fontFamily: 'futurastd-medium',
    fontSize: hp('2.2%'),
    ...(Platform.OS === 'ios' ? { lineHeight: hp('2.7%') } : null),
    color: colors.black,
  },
  selectedCuisineText: {
    fontFamily: 'futurastd-medium',
    fontSize: hp('2.2%'),
    ...(Platform.OS === 'ios' ? { lineHeight: hp('2.7%') } : null),
    color: colors.green,
  },
  filterTypeContent: {
    flexDirection: 'row',
    padding: 15,
    flex: 0.1,
    marginLeft: 10,
    marginRight: 10,
    alignItems: 'center',
    borderBottomWidth: 1,
    borderColor: colors.softText,
  },
  selectedFilterText: {
    fontFamily: 'futurastd-medium',
    fontSize: hp('2.5%'),
    ...(Platform.OS === 'ios' ? { lineHeight: hp('3%') } : null),
    color: colors.green,
    marginLeft: 10,
  },
  filterText: {
    fontFamily: 'futurastd-medium',
    fontSize: hp('2.5%'),
    ...(Platform.OS === 'ios' ? { lineHeight: hp('3%') } : null),
    marginLeft: 10,
    color: colors.black,
  },
  selectedFilterType: {
    flex: 1,
    borderLeftWidth: 3,
    borderColor: colors.green,
    backgroundColor: colors.white,
    justifyContent: 'center',
  },
  filterType: {
    flex: 1,
    justifyContent: 'center',
  },
  filterTypes: {
    flex: 1,
  },
  filterHeader: {
    flex: 1,
    backgroundColor: colors.filterByBackground,
  },
  filterContent: {
    flexDirection: 'row',
    flex: 1,
  },
  content: {
    flex: 1,
    backgroundColor: 'rgba(255,255,255, 0.8)',
  },
  header: {
    backgroundColor: 'transparent',
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderColor: colors.borderGrey,
  },
  filterByView: {
    flex: 1,
    padding: 20,
  },
  filterByText: {
    fontSize: hp('3%'),
    fontFamily: 'futurastd-medium',
    ...(Platform.OS === 'ios' ? { lineHeight: hp('3.5%') } : null),
  },
  crossIconView: {
    width: hp('4%'),
    height: hp('4%'),
    borderWidth: 2,
    borderRadius: hp('2%'),
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: colors.softText,
    marginTop: 5,
    marginRight: 5,
  },
  crossIcon: {
    fontSize: hp('3.5%'),
    color: colors.softText,
  },
  checkBox: {
    padding: 0,
    margin: 0,
    paddingLeft: 0,
    marginLeft: 0,
    paddingBottom: 0,
    marginBottom: 0,
    paddingVertical: 0,
    marginVertical: 0,
  },
});
