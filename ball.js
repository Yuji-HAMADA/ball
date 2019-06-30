// module aliases
var Engine = Matter.Engine,
    Render = Matter.Render,
    World = Matter.World,
    Bodies = Matter.Bodies;
    Body = Matter.Body;

// create an engine
var engine = Engine.create();

// Smartphone or PC
var myCanvas = document.getElementById('world');
var window_w;
var window_h;
if (navigator.userAgent.match(/(iPhone|iPod|Android.*Mobile)/i)) {
    window_w = window.innerWidth;
    window_h = window.innerHeight;
} else {
    window_w = myCanvas.clientWidth;
    window_h = myCanvas.clientHeight;
}

// create a renderer
console.log(myCanvas.clientHeight, myCanvas.clientWidth);
var render = Render.create({
    canvas: myCanvas,
    element: document.body,
    engine: engine,
    options: {
        element: document.getElementById('app'),
        width: window_w,
        height: window_h,
//        background: 'transparent',
//        wireframes: false,
//        showAngleIndicator: false
    }
});

// Handle mouse events
var mouse_button_pressed_flg = false;
var mouse_button_pressed_x;
var mouse_button_pressed_y;

document.onmousedown = function (e) {
    mouse_button_pressed_flg = true;
    mouse_button_pressed_x = e.clientX;
    mouse_button_pressed_y = e.clientY;
}

document.onmouseup = function (e) {
    mouse_button_pressed_flg = false;
}

document.onmousemove = function (e) {
    if (mouse_button_pressed_flg) {
        var distance = e.clientX - mouse_button_pressed_x;
        mouse_button_pressed_x = e.clientX;
        Body.translate(mine, { x: distance, y: 0 })
    }
}

window

var rampPos_x = 0;
var rampPos_y = myCanvas.clientWidth/10;
var mine = Bodies.rectangle(100, 550, 100, 10, { isStatic: true, restitution:1.01});

// Make world
function MakeWorld(world, engine) {
    var clientWidth = myCanvas.clientWidth;
    var clientHeight = myCanvas.clientHeight;
    var ceiling = Bodies.rectangle(clientWidth /2, 0, clientWidth, 10, { isStatic: true, friction:0 });
    var leftwall = Bodies.rectangle(0, clientHeight / 2, 10, myCanvas.clientHeight, { isStatic: true, friction: 0 });
    var rightwall = Bodies.rectangle(clientWidth, clientHeight / 2, 10, clientHeight, { isStatic: true, friction: 0 });
    var ramp = Bodies.rectangle(rampPos_x, rampPos_y, 200, 10, { isStatic: true, friction: 0 });
    world.add(engine.world, [ramp,ceiling, leftwall, rightwall, mine]);
}


MakeWorld(World, engine);




circle_radius = 20;
//var boxA = Bodies.rectangle(700, 200, 80, 80, { restitution: rest, friction: 0 });
var rest = 0.99;
var circle = Bodies.circle(rampPos_x + 20, rampPos_y - circle_radius, circle_radius,
    { restitution: rest, friction: 0, frictionAir: 0 });
Body.setVelocity(circle, { x: 1, y: 0 });
World.add(engine.world, [circle]);

// run the engine
Engine.run(engine);

// run the renderer
Render.run(render);