import { Player } from './player.js';

const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const scoreElement = document.getElementById('score');

canvas.width = 800;
canvas.height = 400;

const player = new Player(canvas.height);
let obstacles = [];
let frame = 0;
let score = 0;
let isGameOver = false;

function spawnObstacle() {
    if (frame % 80 === 0) {
        obstacles.push({
            x: canvas.width,
            y: canvas.height - 80,
            w: 30,
            h: 30
        });
    }
}

function gameLoop() {
    if (isGameOver) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw Floor
    ctx.fillStyle = "#222";
    ctx.fillRect(0, canvas.height - 50, canvas.width, 50);

    player.update();
    player.draw(ctx);

    spawnObstacle();

    obstacles.forEach((obs, i) => {
        obs.x -= 7; // Speed
        
        // Draw Triangle Spike
        ctx.fillStyle = "#ff4757";
        ctx.beginPath();
        ctx.moveTo(obs.x, obs.y + obs.h);
        ctx.lineTo(obs.x + obs.w / 2, obs.y);
        ctx.lineTo(obs.x + obs.w, obs.y + obs.h);
        ctx.fill();

        // Simple Collision
        if (player.x < obs.x + obs.w &&
            player.x + player.width > obs.x &&
            player.y < obs.y + obs.h &&
            player.y + player.height > obs.y) {
            isGameOver = true;
            alert(`Score: ${score} - Reload to try again!`);
            location.reload();
        }

        if (obs.x + obs.w < 0) {
            obstacles.splice(i, 1);
            score++;
            scoreElement.innerText = score;
        }
    });

    frame++;
    requestAnimationFrame(gameLoop);
}

// Controls
window.addEventListener('keydown', (e) => { if (e.code === 'Space') player.jump(); });
window.addEventListener('mousedown', () => player.jump());

gameLoop();
