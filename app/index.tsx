import { Image, Text, View } from 'react-native';
import CustomButton from '../components/customButton';
import { router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function App() {
  return (
    <SafeAreaView className=' flex-1 items-center justify-center bg-black ' >
      <View className=' items-center justify-center' >
        <View >
          <Image source={require('../assets/qmlogo.png')}
            style={{ width: 450 }}
            resizeMode='contain'
          />
        </View>
        <View className=' mt-20 '>
          <CustomButton
            title='Gets Start'
            containerStyle='mt-8'
            handlePress={() => router.push('(auth)/sign-in')}
            iconName='arrow-forward-circle'
          />
        </View>
      </View>
    </SafeAreaView>
  );
}

