import { db } from '../src/index.js'
import { collection, addDoc, Timestamp, onSnapshot, where, query, orderBy } from 'firebase/firestore'
export { Chatroom }

class Chatroom {
    constructor(room, username, color, avatar){
        this.room = room;
        this.username = username;
        this.color = color;
        this.avatar = avatar;
        this.chats = collection(db, 'chats');
        this.unsub;
    }
    //add new chat docs
    async addChat(message){
        //create a chat object to upload to the db
        const time = new Date();
        const chat = {
            message,
            username : this.username,
            room : this.room,
            color : this.color,
            avatar : this.avatar,
            sent_at : Timestamp.fromDate(time)
        };
        //save chat document on db
        const response = await addDoc(this.chats, chat);
        return response
    }
    //get new chats
    getChats(callback){
        //set up a query to select chats from a specific room + order them by creation date
        const q = query(this.chats, where('room', '==', this.room), orderBy('sent_at'));
        this.unsub = onSnapshot(q, snapshot => {
                //everytime there's a snapshot this fires
                snapshot.docChanges().forEach(change => {
                    //checks the type of change
                    if(change.type === 'added'){
                        //update UI
                        callback(change.doc.data());
                    }

                });
            });
    }
    //update the username
    updateName(name){
        this.username = name;
        //to keep the name if we change it we store it in the local storage
        localStorage.setItem('username', name);
    }
    //change room
    updateRoom(room){
        this.room = room;
        //we check that this.unsub has a value
        if(this.unsub){
            //we unsubscribe from the previous room changes
            this.unsub();
        }
    }
    updateColor(col){
        this.color = col;
        //to keep the color if we change it we store it in the local storage
        localStorage.setItem('color', col);
        //this way if we exit the page or whatever we keep the change
    }
    updateAvatar(icon){
        this.avatar = icon;
        //to keep the icon if we change it we store it in the local storage
        localStorage.setItem('avatar', icon);
        //this way if we exit the page or whatever we keep the change
    }
}
