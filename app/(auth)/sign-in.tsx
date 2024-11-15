import { useSignIn } from '@clerk/clerk-expo'
import { Link, useRouter } from 'expo-router'
import { Text, TextInput, Button, View, Image, SafeAreaView, ScrollView } from 'react-native'
import React, { useCallback, useState } from 'react'
import CustomField from '../../components/customField'
import CustomButton from '../../components/customButton'

export default function Page() {
  const { signIn, setActive, isLoaded } = useSignIn()
  const router = useRouter()

  const [emailAddress, setEmailAddress] = useState('')
  const [pass, setPassword] = useState('')

  const onSignInPress = useCallback(async () => {
    if (!isLoaded) {
      return;
    }

    try {
      const signInAttempt = await signIn.create({
        identifier: emailAddress,
        password: pass,
      })

      if (signInAttempt.status === 'complete') {
        await setActive({ session: signInAttempt.createdSessionId })
        router.push("/(tabs)/readTab")
      } else {

        console.error(JSON.stringify(signInAttempt, null, 2))
      }
    } catch (err) {
      console.error(JSON.stringify(err, null, 2))
    }
  }, [isLoaded, emailAddress, pass])

  return (
    <ScrollView className='bg-white flex w-full'>
      <View className=' bg-white h-full '>
        <View>
          <Image source={require('../../assets/qlogo.png')}
            style={{ width: 350, height: 200 }}
            resizeMode='contain'
          />
        </View>
        <View className=' flex-1 bg-white p-4 items-center gap-y-4'>
          <CustomField
            label='Email'
            value={emailAddress}
            handleChangeText={(e) => setEmailAddress(e)}
          />
          <CustomField
            label='Password'
            value={pass}
            handleChangeText={(e) => setPassword(e)}
          />
          <CustomButton
            title="Sign In"
            containerStyle='mt-7'
            handlePress={onSignInPress} />
          <View className='flex-row gap-x-3 mt-3 justify-center'>
            <Text>Don't have an account?</Text>
            <Link href="/sign-up">
              <Text className=' text-blue-500'>Sign up</Text>
            </Link>
          </View>
        </View>
      </View>
    </ScrollView>
  )
}