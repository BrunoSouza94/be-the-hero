import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';

import Casos from './pages/Casos';
import Detalhe from './pages/Detalhe';

const AppStack = createStackNavigator();

export default function Routes(){
    return (
        <NavigationContainer>
            <AppStack.Navigator screenOptions={{headerShown: false}}>
                <AppStack.Screen name="Casos" component={Casos}/>
                <AppStack.Screen name="Detalhes" component={Detalhe}/>
            </AppStack.Navigator>
        </NavigationContainer>
    );
}