const colorPickerEl = document.getElementById('color-picker')
const selectModeEl = document.getElementById('select-color')
const getColorBtn = document.getElementById('color-btn')

getColorBtn.addEventListener('click', getColorScheme)

function getColorScheme(){
    const colorCode = colorPickerEl.value.slice(1)
    const selectedMode = selectModeEl.value
    
    fetch(`https://www.thecolorapi.com/scheme?hex=${colorCode}&mode=${selectedMode}&count=5`)
        .then(res => {
            if(!res.ok){
               throw new Error(res.status)
            } 
            return res.json()
         })
        .then(data => renderColors(data)) 
        .catch(error => console.error(error))          
}

function renderColors(data){
    document.getElementById('color-container').innerHTML = ``
    
        for (let i=0; i < 5; i++){
            document.getElementById('color-container').innerHTML += 
            `<div id="color-${i}" class="color-column">
                ${data.colors[i].hex.value}
            </div>`
            
            document.getElementById(`color-${i}`).style.backgroundColor = data.colors[i].hex.value
        }
}

function copyToClipboard(text) {
    const textarea = document.createElement('textarea');
    textarea.value = text;
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand('copy');
    document.body.removeChild(textarea);
  }
  
  // Add event listener to the color container after rendering the colors
  document.getElementById('color-container').addEventListener('click', function(event) {
    const clickedColor = event.target;
    if (clickedColor.classList.contains('color-column')) {
      const hexCode = clickedColor.textContent;
      copyToClipboard(hexCode);
      alert(`Hex code ${hexCode} copied to clipboard!`);
    }
  });
  