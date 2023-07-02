class Dog {
    constructor(data) {
        Object.assign(this, data);
    }

    getDogHtml() {
        const {name, avatar, age, bio, hasBeenSwiped, hasBeenLiked} = this
        return `
            <img class="dog-img" src=${avatar}>
            <div class="dog-info">
                <h1 class="name-age">${name}, ${age}</h1>
                <p class="dog-bio">${bio}</p>
            </div>
            
            `;
    }

   noMoreDogs() {
        document.getElementById("card").innerHTML = `
            <div class="no-dogs">
                <h1>🐶⁉️</h1>
                <h2>There are no more dogs in your area</h2>
                <p>Click the paw logo to try again</p>
            </div>
        `;
        document.getElementById("accept-badge").style.display = "none";
        document.getElementById("reject-badge").style.display = "none";
        document.getElementById("acceptBtnEl").style.display = "none";
        document.getElementById("rejectBtnEl").style.display = "none";
    }
    
}

export default Dog;