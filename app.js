 const tileDisplay = document.querySelector('.tile-container');
 const keyboard = document.querySelector('.key-container');
 const messageDisplay = document.querySelector('.message-container');
 
 // Test wordle before inplementing fetch 
 //const wordle="LUFFY";

let wordle ;

const getWordle= ()=>{
fetch('http://localhost:8000/word')
.then(response => response.json())
.then(json=>{
  console.log('The Wordle of the day is ',json)
  wordle= json.toUpperCase();
})
.catch(err=> console.log(err)  )
}
// Get word as soon as  The game starts 
getWordle();


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
 rowElement.append(tileElement)
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
  if(!isGameOver){
  //console.log('Clicked',letter)
  if(letter==="<="){
    deleteLetter()
    //console.log('delete letter')
    //console.log('guessRows',guessRows);
      return 
  }
  if(letter==="ENTER"){
   // console.log('check row for match')
   checkRow();
    //console.log('guessRows',guessRows);
    return 
  }

  addLetterToTile(letter)
  console.log('guessRows',guessRows);
}
}

addLetterToTile =(letter)=>{
  if(currentTile < 5 && currentRow < 6){
 const tile=  document.getElementById('guessRow-'+currentRow+'-tile-'+currentTile);
 tile.textContent=letter;
 guessRows[currentRow][currentTile]= letter;
 tile.setAttribute('data',letter)
 currentTile++
 //console.log('guessRows',guessRows);
  }
}

const deleteLetter =()=>{
  if(currentTile > 0 ){
  currentTile--;
  const tile = document.getElementById('guessRow-'+ currentRow +'-tile-'+currentTile);
  tile.textContent=' ';
  guessRows[currentRow][currentTile]= '';
  tile.setAttribute('data','')
}
}

const checkRow =()=>{
 const guess=  guessRows[currentRow].join('')

console.log('guess',guess)

   if(currentTile>4){
      // Check the guess row to see if its a word in dictionary  
      //cause the game actaully doesnt check the row until its  a word 
      fetch(`http://localhost:8000/check/?word=${guess}`)
      .then(response=> response.json())
      .then(json=>{
        console.log(json)
        if(json=='Entry word not found'){
          showMessage(' This Word no exist ')
          return 
        }
        else{
          console.log('your guess is '+ guess , 'wordle of the day is '+wordle );

          flipTile();
  
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
      })
      .catch(err=>console.log(err))

    
  }
}
const showMessage =(message)=>{
  const messageElement = document.createElement('p')
  messageElement.textContent = message;
  messageDisplay.append(messageElement);
  setTimeout(()=>messageDisplay.removeChild(messageElement),2000)
} 

const addColorToKey=(keyLetter,color)=>{
 const key =  document.getElementById(keyLetter);
    key.classList.add(color)
}

const flipTile=()=>{
const rowTiles=   document.querySelector('#guessRow-' + currentRow).childNodes
// Temp varialble to perform checks in the guess 
let checkWordle = wordle



// Gather all the data first and then assign the colors to each letter
const guess = []


rowTiles.forEach(tile=>{
  guess.push({letter:tile.getAttribute('data'),color:'grey-overlay'})
})

guess.forEach((guess,index)=>{
  if(guess.letter== wordle[index]){
guess.color='green-overlay';
checkWordle= checkWordle.replace(guess.letter,'') 
  }
})

guess.forEach(guess=>{
  if(checkWordle.includes(guess.letter)){
    guess.color='yellow-overlay'
    checkWordle= checkWordle.replace(guess.letter, '')
  }
})

rowTiles.forEach((tile,index) => {
setTimeout(()=>{
  tile.classList.add('flip')
  tile.classList.add(guess[index].color);
  addColorToKey(guess[index].letter, guess[index].color);
},500*index)

  })
}