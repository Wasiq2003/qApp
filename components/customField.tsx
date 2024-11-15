import { View, Text, TextInput } from 'react-native'
import React from 'react'

type customFieldType = {
  label: string,
  value: string,
  handleChangeText: (e:string)=> void,

};

const CustomField = ({ label, value, handleChangeText, ...props }: customFieldType) => {
  return (
    <View className='w-full space-y-2'>
      <Text className=' font-extrabold text-lg'>{label}</Text>
      <View className=' h-12 bg-neutral-300 rounded-full border border-neutral-200 shadow-lg flex justify-center px-4'>
        <TextInput
        {...props}
          className='text-base'
          value={value}
          
          onChangeText={handleChangeText} />
      </View>
    </View>
  )
}

export default CustomField