import React, { useState } from 'react'

interface BoardProps {
 rightWord: string;
}

const GAAME_STATUS = ["Right", "Wrong", "Wrong Index"];

interface GameStatus {
  char: string,
  style: string
}

const transformToObj = (word:string)=> {
 const newArray = word? word.split(''): [];
 return  newArray.map((char) => {
    return {
      char: char,
      style: ''
    }
  })
}
const Board = ({rightWord}: BoardProps) => {
  const [userValue, setUserValue] = useState('');
  const [gameStatus, setGameStatus] = useState(transformToObj(rightWord));

  const board = (
    <div className="board">
      <div className="row">
        {gameStatus.map(( {char, style}, index) => {
          return <div key ="index" className={`empty box ${style} `}></div>
        })}
      
      </div>
    </div>
  );

  const handleInput = (e:HTMLInputElement)=> {
    const value = e.target.value;
    setUserValue(value);
  }

  const isInCharInGameStatus = (gameStatus: GameStatus[], value:string) => {
    return gameStatus.some(({char}, statusIndex) => char === value);
  }
  const updateStatus = (gameStatus: GameStatus[], index:number, updatedValue: string) => {
    return gameStatus.map((status, statusIndex) => statusIndex === index ? {...status, style: updatedValue}: status);
  }
  const onSubmit = () => {
    // check the length of input and rightWord
       // if equeal
          // 

          console.log("On submit")
    const valueArray = userValue.split('');
    if(userValue.length === gameStatus.length){
        valueArray.forEach((valueChar, index) => {
            if( valueChar === gameStatus[index].char){
                setGameStatus((prevStatus) =>  updateStatus(prevStatus, index, 'green'))
            } else if (isInCharInGameStatus(gameStatus, valueChar)){
                setGameStatus((prevStatus) =>  updateStatus(prevStatus, index, 'yellow'))
            } else {
                setGameStatus((prevStatus) =>  updateStatus(prevStatus, index, 'gray'))
            }
          })
    }
      
  }
  const input = (
      <div>
          <input type='text' value={userValue} onChange={handleInput}></input>
          <button type='button' onClick={onSubmit}>Submit</button>
        </div>
  );
  return (
    <div>
      {board}
      {input}
    </div>
  )
}

export default Board;