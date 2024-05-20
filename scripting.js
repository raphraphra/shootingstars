const startP = document.getElementById('startP');

//-------------------[STAR VARIABLES]---------------------------//

const starGen = [
    {'scale' : 4, 'spawn' : 0},
    {'scale' : 3, 'spawn' : 50},
    {'scale' : 2 , 'spawn' : 100},
    {'scale' : 1, 'spawn' : 150}
];

const colors = [
    'red',
    'green',
    'yellow', 
    'purple', 
    'indigo', 
    'blue', 
    'crimson', 
    'magenta',
    'royalblue'
];

const bezier = [
    'cubic-bezier(.72,.46,.72,.7)',     
    'cubic-bezier(.65,.46,.72,.7)',
    'cubic-bezier(.48,.59,.72,.7)',
];

//-------------------[CURSOR VARIABLES]---------------------------//

let pos = [0,0];

const criticalDist = 50;

const cursorColors = [
    'blue',
    'pink',
    'purple',
    'red', 
    'crimson', 
    'turquoise', 
    'aqua'
]

const animation = [
    'star1',
    'star2', 
    'star3'
]

//-------------------[UTIL FUNCS]-------------------------------//

function randBool() {
    return Boolean(Math.round(Math.random()));
}

function randRange(start, end) {

    if (start >= end) {
        throw Error("InvalidRange: range cannot be null or negative");
    }

    return Math.floor(Math.random() * (end-start) + start);

}

function pickFromArray(arr){

    return arr[Math.floor(Math.random() * arr.length)];

}

function getDistance(p1, p2){

    return Math.sqrt((p1[0] - p2[0]) ** 2 + (p1[1] - p2[1]) ** 2);

}

function setPos(el, x, y) {
    
    [el.style.left, el.style.top] = [`${x}px`, `${y}px`];

}

//-------------------------------[MAIN CODE]--------------------------------------//

function generator(e) {
    
    const side = randBool();
    const origin = randBool();

    // your if else statement can be simplified into this:
    const inner = side ? window.innerHeight : window.innerWidth;

    const randomPos1 = randRange(inner * 0.1, inner * 0.9);
    const randomPos2 = randRange(inner * 0.1, inner * 0.9);

    if (startP.style.display != 'none') {
        startP.style.opacity = 0;
        setTimeout(() => startP.style.display = 'none', 200);
    }

    spawnStars(randomPos1, randomPos2, side, origin)
}

function spawnStars(start, end, side, origin){

    const bez = pickFromArray(bezier);
    const animeTime = randRange(750, 1000);
    const inner = side ? window.innerWidth : window.innerHeight;

    const spawnAxis = side ? "--x" : "--y";
    const traversalAxis = side ? "--y" : "--x";

    const offsetY = side ? start : (origin ? 25 : inner * 0.80);
    const offsetX = side ? (origin ? 25 : inner * 0.80) : start;
    
    const direction = origin ? 1 : -1;

    for (const prop of starGen){
        setTimeout(() => {

            const star = document.createElement("i");

            star.classList.add('fa-solid');
            star.classList.add('fa-star');
            star.classList.add(`fa-${prop.scale}x`);

            setPos(star, offsetX, offsetY);

            star.style.setProperty(spawnAxis, `${direction * inner * 0.90}px`);
            star.style.setProperty(traversalAxis, `${end-start}px`);
            star.style.setProperty('--bezier', bez);
            star.style.setProperty('--anime', `${animeTime}ms`);

            star.style.color = pickFromArray(colors);

            document.body.appendChild(star);

            setTimeout(() => document.body.removeChild(star), animeTime);
            
        }, prop.spawn);
            
    }
    
}

function mouseTrail(e) {

    const newPos = [e.clientX, e.clientY]

    const size = Math.random().toFixed(3)

    if (getDistance(pos, newPos) < criticalDist) return;

    pos = newPos;

    const star = document.createElement('i');

    star.classList.add('fa-solid');
    star.classList.add('fa-star');
    star.classList.add('cursor');

    star.style.setProperty('--scale', 1 + size * 1.5);
    star.style.setProperty('--color', pickFromArray(cursorColors));
    star.style.setProperty('--animation', pickFromArray(animation));

    setPos(star, pos[0], pos[1]);

    document.body.appendChild(star);

    setTimeout(() => document.body.removeChild(star), 2000);
}

window.addEventListener("mousemove", mouseTrail);
window.addEventListener("keydown", generator);