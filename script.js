/*Sahoosahab25*/
const username = 'Sahoosahab25'; 
document.onmousemove = function(e) {
    var mouse = document.getElementById("mouse");
    console.log(mouse.style);
    mouse.style.left = e.pageX + 1 + "px";
    mouse.style.top = e.pageY + 1 + "px";
  }
async function fetchData() {
    try {
        const statsResponse = await fetch(`https://api.chess.com/pub/player/${username}/stats`);
        const stats = await statsResponse.json();
        displayStats(stats);
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

function displayStats(stats) {
    const statsDiv = document.getElementById('stats');
    statsDiv.innerHTML = `
        <div class="neomorph-circle" style="--color: #ff6f61; --percent: ${calculatePercent(stats.chess_rapid.last.rating)};">
            <div class="circle-bar"></div>
            <div class="circle-inner">
                <p>Rapid: ${stats.chess_rapid.last.rating}</p>
            </div>
        </div>
        <div class="neomorph-circle" style="--color: #6b5b95; --percent: ${calculatePercent(stats.chess_blitz.last.rating)};">
            <div class="circle-bar"></div>
            <div class="circle-inner">
                <p>Blitz: ${stats.chess_blitz.last.rating}</p>
            </div>
        </div>
        <div class="neomorph-circle" style="--color: #88b04b; --percent: ${calculatePercent(stats.chess_bullet.last.rating)};">
            <div class="circle-bar"></div>
            <div class="circle-inner">
                <p>Bullet: ${stats.chess_bullet.last.rating}</p>
            </div>
        </div>
    `;
}

function displayGames(games) {
    const gamesDiv = document.getElementById('current-games');
    gamesDiv.innerHTML = games.games.map(game => `
        <div class="neomorph-circle" style="--color: #ffcc5c;">
            <div class="circle-bar" style="--percent: 100%;"></div>
            <div class="circle-inner">
                <p>Opponent: ${game.opponent.username}</p>
                <p>Status: ${game.status}</p>
                <a href="${game.url}" target="_blank">View Game</a>
            </div>
        </div>
    `).join('');
}

function calculatePercent(rating) {
    // Assuming the max rating as 3000 #Magnus
    const maxRating = 3000;
    return (rating / maxRating) * 100 + '%';
}

document.addEventListener('DOMContentLoaded', fetchData);
