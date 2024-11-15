import { View, Text } from 'react-native'
import React from 'react'
import Ionicons from '@expo/vector-icons/Ionicons';
import { Tabs } from 'expo-router'

type TabBarIconType = {
    name: any,
    size: any,
    focused: boolean,
    color: any
}

const TabBarIcon = ({ name, size, focused, color }: TabBarIconType) => {
    return (
        <View>
            <Ionicons name={name} size={35} color='black' />
        </View>
    )
}

const TabsLayout = () => {
    return (
        <Tabs screenOptions={{
            tabBarShowLabel: false,
            tabBarStyle: { backgroundColor: 'skyblue', height: 45 }
        }}>
            <Tabs.Screen name='home'
                options={{
                    tabBarIcon: ({ size, focused, color }) => (
                        <TabBarIcon
                            name={focused ? 'book' : 'book-outline'}
                            size={size}
                            focused={focused}
                            color={color}

                        />)
                }}
            />
            <Tabs.Screen name='bookmark'
                options={{
                    tabBarIcon: ({ size, focused, color }) => (
                        <TabBarIcon
                            name={focused ? 'reader' : 'reader-outline'}
                            size={size}
                            focused={focused}
                            color={color}

                        />)
                }}
            />
            <Tabs.Screen name='profile'
                options={{
                    tabBarIcon: ({ size, focused, color }) => (
                        <TabBarIcon
                            name={focused ? 'person-circle' : 'person-circle-outline'}
                            size={size}
                            focused={focused}
                            color={color}

                        />)
                }}
            />
        </Tabs>
    )
}

export default TabsLayout