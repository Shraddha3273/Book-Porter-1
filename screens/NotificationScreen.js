import React from 'react';
import {
Text, 
View, 
StyleSheet,
FlatList
} from 'react-native';
import {ListItem, Icon} from 'react-native-elements';
import db from '../config';
import firebase from 'firebase';
import MyHeader from '../components/MyHeader';

export default class NotificationScreen extends React.Component {
constructor(props){
    super(props);
    this.state = {
        userId : firebase.auth().currentUser.email,
        allNotification : []
    };
this.requestref = null;
}

getNotifications = () => {
this.requestRef = db.collection('All_Notifications').where('notification_status',
'==', 'Unread').where('donor_id', '==', this.state.userId).
onSnapshot((snapshot) => {
var AllNotification = []
snapshot.docs.map((doc)=> {

var notification = doc.data()
notification ["doc_id"] = doc.id
AllNotification.push(notification)
})
this.setState({
    allNotification : AllNotification
})
})
}

componentDidMount (){this.getNotifications()}

componentWillUnmount (){this.requestref()}

keyExtractor = (item, index) => index.toString()

renderItem = ({item, index}) => {
return(
    <ListItem 
        key = {index}
        leftElement = {
        <Icon 
        name = "Book" color = '#696969'
        />}
        title = {item.book_name}
        subtitle = {item.message}
        bottomDivider
        />
    )
}

render(){
    return(
<View style = {{flex : 1}}>
<View style = {{flex : 0.1}}>
    <MyHeader 
    title = {"Notifications"} 
    navigation = {this.props.navigation}
    />
    </View> 
    <View style = {{flex : 0.9}}>
{
    this.state.allNotification.length === 0
    ? (
<View style = {{flex : 1, justifyContent : 'center', alignItems : 'center'}}>
    <Text>You have no notifications.</Text>
    </View>
    )
    : (
    <FlatList 
    keyExtractor = {this.keyExtractor}
    data = {this.state.allNotification}
    renderItem = {this.renderItem}
    />
    )
}
    </View>   
</View>
        );
    }
}

const styles = StyleSheet.create ({

})