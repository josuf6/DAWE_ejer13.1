export var setupSockets = function (socket) {
    // register desktop connection
    socket.emit('desktop-connect');

    socket.onopen = function(){
        console.log("Socket conectado!");
    }

    socket.on('phone-move', function (data){

        //movimiento izquierda-derecha
        if (data.beta > 5.0){
            document.dispatchEvent(new KeyboardEvent("keydown", {code: "ArrowRight"}));
        } else if (data.beta < -5.0){
            document.dispatchEvent(new KeyboardEvent("keydown", {code: "ArrowLeft"}));
        }

        //movimiento arriba-abajo
        if (data.gamma > 5.0){
            document.dispatchEvent(new KeyboardEvent("keydown", {code: "ArrowUp"}));
        } else if (data.gamma < -5.0){
            document.dispatchEvent(new KeyboardEvent("keydown", {code: "ArrowDown"}));
        }

    });
}

export var emitirVibracion = function (socket) {
    socket.emit('crash');
}