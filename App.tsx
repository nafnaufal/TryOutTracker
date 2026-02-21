/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { useEffect, useState } from 'react';
import { StatusBar, StyleSheet, View } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Splash, Home, AddTryout, Result, History } from './src/screens';

export type Route =
  | { name: 'Splash' }
  | { name: 'Home' }
  | { name: 'AddTryout' }
  | { name: 'Result'; params: { id: string } }
  | { name: 'History' };

export default function App() {
  const [route, setRoute] = useState<Route>({ name: 'Splash' });

  useEffect(() => {
    // Keep status bar style neutral; screens can override if needed
  }, []);

  const navigate = (r: Route) => setRoute(r);

  return (
    <SafeAreaProvider>
      <StatusBar barStyle={'dark-content'} />
      <View style={styles.container}>
        {route.name === 'Splash' && <Splash navigate={navigate} />}
        {route.name === 'Home' && <Home navigate={navigate} />}
        {route.name === 'AddTryout' && <AddTryout navigate={navigate} />}
        {route.name === 'Result' && <Result navigate={navigate} id={route.params.id} />}
        {route.name === 'History' && <History navigate={navigate} />}
      </View>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
});
