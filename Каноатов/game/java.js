(function(canvas, width, height, playersize, speed, acc){
    var ctx = canvas.getContext('2d');
    canvas.width = width; canvas.height = height; px=100; py=0; blocks_tick=0.2; p_acc=0;to_x=100;points=0;can_jump=0;
    var blocks=[];
    timer = setInterval(function(){
        ctx.clearRect(0,0,width,height);
        p_acc += 0.2; if (p_acc>10){p_acc=10;} py += p_acc;speed+=acc;points+=1;can_jump-=1;
        if (to_x<px){px-=6;}if (to_x>px){px+=6;}
        if (Math.random()<blocks_tick){
            blocks.push({'x': width, 'y': Math.random()*height, 'size': Math.random()*40 + 20});
        }
        for (var i=0; i<blocks.length;i++){
            blocks[i]['x'] -= speed;
            ctx.fillStyle='#333'; ctx.fillRect(blocks[i]['x'], blocks[i]['y'], blocks[i]['size'], 10);
            if ((blocks[i]['x'] + blocks[i]['size'] >= px) && (blocks[i]['x'] <= px + playersize) && (blocks[i]['y'] + 10 >= py) && (blocks[i]['y'] <= py + playersize)){
                if ((p_acc>0) && (can_jump<0)){
                    p_acc=-8;can_jump = 30;py=blocks[i]['y']-playersize;
                }
                else{p_acc = -p_acc;py=blocks[i]['y']+10;}
            }
            if (blocks[i]['x']+blocks[i]['size']<0){blocks.splice(i--,1);}
        }
        ctx.fillStyle=(can_jump<0)?'#eeee00':'#aaa';ctx.fillRect(px,py,playersize, playersize);
        if (py>height){
            clearInterval(timer);
            if (confirm('GameOver! Your Points:'+points+' Restart?')){window.location.reload()}
        }
    }, 1000/24);
    document.addEventListener('mousemove', function (e) { to_x = e.pageX; }, false);
})(document.getElementById('game'), 400, 400, 10, 6, 0.005);