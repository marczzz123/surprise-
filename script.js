const welcomeScreen = document.getElementById('welcome-screen');
const startButton = document.getElementById('start-btn');
const gameContainer = document.getElementById('game-container');
const messageBox = document.getElementById('message-box');
const finalMessage = document.getElementById('final-message');

const reasons = [
  "If I hurt you, it was never my intention… that’s why I’m asking for your forgiveness. I have what you’re looking for, and I just want to see you smile again.",
  "Because every day without you feels like poison… it drives me crazy and makes me question what’s real.",
  "Because no one knows better than you everything I did just to see you happy… and it wasn’t out of habit, it was because I truly loved you.",
  "Because I know you need a silly guy like me… who makes you laugh, says nonsense, and helps you forget the world for a while.",
  "Because you matter so much to me, even your words hurt… and still, I can’t stop loving you.",
  "Because only I know how to make you mad… and even then, I’ll always find a way to make you smile after.",
  "Because ever since you left, nothing has felt the same… and there are empty spaces only you could fill.",
  "Because no matter how many people I talk to… none of them touches my heart the way you used to.",
  "Because you might meet many people… but no one will give you as many surprises, love, and tenderness as I do. You know it, right? I'm one of a kind.",
  "Because if you gave me one more chance… I’d love to talk more, to avoid misunderstandings. I only need you—just you. We’ll have many kids, right?  I don’t need anyone else, only my mommy. I’d take care of you more than I do myself, because that’s what I believe you deserve. And between you and me.. I don’t think you’ll beat level 9"
];

const difficulty = [
  { duration: 1000 },
  { duration: 900 },
  { duration: 940 },
  { duration: 860 },
  { duration: 760 },
  { duration: 630 },
  { duration: 600 },
  { duration: 570 },
  { duration: 500 },
  { duration: 480 }
];


let currentIndex = 0;

startButton.addEventListener('click', () => {
  // Oculta la pantalla de bienvenida con doble seguridad
  welcomeScreen.classList.add('hidden');
  welcomeScreen.style.display = "none";

  gameContainer.classList.remove('hidden');
  spawnNextImage();
});

function spawnNextImage() {
  if (currentIndex >= reasons.length) {
    finalMessage.classList.remove('hidden');
    return;
  }

  // Asegúrate de que no haya corazones viejos
  gameContainer.innerHTML = "";

  const img = document.createElement('img');
  img.src = `corazon${currentIndex + 1}.png`;
  img.className = 'reason-image';

  const x = Math.random() * (window.innerWidth - 100);
  const y = Math.random() * (window.innerHeight - 100);
  img.style.left = `${x}px`;
  img.style.top = `${y}px`;

  gameContainer.appendChild(img);

  // Guardamos el temporizador para borrarlo si lo atrapa
  const respawnDelay = difficulty[currentIndex].duration;
  let respawnTimer = setTimeout(function retry() {
    // Si no ha hecho clic, desaparece y reaparece en otro lugar
    if (gameContainer.contains(img)) {
      img.remove();
      spawnNextImage(); // vuelve a generar el mismo corazón
    }
  }, respawnDelay);

  // Si lo atrapa, mostramos mensaje y cancelamos el bucle
  img.addEventListener('click', () => {
    clearTimeout(respawnTimer);
    img.remove();
    showMessage(reasons[currentIndex]);
  });
}

function showMessage(text) {
  messageBox.textContent = text;
  messageBox.classList.remove('hidden');

  // Aplica estilo de texto largo en celulares
  if (currentIndex === 9) {
    messageBox.classList.add('long-message');
  } else {
    messageBox.classList.remove('long-message');
  }

  let nextBtn = document.getElementById('next-btn');
  if (!nextBtn) {
    nextBtn = document.createElement('button');
    nextBtn.id = 'next-btn';
    nextBtn.textContent = 'next <3';
    messageBox.appendChild(document.createElement('br'));
    messageBox.appendChild(nextBtn);
  } else {
    nextBtn.classList.remove('hidden');
    messageBox.appendChild(nextBtn);
  }

  nextBtn.onclick = () => {
    messageBox.classList.add('hidden');
    nextBtn.classList.add('hidden');
    currentIndex++;
    spawnNextImage();
  };
}



