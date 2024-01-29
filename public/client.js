const socket = io();


socket.on("client-total",(data)=>{
    console.log(data);
})
const form=document.getElementById('send-msg-form');
const msg=document.getElementById('content-form');
const button=document.getElementById('form_submit');
const box=document.querySelector('.box');

form.addEventListener('submit',async (e)=>{
    e.preventDefault();
    let toUserId=document.getElementById("toUserId").getAttribute("modelId");
    let Msg=msg.value;
    const res=await fetch(`/chats/${toUserId}`, {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json',
        },  
        body: JSON.stringify({Msg: Msg}),
    })
    let jsonRes=await res.json();
    console.log(jsonRes);

    sendMessage();
});



function addMsgToUI(isMe,Msg){
    const newChat=document.createElement("div");
    newChat.classList.add('chat');
    if(isMe){
        newChat.classList.add('chat-me');
    } else{
        newChat.classList.add('chat-you'); 
    }
    let arr=Date().toString().split(" ");
    let date=arr[2]+" "+arr[1]+", "+arr[3]+" ("+arr[0]+")";
    newChat.innerHTML=`
            <div class="content">
                <p>${Msg}</p>
            </div>

            <p class="date">Time: ${ arr[4]}</p>&nbsp;&nbsp;&nbsp;&nbsp;
            <p class="date">${ date}</p> `
        ;
    box.append(newChat);
    scrlToBtm();
}
function sendMessage(){
    let Msg=msg.value;
    msg.value="";
    addMsgToUI(true,Msg);
    socket.emit("message",Msg);
}

function scrlToBtm(){
    box.scrollTo(0,msgCont.scrollHeight);
}

socket.on("chat-message",(Msg)=>{
    addMsgToUI(false,Msg);
})