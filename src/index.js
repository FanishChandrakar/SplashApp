/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { useEffect, useState } from 'react';
import {
    SafeAreaView,
    StyleSheet,
    ScrollView,
    View,
    Text,
    StatusBar,
    AppState,
    TouchableOpacity,
    Image,
    Dimensions,
} from 'react-native';

import {
    Header,
    LearnMoreLinks,
    Colors,
    DebugInstructions,
    ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import SplashScreen from 'react-native-splash-screen';

const { width, height } = Dimensions.get('window')
export default (props) => {

    const [appState, setAppState] = useState(AppState.currentState);
    useEffect(() => {
        SplashScreen.hide()
        AppState.addEventListener("change", _handleAppStateChange);

        return () => {
            AppState.removeEventListener("change", _handleAppStateChange);
        };

    }, [])

    const _handleAppStateChange = nextAppState => {
        setAppState(nextAppState);

        // Splash Screen Toggle when AppState Changes
        // if (nextAppState === 'active')
        //     return SplashScreen.hide()

        // SplashScreen.show()
    };

    const _toggleSplash = () => {
        SplashScreen.show()
        setTimeout(() => {
            SplashScreen.hide()
        }, 2000);
    }
    const AppStateUI = () => {
        let style = appState === 'active' ? styles.appStateUI_active : styles.appStateUI_inactive
        return (
            <TouchableOpacity {...{ style }} onPress={_toggleSplash}>
                <Text style={styles.appStateUI_Text}>{appState}</Text>
            </TouchableOpacity>
        )
    }

    // Custom UI for AppState as Background/Inactive
    const InactiveUI = () => {
        if (appState === 'active')
            return null
        return (
            <View style={styles.inactiveUI_View}>
                <Image source={require('./react_logo.png')} style={styles.inactiveUI_Image} />
            </View>
        )
    }

    console.log({ appState })
    return (
        <>
            <StatusBar barStyle="dark-content" />
            <SafeAreaView>
                <ScrollView
                    contentInsetAdjustmentBehavior="automatic"
                    style={styles.scrollView}>
                    <AppStateUI />
                    <Header />
                    {global.HermesInternal == null ? null : (
                        <View style={styles.engine}>
                            <Text style={styles.footer}>Engine: Hermes</Text>
                        </View>
                    )}
                    <View style={styles.body}>
                        <View style={styles.sectionContainer}>
                            <Text style={styles.sectionTitle}>Step One</Text>
                            <Text style={styles.sectionDescription}>
                                Edit <Text style={styles.highlight}>App.js</Text> to change this
                                screen and then come back to see your edits.
                            </Text>
                        </View>
                        <View style={styles.sectionContainer}>
                            <Text style={styles.sectionTitle}>See Your Changes</Text>
                            <Text style={styles.sectionDescription}>
                                <ReloadInstructions />
                            </Text>
                        </View>
                        <View style={styles.sectionContainer}>
                            <Text style={styles.sectionTitle}>Debug</Text>
                            <Text style={styles.sectionDescription}>
                                <DebugInstructions />
                            </Text>
                        </View>
                        <View style={styles.sectionContainer}>
                            <Text style={styles.sectionTitle}>Learn More</Text>
                            <Text style={styles.sectionDescription}>
                                Read the docs to discover what to do next:
                            </Text>
                        </View>
                        <LearnMoreLinks />
                    </View>
                </ScrollView>
            </SafeAreaView>
            <InactiveUI />
        </>
    );
};

const styles = StyleSheet.create({
    scrollView: {
        backgroundColor: Colors.lighter,
    },
    engine: {
        position: 'absolute',
        right: 0,
    },
    body: {
        backgroundColor: Colors.white,
    },
    sectionContainer: {
        marginTop: 32,
        paddingHorizontal: 24,
    },
    sectionTitle: {
        fontSize: 24,
        fontWeight: '600',
        color: Colors.black,
    },
    sectionDescription: {
        marginTop: 8,
        fontSize: 18,
        fontWeight: '400',
        color: Colors.dark,
    },
    highlight: {
        fontWeight: '700',
    },
    footer: {
        color: Colors.dark,
        fontSize: 12,
        fontWeight: '600',
        padding: 4,
        paddingRight: 12,
        textAlign: 'right',
    },
    appStateUI_inactive: {
        backgroundColor: '#ff0000',
        padding: 10,
    },
    appStateUI_active: {
        backgroundColor: '#00ff00',
        padding: 10,
    },
    appStateUI_Text: {
        color: '#fff',
        textAlign: 'center',
    },
    inactiveUI_View: {
        ...StyleSheet.absoluteFill,
        backgroundColor: '#212329',
        justifyContent: 'center',
        alignItems: 'center',
    },
    inactiveUI_Image: {
        height: width / 2.5,
        width: width / 2.5,
    }
});
