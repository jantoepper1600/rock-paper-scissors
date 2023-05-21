const toggleRules = () => document.getElementById('rules').classList.toggle('active');

let normalMode = true;
const switchMode = () => {
    normalMode = !normalMode;
    document.getElementsByClassName('normalMode')[0].classList.toggle('active');
    document.getElementsByClassName('advancedMode')[0].classList.toggle('active');
    document.getElementsByTagName('h1')[0].classList.toggle('active');
    document.getElementsByTagName('h1')[1].classList.toggle('active');
    document.getElementById('normalModeRules').classList.toggle('active');
    document.getElementById('advancedModeRules').classList.toggle('active');
}

const buttons = new Map();
buttons.set('Paper', [['./assets/images/icon-paper.svg', 'linear-gradient(90deg, hsl(230, 89%, 62%), hsl(230, 89%, 65%))'], [['Rock', 'Spock'], ['Scissors', 'Lizard']]]);
buttons.set('Scissors', [['./assets/images/icon-scissors.svg', 'linear-gradient(90deg, hsl(39, 89%, 49%), hsl(40, 84%, 53%))'], [['Paper', 'Lizard'], ['Rock', 'Spock']]]);
buttons.set('Rock', [['./assets/images/icon-rock.svg', 'linear-gradient(90deg, hsl(349, 71%, 52%), hsl(349, 70%, 56%))'], [['Scissors', 'Lizard'], ['Paper', 'Spock']]]);
buttons.set('Lizard', [['./assets/images/icon-lizard.svg', 'linear-gradient(90deg, hsl(261, 73%, 60%), hsl(261, 72%, 63%))'], [['Paper', 'Spock'], ['Rock', 'Scissors']]]);
buttons.set('Spock', [['./assets/images/icon-spock.svg', 'linear-gradient(90deg, hsl(189, 59%, 53%), hsl(189, 58%, 57%))'], [['Scissors', 'Rock'], ['Paper', 'Lizard']]]);

const selectedButton = e => {
    document.getElementById('switchButton').classList.add('deactive');
    if(normalMode) document.getElementsByClassName('normalMode')[0].classList.remove('active');
    else document.getElementsByClassName('advancedMode')[0].classList.remove('active');

    document.getElementsByClassName('battle')[0].classList.add('active');
    document.getElementById('pickedButton').style.background = buttons.get(e.target.value)[0][1];
    document.getElementById('pickedButton').getElementsByTagName('img')[0].src = buttons.get(e.target.value)[0][0];

    let result = 'Draw';
    let randomButton;
    if(normalMode) {
        switch(Math.floor(Math.random() * 3)) {
            case 0:
                randomButton = 'Paper';
                break;
            case 1:
                randomButton = 'Scissors';
                break;
            case 2:
                randomButton = 'Rock';
                break;
        }
    } else {
        switch(Math.floor(Math.random() * 5)) {
            case 0:
                randomButton = 'Paper';
                break;
            case 1:
                randomButton = 'Scissors';
                break;
            case 2:
                randomButton = 'Rock';
                break;
            case 3:
                randomButton = 'Lizard';
                break;
            case 4:
                randomButton = 'Spock';
                break;
        }
    }

    document.getElementById('housePickedButton').style.background = buttons.get(randomButton)[0][1];
    document.getElementById('housePickedButton').getElementsByTagName('img')[0].src = buttons.get(randomButton)[0][0];
    if(buttons.get(randomButton)[1][0].includes(e.target.value)) result = 'Lose';
    else if(buttons.get(randomButton)[1][1].includes(e.target.value)) result = 'Win';

    setTimeout(() => {
        document.getElementById('housePickedButton').classList.add('active');

        switch(result) {
            case 'Win':
                document.getElementById('result').innerText = 'YOU WIN';
                document.getElementById('score').innerText = `${Number(document.getElementById('score').innerText) + 1}`;
                break;
            case 'Lose':
                document.getElementById('result').innerText = 'YOU LOSE';
                if(0 < Number(document.getElementById('score').innerText)) document.getElementById('score').innerText = `${Number(document.getElementById('score').innerText) - 1}`;
                break;
            case 'Draw':
                document.getElementById('result').innerText = 'DRAW';
                break;
        }

        window.localStorage.setItem('score', document.getElementById('score').innerText);
        document.getElementsByClassName('result')[0].classList.add('active');
    }, 1000)
}

const playAgain = () => {
    document.getElementsByClassName('battle')[0].classList.remove('active');
    document.getElementById('housePickedButton').classList.remove('active');
    document.getElementsByClassName('result')[0].classList.remove('active');
    if(normalMode) document.getElementsByClassName('normalMode')[0].classList.add('active');
    else document.getElementsByClassName('advancedMode')[0].classList.add('active');
    document.getElementById('switchButton').classList.remove('deactive');
}

if(window.localStorage.getItem('score')) document.getElementById('score').innerText = `${window.localStorage.getItem('score')}`;