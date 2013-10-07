/*global Sapo: false */

Sapo.prototype.arm = function (opt) {
    this.context = opt.context || null;
    
    this.angle = opt.angle || 0;
    this.length = opt.length || 50;
    this.width = opt.width || 20;
    this.position = {
        x: 0,
        y: 0
    };
    
    this.color = opt.color || 'black';
    
    var _p = this.constructor.prototype,
        _c = this.context;

    /**
     * Dibuja un brazo
     */
    _p.render = function () {
        _c.beginPath();
        _c.lineCap = 'round';
        _c.strokeStyle = this.color;
        _c.lineWidth = this.width;
        _c.moveTo(this.position.x, this.position.y);
        _c.lineTo(this.position.x + Math.cos(this.angle) * this.length,
                  this.position.y + Math.sin(this.angle) * this.length);
        _c.stroke();
        _c.closePath();
    };
};
