function fill_stickers(context, color_str){
    var colors ={ U: 'rgb(255,255,255)',
                  B: 'rgb(00,191,255)',
                  L: 'rgb(255,140,00)',
                  R: 'rgb(255,00,00)',
                  F: 'rgb(124,252,00)',
                  D: 'rgb(255,255,00)',
                };

    for(var i = 0; i < color_str.length; i++){
        context.fillStyle = colors[color_str.charAt(i)];
        context.fillRect(50 + 150 * i,50,100,100);
    }
}


function shuf_str(str){
    var ans = [];
    for(var i = 0; i < str.length; i++){
        ans.push(str.charAt(i));
    }

    // Fisher–Yatesアルゴリズム
    for(i = ans.length - 1; i > 0; i--){
        var r = Math.floor(Math.random() * (i + 1));
        var tmp = ans[i];
        ans[i] = ans[r];
        ans[r] = tmp;
    }
    return ans.join('');
}



var canvas = document.getElementById('canvas1');
var corners = ["UBL", "UBR", "UFL", "UFR", "DBL", "DBR", "DFL", "DFR"]

// Fisher–Yatesアルゴリズム
for(var i = corners.length - 1; i > 0; i--){
    var r = Math.floor(Math.random() * (i + 1));
    var tmp = corners[i];
    corners[i] = shuf_str(corners[r]);
    corners[r] = shuf_str(tmp);
}

if (canvas.getContext) {
    var context = canvas.getContext('2d');
}

var ind = -1;
var start_time = 0.0;

function init(){
    if (canvas.getContext) {
        var context = canvas.getContext('2d');
        context.fillStyle = 'rgb(211,211,211)';
        context.fillRect(0, 0, 500, 200);
    }
}

function prev_action(){
    if (ind > 0){
        ind--;
    }

    if (canvas.getContext) {
        fill_stickers(context, corners[ind]);
        context.fill();
    }
}

function next_action(){
    if (ind == -1){
        ind = 0;
        start_time = Math.floor(new Date().getTime() / 100.0) / 10.0;
        fill_stickers(context, corners[ind]);
        context.fill();
    }
    else if (ind < corners.length - 1){
        ind++;

        if (canvas.getContext) {
            fill_stickers(context, corners[ind]);
            context.fill();
        }
    }
    else if (ind == corners.length - 1){
        var now = Math.floor(new Date().getTime() / 100.0) / 10.0;
        var diff = Math.floor((now - start_time) * 10.0) / 10.0;
        var avg = diff / 8;
        alert(String(diff) + "秒かかりました (平均:" + String(avg) + "秒)");
    }
}

window.onload = init();
