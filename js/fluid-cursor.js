/* Fluid Cursor WebGL Implementation */
(function() {
    'use strict';

    const canvas = document.getElementById('fluid-canvas');
    if (!canvas) return;

    // Ajustar tamaño del canvas al viewport
    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();

    const gl = canvas.getContext('webgl2', { alpha: true, depth: false, antialias: false });
    if (!gl) {
        console.warn('WebGL 2 no soportado en este navegador');
        return;
    }

    // Configuración general de la simulación de fluidos
    let config = {
        SIM_RESOLUTION: 128,
        DYE_RESOLUTION: 512,
        DENSITY_DISSIPATION: 0.97,
        VELOCITY_DISSIPATION: 0.98,
        PRESSURE: 0.8,
        CURL: 30,
        SPLAT_RADIUS: 0.25,
        SPLAT_FORCE: 6000,
        SHADING: true,
        COLORFUL: true
    };

    let pointer = {
        x: 0,
        y: 0,
        dx: 0,
        dy: 0,
        moved: false,
        color: [0.3, 0.6, 1.0] // Tonalidad azul/cyberpunk acorde al tema
    };

    window.addEventListener('mousemove', e => {
        pointer.dx = (e.clientX - pointer.x) * 5.0;
        pointer.dy = (e.clientY - pointer.y) * 5.0;
        pointer.x = e.clientX;
        pointer.y = e.clientY;
        pointer.moved = true;
    });

    window.addEventListener('touchmove', e => {
        if(e.touches.length > 0) {
            const touch = e.touches[0];
            pointer.dx = (touch.clientX - pointer.x) * 5.0;
            pointer.dy = (touch.clientY - pointer.y) * 5.0;
            pointer.x = touch.clientX;
            pointer.y = touch.clientY;
            pointer.moved = true;
        }
    });
})();