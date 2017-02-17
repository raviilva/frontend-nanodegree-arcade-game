// Enemies our player must avoid
var Enemy = function(x,y) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started
    this.x = x;
    this.y = y;
    this.speed = Math.random() * 100;
    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x = this.x + this.speed*dt;
    if(this.x >= 500) {
        this.x = -150;
    }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
var Player = function(x,y) {
    this.sprite = 'images/char-boy.png';
    this.x = x;
    this.y = y;
 };
// This class requires an update(), render() and
// a handleInput() method.
    Player.prototype.update = function(dt) {
        if (this.y < 11) {
            alert("YOU WIN!");
            this.reset();
        }
        //Calls collsion function
        this.collision();
    };

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};



Player.prototype.handleInput = function(k) {
   switch (k) {
        case('left'):
            if(this.x - 50 >= 0){
                this.x -= 50;
            }
            break;
        case('up'):
            if(this.y < 20) {
                alert("You win!");
            }else{
                this.y -= 50;
            }
            break;
        case('right'):
            if(this.x < 420){
                this.x += 50;
            }
            break;
        case('down'):
            if(this.y < 420) {
                this.y += 50;
            }
            break;
        default:
            break;
   }
};

    Player.prototype.reset = function() {
        this.x = 200;
        this.y = 400;
    };


  Player.prototype.collision = function () {
    for (var i = 0; i < allEnemies.length; i++) {
      if (!(allEnemies[i].y + 50 < this.y ||
        allEnemies[i].y > this.y + 50 ||
        allEnemies[i].x + 50 < this.x ||
        allEnemies[i].x > this.x + 50)) {
        alert("Collision!")
        this.reset();
      }
    }
  }

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies

    var e1 = new Enemy(0, 50);
    var e2 = new Enemy(-100, 120);
    var e3 = new Enemy(-150, 250);
    var allEnemies = [e1, e2, e3];
    var player = new Player(210, 370);

// Place the player object in a variable called player

var player = new Player(200,380);

function checkCollisions(allEnemies, player) {
    for(var i = 0; i < 3; i++) {
        if (allEnemies[i].x < player.x + player.width &&
            allEnemies[i].x + allEnemies[i].width > player.x &&
            allEnemies[i].y < player.y +  player.height &&
            allEnemies[i].height + allEnemies[i].y > player.y){
            player.reset();
        }
    }
}



// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
