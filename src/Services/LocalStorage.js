import React from "react";
import { AsyncStorage } from "react-native";

const getData = async (key) => {
    try {
        const value = await AsyncStorage.getItem(key)
        return value
    } catch (error) {
        console.log(error);
        return false
    }
 
}

const setData = async(key, value) => {
    try{
       await AsyncStorage.setItem(key, value)
    }catch(err){
        console.log(err);
        return false
    }    
}

const removeData = async(key) => {
    try {
        await AsyncStorage.removeItem(key)
    } catch (error) {
        console.log(error);
        return false
    }
}

export {getData, setData, removeData}