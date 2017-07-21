// https://stackoverflow.com/questions/22003491/animating-canvas-to-look-like-tv-noise/22003901#comment65440010_22003901

var canvas = document.getElementById('canvas'),
    ctx = canvas.getContext('2d');


    var w = ctx.canvas.width,
        h = ctx.canvas.height,
        idata = ctx.createImageData(w, h),
        buffer32 = new Uint32Array(idata.data.buffer),
        len = buffer32.length,
        i = 0;

function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    w = ctx.canvas.width;
        h = ctx.canvas.height;
        idata = ctx.createImageData(w, h);
        buffer32 = new Uint32Array(idata.data.buffer);
        len = buffer32.length;
}
resize();
window.onresize = resize;

function noise(ctx) {
    
    for(i=0; i < len;)
        buffer32[i++] = ((180 * Math.random())|0) << 24;
    
    ctx.putImageData(idata, 0, 0);
}

var toggle = true;

// added toggle to get 30 FPS instead of 60 FPS
(function loop() {
    toggle = !toggle;
    if (toggle) {
    	noise(ctx);
    }
    requestAnimationFrame(loop);
})();
