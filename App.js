import React from 'react';
import { Text, View } from 'react-native';
import { createStackNavigator } from 'react-navigation';
import styles from './Styles';

const HomeScreen = () => (
  <View style={styles.container}>
    <Text>
      Home Screen
    </Text>
  </View>
);

const DetailsScreen = () => (
  <View style={styles.container}>
    <Text>
      Details Screen
    </Text>
  </View>
);

const RootStack = createStackNavigator(
  {
    Home: HomeScreen,
    Details: DetailsScreen,
  },
  {
    initialRootName: 'Home',
  },
);

const App = () => (
  <RootStack />
);

export default App;


// export class APic extends Component {
//   constructor(props) {
//     super(props)
//     this.state = {isShowingText: true};
//
//     if (props.blinkText) {
//       setInterval(() => {
//         this.setState(previousState => {
//           return { isShowingText: !previousState.isShowingText };
//         })
//       }, props.blinkRate || 1000)
//     }
//   }
//
//   render() {
//     let display = this.state.isShowingText ? this.props.picDisc : " ";
//     let pic = {
//       uri: "https://upload.wikimedia.org/wikipedia/commons/d/de/Bananavarieties.jpg"
//     };
//
//     return (
//       <View style={styles.container}>
//         <View style={styles.container}>
//           <Image source={pic} resizeMode="contain" style={styles.canvas}/>
//         </View>
//         <View style={styles.container}>
//           <Text style={styles.bigblue}>{display}</Text>
//         </View>
//       </View>
//     )
//   }
// }
//
// export default class ManyPics extends Component {
//   constructor(props) {
//     super(props)
//     this.state = {text: ""};
//   }
//
//   render() {
//     return (
//       <ScrollView contentContainerStyle={styles.container}>
//         <TextInput
//           placeholder="Type here"
//           onChangeText={(text) => this.setState({text})}
//           style={{flex: 1}}
//         />
//         <APic
//           style={{flex: 1}}
//           picDisc={this.state.text.split(" ").map((word) => word && "💩").join(" ")}
//         />
//         <APic
//           style={{flex: 1}}
//           picDisc={this.state.text.split(" ").map((word) => word && "💩").join(" ")}
//         />
//         <APic
//           style={{flex: 1}}
//           picDisc={this.state.text.split(" ").map((word) => word && "💩").join(" ")}
//         />
//       </ScrollView>
//     )
//   }
// }
//
// const styles = StyleSheet.create({
//   bigblue: {
//     color: "blue",
//     fontWeight: "bold",
//     fontSize: 30
//   },
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: '#F5FCFF',
//     position: 'relative'
//   },
//   canvas: {
//     position: 'absolute',
//     top: 0,
//     left: 0,
//     bottom: 0,
//     right: 0,
//   },
// })
