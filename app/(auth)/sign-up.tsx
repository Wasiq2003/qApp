import { View, Text, ScrollView, TouchableOpacity, Image, Alert, SafeAreaView } from 'react-native'
import Ionicons from '@expo/vector-icons/Ionicons';
import React, { useState } from 'react'
import CustomField from '../../components/customField';
import { Link, router, useRouter } from 'expo-router';
import { useSignUp } from '@clerk/clerk-expo'
import CustomButton from '../../components/customButton';


const SignUp = () => {

  const { isLoaded, signUp, setActive } = useSignUp()
  const router = useRouter()
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
  });
  const [pendingVerification, setPendingVerification] = React.useState(false)
  const [code, setCode] = React.useState('')

  const onSignUpPress = async () => {
    if (!isLoaded) {
      return
    }

    try {
      await signUp.create({
        emailAddress: form.email,
        password: form.password,
      })

      await signUp.prepareEmailAddressVerification({ strategy: 'email_code' })

      setPendingVerification(true)
    } catch (err: any) {
      console.error(JSON.stringify(err, null, 2))
    }
  }

  const onPressVerify = async () => {
    if (!isLoaded) {
      return
    }

    try {
      const completeSignUp = await signUp.attemptEmailAddressVerification({
        code,
      })

      if (completeSignUp.status === 'complete') {
        await setActive({ session: completeSignUp.createdSessionId })
        router.replace('/(tabs)/home')
      } else {
        console.error(JSON.stringify(completeSignUp, null, 2))
      }
    } catch (err: any) {
      console.error(JSON.stringify(err, null, 2))
      Alert.alert('Error', err[0].longMessage)
    }
  }
  return (
    <ScrollView className='bg-white flex w-full'>
      <View className=' bg-white h-full '>
        <View>
          <Image source={require('../../assets/qlogo.png')}
            style={{ width: 350, height: 200 }}
            resizeMode='contain'
          />
        </View>
        <View className=' flex-1 bg-white p-4'>
          {!pendingVerification && (
            <View className=' items-center mt-4 gap-y-4'>
              <Text className=' font-bold text-xl'>Create your account</Text>
              <CustomField
                label='Email'
                value={form.email}
                handleChangeText={(e: string) => setForm({ ...form, email: e })} />
              <CustomField
                label='Password'
                value={form.password}
                handleChangeText={(e: string) => setForm({ ...form, password: e })} />
              <CustomButton
                title='Sign-up'
                containerStyle='mt-7'
                handlePress={onSignUpPress}
              />
              <View className='flex-row gap-x-3 mt-3'>
                <Text>already have an account?</Text>
                <Link href="/sign-in">
                  <Text className=' text-blue-500'>Sign in</Text>
                </Link>
              </View>
            </View>
          )}
          {pendingVerification && (
            <View className='bg-white mt-7 items-center '>
              <Text className=' font-bold text-xl'>Verify Your Account</Text>
              <CustomField
                label='Code'
                value={code}
                handleChangeText={(e) => setCode(e)}
              />
              <CustomButton
                title='Verify'
                containerStyle='mt-7'
                handlePress={onPressVerify}
              />
            </View>
          )}
        </View>
      </View>
    </ScrollView>
  )
}

export default SignUp