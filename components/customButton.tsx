import { View, Text, TouchableOpacity } from 'react-native'
import Ionicons from '@expo/vector-icons/Ionicons';
import React from 'react'

type customButtonType = {
  title: string,
  containerStyle: any,
  handlePress: () => void,
  iconName?: any
};

const CustomButton = ({ title, handlePress, containerStyle,iconName }: customButtonType) => {
  return (
    <View className='w-80'>
      <TouchableOpacity onPress={handlePress}
        className={`bg-yellow-200 w-full h-12 rounded-full flex justify-center items-center flex-row ${containerStyle} `}>
        <Text className='text-xl font-bold flex-1 text-center'>{title}</Text>
        <Ionicons
          name={iconName}
          size={32}
          color="black"
          style={{paddingRight:4}} 
        />
      </TouchableOpacity>
    </View>
  )
}

export default CustomButton