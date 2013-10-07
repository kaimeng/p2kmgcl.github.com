window.Sapo = function (opt) {
    // PI * 2, ahorra muchos cálculos
    // en los ángulos
    this.PIX2 = Math.PI * 2;
    
    this.canvas = opt.canvas || document.createElement('canvas');
    this.context = this.canvas.getContext('2d');
    this.rotation = opt.rotation || 0;
    this.position = opt.position || {
        x: 0,
        y: 0
    };
    
    this.head = new this.head({
        context: this.context
    });
    this.eyes = [];
    this.eyes.length = opt.eyes || 2;
    this.arms = [];
    this.arms.length = opt.arms || 10;
    
    var _p = this.constructor.prototype;
    
    /**
     * Dibuja al sapo completo
     */
    _p.render = function () {
        this.head.render();
    };
    
    /**
     * Inicializa todos los parámetros
     */
    _p.init = function () {
        console.log(this.eyes.length);
        console.log(this.arms.length);
    };
};
