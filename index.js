// Remember to import the data and Dog class!
import dogs from '/data.js'
import Dog from '/Dog.js'

const acceptBtnEl = document.getElementById('acceptBtnEl')
const rejectBtnEl = document.getElementById('rejectBtnEl')


const dog = new Dog(dogs.shift())
document.getElementById('card').innerHTML = dog.getDogHtml()

acceptBtnEl.addEventListener("click", function(){
    dog.hasBeenLiked = true
    if (!acceptBtnEl.disabled) {
    document.getElementById("accept-badge").style.display = "block";
    acceptBtnEl.classList.add("accept-btn-clicked")
    selectionMade()}
})

rejectBtnEl.addEventListener("click", function(){
    if (!rejectBtnEl.disabled) {
    document.getElementById("reject-badge").style.display = "block";
    rejectBtnEl.classList.add("reject-btn-clicked")
    selectionMade()}
})

function selectionMade() {
    rejectBtnEl.disabled = true
    acceptBtnEl.disabled = true
    dog.hasBeenSwiped = true
    if (dogs.length > 0) {
        setTimeout(function(){
            const dog = new Dog(dogs.shift())
            document.getElementById('card').innerHTML = dog.getDogHtml()
            dog.hasBeenSwiped = false;
            document.getElementById("accept-badge").style.display = "none";
            document.getElementById("reject-badge").style.display = "none";
            acceptBtnEl.classList.remove("accept-btn-clicked");
            rejectBtnEl.classList.remove("reject-btn-clicked");
            rejectBtnEl.disabled = false
            acceptBtnEl.disabled = false
            }, 2000)
    }else {
        dog.noMoreDogs();
    }
}
