 const tileDisplay = document.querySelector('.tile-container');
 const keyboard = document.querySelector('.key-container');
 const messageDisplay = document.querySelector('.message-container');
 
 const wordle="LUFFY";

 const keys = [
  'Q',
  'W',
  'E',
  'R',
  'T',
  'Y',
  'U',
  'I',
  'O',
  'P',
  'A',
  'S',
  'D',
  'F',
  'G',
  'H',
  'J',
  'K',
  'L',
  'ENTER',
  'Z',
  'X',
  'C',
  'V',
  'B',
  'N',
  'M',
  '<=',
]
const guessRows = [
  ['', '', '', '', ''],
  ['', '', '', '', ''],
  ['', '', '', '', ''],
  ['', '', '', '', ''],
  ['', '', '', '', ''],
  ['', '', '', '', '']
]

//Variables to set where the first letter goes 
let currentRow= 0;
let currentTile= 0;

// variable to check if the game is over 
let isGameOver = false;

guessRows.forEach((guessRow,guessRowIndex) =>{
const rowElement = document.createElement('div')
rowElement.setAttribute('id','guessRow-'+guessRowIndex)
guessRow.forEach((guess,guessIndex)=>{
 const tileElement= document.createElement('div')
 tileElement.setAttribute('id','guessRow-'+guessRowIndex+'-tile-'+guessIndex)
 tileElement.classList.add('tile')
 rowElement.appendChild(tileElement)
})
tileDisplay.append(rowElement)
})


keys.forEach(key=>{
  const buttonElement= document.createElement('button')
  buttonElement.textContent = key
  buttonElement.setAttribute('id',key)
  buttonElement.addEventListener('click',()=>handleClick(key))
  keyboard.append(buttonElement)
})

const handleClick=(letter)=>{
  console.log('Clicked',letter)
  if(letter==="<="){
    deleteLetter()
    //console.log('delete letter')
    console.log('guessRows',guessRows);
      return 
  }
  if(letter==="ENTER"){
   // console.log('check row for match')
   checkRow();
    console.log('guessRows',guessRows);
    return 
  }

  addLetterToTile(letter)
  console.log('guessRows',guessRows);
}


addLetterToTile =(letter)=>{
  if(currentTile < 5 && currentRow < 6){
 const tile=  document.getElementById('guessRow-'+currentRow+'-tile-'+currentTile);
 tile.textContent=letter;
 guessRows[currentRow][currentTile]= letter;
 tile.setAttribute('data',letter)
 currentTile++
 console.log('guessRows',guessRows);
  }
}

const deleteLetter =()=>{
  if(currentTile > 0 ){
  currentTile--;
  const tile = document.getElementById('guessRow-'+currentRow+'-tile-'+currentTile);
  tile.textContent="";
  guessRows[currentRow][currentTile]= letter;
  tile.setAttribute('data',letter)
}
}

const checkRow =()=>{
  if(currentTile>4){
   const guess=  guessRows[currentRow].join('')
   console.log('your guess is '+ guess , 'wordle of the day is '+wordle );

          if (wordle == guess){
            showMessage('Sheeesh magnifique!') 
            isGameOver=true ;
            return
          }
          else{
            if ( currentRow>=5){
              isGameOver=true ;
              showMessage(' DAMN BOI GAME OVER!')
              return 
            }
            if(currentRow<5){
              currentRow++; 
              currentTile=0;
            }

          }
  }
}
const showMessage =(message)=>{
  const messageElement = document.createElement('p')
  messageElement.textContent = message;
  messageDisplay.append(messageElement);
  setTimeout(()=>messageDisplay.removeChild(messageElement),2000)
} 

const flipTile=()=>{
const rowTiles=   document.querySelector('guessrow-' + currentRow).childNodes
rowTiles.forEach(tile => {
  const dataLetter= tile.getAttribute('data');
  if(dataLetter== wordle[index]){

    tile.classList.add('green-overlay')
  }
})
}