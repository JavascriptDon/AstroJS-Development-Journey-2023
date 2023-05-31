import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-app.js"
import { getDatabase, ref, push, onValue, remove, update } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-database.js"

const appSettings = {
    databaseURL: "YOUR_FIREBASE_URL"
}

const app = initializeApp(appSettings)
const database = getDatabase(app)
const endorsementDB = ref(database, "endorsementlist")

const endorsementEl = document.getElementById("endorsement-el") // textarea
const btn = document.getElementById("btn")
const endorsementListEl = document.getElementById("endorsement-list")
const fromEl = document.getElementById("from-el")
const toEl = document.getElementById("to-el")

btn.addEventListener("click", function() {
  let endorsementValue = endorsementEl.value
  let fromValue = fromEl.value
  let toValue = toEl.value

  if ((endorsementValue, fromValue, toValue)) {
    push(endorsementDB, {
      message: endorsementValue,
      author: fromValue,
      to: toValue,
      isLiked: false,
      likes: 0,
    })
    clearInputEl()
  } else {
    endorsementListEl.innerHTML = "No endorsements here... yet"
  }
})

onValue(endorsementDB, function(snapshot) {
     if (snapshot.exists()) {
        let messagesArray  = Object.entries(snapshot.val())
    
        clearEndorsementListEl()

       for (let message of messagesArray ) {
            createEndorsementCard(message[0], message[1])
            updateLikes(message[0], message[1])
    }
  } else {
    endorsementListEl.innerHTML = `No endorsements here... yet`
  }

})

function clearInputEl() {
    endorsementEl.value = ""
    fromEl.value = ""
    toEl.value = ""
}

function clearEndorsementListEl() {
    endorsementListEl.innerHTML = ""
}

function createEndorsementCard(id, item) {
  endorsementListEl.innerHTML += `
  <li class="card">
    <div class="card-header">
      To <span>${item.to}</span>
    </div>
    ${item.message} 
    <div class="card-footer">
      From&nbsp;<span>${item.author}</span>
      <div class="likes-container">
      <i class="${item.isLiked ? "bx bxs-heart" : "bx bx-heart"}" data-like="${id}"></i>
        <span id="like-icon-btn">${item.likes}</span>
      </div>
    </div>
  </li>
  `
}

function updateLikes(id, item) {
  const likeIcon = document.querySelector(`[data-like="${id}"]`);
  const likeCount = likeIcon.nextElementSibling;

  const exactLocationOfItemInDB = ref(database, `endorsementList/${id}`);

  likeIcon.addEventListener("click", () => {
    const isLiked = !item.isLiked;
    const updatedLikes = isLiked ? item.likes + 1 : item.likes - 1;

    update(exactLocationOfItemInDB, { isLiked, likes: updatedLikes });
  });

  onValue(exactLocationOfItemInDB, (snapshot) => {
    const updatedItem = snapshot.val();

    if (updatedItem) {
      item.isLiked = updatedItem.isLiked;
      item.likes = updatedItem.likes;

      likeIcon.className = item.isLiked ? "bx bxs-heart" : "bx bx-heart";
      likeCount.textContent = item.likes;
    }
  });
}
