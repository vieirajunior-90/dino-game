const dino = document.querySelector('.dino');
const background = document.querySelector('.background');
let isJumping = false;
let position = 0;

function handleKeyUp(e) {
  const key = e.key;
  if (key === 'ArrowUp') {
    if(!isJumping) {
        jump();
    }
  }
}

function jump() {
    isJumping = true;

    let upInterval = setInterval(() => {
       if (position >= 150) {
           clearInterval(upInterval);

           let downInterval = setInterval(() => {
                if (position <= 0) {
                    clearInterval(downInterval);
                    isJumping = false;
                } else {
                    position -= 10;
                    dino.style.bottom = position + 'px';
                }
            }, 20);
        } else {
            position += 10;
            dino.style.bottom = position + 'px'; 
        }
    });
}

function createCactus() {
    const cactus = document.createElement('div');
    let cactusPosition = 1000;
    let randomTime = Math.floor(Math.random() * 6000);

    cactus.classList.add('cactus');
    cactus.style.left = cactusPosition + 'px';
    background.appendChild(cactus);

    let leftInterval = setInterval(() => {
        cactusPosition -= 10;
        cactus.style.left = cactusPosition + 'px';

        if (cactusPosition < -60) {
            clearInterval(leftInterval);
            background.removeChild(cactus);
        } 
        else if (cactusPosition < 60 && cactusPosition > 0 && position < 60) {
            clearInterval(leftInterval);
            window.location.href = 'game-over.html';
        }
        else{
            cactusPosition -= 10;
            cactus.style.left = cactusPosition + 'px';
        }
    }, 50);

    setTimeout(createCactus, randomTime);
}

createCactus();

document.addEventListener('keyup', handleKeyUp);