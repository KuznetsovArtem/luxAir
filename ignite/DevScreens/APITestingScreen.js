import React from 'react'
import { ScrollView, View, Text, TouchableOpacity, Image } from 'react-native'
import { Metrics, Images } from './DevTheme'
import FullButton from '../../App/Components/FullButton'

// For API
import API from '../../App/Services/Api'
import FJSON from 'format-json'

// Styles
import styles from './Styles/APITestingScreenStyles'
import btnStyles from './Styles/ButtonBoxStyles'
import presStyles from './Styles/PresentationScreenStyles'

// API buttons here:
const endpoints = [
  { label: 'Explore your location', endpoint: 'getRoot' },
  { label: 'Special deals and discounts', endpoint: 'getRate' },
  { label: 'Inflight shopping', endpoint: 'getUser', args: ['gantman'] }
]

export default class APITestingScreen extends React.Component {
  api = {}

  constructor (props) {
    super(props)
    this.state = {
      visibleHeight: Metrics.screenHeight
    }

    this.api = API.create()
  }

  showResult (response, title = 'Response') {
    this.refs.container.scrollTo({x: 0, y: 0, animated: true})
    if (response.ok) {
      this.refs.result.setState({message: FJSON.plain(response.data), title: title})
    } else {
      this.refs.result.setState({message: `${response.problem} - ${response.status}`, title: title})
    }
  }

  tryEndpoint (apiEndpoint) {
    const { label, endpoint, args = [''] } = apiEndpoint
    this.api[endpoint].apply(this, args).then((result) => {
      this.showResult(result, label || `${endpoint}(${args.join(', ')})`)
    })
  }

  renderButton (apiEndpoint) {
    const { label, endpoint, args = [''] } = apiEndpoint
    return (
      <FullButton text={label || `${endpoint}(${args.join(', ')})`} onPress={this.tryEndpoint.bind(this, apiEndpoint)} styles={{marginTop: 10}} key={`${endpoint}-${args.join('-')}`} />
    )
  }

  renderButtons () {
    return endpoints.map((endpoint) => this.renderButton(endpoint))
  }

  render () {
    return (
      <View style={styles.mainContainer}>
        <Image source={Images.background} style={styles.backgroundImage} resizeMode='stretch' />
        <TouchableOpacity onPress={() => this.props.navigation.goBack()} style={{
          position: 'absolute',
          paddingTop: 30,
          paddingHorizontal: 5,
          zIndex: 10
        }}>
          <Image source={Images.backButton} />
        </TouchableOpacity>
        <ScrollView style={styles.container} ref='container'>
          <View style={{alignItems: 'center', paddingTop: 60}}>
            <Image source={Images.api} style={btnStyles.image} />
            <Text style={styles.titleText}>OUR PROPOSALS</Text>
          </View>
          <View style={styles.section}>
            <Text style={styles.sectionText}>
              Explore your location by visiting interesting places, tasting local food or attending city events. See our guide for more details
            </Text>
            <Text style={styles.sectionText}>
              Our partners prepared special deals for you: Book hotels, rent car or order taxi and more with up to 30% discount!
            </Text>
          </View>
          {this.renderButtons()}
          <APIResult ref='result' />
        </ScrollView>
        <View style={presStyles.banner}>
          <Text style={presStyles.bannerLabel}>Powered by © 2017 Luxoft</Text>
        </View>
      </View>
    )
  }
}

class APIResult extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      message: false,
      title: false
    }
  }

  onApiPress = () => {
    this.setState({message: false})
  }

  renderView () {
    return (
      <ScrollView style={{ top: 0, bottom: 0, left: 0, right: 0, position: 'absolute' }} overflow='hidden'>
        <TouchableOpacity
          style={{backgroundColor: 'white', padding: 20}}
          onPress={this.onApiPress}
        >
          <Text>{this.state.title} Response:</Text>
          <Text allowFontScaling={false} style={{fontFamily: 'CourierNewPS-BoldMT', fontSize: 10}}>
            {this.state.message}
          </Text>
        </TouchableOpacity>
      </ScrollView>
    )
  }

  render () {
    let messageView = null
    if (this.state.message) {
      return this.renderView()
    }

    return messageView
  }
}
