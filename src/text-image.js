(function() {
    var pre = document.createElement('pre'),
        canvas = document.createElement('canvas'),
        context = canvas.getContext('2d'),
        _style = {
            font: 'Sans-serif',
            align: 'left',
            color: '#000000',
            size: 16,
            background: 'rgba(0, 0, 0, 0)',
            stroke: 0,
            strokeColor: '#FFFFFF'
        },
        preStyle = ';padding: 0; display: block; position: fixed; top: 0;overflow: hidden';

    function setStyle(style) {
        for (var key in style) {
            this.style[key] = style[key];
        }
        this._style = 'font: ' + this.style.size + 'pt ' + this.style.font + ';';
        this._style += 'line-height: 1;';
        this._style += 'text-align: ' + this.style.align + ';';
        this._style += 'color: ' + this.style.color + ';';
        this._style += 'background-color: ' + this.style.background + ';';
        this._style += preStyle;
        return this;
    }

    function toDataURL() {
        return canvas.toDataURL();
    }

    function toImage(message, callback) {
        convert.call(this, message);
        var img = new Image();
        if (callback) {
            img.onload = callback;
        }
        img.src = canvas.toDataURL();
        return img;
    }

    function convert(message) {
        message = String(message).trim();
        pre.innerText = message;
        pre.setAttribute('style', this._style);
        context.clearRect(0, 0, canvas.width, canvas.height);
        var lines = message.split('\n'),
            x = Math.floor(this.style.stroke / 2),
            y = pre.offsetHeight / lines.length,
            base = y * 0.2;
        canvas.width = pre.offsetWidth + x;
        canvas.height = pre.offsetHeight;
        context.fillStyle = this.style.background;
        context.beginPath();
        context.fillRect(0, 0, canvas.width, canvas.height);
        context.fill();
        context.font = this.style.size + 'pt ' + this.style.font;
        context.textAlign = this.style.align;
        context.lineWidth = x;
        context.strokeStyle = this.style.strokeColor;
        context.fillStyle = this.style.color;
        switch (context.textAlign) {
            case 'center':
                x = canvas.width / 2;
                break;
            case 'right':
                x = canvas.width - x;
                break;
        }
        lines.forEach(function(line, i) {
            if (this.style.stroke) {
                context.strokeText(line, x, y * (i + 1) - base);
            }
            context.fillText(line, x, y * (i + 1) - base);
        }.bind(this));
    }

    if (window.addEventListener) {
        window.addEventListener('load', onload, false)
    } else {
        window.attachEvent('onload', onload, false)
    }

    function onload() {
        document.body.appendChild(pre);
    };

    window.TextImage = function(style) {
        var n = {
            style: {},
            setStyle: setStyle,
            toDataURL: toDataURL,
            toImage: toImage
        };
        for (var key in _style) {
            n.style[key] = _style[key];
        }
        n.setStyle(style);
        return n;
    }
})();