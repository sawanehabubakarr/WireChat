//Toogle Button
const arrowBackIcon = document.querySelector('.rightSide .header ion-icon[name="arrow-back-outline"]');
const rightSide = document.querySelector('.rightSide');
const leftSide = document.querySelector('.LeftSide');

arrowBackIcon.addEventListener('click', () => {
    // Check if the right side is currently visible
    if (window.getComputedStyle(rightSide).display !== 'none') {
        // Hide the right side and show the left side
        rightSide.style.display = 'none';
        leftSide.style.display = 'block';
    } else {
        // If the right side is hidden, show it again
        rightSide.style.display = 'block';
        leftSide.style.display = 'none';
    }
});




// Chat List
const chatItems = document.querySelectorAll('.block');
const userImageElement = document.querySelector('body > div > div.rightSide > div.header > div > div > img');

chatItems.forEach((item) => {
    item.addEventListener('click', () => {
        // Remove "active" class from all chat items
        chatItems.forEach((chatItem) => {
            chatItem.classList.remove('active');
        });

        // Add "active" class to the clicked chat item
        item.classList.add('active');
      if (window.innerWidth <= 768) {
        rightSide.style.display = 'block';
        leftSide.style.display = 'none';
      }
        // Get the details of the clicked chat
        const chatName = item.querySelector('.listHead h4').textContent;
        const lastMessage = item.querySelector('.message_p p').textContent;
        const userImageSrc = item.querySelector('.imgbx img').getAttribute('src');
        
        // Update the right side of the container with the chat details
        const chatTitleElement = document.querySelector('.imgText h4');
        const chatLastMessageElement = document.querySelector('.chatBox');

        chatTitleElement.textContent = chatName;
        userImageElement.setAttribute('src', userImageSrc);
        chatLastMessageElement.innerHTML = `<div class="message frnd_message">
                                                <p>${lastMessage}<br><span>12:15</span></p>
                                            </div>`;
    });
});




// Chat Input (GOOD)
const sendButton = document.querySelector('.chatbox_input ion-icon[name="send-outline"]');
const messageInput = document.querySelector('.chatbox_input input');
const chatBox = document.querySelector('.chatBox');

sendButton.addEventListener('click', sendMessage);
messageInput.addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
        sendMessage();
    }
});

function sendMessage() {
    const messageText = messageInput.value.trim();
    if (messageText !== '') {
        // Add the message to the chat conversation
        const messageElement = document.createElement('div');
        messageElement.classList.add('message', 'my_message');
        messageElement.innerHTML = `<p>${messageText}<br><span>${getCurrentTime()}</span></p>`;
        chatBox.appendChild(messageElement);

        // Clear the input field
        messageInput.value = '';
    }
}

function getCurrentTime() {
    const now = new Date();
    return now.getHours() + ':' + (now.getMinutes() < 10 ? '0' : '') + now.getMinutes();
}


// Search functionality (GOOD)
const searchInput = document.querySelector('.search_chat input');
const chatList = document.querySelector('.chatlist');

searchInput.addEventListener('input', filterChats);

function filterChats() {
    const searchTerm = searchInput.value.toLowerCase();
    const chatItems = chatList.querySelectorAll('.block');
    
    chatItems.forEach((item) => {
        const chatName = item.querySelector('.listHead h4').textContent.toLowerCase();
        if (chatName.includes(searchTerm)) {
            item.style.display = 'block';
        } else {
            item.style.display = 'none';
        }
    });
}
