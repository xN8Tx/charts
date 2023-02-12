/**
 * TODO: 
 * ИСПРАВИТЬ РАБОТУ С ГИПЕРБОЛОЙ
 * ДОБАВИТЬ К УРОВНЕНИЯМ К
 */

const   g = document.getElementById('graphic')
        btn  = document.getElementById('btn')
        inp = document.getElementById('X');

const ctx = g.getContext('2d');
const width = g.clientWidth / 2;
const height = g.clientHeight / 2;
const step = Math.round(g.clientWidth / 13);
const qntLine = 32;
const qntLineWidth = 1;

// ЦЕНТРИРОВАНИЕ КАНВАСА
ctx.translate(width, height);

// ФОРМУЛА ОТСТУПА МЕЖДУ ЛИНИЯМИ СЕТКИ
const margin = Math.round((g.clientWidth - (qntLine * qntLineWidth)) / (qntLine));

// ФОРМУЛА ГРАФИКОВ
const straight = (x) => x;
const parabola = (x) => x * x;
const cubic = (x) => x * x * x;
const giperbola = (x) => 1 / x;

// ОТРИСОВКА СЕТКИ
const ctxGrid = () => {
    let posX = -width + margin;
    let posY = -height + margin;

    ctx.beginPath();
    for(let i = -(qntLine / 2); i <= (qntLine / 2); i++) {
        // Cетка
        ctx.beginPath();
        ctx.strokeStyle=`${i === 0 ? 'black' : '#aaaaaa'}`;
        ctx.lineWidth = qntLineWidth;
        // по Y
        ctx.moveTo(-width, posY);
        ctx.lineTo(width, posY);
        ctx.stroke();
        posY += margin;

        // по X
        ctx.moveTo(posX, -height);
        ctx.lineTo(posX, height);
        ctx.stroke();
        posX += margin;
        ctx.closePath();

        // Координаты
        ctx.beginPath();
        ctx.textAlign = "center";
        ctx.fillStyle = "black";
        ctx.font = "8px Arial";
        ctx.fillText(i, 10, posY - margin);
        ctx.fillText(`${i != 0 ? i : ''}`, posX - margin, 5);
        ctx.closePath();
    };
    ctx.closePath();
};


// ОТРИСОВКВА ГРФИКА
const ctxGraphic = (callback) => {
    if (inp.value == '') alert('Введите число')
    const X = inp.value;
    ctx.beginPath();
    ctx.strokeStyle='green';
    ctx.lineWidth = qntLineWidth;
    for(let x = -X; x <= X; x+=0.01) {
        ctx.lineTo((x * margin) + 5, (-callback(x) * margin) + 5);
    }
    ctx.stroke();
    ctx.closePath();
};

// ОЧИСТКА 
const ctxClear = () => {
    ctx.clearRect(-width, -height, g.clientWidth, g.clientHeight);
};

// РАБОТА С UI
btn.addEventListener("click", (e) => {
    switch (e.target.innerText) {
        case "Прямая":
            ctxClear();
            ctxGrid();
            ctxGraphic(straight);
            break;
        case "Парабола":
            ctxClear();
            ctxGrid();
            ctxGraphic(parabola);
            break;
        case "Кубическая парабола":
            ctxClear();
            ctxGrid();
            ctxGraphic(cubic);
            break;
        case "Гипербола":
            ctxClear();
            ctxGrid();
            ctxGraphic(giperbola);
            break;
        default:
            break;
    }
})


// SOMETHING
// console.log(formMargin());
// ctx.strokeStyle = `${i == 0,5 ? 'black' : 'grey'}`;
