let dino = document.getElementsByClassName('dino')[0]
let gameOver = document.getElementsByClassName('gameOver')[0]
let obstacle = document.getElementsByClassName('obstacle')[0]
let scoreContainer = document.getElementsByClassName('scoreContainer')[0]

let gameoverAudio = new Audio('gameover.mp3') 
let bgAudio = new Audio('music.mp3')

setTimeout(function(){
    // bgAudio.play()
}, 1000)

score = 0
cross = true;

document.onkeydown =  function(e){
    console.log("key code is: ", e.keyCode)     // To check the key code of the key that was triggered
    if(e.keyCode==38){
        dino.classList.add('animateDino')
        setTimeout(function(){
            dino.classList.remove('animateDino')
        }, 700)
    }
    if(e.keyCode==39){
        dinoX = parseInt(window.getComputedStyle(dino, null).getPropertyValue('left'))      // dino move right
        dino.style.left = dinoX + 112  + "px"
    }
    if(e.keyCode==37){
        dinoX = parseInt(window.getComputedStyle(dino, null).getPropertyValue('left'))      // dino move left
        dino.style.left = (dinoX - 112)  + "px"
    }
}

// To check the collisions of dino and obstacle
setInterval(function(){
    dino_x = parseInt(window.getComputedStyle(dino, null).getPropertyValue('left'))      // to get the computed style properties of an element.
    dino_y = parseInt(window.getComputedStyle(dino, null).getPropertyValue('top'))       

    obstacle_x = parseInt(window.getComputedStyle(obstacle, null).getPropertyValue('left'))
    obstacle_y = parseInt(window.getComputedStyle(obstacle, null).getPropertyValue('top'))

    offsetX = Math.abs(dino_x - obstacle_x)     // to get the absolute value of dx - ox
    offsetY = Math.abs(dino_y - obstacle_y)

    if(offsetX < 73 && offsetY < 52){          // to check if game is over
        gameOver.innerHTML = 'Game Over - Reload'
        obstacle.classList.remove('animateObstacle')

        gameoverAudio.play()
        
        setTimeout(function(){
            gameoverAudio.pause()
            bgAudio.pause()
        }, 1000)
    } else if(offsetX < 145 && cross){
        score+=1;
        updateScore(score);
        cross = false
        setTimeout(function(){
            cross = true
        }, 1000)

        setTimeout(function(){
            if (score % 3 == 0) { // Increase the speed every 3 points
                let currentDuration = parseFloat(window.getComputedStyle(obstacle, null).getPropertyValue('animation-duration'))
                let newDuration = currentDuration - 0.1
                obstacle.style.animationDuration = newDuration + 's'
            }
        }, 500)
    }
}, 10)

function updateScore(score){
    scoreContainer.innerHTML = "Your Score: " + score
}
// To check the collisions of dino and obstacle