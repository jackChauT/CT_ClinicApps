import React from 'react';
import Login from './src/components/login';
import Home from './src/components/home';
import Register from './src/components/register';
import AgendaScreen from './src/components/consultation/agenda';
import Detail from './src/components/consultation/detail';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';

import reducer from './src/redux/reducers/index';
import { jwt } from './src/middleware/auth';

const ceateStoreWithMiddleware = applyMiddleware(jwt, thunk)(createStore);
const store = ceateStoreWithMiddleware(reducer)

export default class App extends React.Component {
  constructor() {
    super();
  }
  
  render() {
    const Stack = createStackNavigator();
    return (
      <Provider store={store}>
          <NavigationContainer>
            <Stack.Navigator initialRouteName="Login">
              <Stack.Screen name="Login" component={Login} />
              <Stack.Screen name="Home" component={Home} options={{headerLeft: null}} />
              <Stack.Screen name="Register" component={Register} />
              <Stack.Screen name="Agenda" component={AgendaScreen} />
              <Stack.Screen name="Detail" component={Detail} />
            </Stack.Navigator>
        </NavigationContainer>
      </Provider>
      
    );
  }
}