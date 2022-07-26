window.addEventListener('DOMContentLoaded', () => {
    //Init DOM elements
    const firstPlayerP = document.querySelector('#firstPlayerTotalPoints'),
        secondPlayerP = document.querySelector('#secondPlayerTotalPoints'),
        firstPlayerCurrP = document.querySelector('#firstPlayerCurrPoints'),
        secondPlayerCurrP = document.querySelector('#secondPlayerCurrPoints'),
        firstDice = document.querySelector('#firstDice'),
        secondDice = document.querySelector('#secondDice'),
        firstBlock = document.querySelector('.player_1'),
        secondBlock = document.querySelector('.player_2'),
        box = document.querySelector('.box');

        
    //Create buff object
    let res = {
        curr: 0,
        player1: 0,
        player2: 0
    };
    //Turn counter
    let turn = 1;

    //Start new game
    document.querySelector('.start_game').addEventListener('click', () => {
        //Deleding winner message
        const win = box.querySelector('.winner');
        if (win) {
            win.classList.add('hide');
            setTimeout(() => {
                win.querySelector('.text').remove();
                win.remove();
            }, 1000);
        }

        //reset game block
        firstPlayerP.textContent = 0;
        secondPlayerP.textContent = 0;
        firstPlayerCurrP.textContent = 0;
        secondPlayerCurrP.textContent = 0;
        firstDice.src = 'img/dice_6.png';
        secondDice.src = 'img/dice_6.png';

        //reset buffer
        res.curr = 0;
        res.player1 = 0;
        res.player2 = 0;

        //give the first player a turn
        turn = 1;
        firstBlock.classList.add('current_player');

        //give access to buttons
        document.querySelector('.roll_dice').addEventListener('click', rollDice);//Roll button
        document.querySelector('.hold_result').addEventListener('click', holdResult);//Hold button
    });
    //Roll dice
    function rollDice() {
        //Get random number
        let num1 = getRand(),
            num2 = getRand(),
            sum = num1 + num2;
        //Change dice image
        firstDice.src = `img/dice_${num1}.png`;
        secondDice.src = `img/dice_${num2}.png`;
        //Cheking for losing conditions
        if (sum === 6 || num1 === 1 || num2 === 1) {
            res.curr = 0;
            holdResult();
            return;
        }

        //Push result in buff
        res.curr += sum;
        //Change displaying result
        if (turn === 1) {
            firstPlayerCurrP.textContent = res.curr;
            //Cheking for victory conditions
            if (res.curr + res.player1 >= 100) {
                gameOver(1);
            }
        } else {
            secondPlayerCurrP.textContent = res.curr;
            //Cheking for victory conditions
            if (res.curr + res.player2 >= 100) {
                gameOver(2);
            }

        }
    }

    //Hold button
    function holdResult() {
        if (turn === 1) {
            res.player1 += res.curr;
            //Change displaying block
            firstPlayerP.textContent = res.player1;
            firstPlayerCurrP.textContent = 0;
            firstBlock.classList.remove('current_player');
            secondBlock.classList.add('current_player');
            turn = 2;
        } else {
            res.player2 += res.curr;
            //Change displaying block
            secondPlayerP.textContent = res.player2;
            secondPlayerCurrP.textContent = 0;
            firstBlock.classList.add('current_player');
            secondBlock.classList.remove('current_player');
            turn = 1;
        }
        res.curr = 0;
    }

    function gameOver(res) {
        //Creating new elemnts
        let el = document.createElement('div'),
            childEl = document.createElement('p');
        //Fill message
        childEl.textContent = `PLAYER ${res} WIN!`;
        //Add classes
        el.classList.add('winner');
        childEl.classList.add('text');
        //Pull elements in DOM
        box.append(el);
        el.append(childEl);
    }

    function getRand() {
        return Math.floor(Math.random() * 5 + 1);
    }
});
