import React from 'react'
import { Redirect, Stack } from 'expo-router'
import { useAuth } from '@clerk/clerk-expo'

const AuthLayout = () => {
  const { isSignedIn } = useAuth()

  if (isSignedIn) {
    return <Redirect href={'/(tabs)/home'} />
  }
  return (
    <Stack  >
        <Stack.Screen name='sign-in' options={{headerShown: false}} />
        <Stack.Screen name='sign-up' options={{headerShown: false}} />
    </Stack>
  )
}

export default AuthLayout