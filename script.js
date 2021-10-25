
// variable //

document.addEventListener("DOMContentLoaded", () => {
    const grid = document.querySelector('.grid');
    let squares = Array.from(document.querySelectorAll('.grid div'));

    const scoreDisplay = document.querySelector('#score');
    const pauseBtn = document.querySelector('#pause');
    const width = 10; 

    top.location.href = 'tetris.html';

    let nextRandom = 0;
    let timerId;
    let score = 0;

    // Pieces // 

    const lPiece = [
        [1, width+1, width*2+1, 2],
        [width, width+1, width+2, width*2+2],
        [1, width+1, width*2+1, width*2],
        [width, width*2, width*2+1, width*2+2]
      ]
    
      const zPiece = [
        [0,width,width+1,width*2+1],
        [width+1, width+2,width*2,width*2+1],
        [0,width,width+1,width*2+1],
        [width+1, width+2,width*2,width*2+1]
      ]
    
      const tPiece = [
        [1,width,width+1,width+2],
        [1,width+1,width+2,width*2+1],
        [width,width+1,width+2,width*2+1],
        [1,width,width+1,width*2+1]
      ]
    
      const oPiece = [
        [0,1,width,width+1],
        [0,1,width,width+1],
        [0,1,width,width+1],
        [0,1,width,width+1]
      ]
    
      const iPiece = [
        [1,width+1,width*2+1,width*3+1],
        [width,width+1,width+2,width+3],
        [1,width+1,width*2+1,width*3+1],
        [width,width+1,width+2,width+3]
      ]

      const pieces = [lPiece, zPiece, tPiece, oPiece, iPiece];

      let currentPosition = 4;
      let currentRotation = 0;

      // ramdom pieces 

      let random = Math.floor(Math.random()*pieces.length)
      let current = pieces[random][currentRotation];

      // draw the first rotation 

      function draw(){
          current.forEach(index => {
              squares[currentPosition + index].classList.add('tetris');
          });
      }

      function undraw(){
        current.forEach(index => {
            squares[currentPosition + index].classList.remove('tetris');
        });
      }

      //move down

      //timerId = setInterval(moveDown, 700);

      // assign fucntions to keycodes

      function control(e) {
          if(e.keyCode === 37){
              moveLeft();
          } else if ( e.keyCode === 38){
              moveRotate();
          } else if (e.keyCode === 39){
              moveRight();
          } else if(e.keyCode === 40){
              //moveDown()
          }
      }

      document.addEventListener('keyup', control);

      function moveDown(){
        undraw();
        currentPosition += width;
        draw();
        freeze();
      }

      //freeza function 

      function freeze(){
          if(current.some(index => squares[currentPosition + index + width].classList.contains('taken'))){
              current.forEach(index => squares[currentPosition + index].classList.add('taken'))
                console.log('init')
              // start a new move down
              random = nextRandom
              nextRandom = Math.floor(Math.random()*pieces.length);
              current = pieces[random][currentRotation];
              currentPosition=4;
              draw()
              displayShape()
              addScore()
              endGame()
          }
      }

      // move avec propriété de collision

      function moveLeft() {
          undraw();
          const isAtLeftEdge = current.some(index => (currentPosition + index) % width === 0)

          if(!isAtLeftEdge) currentPosition -=1;

          if(current.some(index => squares[currentPosition + index].classList.contains('taken'))){
              currentPosition += 1;
          }
          draw()
      }

      function moveRight(){
          undraw();
          const isAtRightEdge = current.some(index => (currentPosition + index) % width === width -1);
          if (!isAtRightEdge) currentPosition +=1;

          if(current.some(index => squares[currentPosition + index].classList.contains('taken'))){
              currentPosition -=1; 
          }

          draw()
      }

      // rotate 

      function moveRotate(){
          undraw();

          currentRotation ++

          if(currentRotation === current.length){
              currentRotation = 0;
          }

          current = pieces[random][currentRotation];
      }

      // show next up

      const displaySquares = document.querySelectorAll('.mini--grid div');
      const displayWidth = 4;
      let displayIndex = 0;

      const upNextPieces = [
        [1, displayWidth+1, displayWidth*2+1, 2], //lTetromino
        [0, displayWidth, displayWidth+1, displayWidth*2+1], //zTetromino
        [1, displayWidth, displayWidth+1, displayWidth+2], //tTetromino
        [0, 1, displayWidth, displayWidth+1], //oTetromino
        [1, displayWidth+1, displayWidth*2+1, displayWidth*3+1] //iTetromino
      ]

      // display shape

      function displayShape(){
          displaySquares.forEach(squares => {
              squares.classList.remove('tetris')
          })
          upNextPieces[nextRandom].forEach( index => {
              displaySquares[displayIndex + index].classList.add('tetris')
          })
      }


      // function start -- btn

      pauseBtn.addEventListener('click', ()=>{
        if (timerId){
            clearInterval(timerId);
            timerId = null
        } else {
            draw();
            timerId = setInterval(moveDown, 200);
            nextRandom = Math.floor(Math.random()*pieces.length);
            displayShape();
        }
      });

      function addScore(){
          for (let i = 0; i < 199 ; i+= width) {
             const row = [i, i+1, i+2, i+3, i+4, i+5, i+6, i+7, i+8, i+9];
              if(row.every(index => squares[index].classList.contains('taken'))) {
                  score += 10;
                  scoreDisplay.innerHTML = score;
                  row.forEach(index => {
                      squares[index].classList.remove('taken');
                      squares[index].classList.remove('tetris');
                  })
                  const squaresRemoved = squares.splice(i, width);
                  squares = squaresRemoved.concat(squares)
                  squares.forEach(cell => grid.appendChild(cell))
              }
          }
      }

      // end game

      function endGame(){
          if(current.some(index => squares[urrentPosition + index].classList.contains('taken'))){
              scoreDisplay.innerHTML = 'end';
              clearInterval(timerId);
          }
      }




})
