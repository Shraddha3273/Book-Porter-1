import React ,{Component} from 'react'
import {
View, 
Text,
TouchableOpacity,
FlatList,
StyleSheet
} from 'react-native';
import {Card,Icon,ListItem} from 'react-native-elements'
import MyHeader from '../components/MyHeader.js'
import firebase from 'firebase';
import db from '../config.js'

export default class MyDonationScreen extends Component {
  static navigationOptions = { header: null };

   constructor(){
     super()
     this.state = {
       userId : firebase.auth().currentUser.email,
       allDonations : [],
       donorName : ''
     }
     this.requestRef= null
   }

sendNotification = (bookDetails, request_status) => {
var request_Id = bookDetails.request_id
var donor_Id = bookDetails.donor_id

db.collection('All_Notifications').where("request_id", "==", request_Id).
where("donor_id", "==", donor_Id).get().then(
  snapshot => {
    var book_Name = book_name
    snapshot.forEach((doc)=> {
      
    var Messsage = ""
    if (request_status === "Book Sent") {
      Message = this.state.donorName + "  has sent you the book."
    }
    else {
  Messsage = this.state.donorName + "  has shown interest in donating you "+
  book_Name
    }
    db.collection('All_Notifications').doc(doc.id).update({
      Message : Message,
      Notification_Status : "Unread",
      Date : firebase.firestore.FieldValue.serverTimestamp()
    })
  }
)
})
  }

sendBook = (bookDetails) => {
if (bookDetails.request_status === "Book Sent") {
var Request_Status = "Donor interested"
db.collection('All_Donations').doc(bookDetails.doc_id).update({
  request_status : "Donor interested!"
})
this.sendNotification(bookDetails, Request_Status)
}
else {
  var Request_Status = "Book Sent!"
  db.collection('All_Donations').doc(bookDetails.doc_id).update({
    request_status : "Book Sent!"
  })
  this.sendNotification(bookDetails, Request_Status)
}
}

getAllDonations =()=>{
this.requestRef = db.collection("all_donations").where("donor_id" ,'==', this.state.userId)
.onSnapshot((snapshot)=>{
       var allDonations = [] 
       snapshot.docs.map(document => {
         var donations = document.data()
         allDonations.push(donations)
       });

       this.setState({
         allDonations : allDonations,
       });
     })
   }

   keyExtractor = (item, index) => index.toString()

   renderItem = ( {item, i} ) =>(
<ListItem
key={i}
title={item.book_name}
subtitle={"Requested By : " + item.requested_by +"\nStatus : " + item.request_status}
leftElement={<Icon name="book" type="font-awesome" color ='#696969'/>}
titleStyle={{ color: 'black', fontWeight: 'bold' }}
rightElement={
<TouchableOpacity 
style={styles.button}
onPress = {() => {
  this.sendBook(item)
}}
>
<Text style={{color:'#ffff'}} >
{item.request_status === "Book Sent!" ? "Book Sent!" : "Send Book" }</Text>
</TouchableOpacity>
  }
       bottomDivider
     />
   )


   componentDidMount(){
     this.getAllDonations()
   }

   componentWillUnmount(){
     this.requestRef();
   }

   render(){
     return(
       <View style={{flex:1}}>
         <MyHeader navigation={this.props.navigation} title="My Donations"/>
         <View style={{flex:1}}>
           {
             this.state.allDonations.length === 0
             ?(
               <View style={styles.subtitle}>
                 <Text style={{ fontSize: 20}}>List of all book Donations</Text>
               </View>
             )
             :(
               <FlatList
                 keyExtractor={this.keyExtractor}
                 data={this.state.allDonations}
                 renderItem={this.renderItem}
               />
             )
           }
         </View>
       </View>
       
     )
   }
   }


const styles = StyleSheet.create({
  button:{
    width:100,
    height:30,
    justifyContent:'center',
    alignItems:'center',
    backgroundColor:"#ff5722",
    shadowColor: "#000",
    shadowOffset: {
       width: 0,
       height: 8
     },
    elevation : 16
  },
  subtitle :{
    flex:1,
    fontSize: 20,
    justifyContent:'center',
    alignItems:'center'
  }
})
