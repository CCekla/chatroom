import { formatDistance, subDays } from 'date-fns'
export { ChatUI }
//render template to the DOM
//clear the chat list (when room changes)

class ChatUI {
    //the list is the ul element where all the chats will be listed in the index 
    constructor(list){
        this.list = list;
    }
    //empty chatroom when changing room
    clear(){
        this.list.innerHTML = '';
    }
    //data is going to be a single chat object
    render(data){
        //formatting date
        const when = formatDistance(data.sent_at.toDate(), new Date(), { addSuffix: true });
        // the template of the "chat card"
        const html = `
            <li class="chat-card" style="border: 4px solid ${data.color}">
                <img src="../src/img/avatars/${data.avatar}" alt="avatar">
                <div>
                    <b class="block" style="color:${data.color}">${data.username}</b>
                    <span class="block text-slate-800">${data.message}</span>
                    <small>${when}</small>
                </div>
            </li>
        `;

        this.list.innerHTML += html;
    }
}

//open and close color and avatar dropdown
const dropBtns = document.querySelectorAll('button.btn-drop');

dropBtns.forEach(btn => btn.addEventListener('click', event => {
    const dropdown = event.target.closest('button').getAttribute('data-dropdown-toggle');
    document.getElementById(dropdown).classList.toggle('hidden');
}));