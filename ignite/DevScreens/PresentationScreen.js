import React from 'react'
import { ScrollView, Text, Image, View, TouchableOpacity } from 'react-native'
import { Images } from './DevTheme'
import ButtonBox from './ButtonBox'
import { StackNavigator } from 'react-navigation'
// Screens
import APITestingScreen from './APITestingScreen'
import ComponentExamplesScreen from './ComponentExamplesScreen'
import DeviceInfoScreen from './DeviceInfoScreen'
import PluginExamplesScreen from './PluginExamplesScreen'
import ThemeScreen from './ThemeScreen'
import Map from '../Examples/Components/MapsExample'
import FaqScreen from './FaqScreen'

// Styles
import apiStyles from './Styles/APITestingScreenStyles'
import styles from './Styles/PresentationScreenStyles'

class PresentationScreen extends React.Component {
  openComponents = () => {
    this.props.navigation.navigate('ComponentExamplesScreen')
  }

  openUsage = () => {
    this.props.navigation.navigate('PluginExamplesScreen')
  }

  openApi = () => {
    this.props.navigation.navigate('APITestingScreen')
  }

  openTheme = () => {
    this.props.navigation.navigate('ThemeScreen')
  }

  openMap = () => {
    this.props.navigation.navigate('MapExample')
  }

  openFaq = () => {
    this.props.navigation.navigate('FaqScreen')
  }

  render () {
    return (
      <View style={styles.mainContainer}>
        <Image source={Images.background} style={styles.backgroundImage} resizeMode='stretch' />
        {/*<TouchableOpacity onPress={this.props.screenProps.toggle} style={{
          position: 'absolute',
          paddingTop: 30,
          paddingHorizontal: 10,
          zIndex: 10
        }}>
          <Image source={Images.closeButton} />
        </TouchableOpacity>*/}
        <ScrollView showsVerticalScrollIndicator={false} bounces={false} style={styles.container}>
          {/*<View style={styles.centered}>
            <Image source={Images.igniteClear} style={styles.logo} />
          </View>*/}
          {/*<View style={{alignItems: 'center'}}>
            <Text style={styles.titleText}>WELCOME ON BOARD!</Text>
            <Text style={styles.titleText}>Please, </Text>
          </View>*/}

          {/*<Text style={styles.sectionText}>
            Default screens for development, debugging, and alpha testing
            are available below.
          </Text>*/}
          <View style={[styles.buttonsContainer, {backgroundColor: 'white'}]}>
            <ButtonBox onPress={this.openComponents} style={styles.componentButton} image={Images.components} text='My flights' />
            <ButtonBox onPress={this.openUsage} style={styles.usageButton} image={Images.usageExamples} text='Flight info' />
          </View>
          <View style={styles.buttonsContainer}>
            <ButtonBox onPress={this.openApi} style={styles.apiButton} image={Images.api} text='Our proposals' />
            <ButtonBox onPress={this.openTheme} image={Images.theme} text='Profile' />
          </View>
          <View style={styles.buttonsContainer}>
            <ButtonBox onPress={this.openMap} style={styles.deviceButton} image={Images.deviceInfo} text='Map' />
            <ButtonBox onPress={this.openFaq} style={styles.usageButton} image={Images.faq} text='FAQ' />
          </View>
        </ScrollView>
        <View style={styles.banner}>
          <Text style={styles.bannerLabel}>Powered by © 2017 Luxoft</Text>
        </View>
      </View>
    )
  }
}

export default StackNavigator({
  PresentationScreen: {screen: PresentationScreen},
  APITestingScreen: {screen: APITestingScreen},
  ComponentExamplesScreen: {screen: ComponentExamplesScreen},
  DeviceInfoScreen: {screen: DeviceInfoScreen},
  PluginExamplesScreen: {screen: PluginExamplesScreen},
  ThemeScreen: {screen: ThemeScreen},
	MapExample: {screen: Map},
  FaqScreen: {screen: FaqScreen}
}, {
  cardStyle: {
    opacity: 1,
    backgroundColor: '#3e243f'
  },
  initialRouteName: 'PresentationScreen',
  headerMode: 'none',
  // Keeping this here for future when we can make
  navigationOptions: {
    header: {
      left: (
        <TouchableOpacity onPress={() => window.alert('pop')} ><Image source={Images.closeButton} style={{marginHorizontal: 10}} /></TouchableOpacity>
      ),
      style: {
        backgroundColor: '#3e243f'
      }
    }
  }
})
