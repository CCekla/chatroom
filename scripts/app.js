import { Chatroom } from "./chat";
import { ChatUI } from "./ui";

//DOM queries
const chatList = document.querySelector('.chat-msgs ul');
const newMsg = document.querySelector('.new-msg');
const newName = document.querySelector('.new-name');
const inputs = document.querySelectorAll('.form-check-input');
const feedback = document.querySelector('.update-msg');
const rooms = document.querySelector('.chatrooms');
const roomName = document.querySelector('.room-name');

//add new chat
newMsg.addEventListener('submit', event => {
    event.preventDefault();
    //get the text of message
    const mess = newMsg.message.value.trim();
    //add it to the chatroom object and to the db
    chatroom.addChat(mess)
        .then(() => newMsg.reset())
        .catch(err => console.log(err.message))
});

//update username
newName.addEventListener('submit', event => {
    event.preventDefault();
    //get the new name
    const name = newName.name.value.trim();
    //add it to the chatroom object and to the db
    chatroom.updateName(name);
    //reset the form so input field is emptied
    newName.reset();
    //feedback to the user for a few secs
    feedback.innerHTML = `Your username is now <b>${name}</b>`;
    setTimeout(() => feedback.innerHTML = '', 3000);
});

//update color or avatar
inputs.forEach(input => input.addEventListener('click', event => {
    event.preventDefault();

    //get the color or avatar
    const id = event.target.id;
    
    //check if is color or avatar
    const category = event.target.closest('.flex').id;
    if(category === 'colors') {
        chatroom.updateColor(id);
        feedback.innerHTML = `Your color is now <b style="color:${id}">this</b>`;
        setTimeout(() => feedback.innerHTML = '', 3000);
    }else{
        chatroom.updateAvatar(id);
        feedback.innerHTML = `Your avatar is now <b>${id}</b>`;
        setTimeout(() => feedback.innerHTML = '', 3000);
    }
    document.getElementById(category).classList.toggle('hidden');
}));

//room buttons events
rooms.addEventListener('click', event => {
    if(event.target.tagName === 'BUTTON'){
        chatUI.clear();
        //update the room getting the room via button id
        chatroom.updateRoom(event.target.id);
         //display the new room name
        roomName.innerHTML = event.target.id;
        //get the chats to put up a new listener with getChat method
        chatroom.getChats(chat => {
            //retrieve this new room chats
            chatUI.render(chat);
        });
    };
});

//check if we have something in local storage
const username = localStorage.username ? localStorage.username : 'Anon';
const color = localStorage.color ? localStorage.color : '#F$3F5E';
const avatar = localStorage.avatar ? localStorage.avatar : 'cat.png';

//class instances
const chatUI = new ChatUI(chatList);
const chatroom = new Chatroom('general', username, color, avatar);

//get chats and render
chatroom.getChats(data => {
    chatUI.render(data);
});