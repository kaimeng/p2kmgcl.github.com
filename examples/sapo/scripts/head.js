/*global Sapo: false */

/**
 * Cabeza
 * @param opt.size
 * @param opt.color
 * @param opt.borderColor
 * @param opt.borderSize
 */
Sapo.prototype.head = function (opt) {
    this.context = opt.context || null;
    
    this.size = opt.size || 50;
    this.color = opt.color || 'black';
    this.position = opt.position || {
        x: 0,
        y: 0
    };
    
    this.borderColor = opt.borderColor || 'black';
    this.borderSize = opt.borderSize || 1;
    
    var _p = this.constructor.prototype,
        _c = this.context;
    
    /**
     * Dibuja la cabeza
     */
    _p.render = function () {
        _c.beginPath();
        _c.fillStyle = this.color;
        _c.strokeStyle = this.borderColor;
        _c.lineWidth = this.borderSize;
        _c.arc(this.position.x, this.position.y, this.size, 0, Sapo.PIX2);
        _c.fill();
        _c.stroke();
        _c.closePath();
    };
    
    return this;
};
