/*
Copyright (c) 2014 Mike Ferron (mikeferron.com)

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and
associated documentation files (the "Software"), to deal in the Software without restriction,
including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense,
and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so,
subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or
substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS
IN THE SOFTWARE.

*/

Vector2D=function(){function a(a,b){this.x=a||0,this.y=b||0}var b,c,d,e,f;for(f=["add","subtract","multiply","divide","dot"],c=function(b){return a[b]=function(a,c){return a.duplicate()[b](c)}},d=0,e=f.length;e>d;d++)b=f[d],c(b);return a.lerp=function(a,b,c){return b.duplicate().subtract(a).multiply(c).add(a)},a.fromAngle=function(b){return new a(Math.cos(b),Math.sin(b))},a.random=function(){return new a.fromAngle(Math.floor(Math.random()*(2*Math.PI-0+1))+0)},a.prototype.zero=function(){return this.x=this.y=0,this},a.prototype.abs=function(){return this.x=Math.abs(this.x),this.y=Math.abs(this.y),this},a.prototype.duplicate=function(){return new a(this.x,this.y)},a.prototype.clone=a.prototype.duplicate,a.prototype.magnitude=function(){return Math.sqrt(this.x*this.x+this.y*this.y)},a.prototype.length=a.prototype.magnitude,a.prototype.negative=function(){return this.multiply(-1)},a.prototype.reverse=a.prototype.negative,a.prototype.normalize=function(){var a=this.magnitude();return a>0&&this.divide(a),this},a.prototype.unit=a.prototype.normalize,a.prototype.limit=function(a){return this.magnitude()>a?(this.normalize(),this.multiply(a)):this},a.prototype.heading=function(){return-1*Math.atan2(-1*this.y,this.x)},a.prototype.eucl_distance=function(a){var b,c;return b=this.x-a.x,c=this.y-a.y,Math.sqrt(b*b+c*c)},a.prototype.distance=function(a,b){var c,d;return null===b&&(b=!1),c=Math.abs(this.x-a.x),d=Math.abs(this.y-a.y),b&&(c=c<b.width/2?c:b.width-c,d=d<b.height/2?d:b.height-d),Math.sqrt(c*c+d*d)},a.prototype.add=function(a){return this.x+=a.x,this.y+=a.y,this},a.prototype.subtract=function(a){return this.x-=a.x,this.y-=a.y,this},a.prototype.multiply=function(a){return this.x=this.x*a,this.y=this.y*a,this},a.prototype.divide=function(a){return this.x=this.x/a,this.y=this.y/a,this},a.prototype.dot=function(a){return this.x*a.x+this.y*a.y},a.prototype.lerp=function(a,b){return this.x=this.x+b*(a.x-this.x),this.y=this.y+b*(a.y-this.y),this},a.prototype.projectOnto=function(a){return a.duplicate().multiply(this.dot(a))},a.prototype.wrapRelativeTo=function(a,b){var c,d,e,f,g,h;g=this.duplicate(),h={x:"width",y:"height"};for(c in h)e=h[c],d=this[c]-a[c],f=b[e],Math.abs(d)>f/2&&(g[c]=d>0?-1*(f-this[c]):this[c]+f);return g},a.prototype.equals=function(a){return this.x==a.x&&this.y==a.y},a.prototype.invalid=function(){return 1/0===this.x||isNaN(this.x)||1/0===this.y||isNaN(this.y)},a}();

Pollock = (function() {

  /*
  * Helper Functions...
  */
  Pollock.extend = function(to, from, allowNew) {
    for (var i in from) {
      if (allowNew || to.hasOwnProperty(i))
      to[i] = from[i];
    }
    return to;
  };
  Pollock.randomPosNeg = function() {
    return Math.random() * 2 - 1;
  };
  Pollock.degreesToRadians = function(degrees) {
    return (degrees * Math.PI) / 180;
  };
  Pollock.radiansToDegrees = function(radians) {
    return (radians * 180) / Math.PI;
  };
  Pollock.wrapAngle = function(angle) {
    while (angle < -Math.PI) {
      angle += Math.PI * 2;
    }
    while (angle > Math.PI) {
      angle -= Math.PI * 2;
    }

    return angle;
  };
  Pollock.randomInRange = function(from, to) {
    return Math.floor(Math.random()*(to-from+1)+from);
  };

  /*
  * CONSTRUCTOR
  */

  function Pollock(options) {
    this.settings = {
      canvasID: null,
      clear: true,
      fullscreen: false,
      mousemove: function(event) {},
      mousedown: function(event) {},
      mouseup: function(event) {},
      click: function(event) {},
    };

    Pollock.extend(this.settings, options, true);

    this.dt = 0; //delta time between updates
    this.currentTime = new Date().getTime(); //current time, used to calculate dt

    this.canvas = document.getElementById(this.settings.canvasID);

    if(this.settings.fullscreen)
    {
      this.canvas.width = window.innerWidth;
      this.canvas.height = window.innerHeight;
    }

    this.width = this.canvas.width;
    this.height = this.canvas.height;

    this.context = this.canvas.getContext('2d');

    this.entities = [];
  };

  Pollock.prototype.getCanvasContext = function() {
    return this.context;
  };

  Pollock.prototype.enable = function() {
    window.requestAnimFrame = (function() {
      return window.requestAnimationFrame ||
      window.webkitRequestAnimationFrame ||
      window.mozRequestAnimationFrame ||
      window.oRequestAnimationFrame ||
      window.msRequestAnimationFrame;
    })();

    window.cancelAnimFrame = (function() {
      return window.cancelAnimationFrame ||
      window.webkitCancelAnimationFrame ||
      window.mozCancelAnimationFrame ||
      window.oCancelAnimationFrame ||
      window.msCancelAnimationFrame;
    })();

    this.animate(new Date().getTime());

    this.canvas.onmousemove = this.settings.mousemove;
    this.canvas.onmousedown = this.settings.mousedown;
    this.canvas.onmouseup = this.settings.mouseup;
    this.canvas.onclick = this.settings.click;

    var that = this;
    function doResize()
    {
      that.resize(); //i want 'this' to be Pollock, not the window
    }
    var endResize; //work this on a delay
    window.onresize = function(e) {
      clearTimeout(endResize);
      endResize = setTimeout(doResize, 100);
    };

    return this;
  };

  Pollock.prototype.animate = function(time) {
    var that = this;
    this.animationFrame = requestAnimFrame(function() {
      that.animate(new Date().getTime());
    });

    var dt = time - this.currentTime;
    this.currentTime = time;
    this.update(dt);
  };

  Pollock.prototype.disable = function() {
    window.cancelAnimFrame(this.animationFrame);
    return this;
  };

  Pollock.prototype.resize = function()
  {
    if(!this.settings.fullscreen)
    return;

    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;

    this.width = this.canvas.width;
    this.height = this.canvas.height;
  };

  Pollock.prototype.addChild = function(obj) {
    this.entities.push(obj);
  };

  Pollock.prototype.update = function(dt) {
    this.draw();

    var len = this.entities.length;
    while (len--) {
      var entity = this.entities[len];
      entity.update(dt);
      if (!entity.alive) {
        this.entities.splice(len, 1);
        continue;
      }
      this.entities[len].draw(this.context);
    }
  };

  Pollock.prototype.draw = function() {
    if (this.settings.clear) {
      this.context.clearRect(0, 0, this.width, this.height);
      this.context.fillStyle = 'transparent';
      this.context.fillRect(0, 0, this.width, this.height);
    }
  };

  return Pollock;
})();

Drip = (function() {
  function Drip(options) {
    this.settings = {
      lifeSpan: 1000,
      position: new Vector2D(0,0),
      velocity: new Vector2D(0,0),
      color: '#333',
      size: 1,
      onDeath: function(event){},
    };

    Pollock.extend(this.settings, options, true);

    this.age = 0;
    this.alive = true;
  };

  Drip.prototype.update = function(dt) {
    this.age += dt;

    if(this.age > this.settings.lifeSpan)
    {
      this.kill();
      return;
    }

    //Move it around randomly.  No science behind this, it just turned out pretty good!
    this.settings.velocity.add(new Vector2D(Math.random()*.5 - .25, Math.random()*.5 - .25));
    var lPosition = this.settings.position.clone();
    this.settings.position.add(this.settings.velocity);
    var dPosition = Vector2D.subtract(this.settings.position, lPosition);
    var a = (Math.atan2(dPosition.y, dPosition.x) + Math.PI/2);
    this.settings.velocity.x += this.settings.velocity.x * Math.cos(a) - this.settings.velocity.y * Math.sin(a);
    this.settings.velocity.y += this.settings.velocity.x * Math.sin(a) + this.settings.velocity.y * Math.cos(a);
  };

  Drip.prototype.draw = function(context) {
    var t = new Date().getTime();

    context.save();
    //context.globalAlpha = 0.1;//uncommenting this gives a watercolor-like look
    context.beginPath();
    context.fillStyle = this.settings.color;

    //Do some time based calculation to get size variation
    context.arc(
      this.settings.position.x,
      this.settings.position.y,
      Math.abs((Math.sin(t)*Math.sin(t*.5))*this.settings.size),
      0,
      2 * Math.PI,
      false
    );

    context.fill();
    context.restore();
  };

  Drip.prototype.kill = function(){
    this.alive = false;
    this.settings.onDeath();
  };

  return Drip;
})();

var scene;
  var md = false;
  var colors = [
  '#1abc9c', '#d35400', '#34495e', '#e74c3c',
  '#16a085', '#3498db', '#2c3e50', '#9b59b6',
  '#f1c40f', '#2980b9', '#f39c12', '#8e44ad',
  '#2ecc71', '#c0392b', '#27ae60', '#e67e22'
  ];

  function addDrip(point){
    point = point || new Vector2D(
      Pollock.randomInRange(0,scene.width),
      Pollock.randomInRange(0, scene.height)
    );
    var drip = new Drip({
      lifeSpan: Pollock.randomInRange(500, 3000),
      position: point,
      velocity: new Vector2D(
        Math.random()*25,
        Math.random()*25
      ),
      color: colors[Pollock.randomInRange(0, colors.length-1)],
      size: Pollock.randomInRange(2,6),
      onDeath: function(){
        addDrip();
      }
    });

    scene.addChild(drip);
  };

  function initialize() {
    scene = new Pollock({
      canvasID: "c",
      clear: false,
      fullscreen: true
    });

    scene.enable();
    
    var i = 10;
    while(i--)
    {
      addDrip();
    }
  }

 
  initialize();

