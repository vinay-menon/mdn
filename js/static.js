// https://stackoverflow.com/a/22085531/604040

var canvas = document.getElementById('canvas'),
    ctx = canvas.getContext('2d');

// closer to analouge appearance
canvas.width = canvas.height = 512;

function resize() {
    canvas.style.width = window.innerWidth + 'px';
    canvas.style.height = window.innerHeight + 'px';
}
resize();
window.onresize = resize;

function noise(ctx) {

    var w = ctx.canvas.width,
        h = ctx.canvas.height,
        idata = ctx.createImageData(w, h),
        buffer32 = new Uint32Array(idata.data.buffer),
        len = buffer32.length,
        run = 0,
        color = 0,
        m = Math.random() * 6 + 4,
        band = Math.random() * w * w,
        p = 0,
        i = 0;

    for (; i < len;) {
        if (run < 0) {
            run = m * Math.random();
            p = Math.pow(Math.random(), 0.4);
            if (i > band && i < band + 48 * 80) {
                p = Math.random();
            }
            color = (100 * p) << 24;
        }
        run -= 1;
        buffer32[i++] = color;
    }

    ctx.putImageData(idata, 0, 0);
}

var frame = 0;

// added toggle to get 30 FPS instead of 60 FPS
(function loop() {
    frame += 1;
    if (frame % 3) {
        requestAnimationFrame(loop);
        return;
    }
    noise(ctx);
    requestAnimationFrame(loop);
})();