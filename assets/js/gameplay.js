var theGame = function(game) {
    // variables user
    ball = "";
    paddle = "";
    bricks = "";
    ballOnPaddle = true; // START THE BALL ON THE PADDLE
    score = 0; // score for our game
    scoreText = "";
    timerText = ""; // displays for score
    lives = "";
    gameMusic = "";
    ballHitItemSound = "";
    soundButton = ""; // M for sound
    orbhit = ""; // when an orb is hit
    crowdBoo = ""; // when lose
    starfield = ""; // scrolling background
    pauseButton = "";
    quitButton = ""; // Q quit button
    timerTotal = 0; // total number of seconds the timer has left
    timerText = ""; // displays for score
    timer = "";
    score = 0; // score for our game
    scoreText = "";
    lifeImage = ""; // UI for lives
    livesText = "";
    indicatedLevel = "0"; // ui display indicated level that the player is on
    currentLevel = "1"; // level user is currently on
    w = 800, h = 600; // height and width of screen size




    player = ""; // our player
    platforms = ""; // player collisions will use this 
    stars = "";
    rocks = ""; // game interactions
    trashPile = "";
    cursors = ""; // arrow keys to move
    fireButton = ""; // spacebar fire init
    
    
    
    pause_label = "";
    choiseLabel = ""; // displays fpr pause and choice label
    
    music = "";
    walkmusic = "";
    timerEndMusic = ""; // audio for game
    rockReleaseTimer = ""; // timers for game setup, one for level time, one for rocks
    trashReleaseTimer = ""; // timer for trash release
    menu = ""; // our temp game menu
    remainingStars = []; // hold number of remaining stars from level to know when the game is done
    rocksYouHit = 0; // rocks hit starting at zero every level
    rocksYouCollected = 0; // rocks collected to get to next level
    rockLifeTracker = 0;
    endScoreText = ""; // display for game end message
    quitGameText = ""; // end game and return to main menu
    remainingLives = "";
    live = ""; // vars for lives tracking throughout the game
    explosions = ""; // explosions on rock hits
    highScore = ""; // tell whether or not the player can move on to the next level
    
    levelData = "";
    bonusLevelData = ""; // level and bonus data gathered from json file
    shipSpecsData = ""; // ship specs from json file
    indexedLevel = 0; // level starting at zero in the array 
    bonusLevel = 0; // bonus level starting at zero in the array
    healthLife = ""; // health pack creation for a new player life throughtout the game
    
    men = ""; // number of tracked lives
    //var playerScores = [];                  // keep track of high scores
    healthpacksound = "";
    winsong = "";
    timesupsound = "";
    nextLevelSound = "";
    
    livesLost = "";
    scoreBoard = "";
    scoreBoardFullData = ""; // scoreboard for player
    endGameTrophy = ""; // when game is done, (asset)
    // intro variables
    startGameButton = ""; // button to start it all
    soundIcon = "";
    isGameSoundOn = true;
    popupNotification = ""; // popup text for star collect, trash pile item, health collect

    // bullet data
    bullet = "";
    bullets = "";
    bulletTime = 0;

    inventoryItems = ['fuel', 'fire', 'cpu', 'wrench', 'rocket']; // items that a user can collect
    inventoryItemsGroup = ""; // to hold single inventory items
    singleInventoryItemName = ""; // name of random floating item
    fireCollected = 0;
    fuelCollected = 0;
    cpuCollected = 0;
    rocketCollected = 0;
    wrenchCollected = 0;
    orbsCollected = 0;

    trackLives = 0; // UI for lives

    rockTrackerUIText = ""; // UI for rock tracker

    collectedItemsData = ""; // UI group for gameover stats
    yourShipSpec = "";

    // music box
    songBox = ['song1','song2','song3','song4'];
    gameSong = "";



}

theGame.prototype = {
    create: function() {

        this.game.physics.startSystem(Phaser.Physics.ARCADE);

        //  We check bounds collisions against all walls other than the bottom one
        this.game.physics.arcade.checkCollision.down = false;

        // The scrolling starfield background
        starfield = this.game.add.tileSprite(0, 0, 800, 600, 'starfield');

        ballOnPaddle = true;

        // get the bricks ready
        bricks = this.game.add.group();
        bricks.enableBody = true;
        bricks.physicsBodyType = Phaser.Physics.ARCADE;


        timerEndMusic.volume = timerEndMusic.volume * 0.5;

        // Create our Timer
        timer = this.game.time.create(false);

        timerText = this.game.add.text(306, 16, 'Time: 30', {
            font: '32px Helvetica',
            fill: '#ffffff'
        });

        scoreText = this.game.add.text(16, 16, '0', {
            font: '32px Helvetica',
            fill: '#ffffff'
        });

        orbhit = this.game.add.audio('orbhit');
        orbhit.volume = 0.5;
        crowdBoo = this.game.add.audio('crowdBoo');
        ballHitItemSound = this.game.add.audio('ballHitItemSound');
        ballHitItemSound.volume = 0.3;

        //start game song
        gameMusic = this.game.add.audio('gameSong');
        gameMusic.volume = 0;
        //gameSong.loopFull(1);
        
        this.game.add.tween(gameMusic).to({volume:1}, 4500, null, true);
        gameMusic.play('', 0, 1, true);

        // pause menu
        pause_label = this.game.add.text(w - 120, 20, 'Pause', {
            font: '24px Helvetica',
            fill: '#ffffff'
        });
        pause_label.inputEnabled = true;
        pause_label.input.useHandCursor = true;
        pause_label.events.onInputUp.add(this.pause, this);

        // caculate level for game
        currentLevel = indexedLevel + 1;
        
        indicatedLevel = this.game.add.text(w - 80, h - 50, 'Level: ' + currentLevel, {
            font: '22px Helvetica',
            fill: '#ffffff'
        });

        /*
        rockReleaseTimer = this.game.time.create(false);
        trashReleaseTimer = this.game.time.create(false);

        // load json sheet level data
        levelData = JSON.parse(this.game.cache.getText('levels'));
        console.log(levelData);
        // load json sheet bonus level data
        bonusLevelData = JSON.parse(this.game.cache.getText('bonusLevels'));
        console.log(bonusLevelData);
        // load json sheet ship specs data
        shipSpecsData = JSON.parse(this.game.cache.getText('shipSpecs'));
        console.log(shipSpecsData);

        // get ship type from specs
        if (localStorage.getItem('spaceblaster_inventory') !== null) {
            var itemsStored = JSON.parse(localStorage.getItem('spaceblaster_inventory'));
            // store in local variable
            yourShipSpec = itemsStored.data.ship; 
        } */

        // music and sound effects for game
        //gameMusic = this.game.add.audio('gameMusic');
        walkmusic = this.game.add.audio('walking');
        //timerEndMusic = this.game.add.audio(shipSpecsData.shipData.ships[yourShipSpec].sound);
        healthpacksound = this.game.add.audio('healthpacksound');
        winsong = this.game.add.audio('winsong');
        timesupsound = this.game.add.audio('timesupsound');
        nextLevelSound = this.game.add.audio('nextLevelSound');
        livesLost = this.game.add.audio('livesLost');



        /*
        stars = this.game.add.group();
        rocks = this.game.add.group();
        trashPile = this.game.add.group();
        inventoryItemsGroup = this.game.add.group();
        stars.enableBody = true;
        rocks.enableBody = true;
        trashPile.enableBody = true;
        stars.alpha = 0;
        rocks.alpha = 0;
        trashPile.alpha = 0;

        // explosion particles
        explosionShardGroup = this.game.add.group(); //Create group for dust 
        explosionShardGroup.enableBody = true;
        explosionShardGroup.physicsBodyType = Phaser.Physics.ARCADE;

        // Adding the fading animations to the stars and rocks
        this.game.add.tween(stars).to({
            alpha: 1
        }, 2000, Phaser.Easing.Linear.None, true, 0, 0, true);
        this.game.add.tween(rocks).to({
            alpha: 1
        }, 1000, Phaser.Easing.Linear.None, true, 0, 0, true);
        this.game.add.tween(trashPile).to({
            alpha: 1
        }, 1000, Phaser.Easing.Linear.None, true, 0, 0, true);

        //  An explosion pool
        explosions = this.game.add.group();
        explosions.createMultiple(30, 'kaboom');
        explosions.forEach(this.setupRockExplosion, this);

        

        

         */

        // initialize game
        this.createLives();
        this.soundCheck();
        this.startTimer();
        this.createBricks();
        this.createPaddle();
        this.createBall();
        //this.createBullets();
        //this.createTrash();
        //this.createRockTracker();
        //this.createShards();

        // pause menu
        /*
        pause_label = this.game.add.text(w - 110, 16, 'Menu', {
            font: '24px Helvetica',
            fill: '#ffffff'
        });
        pause_label.inputEnabled = true;
        pause_label.input.useHandCursor = true;
        pause_label.events.onInputUp.add(this.pause, this);

    */

        this.game.input.onDown.add(this.releaseBall, this);

        // Add a input listener that can help us return from being paused
        this.game.input.onDown.add(this.unpause, this);
        //cursors = this.game.input.keyboard.createCursorKeys();
        //fireButton = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
        pauseButton = this.game.input.keyboard.addKey(Phaser.Keyboard.P);
        soundButton = this.game.input.keyboard.addKey(Phaser.Keyboard.M);
        quitButton = this.game.input.keyboard.addKey(Phaser.Keyboard.Q);
        
    },
    update: function() {
        //  Scroll the background
        starfield.tilePosition.y += 5;

        // paddle movement
        paddle.x = this.game.input.x;

        if (paddle.x < 25)
        {
            paddle.x = 25;
        }
        else if (paddle.x > this.game.width - 25)
        {
            paddle.x = this.game.width - 25;
        }

        if (ballOnPaddle)
        {
            ball.body.x = paddle.x;
        }
        else
        {
            this.game.physics.arcade.collide(ball, paddle, this.ballHitPaddle, null, this);
            this.game.physics.arcade.collide(ball, bricks, this.ballHitBrick, null, this);
        }

        // pause game
            if (pauseButton.isDown) {
                if (this.game.paused == false) {
                    this.pause();
                } else {
                    console.log("this one");
                    this.unpause(this.game.paused);
                }

            }

        if (quitButton.isDown) {
                
                this.quitGame();
        }    

        soundButton.onDown.add(this.toggleSound, this);


        /*healthLife.rotation += 0.1;
        

        trashPile.forEach(function(item) {

            // Update alpha first.
            item.rotation += 0.1;
            
        });

        stars.forEach(function(item) {

            // Update alpha first.
            item.rotation += 0.3;
            
        });

        inventoryItemsGroup.forEach(function(item) {

            // Update alpha first.
            item.rotation += 0.3;
            
        });

        //  Run collision
        // gain points and time
        this.game.physics.arcade.overlap(bullets, rocks, this.collectRock, null, this);
        this.game.physics.arcade.overlap(player, stars, this.collectStar, null, this);
        // inventory collection
        this.game.physics.arcade.overlap(player, inventoryItemsGroup, this.collectSingleInventoryItem, null, this);
        // player will die if this happens
        this.game.physics.arcade.overlap(player, rocks, this.lifeLost, null, this);
        this.game.physics.arcade.overlap(player, trashPile, this.lifeLost, null, this);
        // gain life
        this.game.physics.arcade.overlap(healthLife, player, this.collectHealthPack, null, this);
        // find an item
        this.game.physics.arcade.overlap(trashPile, bullets, this.collectTrash, null, this);
        // bullets hitting stars
        this.game.physics.arcade.collide(bullets, stars, this.bounceOrb, null, this);
        // bounces
        this.game.physics.arcade.collide(stars, rocks);
        this.game.physics.arcade.collide(rocks, rocks);
        this.game.physics.arcade.collide(stars, stars);
        this.game.physics.arcade.collide(healthLife, rocks);
        this.game.physics.arcade.collide(healthLife, stars);

        this.game.physics.arcade.collide(rocks, trashPile);
        this.game.physics.arcade.collide(stars, trashPile);
        this.game.physics.arcade.collide(healthLife, trashPile);

        this.game.physics.arcade.collide(healthLife, inventoryItemsGroup);
        this.game.physics.arcade.collide(stars, inventoryItemsGroup);
        this.game.physics.arcade.collide(rocks, inventoryItemsGroup);


        // make sure player can still move if in fact the game timer is still ticking
        if (timerTotal > 0) {

            if (cursors.up.isDown) {
                this.game.physics.arcade.accelerationFromRotation(player.rotation, shipSpecsData.shipData.ships[yourShipSpec].acceleration, player.body.acceleration);
            } else {
                player.body.acceleration.set(0);
            }

            if (cursors.left.isDown) {
                player.body.angularVelocity = -300;
            } else if (cursors.right.isDown) {
                player.body.angularVelocity = 300;
            } else {
                player.body.angularVelocity = 0;
            }

            if (this.game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR)) {
                this.fireBullet();
            }

            //player.rotation = this.game.physics.arcade.angleToPointer(player);

            if (this.game.input.activePointer.isDown) {
                this.fireBullet(player);
            }


            // pause game
            if (pauseButton.isDown) {
                if (this.game.paused == false) {
                    this.pause();
                } else {
                    console.log("this one");
                    this.unpause(this.game.paused);
                }

            }

            // toggle game sound

            soundButton.onDown.add(this.toggleSound, this);

            // toggle game sound
            if (quitButton.isDown) {
                
                this.quitGame();
            }

        } else {
            //  Stand still
            //player.animations.stop();
        }

        this.screenWrap(player); */
        
    },
    /*******************************************************************************
     *
     *  Initialize rock explosion
     *
     *******************************************************************************/
    setupRockExplosion: function(explosion) {

        explosion.anchor.x = 0.5;
        explosion.anchor.y = 0.5;
        explosion.animations.add('kaboom');

    },
    /*******************************************************************************
     *
     *  Create Trash objects
     *
     *******************************************************************************/
    createTrash: function(type) {

        var trashTimer = "";
        var pileNumber = "";

        if (type == "bonus") {
            trashTimer = bonusLevelData.bonuslevelsData.levels[bonusLevel].trashReleaseTimer;
            pileNumber = bonusLevelData.bonuslevelsData.levels[bonusLevel].trashPileNumbers;
        } else {
            trashTimer = levelData.levelsData.levels[indexedLevel].trashReleaseTimer;
            pileNumber = levelData.levelsData.levels[indexedLevel].trashPileNumbers
        }

        trashReleaseTimer.loop(trashTimer, function() {

            for (var t = 0; t < pileNumber; t++) {
                //  Create a star inside of the 'rocks' group 
                var trash = trashPile.create(t * 100, 0, 'trash');

                //  Let gravity do its thing
                //player.body.velocity.x = game.rnd.integerInRange(50, 350);
                trash.body.gravity.y = this.game.rnd.integerInRange(11, 11);
                trash.body.rotation = 50;
                trash.body.angularVelocity = 300;
                trash.reset(this.game.rnd.integerInRange(50, 750), this.game.rnd.integerInRange(50, 750));
                trash.anchor.setTo(0.5,0.5);

                this.game.add.tween(trash).to({
                    alpha: 1
                }, 1000, Phaser.Easing.Linear.None, true, 0, 0, true);
            }


        }, this);

        trashReleaseTimer.start();
    },
    /*******************************************************************************
     *
     *  Create Bullets, and get them ready
     *
     *******************************************************************************/
    createBullets: function() {

        //  Our ships bullets
        bullets = this.game.add.group();
        bullets.enableBody = true;
        bullets.physicsBodyType = Phaser.Physics.ARCADE;

        //  All 40 of them
        bullets.createMultiple(30, shipSpecsData.shipData.ships[yourShipSpec].bulletType);
        bullets.setAll('anchor.x', 0.5);
        bullets.setAll('anchor.y', 0.5);

    },
    /*******************************************************************************
     *
     *  Create the paddle
     *
     *******************************************************************************/
    createPaddle: function () {

        // create paddle
        paddle = this.game.add.sprite(this.game.world.centerX, 500, 'paddle1');
        paddle.anchor.setTo(0.5, 0.5);

        this.physics.enable(paddle, Phaser.Physics.ARCADE);

        paddle.body.collideWorldBounds = true;
        paddle.body.bounce.set(1);
        paddle.body.immovable = true;
        paddle.checkWorldBounds = true;

    },
    /*******************************************************************************
     *
     *  Create the ball
     *
     *******************************************************************************/
    createBall: function () {

        ball = this.game.add.sprite(this.game.world.centerX, paddle.y - 16, 'orb');
        ball.anchor.set(0.5);
        ball.checkWorldBounds = true;

        this.game.physics.enable(ball, Phaser.Physics.ARCADE);

        ball.body.collideWorldBounds = true;
        ball.body.bounce.set(1);
        ball.events.onOutOfBounds.add(this.ballLost, this);

    },
    /*******************************************************************************
     *
     *  Create the bricks
     *
     *******************************************************************************/
    createBricks: function() {

        var brick;

        for (var y = 0; y < 4; y++)
        {
            for (var x = 0; x < 15; x++)
            {
                brick = bricks.create(120 + (x * 36), 100 + (y * 52), 'breakout', 'brick_' + (y+1) + '_1.png');
                brick.body.bounce.set(1);
                brick.body.immovable = true;
            }
        }
    },
    /*******************************************************************************
     *
     *  Release ball
     *
     *******************************************************************************/
    releaseBall: function() {

        if (ballOnPaddle)
        {
            ballOnPaddle = false;
            ball.body.velocity.y = -300;
            ball.body.velocity.x = -75;
            //introText.visible = false;
        }
    },
    /*******************************************************************************
     *
     *  Ball out of bounds
     *
     *******************************************************************************/
    ballLost: function() {

        lives--;
        console.log('lives:', lives);
        livesText.text = 'Lives: ' + lives;
        crowdBoo.play();

        if (lives === 0)
        {
            this.gameOver();
            this.gameEnd();
            console.log('game over');
        }
        else
        {
            ballOnPaddle = true;

            ball.reset(paddle.body.x + 16, paddle.y - 16);
            console.log('life lost');
        }

    },
    /*******************************************************************************
     *
     *  on Game OVer
     *
     *******************************************************************************/
    gameOver: function() {

        ball.body.velocity.setTo(0, 0);
    
        //introText.text = 'Game Over!';
        //introText.visible = true;

    },
    /*******************************************************************************
     *
     *  When Ball Hits a brick
     *
     *******************************************************************************/
    ballHitBrick: function(ball, brick) {

        brick.kill();
        ballHitItemSound.play();

        score += 10;

        scoreText.text = score;

        var zoomTween = this.game.add.tween(scoreText.scale);
        zoomTween.to({
            x: 1.1,
            y: 1.1
        }, 700, Phaser.Easing.Elastic.Out);
        zoomTween.onComplete.addOnce(function() {
            zoomTween.to({
                x: 1,
                y: 1
            }, 300, Phaser.Easing.Elastic.Out);
        }, this);
        zoomTween.start();

        //scoreText.text = 'score: ' + score;

        //  Are they any bricks left?
        if (bricks.countLiving() == 0)
        {
            //  New level starts
            score += 1000;
            scoreText.text = 'score: ' + score;
            //introText.text = '- Next Level -';

            //  Let's move the ball back to the paddle
            ballOnPaddle = true;
            ball.body.velocity.set(0);
            ball.x = paddle.x + 16;
            ball.y = paddle.y - 16;

            //  And bring the bricks back from the dead :)
            bricks.callAll('revive');
        }
    },
    /*******************************************************************************
     *
     *  When Ball Hits the paddle
     *
     *******************************************************************************/
    ballHitPaddle: function(ball, paddle) {

        var diff = 0;
        orbhit.play();

        if (ball.x < paddle.x)
        {
            //  Ball is on the left-hand side of the paddle
            diff = paddle.x - ball.x;
            ball.body.velocity.x = (-10 * diff);
        }
        else if (ball.x > paddle.x)
        {
            //  Ball is on the right-hand side of the paddle
            diff = ball.x -paddle.x;
            ball.body.velocity.x = (10 * diff);
        }
        else
        {
            //  Ball is perfectly in the middle
            //  Add a little random X to stop it bouncing straight up!
            ball.body.velocity.x = 2 + Math.random() * 8;
        }
    },
    /*******************************************************************************
     *
     *  Set Lives
     *
     *******************************************************************************/
    createLives: function() {

        lives = 3;

        livesText = this.game.add.text(w - 80, 75, 'Lives: ' + lives, {
            font: '22px Helvetica',
            fill: '#ffffff'
        });
    },
    /*******************************************************************************
     *
     *  Create orbs
     *
     *******************************************************************************/
    createStars: function() {
        //  Here we'll create 12 of them evenly spaced apart

        for (var i = 0; i < levelData.levelsData.levels[indexedLevel].starNumbers; i++) {
            //  Create a star inside of the 'stars' group
            var star = stars.create(i * 70, 0, 'star');

            //  Let gravity do its thing
            star.body.gravity.y = 11;
            star.body.gravity.x = this.game.rnd.integerInRange(-10, 11);
            star.reset(this.game.rnd.integerInRange(50, 700), this.game.rnd.integerInRange(50, 700));
            star.body.collideWorldBounds = true;

            //  This just gives each star a slightly random bounce value
            star.body.bounce.y = 0.1 + Math.random() * 0.2;
            // make sure stars bounce off of walls
            star.body.bounce.set(1);
            star.checkWorldBounds = true;
            star.events.onOutOfBounds.add(this.starOut, this);
            star.anchor.setTo(0.5,0.5);
            remainingStars.push(star);
        }
    },
    /*******************************************************************************
     *
     *  Create rocks for killing
     *
     *******************************************************************************/
    createRocks: function() {
        //  Set a TimerEvent to occur after every second
        rockReleaseTimer.loop(levelData.levelsData.levels[indexedLevel].rockReleaseTimer, function() {

            for (var r = 0; r < levelData.levelsData.levels[indexedLevel].rockNumbers; r++) {
                //  Create a star inside of the 'rocks' group 
                var rock = rocks.create(r * 100, 0, 'rock');

                //  Let gravity do its thing
                //player.body.velocity.x = game.rnd.integerInRange(50, 350);
                rock.body.gravity.y = this.game.rnd.integerInRange(-11, 11);
                rock.body.gravity.x = this.game.rnd.integerInRange(-11, 11);
                rock.body.angularVelocity = 300;
                rock.body.bounce.y = 0.1 + Math.random() * 0.2;
                rock.body.bounce.x = 0.1 + Math.random() * 0.2;
                
                rock.reset(this.game.rnd.integerInRange(0, 780), this.game.rnd.integerInRange(0, 700));

                this.game.add.tween(rock).to({
                    alpha: 1
                }, 1000, Phaser.Easing.Linear.None, true, 0, 0, true);
            }


        }, this);

        rockReleaseTimer.start();

    },
    /*******************************************************************************
     *
     *  Healthpack creation
     *
     *******************************************************************************/
    createHealthPack: function() {
        healthLife = this.game.add.sprite(100, 200, 'healthLife');
        this.game.physics.arcade.enable(healthLife);
        healthLife.body.gravity.x = this.game.rnd.integerInRange(-5, 5);
        healthLife.body.gravity.y = this.game.rnd.integerInRange(0, 11);
        healthLife.reset(this.game.rnd.integerInRange(50, 750), this.game.rnd.integerInRange(50, 750));
        healthLife.collideWorldBounds = true;
        healthLife.body.bounce.y = 0.1 + Math.random() * 0.2;
        // make sure healthLife bounce off of walls
        healthLife.body.bounce.set(1);
        healthLife.checkWorldBounds = true;
        healthLife.anchor.setTo(0.5, 0.5);

    },
    /*******************************************************************************
     *
     *  Create an inventory item and add to group
     *
     *******************************************************************************/
    createInventoryItem: function(itemName, itemSource) {
        var singleInventoryItem = this.game.add.sprite(100, 200, itemName);
        this.game.physics.arcade.enable(singleInventoryItem);
        singleInventoryItem.body.gravity.x = this.game.rnd.integerInRange(-5, 5);
        singleInventoryItem.body.gravity.y = this.game.rnd.integerInRange(0, 11);

        singleInventoryItem.reset(itemSource.body.x + 5, itemSource.body.y + 5);
        singleInventoryItem.collideWorldBounds = true;
        singleInventoryItem.body.bounce.y = 0.1 + Math.random() * 0.2;
        // make sure singleInventoryItem bounces off of walls
        singleInventoryItem.body.bounce.set(1);
        singleInventoryItem.checkWorldBounds = true;
        singleInventoryItem.anchor.setTo(0.5, 0.5);

        singleInventoryItemName = itemName;

        inventoryItemsGroup.add(singleInventoryItem);

    },
    /*******************************************************************************
     *
     *  Create rock tracker UI
     *
     *******************************************************************************/
    createRockTracker: function() {
        rockTrackerUIText = this.game.add.text(16, 64, rocksYouCollected + '/ ' + levelData.levelsData.levels[indexedLevel].rocksNeeded, {
            font: '18px Helvetica',
            fill: '#ffffff'
        });
    },
    /*******************************************************************************
     *
     *  Create the ship
     *
     *******************************************************************************/
    createPlayer: function() {
        // player details
        //  Our player ship

        player = this.game.add.sprite(w / 2, h / 2, 'ship' + shipSpecsData.shipData.ships[yourShipSpec].id);
        player.anchor.set(0.5);

        //  and its physics settings
        this.game.physics.enable(player, Phaser.Physics.ARCADE);

        player.body.drag.set(shipSpecsData.shipData.ships[yourShipSpec].drag);
        player.body.maxVelocity.set(200);

    },
    /*******************************************************************************
     *
     *  When ship fires bullet, set time interval and set life span
     *
     *******************************************************************************/
    fireBullet: function() {

        if (this.game.time.now > bulletTime) {
            bullet = bullets.getFirstExists(false);

            if (bullet) {
                bullet.reset(player.body.x + 16, player.body.y + 16);
                bullet.lifespan = 2000;
                bullet.rotation = player.rotation;
                this.game.physics.arcade.velocityFromRotation(player.rotation, 400, bullet.body.velocity);
                bulletTime = this.game.time.now + shipSpecsData.shipData.ships[yourShipSpec].fireRate;
            }
        }

    },
    /*******************************************************************************
     *
     *  When bullet hits orb, make explosion and bounce the orb
     *
     *******************************************************************************/
    bounceOrb: function(bullet, orb) {
        bullet.kill();
        orbhit.play();

        var explosion = explosions.getFirstExists(false);
        explosion.reset(orb.body.x, orb.body.y);
        explosion.play('kaboom', 30, false, true);

    },
    /*******************************************************************************
     *
     *  When ship bullet hits a trash pile, reveal random inventory item
     *  Kill bullet and trash, show popup tween score
     *
     *******************************************************************************/
    collectTrash: function(bullet, trash) {
        trash.kill();
        bullet.kill();
        timerEndMusic.play();

        score += levelData.levelsData.levels[indexedLevel].trashGainScore;

        var explosion = explosions.getFirstExists(false);
        explosion.reset(trash.body.x, trash.body.y);
        explosion.play('kaboom', 30, false, true);

        if (score <= 0) {
            scoreText.text = '0';
            score = 0;
        } else {
            scoreText.text = score;
        }

        this.popupHandler(trash, "trash");
        this.showInventoryItem(inventoryItems, trash);

        var zoomTween = this.game.add.tween(scoreText.scale);
        zoomTween.to({
            x: 1.1,
            y: 1.1
        }, 700, Phaser.Easing.Elastic.Out);
        zoomTween.onComplete.addOnce(function() {
            zoomTween.to({
                x: 1,
                y: 1
            }, 300, Phaser.Easing.Elastic.Out);
        }, this);
        zoomTween.start();

    },
    /*******************************************************************************
     *
     *  When ship collects an inventory item, play sound, kill item, show popup, tween effect
     *
     *******************************************************************************/
    collectSingleInventoryItem: function(player, item) {
        item.kill();
        this.popupHandler(item, singleInventoryItemName);
        score += 100;

        healthpacksound.play();

        if (score <= 0) {
            scoreText.text = '0';
            score = 0;
        } else {
            scoreText.text = score;
        }

        var zoomTween = this.game.add.tween(scoreText.scale);
        zoomTween.to({
            x: 1.1,
            y: 1.1
        }, 700, Phaser.Easing.Elastic.Out);
        zoomTween.onComplete.addOnce(function() {
            zoomTween.to({
                x: 1,
                y: 1
            }, 300, Phaser.Easing.Elastic.Out);
        }, this);
        zoomTween.start();

    },
    /*******************************************************************************
     *
     *  When ship collects an orb, add to orbs, show popup, tween star and add extra time
     *
     *******************************************************************************/
    collectStar: function(player, star) {
        // Removes the star from the screen
        star.kill();
        orbsCollected += 1;
        timerTotal += levelData.levelsData.levels[indexedLevel].starScoreExtraTime;
        remainingStars.length -= 1;
        //console.log(remainingStars.length);

        music.play();

        this.popupHandler(star, "star");

        //  Add and update the score
        score += levelData.levelsData.levels[indexedLevel].starScore;
        scoreText.text = score;

        var zoomTween = this.game.add.tween(scoreText.scale);
        zoomTween.to({
            x: 1.1,
            y: 1.1
        }, 700, Phaser.Easing.Elastic.Out);
        zoomTween.onComplete.addOnce(function() {
            zoomTween.to({
                x: 1,
                y: 1
            }, 300, Phaser.Easing.Elastic.Out);
        }, this);
        zoomTween.start();

        if (remainingStars.length <= 0) {
            //this.gameEnd();
        }
    },
    /*******************************************************************************
     *
     *  Life is lost ween player hits rock, explosion and sound, update lives UI
     *
     *******************************************************************************/
    lifeLost: function(player, rock) {

        rock.kill();
        rocksYouHit += 1;

        var explosion = explosions.getFirstExists(false);
        explosion.reset(rock.body.x, rock.body.y);
        explosion.play('kaboom', 30, false, true);

        if (rocksYouHit >= 1) {
            
            remainingLives -= 1;
            livesText.text = "X " + remainingLives;

            var zoomTween2 = this.game.add.tween(livesText.scale);
        zoomTween2.to({
            x: 2.1,
            y: 2.1
        }, 700, Phaser.Easing.Elastic.Out);
        zoomTween2.onComplete.addOnce(function() {
            zoomTween2.to({
                x: 1,
                y: 1
            }, 300, Phaser.Easing.Elastic.Out);
        }, this);
        zoomTween2.start();
        }

        // player death
        if (remainingLives == 0) {
            player.kill();
            explosion.play();
            this.gameEnd();

        } else {

            var musicTween = this.game.add.tween(gameSong);
        musicTween.to({
            volume:0.3
        }, 200, null);
        musicTween.onComplete.addOnce(function() {
            livesLost.play();
            musicTween.to({
                volume:1
            }, 500, null);
        }, this);
        musicTween.start();
        }

    },
    /*******************************************************************************
     *
     *  When ship shoots a rock, kill both bullet and rock, add to rocktracker
     *  Show explosion, update score and rocktracker UI, tween effect
     *
     *******************************************************************************/
    collectRock: function(bullet, rock) {
        // Removes the rock from the screen
        rock.kill();
        bullet.kill();
        rocksYouCollected += 1;

        //console.log(rocksYouCollected);
        //timerTotal -= levelData.levelsData.levels[indexedLevel].rockHitTimeLoss;
        //rocksYouHit += 1;
        score += levelData.levelsData.levels[indexedLevel].rockGainScore;
        timerEndMusic.play();

        var explosion = explosions.getFirstExists(false);
        explosion.reset(rock.body.x, rock.body.y);
        explosion.play('kaboom', 30, false, true);

        var t = this.game.time.create(true)
                t.repeat(20,10,this.shakeCamera,this);
                t.start();
                t.onComplete.addOnce(this.resetCamera,this);

        


        //  Add and update the score
        // final end score of game
        if (score <= 0) {
            scoreText.text = '0';
            score = 0;
        } else {
            scoreText.text = score;
        }

        rockTrackerUIText.text = rocksYouCollected + '/ ' + levelData.levelsData.levels[indexedLevel].rocksNeeded;

        var zoomTween = this.game.add.tween(scoreText.scale);
        zoomTween.to({
            x: 1.1,
            y: 1.1
        }, 700, Phaser.Easing.Elastic.Out);
        zoomTween.onComplete.addOnce(function() {
            zoomTween.to({
                x: 1,
                y: 1
            }, 300, Phaser.Easing.Elastic.Out);
        }, this);
        zoomTween.start();

        if (rocksYouCollected >= levelData.levelsData.levels[indexedLevel].rocksNeeded) {
            // move on to next level
            this.gameEnd();
        }

        rockLifeTracker += 1;


        if (rockLifeTracker % 90 == 0) {
            this.createHealthPack();
            console.log("life created");
        }


    },
    /*******************************************************************************
     *
     *  When ship runs into health pack, add life, add points, tween effect, show popup
     *
     *******************************************************************************/
    collectHealthPack: function(health) {
        health.kill();
        remainingLives += 1;
        livesText.text = "X " + remainingLives;
        // gain points on collecting health pack
        score += 100;
        healthpacksound.play();

        this.popupHandler(health, "health");

        var zoomTween = this.game.add.tween(scoreText.scale);
        zoomTween.to({
            x: 1.1,
            y: 1.1
        }, 700, Phaser.Easing.Elastic.Out);
        zoomTween.onComplete.addOnce(function() {
            zoomTween.to({
                x: 1,
                y: 1
            }, 300, Phaser.Easing.Elastic.Out);
        }, this);
        zoomTween.start();

        var zoomTween2 = this.game.add.tween(livesText.scale);
        zoomTween2.to({
            x: 2.1,
            y: 2.1
        }, 700, Phaser.Easing.Elastic.Out);
        zoomTween2.onComplete.addOnce(function() {
            zoomTween2.to({
                x: 1,
                y: 1
            }, 300, Phaser.Easing.Elastic.Out);
        }, this);
        zoomTween2.start();
    },
    /*******************************************************************************
     *
     *  When the game ends initially
     *
     *******************************************************************************/
    gameEnd: function() {
        //  Add and update the score from timer
        score += timerTotal;
        timerTotal = 0;
        timerText.text = 'Time: 0';
        scoreText.text = score;

        // check to see if the user is going to be able to move on from this next level
        if (remainingLives != 0 && rocksYouCollected >= levelData.levelsData.levels[indexedLevel].rocksNeeded) {

            nextLevelSound.play();
            indexedLevel += 1; // levels get progressively harder

            // if there are no more levels within the game, then the game has been won
            if (indexedLevel == levelData.levelsData.levels.length) {
                // game has been won!
                this.onGameWin();
                return false;
            } else {

                // send user to bonus round if they have at least three lives, a good score, and there is a bonus level available
                if (remainingLives >= 1 && indexedLevel == 3 && bonusLevel != bonusLevelData.bonuslevelsData.levels.length) {
                    indexedLevel -= 1; // level stays the same because of bonus round

                    highScore = this.game.add.text(w / 2, h / 2 - 100, 'Bonus Round', {
                        font: '32px Helvetica',
                        fill: '#ffffff'
                    });
                    highScore.anchor.setTo(0.5, 0.5);
                    nextLevelSound.play();
                    //this.sendToBonusRound();

                    // add delay
                    this.game.time.events.add(Phaser.Timer.SECOND * 2, this.sendToBonusRound(), this);

                } else {
                    currentLevel += 1;
                    highScore = this.game.add.text(w / 2, h / 2 - 100, 'Level ' + currentLevel, {
                        font: '32px Helvetica',
                        fill: '#ffffff'
                    });
                    highScore.anchor.setTo(0.5, 0.5);
                    pause_label.events.onInputUp.removeAll();

                    player.body.angularVelocity = 0;

                    // add delay
                    this.game.time.events.add(Phaser.Timer.SECOND * 2, this.restart, this);

                    indicatedLevel.text = 'Level: ' + currentLevel;

                    var zoomTween = this.game.add.tween(indicatedLevel.scale);
                    zoomTween.to({
                        x: 1.5,
                        y: 1.5
                    }, 800, Phaser.Easing.Elastic.Out);
                    zoomTween.onComplete.addOnce(function() {
                        zoomTween.to({
                            x: 1,
                            y: 1
                        }, 300, Phaser.Easing.Elastic.Out);
                    }, this);
                    zoomTween.start();

                }

            }


            

        } else {

            this.gameLost();
        }
        // common stopping events at end of game events
        pause_label.events.onInputUp.removeAll();
        timer.stop();
    },
    /*******************************************************************************
     *
     *  Call game restart
     *
     *******************************************************************************/
    restart: function() {
        //remainingStars = [];
        if (lives != 0) { //&& indexedLevel != levelData.levelsData.levels.length) {
            //highScore.destroy();
            this.nextLevel();
        //} else if (indexedLevel == levelData.levelsData.levels.length) {
         //   highScore.destroy();
          //  this.restartHelper();
        } else {
            this.restartHelper();
        }
    },
    /*******************************************************************************
     *
     *  When Game has ended, show that user has lost and reveal options
     *
     *******************************************************************************/
    gameLost: function() {
        /*trashPile.removeAll();
        inventoryItemsGroup.removeAll();*/
        endScoreText = this.game.add.text(w / 2, 355, 'You Lose, Click to Restart', {
                font: '32px Helvetica',
                fill: '#ffffff'
            });
        endScoreText.anchor.setTo(0.5,0.5);
        endScoreText.inputEnabled = true;
        endScoreText.input.useHandCursor = true;
        endScoreText.events.onInputUp.add(this.restart, this);

            quitGameText = this.game.add.text(w / 2 - 70, 400, 'Quit Game', {
                font: '32px Helvetica',
                fill: '#ffffff'
            });

            quitGameText.inputEnabled = true;
            quitGameText.input.useHandCursor = true;
            quitGameText.events.onInputUp.add(this.quitGame, this);

            bricks.removeAll();
            ball.kill();
            paddle.kill();
            this.saveScores();
    },
    /*******************************************************************************
     *
     *  When Game has ended, return to the main screen and reset everything
     *
     *******************************************************************************/
    quitGame: function() {
        // back to square one
        timerText.fill = '#ffffff';
        scoreText.text = '0';
        score = 0;        
        //timer.stop();
        //rockReleaseTimer.stop();
        //trashReleaseTimer.stop();
        if (healthLife) {
            healthLife.kill();
        }
        if (healthLife) {
            healthLife.kill();
        }
        if (scoreBoard) {
            scoreBoard.destroy();
        }
        if (scoreBoardFullData) {
            scoreBoardFullData.removeAll();
        }
        if (endGameTrophy) {
            endGameTrophy.kill();
        }
        if (quitGameText) {
            quitGameText.destroy();
        }

        livesText.destroy();
        currentLevel = 1;
        indexedLevel = 0; // back to level 1
        bonusLevel = 0; // restart bonuses
        indicatedLevel.text = 'Level: ' + currentLevel;

        ball.kill();
        paddle.kill();
        bricks.removeAll();
        isGameSoundOn = true;

        var musicTween = this.game.add.tween(gameMusic);
        musicTween.to({
            volume:0
        }, 500, null);
        musicTween.onComplete.addOnce(function() {
            gameMusic.stop();
            this.game.state.start("GameTitle", true, false);
        }, this);
        musicTween.start();

    },
    restartHelper: function() {
        timerText.fill = '#ffffff';
        scoreText.text = '0';
        score = 0;
        rocksYouHit = 0;
        rocksYouCollected = 0;
        ball.kill();
        paddle.kill();
        bricks.removeAll();
        livesText.destroy();
        isGameSoundOn = true;
        ballOnPaddle = true;
        //collectedItemsData.removeAll();
        timer.stop();
        //rockReleaseTimer.stop();
        //trashReleaseTimer.stop();
        if (healthLife) {
            healthLife.kill();
        }
        if (healthLife) {
            healthLife.kill();
        }
        if (scoreBoard) {
            scoreBoard.destroy();
        }
        if (scoreBoardFullData) {
            scoreBoardFullData.removeAll();
        }
        if (endGameTrophy) {
            endGameTrophy.kill();
        }
        if (quitGameText) {
            quitGameText.destroy();
        }
        if (endScoreText) {
            endScoreText.destroy();
        }
        rockLifeTracker = 0;
        currentLevel = 1;
        indexedLevel = 0; // back to level 1
        bonusLevel = 0; // restart bonuses
        indicatedLevel.text = 'Level: ' + currentLevel;


        this.createLives();
        this.soundCheck();
        this.startTimer();
        this.createBricks();
        this.createPaddle();
        this.createBall();
        
        pause_label.events.onInputUp.add(this.pause, this);
        this.startTimer();
        //rockTrackerUIText.text = rocksYouCollected + '/ ' + levelData.levelsData.levels[indexedLevel].rocksNeeded;
       

    },
    /*******************************************************************************
     *
     *  Send User to next level
     *
     *******************************************************************************/
    nextLevel: function() {

        rocksYouHit = 0; // reset rocks hit for this level
        stars.removeAll();
        rocks.removeAll();
        trashPile.removeAll();
        timer.stop();
        rockReleaseTimer.stop();
        if (healthLife) {
            healthLife.kill();
        }
        this.createRocks();
        this.createStars();
        this.createTrash();
        pause_label.events.onInputUp.add(this.pause, this);
        this.startTimer();
        rockTrackerUIText.text = rocksYouCollected + '/ ' + levelData.levelsData.levels[indexedLevel].rocksNeeded;
    },
    /*******************************************************************************
     *
     *  Send User to bonus round
     *
     *******************************************************************************/
    sendToBonusRound: function() {
        stars.removeAll();
        rocks.removeAll();
        trashPile.removeAll();
        highScore.destroy();
        timer.stop();
        rockReleaseTimer.stop();
        trashReleaseTimer.stop();
        if (healthLife) {
            healthLife.kill();
        }
        this.createTrash('bonus');
        pause_label.events.onInputUp.add(this.pause, this);
        indicatedLevel.text = 'Bonus!';

        
        timerTotal = bonusLevelData.bonuslevelsData.levels[bonusLevel].timeLimit;
        timerText.text = 'Time: ' + bonusLevelData.bonuslevelsData.levels[bonusLevel].timeLimit;

        //  Set a TimerEvent to occur after every second
        timer.loop(1000, this.updateCounter, this);

        timer.start();

        bonusLevel += 1;
    },
    /*******************************************************************************
     *
     *  When game has been won and no more levels exist
     *
     *******************************************************************************/
    onGameWin: function() {
        highScore = this.game.add.text(w / 2, h / 2 + 100, 'Congratulations, you have won the game!', {
            font: '32px Helvetica',
            fill: '#ffffff'
        });
        highScore.anchor.setTo(0.5, 0.5);
        pause_label.events.onInputUp.removeAll();
        stars.removeAll();
        rocks.removeAll();
        //endScoreText.anchor.setTo(0.5, 0.5);
        //endScoreText.inputEnabled = true;
        //endScoreText.input.useHandCursor = true;
        //endScoreText.events.onInputUp.add(this.restart, this);
        timer.stop();
        rockReleaseTimer.stop();
        player.kill();
        winsong.play();
        this.saveScores();
    },
    /*******************************************************************************
     *
     *  Save Scores only after game ends
     *
     *******************************************************************************/
    saveScores: function() {
        // save score
        var playerScores = [];
        playerScores = JSON.parse(localStorage.getItem('chillBlock_highscores'));
        if (localStorage.getItem('chillBlock_highscores') !== null && score > 0) {


            console.log(playerScores.sort(function(a, b){return a-b})[0]);

            if (playerScores.length > 4 && score > playerScores.sort(function(a, b){return a-b})[0]) {
                playerScores.shift(); // remove smallest score if there are 5 recent scores racked up
                playerScores.push(score);
            } else if (playerScores.length <= 4) {
                playerScores.push(score);
            }
            

            // set best score only if score is better than last, or doesnt exist yet
            if (score > parseInt(localStorage.getItem('chillBlock_bestScore')) || localStorage.getItem('chillBlock_bestScore') == "") {
                localStorage.setItem('chillBlock_bestScore', score);
            }

            playerScores.sort(function(a, b){return a-b}).reverse();
            console.log("scores", playerScores);

            localStorage.setItem('chillBlock_highscores', JSON.stringify(playerScores));

        }

        // set inventory items
        /*if (localStorage.getItem('spaceblaster_inventory') !== null) {
            var itemsStored = JSON.parse(localStorage.getItem('spaceblaster_inventory'));


            itemsStored.data.fuel += fuelCollected;
            itemsStored.data.fire += fireCollected;
            itemsStored.data.wrench += wrenchCollected;
            itemsStored.data.rocket += rocketCollected;
            itemsStored.data.cpu += cpuCollected;
            itemsStored.data.orbs += orbsCollected;


            var saveJSON = '{"data":{"ship":' + yourShipSpec +',"fuel":' + itemsStored.data.fuel + ',"fire":' + itemsStored.data.fire + ',"wrench":' + itemsStored.data.wrench + ',"rocket":' + itemsStored.data.rocket + ',"cpu":' + itemsStored.data.cpu + ',"orbs":' + itemsStored.data.orbs + '}}';

            localStorage.setItem('spaceblaster_inventory', saveJSON);
            console.log(JSON.parse(localStorage.getItem('spaceblaster_inventory')));
        }*/


        // show UI

        scoreBoard = this.game.add.text(
            w / 2, 100,
            'Your Scores: \n' + this.displayScoreLayout(playerScores, localStorage.getItem('chillBlock_bestScore')), {
                font: '30px Helvetica',
                fill: '#fff'
            }
        );
        scoreBoard.anchor.setTo(0.5, 0.1);
    },
    /*******************************************************************************
     *
     *  Display Scores
     *
     *******************************************************************************/
    displayScoreLayout: function(playerScores, playerBest) {
        var scoreBoardData = "";
        var spacing = 20;
        scoreBoardFullData = this.game.add.physicsGroup();
        collectedItemsData = this.game.add.physicsGroup();
        scoreBoardFullData.alpha = 0;

        for (var i = 0; i < playerScores.length; ++i) {
            var numCountDisplay = i + 1;

            // add scoreboard display ui
            var scoresList = this.game.add.text(
                w / 2 - 65, h / 2 - 180 + spacing,
                numCountDisplay + ". " + playerScores[i] + " points \n", {
                    font: '25px Helvetica',
                    fill: '#fff'
                },
                scoreBoardFullData
            );

            spacing += 40;
        }

        // add player best
        var bestplayerTitle = this.game.add.text(
            50, h / 2 - 200,
            "Your Best Score:", {
                font: '25px Helvetica',
                fill: '#fff'
            },
            scoreBoardFullData
        );

        var bestPlayerScore = this.game.add.text(
            0, h / 2 - 150,
            playerBest, {
                font: '45px Helvetica',
                fill: '#fff'
            },
            scoreBoardFullData
        );

        endGameTrophy = this.game.add.sprite(110, 800, 'trophy');
        endGameTrophy.scale.setTo(0.1, 0.1);
        endGameTrophy.angle = 10;

        /*
        // collection items
        var fireCol = this.game.add.sprite(w/2 - 280, 460, 'fire');
        collectedItemsData.add(fireCol);
        var fuelCol = this.game.add.sprite(w/2 - 170, 460, 'fuel');
        collectedItemsData.add(fuelCol);
        var rocketCol = this.game.add.sprite(w/2 - 60, 460, 'rocket');
        collectedItemsData.add(rocketCol);
        var cpuCol = this.game.add.sprite(w/2 + 60, 460, 'cpu');
        collectedItemsData.add(cpuCol);
        var wrenchCol = this.game.add.sprite(w/2 + 170, 460, 'wrench');
        collectedItemsData.add(wrenchCol);
        var orbCol = this.game.add.sprite(w/2 + 280, 460, 'star');
        collectedItemsData.add(orbCol);

        // text displayed underneath of gains
        var fireText = this.game.add.text(w/2 - 280 - 2, 500,
            "+ " + fireCollected, {
                font: '18px Helvetica',
                fill: '#fff'
            },
            collectedItemsData
        );

        var fuelText = this.game.add.text(w/2 - 170 - 2, 500,
            "+ " + fuelCollected, {
                font: '18px Helvetica',
                fill: '#fff'
            },
            collectedItemsData
        );

        var rocketText = this.game.add.text(w/2 - 60 - 2, 500,
            "+ " + rocketCollected, {
                font: '18px Helvetica',
                fill: '#fff'
            },
            collectedItemsData
        );

        var cpuText = this.game.add.text(w/2 + 60 - 2, 500,
            "+ " + cpuCollected, {
                font: '18px Helvetica',
                fill: '#fff'
            },
            collectedItemsData
        );

        var wrenchText = this.game.add.text(w/2 + 170 - 2, 500,
            "+ " + wrenchCollected, {
                font: '18px Helvetica',
                fill: '#fff'
            },
            collectedItemsData
        );

        var orbText = this.game.add.text(w/2 + 280 - 2, 500,
            "+ " + orbsCollected, {
                font: '18px Helvetica',
                fill: '#fff'
            },
            collectedItemsData
        );
        */



        this.game.add.tween(scoreBoardFullData).to({
            alpha: 1
        }, 1500, Phaser.Easing.Linear.None, true, 0, 0, false);

        var zoomTween = this.game.add.tween(bestplayerTitle.scale);
        zoomTween.to({
            x: 1.5,
            y: 1.5
        }, 800, Phaser.Easing.Elastic.Out);
        zoomTween.onComplete.addOnce(function() {
            zoomTween.to({
                x: 1,
                y: 1
            }, 300, Phaser.Easing.Elastic.Out);
        }, this);
        zoomTween.start();

        var moveTween = this.game.add.tween(bestPlayerScore);
        moveTween.to({
            x: 90
        }, 1100, Phaser.Easing.Linear.None);
        moveTween.start();

        var moveTweeny = this.game.add.tween(endGameTrophy);
        moveTweeny.to({
            y: h / 2 - 100
        }, 1100, Phaser.Easing.Linear.None);
        moveTweeny.start();

        return scoreBoardData;
    },
    /*******************************************************************************
     *
     *  Toggle Sound UI feature
     *
     *******************************************************************************/
    soundCheck: function() {
        if (isGameSoundOn) {
            this.game.sound.mute = false;
            soundIcon = this.game.add.sprite(w - 20, 30, 'soundIcon');
            isGameSoundOn = false;
        } else {
            this.game.sound.mute = true;
            isGameSoundOn = true;
            soundIcon = this.game.add.sprite(w - 20, 30, 'soundIconDisabled');
        }

        soundIcon.scale.setTo(0.5, 0.5);
        soundIcon.inputEnabled = true;
        soundIcon.input.useHandCursor = true;
        soundIcon.events.onInputUp.add(this.toggleSound, this);
        soundIcon.anchor.setTo(0.5, 0.5);

        console.log(isGameSoundOn);


    } ,
    toggleSound: function() {
        if (soundIcon) {
            soundIcon.destroy();
        }

        console.log(isGameSoundOn);
        

        if (isGameSoundOn == true) {
            this.game.sound.mute = false;
            isGameSoundOn = false;
            soundIcon = this.game.add.sprite(w - 20, 30, 'soundIcon');

        } else {
            this.game.sound.mute = true;
            isGameSoundOn = true;
            soundIcon = this.game.add.sprite(w - 20, 30, 'soundIconDisabled');

        }

        soundIcon.scale.setTo(0.5, 0.5);
        soundIcon.inputEnabled = true;
        soundIcon.input.useHandCursor = true;
        soundIcon.events.onInputUp.add(this.toggleSound, this);
        soundIcon.anchor.setTo(0.5, 0.5);

        var moveTween = this.game.add.tween(soundIcon);
        moveTween.to({
            angle: 360
        }, 500, Phaser.Easing.Linear.None);
        moveTween.start();


    },
    /*******************************************************************************
     *
     *  Simple unpause game by adding back focus
     *
     *******************************************************************************/
    unpause: function() {

        if (this.game.paused) {
            this.game.paused = false;

            choiseLabel.destroy();
            pause_label.text = "Pause";

            if (isGameSoundOn) {
                this.game.sound.mute = true;

            } else {
                this.game.sound.mute = false;

            }
        }

    },
    restartAll: function() {
        this.game.paused = false;
        this.game.state.start("TheGame");
    },
    /*******************************************************************************
     *
     *  Simple Pause game, take off focus, show the screen 
     *
     *******************************************************************************/
    pause: function() {

        this.game.paused = true;

        // And a label to illustrate which menu item was chosen. (This is not necessary)
        choiseLabel = this.game.add.text(w / 2, h / 2, 'Click to continue', {
            font: '40px Arial',
            fill: '#fff'
        });
        choiseLabel.anchor.setTo(0.5, 0.5);

        // When the pause button is pressed, we pause the game
        //this.game.paused = true;
        // YOU LEFT OFF HERE
        /*
        this.game.physics.arcade.isPaused=true;
        pause_label.text = "Paused";

        var textDisplayGroup = this.game.add.physicsGroup();

        // Then add the menu
        menu = this.game.add.sprite(w / 2 - 80, h / 2, 'menu');
        menu.anchor.setTo(0.5, 0.5);
        menu.scale.setTo(0.5, 0.5);
        menu.inputEnabled = true;
        menu.input.useHandCursor = true;

        var resume = this.game.add.text(w/2 - 30, h/2 - 90, 'Resume', { fontSize: '32px Arial', fill: '#000000' }, textDisplayGroup);  
            resume.inputEnabled = true;
            resume.input.useHandCursor = true;
            resume.events.onInputUp.add(this.unpause, this);

        /*var restart = this.game.add.text(w/2 - 30, h/2 - 0, 'Restart', { fontSize: '32px Arial', fill: '#000000' }, textDisplayGroup);  
            restart.inputEnabled = true;
            restart.input.useHandCursor = true;
            restart.events.onInputUp.add(this.restartAll, this);
            restart.anchor.setTo(0.5,0.5);   

        var quit = this.game.add.text(w/2 - 30, h/2 + 90, 'Quit', { fontSize: '32px Arial', fill: '#000000' }, textDisplayGroup);  
            quit.inputEnabled = true;
            quit.input.useHandCursor = true;
            //resume.events.onInputUp.add(this.restartAll(), this);
            quit.anchor.setTo(0.5,0.5);  */


        //this.game.world.bringToTop(textDisplayGroup);    
        //the "click to restart" handler
        //game.input.onTap.addOnce(restart,this);

        // And a label to illustrate which menu item was chosen. (This is not necessary)
        /*choiseLabel = this.game.add.text(w / 2, h - 150, 'Click outside menu to continue', {
            font: '30px Arial',
            fill: '#fff'
        }); 
        choiseLabel.anchor.setTo(0.5, 0.5);*/
    },
    playerOut: function(player) {
        console.log("hit");
    },
    starOut: function(star, event) {
        //remainingStars.length -= 1;
        //console.log(remainingStars.length);
    },
    updateCounter: function() {
        timerTotal--;
        timerText.text = 'Time: ' + timerTotal;

        if (timerTotal <= 0) {
            timer.stop();
            timerText.text = 'Time: 0';
            if (score <= 0) {
                scoreText.text = '0';
                score = 0;
            }
            timesupsound.play();
            this.gameEnd();

        } else if (timerTotal <= 10) {
            timerText.fill = '#FF0000';

            var zoomTween = this.game.add.tween(timerText.scale);
            zoomTween.to({
                x: 1.2,
                y: 1.2
            }, 700, Phaser.Easing.Elastic.Out);
            zoomTween.onComplete.addOnce(function() {
                zoomTween.to({
                    x: 1,
                    y: 1
                }, 300, Phaser.Easing.Elastic.Out);
            }, this);
            zoomTween.start();
        } else {
            timerText.fill = '#ffffff';
        }
    },
    startTimer: function() {
        timerTotal = 50;
        timerText.text = 'Time: ' + 50
        //timerTotal = levelData.levelsData.levels[indexedLevel].timeLimit;
        //timerText.text = 'Time: ' + levelData.levelsData.levels[indexedLevel].timeLimit;

        //  Set a TimerEvent to occur after every second
        timer.loop(1000, this.updateCounter, this);

        timer.start();
    },
    popupHandler: function(item, type) {

        var text = "";

        if (popupNotification) {
            popupNotification.destroy();
        }

        if (type == "star") {
            text = "Orb Gained";
        } else if (type == "health") {
            text = "Extra Life";
        } else if (type == "trash") {
            text = "Item Found";
            // inventory items
        } else if (type == "cpu") {
            text = "Found a cpu";
            cpuCollected += 1;
        } else if (type == "rocket") {
            text = "Found a rocket";
            rocketCollected += 1;
        } else if (type == "fire") {
            text = "Found fire";
            fireCollected += 1;
        } else if (type == "fuel") {
            text = "Found fuel";
            fuelCollected += 1;
        } else if (type == "wrench") {
            text = "Found a wrench";
            wrenchCollected += 1;
        }




        popupNotification = this.game.add.text(item.body.x, item.body.y, text, {
            font: '18px Helvetica',
            fill: '#ffffff'
        });

        var fadeTween = this.game.add.tween(popupNotification).to({
            alpha: 1
        }, 700, Phaser.Easing.Linear.None, true, 0, 0, true);
        fadeTween.onComplete.addOnce(function() {
            fadeTween.to({
                alpha: 0
            }, 300, Phaser.Easing.Linear.None, true, 0, 0, true);
        }, this);
        fadeTween.start();

        // add delay
        this.game.time.events.add(Phaser.Timer.SECOND * 1, this.popupDestroy, this);
    },
    popupDestroy: function() {
        popupNotification.destroy();
    },
    showInventoryItem: function(inventoryItems, itemSource) {

        // get random item
        var item = this.game.rnd.integerInRange(0, 4);

        // show random item
        this.createInventoryItem(inventoryItems[item], itemSource);

        console.log(inventoryItems[item]);
    },
    screenWrap: function(sprite) {



        if (sprite.x < 0) {
            sprite.x = this.game.width;
            sprite.body.angularVelocity = 0;
        } else if (sprite.x > this.game.width) {
            sprite.x = 0;
            sprite.body.angularVelocity = 0;
        }

        if (sprite.y < 0) {
            sprite.y = this.game.height;
            sprite.body.angularVelocity = 0;
        } else if (sprite.y > this.game.height) {
            sprite.y = 0;
            sprite.body.angularVelocity = 0;
        }

    },
    shakeCamera: function(){
        var min = -2;
                var max = 2;
                this.game.camera.x+= Math.floor(Math.random() * (max - min + 1)) + min;
                this.game.camera.y+= Math.floor(Math.random() * (max - min + 1)) + min;
    },
    resetCamera: function() {
        //Reset camera after shake
                this.game.camera.x = 2;
                this.game.camera.y = 2;
    },
    playLevelMusic: function() {
        gameSong.play('', 0, 1, true);
    }
}