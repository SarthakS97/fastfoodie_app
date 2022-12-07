import * as React from 'react';

import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Linking,
} from 'react-native';
import colors from '../assets/colors/colors';
import Feather from 'react-native-vector-icons/Feather';
import axios from 'axios';


const sender = async (distance) => {
try {
    const res = await axios.post('https://bored-jumpsuit-cod.cyclic.app/', {amount: Math.round(distance*0.05*81)}
    )
    .then(function (res) {
        console.log(res.data.body.data.redirect_url);
        Linking.openURL(res.data.body.data.redirect_url)
      })
} catch (error) {
    console.log(error.message)
}   
}

const RapydGreen = ({route, navigation}) => {

    const {distance} = route.params

    return(
   <SafeAreaView>
    <Text style={{fontSize: 20, marginTop: 20, fontWeight:'500', textAlign: 'center'}}>Your Carbon footprint:</Text>
      <View style={styles.container}>
        <View>
        <View style={styles.circular}>
            <Text style={{fontSize: 30,  fontWeight: 'bold'}}>{distance.toFixed(2)}</Text>
            <Text style={{fontSize: 20, fontWeight: '300', marginTop: 15}}> kg</Text>
            </View>
        </View>
        <View style={styles.infoWrapper}>
            <Text style={{lineHeight: 20, fontWeight: '500'}}>Our goal is become carbon-neutral by 2025. We certainly can't do it alone. So we present you can opportunity to 
                offset the carbon we've produced together. In partnership with Rapyd Green, you can now invest with us in large scale 
                projects that offset CO2 in the scale of metric tons.
            </Text>
            <Text style={{lineHeight: 20, fontWeight: '500'}}>Rapyd green verifies these projects are legit and helps them acquire funding. We will match your contribution to 
                have the highest impact. Offet your carbon at just ₹4.05/kg/year
            </Text>
        </View>
        <TouchableOpacity style={styles.payButton} onPress={() => sender(distance)}>
            <Text style={{fontSize: 20, color: 'white',fontWeight: 'bold'}}>Proceed to pay</Text>
            <Feather style={styles.buttonIcon} name="arrow-right" color={'white'} size={20} />
        </TouchableOpacity>  
        <Text style={{fontSize: 10, marginTop: 5, color: "grey"}}>powered by Rapyd Green</Text>      
      </View>
    </SafeAreaView>
    )
 }

const styles = new StyleSheet.create({

    container:{
        justifyContent: 'center',
        alignItems: 'center',
    },

    circular:{
        flexDirection: 'row',
        backgroundColor: colors.white,
        width: 200,
        height: 200,
        borderRadius: 100,
        borderColor: 'red',
        borderWidth: 15,
        marginTop: 20,
        justifyContent: 'center',
        alignItems: 'center', 
    },
    infoWrapper:{
        backgroundColor: 'rgba(255, 0, 0, 0.2)',
        borderRadius: 20,
        marginTop: 25,
        padding: 15,
        marginHorizontal: 27,
        borderWidth: 2,
    },
    payButton:{
        backgroundColor: "#009b77",
        flexDirection: 'row',
        marginTop: 30,
        width: "85%",
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 5,
    },
    buttonIcon: {
        marginLeft: 10
    }
})



 export default RapydGreen