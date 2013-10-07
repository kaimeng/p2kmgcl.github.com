/*global Sapo: false */

Sapo.prototype.eye = function (opt) {
    this.context = opt.context || null;
    
    this.corneaSize = opt.corneaSize || 22;
    this.corneaColor = opt.corneaColor || 'white';
    this.position = opt.position || {
        x: 0,
        y: 0
    };
    
    this.irisSize = opt.irisSize || 10;
    this.irisColor = opt.irisColor || 'black';
    this.irisPosition = opt.position || {
        x: 0,
        y: 0
    };
    
    this.pupilSize = opt.pupilSize || 4
    this.pupilColor = opt.pupilColor || 'black';
    
    var _p = this.constructor.prototype,
        _c = this.context;
    
    /**
     * Dibuja un ojo
     */
    _p.render = function () {
        _c.beginPath();
        _c.fillStyle = this.corneaColor;
        _c.moveTo(this.position.x + this.corneaSize, this.position.y);
        _c.arc(this.position.x, this.position.y, this.corneaSize, 0, Sapo.PIX2);
        _c.fill();
        _c.closePath();
        
        _c.beginPath();
        _c.fillStyle = this.irisColor;
        _c.moveTo(this.irisPosition.x + this.irisSize, this.irisPosition.y);
        _c.arc(this.irisPosition.x, this.irisPosition.y, this.irisSize, 0, Sapo.PIX2);
        _c.fill();
        _c.closePath();
        
        _c.beginPath();
        _c.fillStyle = this.pupilColor;
        _c.moveTo(this.irisPosition.x + this.pupilSize, this.irisPosition.y);
        _c.arc(this.irisPosition.x, this.irisPosition.y, this.pupilSize, 0, Sapo.PIX2);
        _c.fill();
        _c.closePath();
    };
    
    /**
     * Hace que el ojo (pupila o iris) se gire para mirar a una posición concreta
     * @param position Lugar al que se desea mirar
     */
    _p.lookAt = function (position) {
    };
};
