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

let pos = [0,0]

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

function randBool() {
    return Boolean(Math.round(Math.random()));
}

function randRange(start, end) {
    if (start >= end) {
        throw Error("InvalidRange: range cannot be null or nega")
    }
    return Math.floor(Math.random() * (end-start) + start)
}

function pickFromArray(arr){

    return arr[Math.floor(Math.random() * arr.length)];

}

window.addEventListener("keydown", e => {
    if (startP.style.display != 'none') {
        startP.style.opacity = 0;
        setTimeout(() => {
            startP.style.display = 'none';
        }, 200)
    }
    generator();
});



function generator() {
    const side = randBool();
    const origin = randBool();

    // your if else statement can be simplified into this:
    const inner = side ? window.innerHeight : window.innerWidth;

    const random_pos1 = randRange(inner * 0.1, inner * 0.9);
    const random_pos2 = randRange(inner * 0.1, inner * 0.9);

    spawnstars(random_pos1, random_pos2, side, origin)
}

function spawnstars(start, end, side, origin){
    if (side){
        const bez = pickFromArray(bezier)
        const animeTime = Math.floor(Math.random() * 250 + 750);
        for (const prop of starGen){
            setTimeout(() => {
                const star = document.createElement("i");
                star.classList.add('fa-solid');
                star.classList.add('fa-star');
                star.classList.add(`fa-${prop.scale}x`)
                star.style.top = `${start}px`;
                star.style.left = `${origin ? 25 : window.innerWidth * 0.80}px`
                star.style.setProperty('--x', `${(origin ? 1 : -1) * window.innerWidth * 0.90}px`)
                star.style.setProperty('--y', `${end-start}px`)
                star.style.setProperty('--bezier', bez)
                star.style.setProperty('--anime', `${animeTime}ms`)
                star.style.color = pickFromArray(colors)
                document.body.appendChild(star)
                setTimeout(() => {
                    document.body.removeChild(star)
                }, animeTime)
                }, prop.spawn)
            
        }
        
    } else {
        const bez = pickFromArray(bezier)
        const animeTime = Math.floor(Math.random() * 250 + 750);
        for (const prop of starGen){
            setTimeout(() => {
                const star = document.createElement("i");
                star.classList.add('fa-solid');
                star.classList.add('fa-star');
                star.classList.add(`fa-${prop.scale}x`)
                star.style.left = `${start}px`;
                star.style.top = `${origin ? 25 : window.innerHeight * 0.80}px`
                star.style.setProperty('--y', `${(origin ? 1 : -1) * window.innerHeight * 0.90}px`)
                star.style.setProperty('--x', `${end-start}px`)
                star.style.setProperty('--bezier', bez)
                star.style.setProperty('--anime', `${animeTime}ms`)
                star.style.color = pickFromArray(colors)
                document.body.appendChild(star)
                setTimeout(() => {
                    document.body.removeChild(star)
                }, animeTime)
                }, prop.spawn)
            
        }
    
    }
    
}



function getDistance(p1, p2){
    return (Math.sqrt(((p1[0] - p2[0])**2) + ((p1[1] - p2[1])**2)));
}


window.onmousemove = e => {

    const mouseX = e.clientX;
    const mouseY = e.clientY;
    const newPos = [mouseX, mouseY]
    const size = Math.random().toFixed(3)
    if (getDistance(pos, newPos) < criticalDist){return;}
    pos = newPos;
    const star = document.createElement('i');
    star.classList.add('fa-solid');
    star.classList.add('fa-star');
    star.classList.add('cursor')
    star.style.setProperty('--scale', 1 + Number(size) * 1.5);
    star.style.setProperty('--color', pickFromArray(cursorColors))
    star.style.setProperty('--animation', pickFromArray(animation))
    star.style.top = `${mouseY}px`;
    star.style.left = `${mouseX}px`;
    document.body.appendChild(star);
    setTimeout(() => {
        document.body.removeChild(star)
    }, 2000)
}