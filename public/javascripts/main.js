import {setupSockets} from "./sockets.js";
import {emitirVibracion} from "./sockets.js";

window.onload = function() {
    const serverURL = window.location.hostname + ":" +  window.location.port;
    const socket = io.connect(serverURL, {secure: true});

    setupSockets(socket);

    var canvas = document.getElementById("canvas");
    var context = canvas.getContext("2d");

    var irudia = new Image();
    irudia.src = "./images/spritesheet.png";
    irudia.onload = canvasEguneratu;

    var x = 2;
    var y = 2;
    var irudiaWidth = irudia.width;
    var irudiaHeight = irudia.height;
    var tileWidth = 28;
    var tileHeight = 36;

    function canvasEguneratu() {
        context.clearRect(0, 0, canvas.width, canvas.height);

        context.drawImage(irudia, 2, 2);
        context.drawImage(irudia, x - 2, y - 2, tileWidth, tileHeight, 485, 2, 2 * tileWidth, 2 * tileHeight);

        context.beginPath();
        context.lineWidth = "1";
        context.strokeStyle = "red";
        context.rect(x - 1, y - 1, tileWidth + 2, tileHeight + 2);
        context.stroke();

        context.font = "bold 10px sans-serif";
        context.fillStyle = "red";
        context.textAlign = "right";
        context.textBaseline = "top";
        context.fillText(`(${x - 2},${y - 2})`, 475, 5);
    }

    document.addEventListener('keydown', (event) => {
        event.preventDefault();

        switch (event.code) {
            case "ArrowUp":
                if (y > 2) {
                    y--;
                    canvasEguneratu();
                } else {
                    emitirVibracion(socket);
                }
                break;
            case "ArrowDown":
                if (y < (irudiaHeight - tileHeight + 2)) {
                    y++;
                    canvasEguneratu();
                } else {
                    emitirVibracion(socket);
                }
                break;
            case "ArrowLeft":
                if (x > 2) {
                    x--;
                    canvasEguneratu();
                } else {
                    emitirVibracion(socket);
                }
                break;
            case "ArrowRight":
                if (x < (irudiaWidth - tileWidth + 2)) {
                    x++;
                    canvasEguneratu();
                } else {
                    emitirVibracion(socket);
                }
                break;
            default:
                break;
        }
    }, false);
}