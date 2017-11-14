AFW = {};

AFW.default = {
    color:"black",
    background:"transparent",
    fontSize:16,
    padding:0,
    textAlign:"center",
    top:"auto",
    left:"auto",
    right:"auto",
    bottom:"auto",
    width:"auto",
    height:"auto"
};

AFW.appendChild = function(view) {
    var root_view = document.getElementById("viewport");
    root_view.appendChild(view.getHtmlDiv());
    return view;
}

AFW.removeChild = function(view)  {
    if (!view.getHtmlDiv().parentNode) return;
    var root_view = document.getElementById("viewport");
    root_view.removeChild(view.getHtmlDiv());
}
	
AFW.makeViewTouchable = function(view) {
    var last_y=0;
    var last_x=0;
    
    var pressed_inside = false;
    
    view.isInside = function(x,y) {
        if (x<0 || y<0) return false;
        var rect = this.getHtmlDiv().getBoundingClientRect();
        if (x>rect.width || y>rect.height) return false;
        return true;
    }
    
    function setLastTouchPoint(e) {
        var bb = view.getHtmlDiv().getBoundingClientRect();
        last_y = (e.touches?e.touches[0].pageY:e.pageY) - bb.top -window.scrollY;
        last_x = (e.touches?e.touches[0].pageX:e.pageX) - bb.left-window.scrollX;
    }
    
    
    view.addTouchStartListner = function(callback) {
        function onTouchStart(e) {
            pressed_inside = true;
            setLastTouchPoint(e);
            callback.bind(view)(last_x, last_y);
            e.preventDefault();
            return false;
        }
        
        this.getHtmlDiv().addEventListener("touchstart", onTouchStart);
        this.getHtmlDiv().addEventListener("mousedown", onTouchStart);
    }
	
    view.addTouchMoveListner = function(callback) {
        function onTouchMove(e) {
            if (!pressed_inside) return;
            setLastTouchPoint(e);
            callback.bind(view)(last_x, last_y);
            e.preventDefault();
            return false;
        }
        
        this.getHtmlDiv().addEventListener("touchmove", onTouchMove);
        this.getHtmlDiv().addEventListener("mousemove", onTouchMove);

    }
	
    view.addTouchEndListner = function(callback) {
        function otTouchEnd(e) {
            if (!pressed_inside) return;
            pressed_inside = false;
            callback.bind(view)(last_x, last_y)
            e.preventDefault();
            return false;
        }
        this.getHtmlDiv().addEventListener("touchend", otTouchEnd);
        this.getHtmlDiv().addEventListener("mouseup", otTouchEnd);
    }
	
    view.addTouchCancelListner = function(callback) {
        function onTouchCancel(e) {
            pressed_inside = false;
            callback.bind(view)(last_x, last_y)
            return false;
        }
        
        this.getHtmlDiv().addEventListener("touchcancel", onTouchCancel);
        this.getHtmlDiv().addEventListener("mouseout", onTouchCancel);
    }
}

AFW.View = function(p_styles) {
    var htmlDiv = document.createElement("div");
    htmlDiv.className="view";

    this.setStyle = function(key, val) {
        htmlDiv.style[key] = (!isNaN(val))?val+"px":val;
    }

    this.applyStyles = function(p_styles) {
        if (!p_styles) return;
        for(var key in p_styles) {
            this.setStyle(key, p_styles[key]);
        }
    }

    this.getHtmlDiv = function() {
        return htmlDiv;
    }

    this.appendChild = function(view) {
        this.getHtmlDiv().appendChild(view.getHtmlDiv());
    }

    this.removeChild = function(view)  {
        if (!view.getHtmlDiv().parentNode) return;
        this.getHtmlDiv().removeChild(view.getHtmlDiv());
    }

    this.setOpacity = function(alpha) {
        htmlDiv.style.opacity=alpha;
    }
	
    this.setTransform =function(transform) {
        if (!transform.x) transform.x = 0;
        if (!transform.y) transform.y = 0;
        if (!transform.z) transform.z = 0;
        if (!transform.scale) transform.scale = 1;
        if (!transform.rotate) transform.rotate = 0;
        if (parseFloat(transform.x) == transform.x) transform.x += "px";
        if (parseFloat(transform.y) == transform.y) transform.y += "px";
        if (parseFloat(transform.z) == transform.z) transform.z += "px";

        htmlDiv.style.webkitTransform = "translate3D("+transform.x+", "+transform.y+", "+transform.z+") scale("+transform.scale+", "+transform.scale+") rotate("+transform.rotate+"deg)";
    }
	
    this.setBackground = function(bg_color) {
        htmlDiv.style["background"] = bg_color;
    }
	
    this.setForeground = function(fg_color) {
        htmlDiv.style["color"] = fg_color;
    }
    this.applyStyles(AFW.default);
    this.applyStyles(p_styles);
    AFW.makeViewTouchable(this);
}

AFW.Label = function(p_styles, p_html) {
    AFW.View.call(this,p_styles, "transparent");
    
    var htmlSpan = this.getHtmlDiv();
    htmlSpan.style.textOverflow="ellipsis";
    htmlSpan.style.whiteSpace="nowrap";
    htmlSpan.style.overflow="hidden";
    htmlSpan.style.overflow="hidden";
    this.setHtml = function(html) {htmlSpan.innerHTML = html;}
    if (p_html) this.setHtml(p_html);
}

AFW.TextField = function(p_styles, p_placeholder, p_oninput) {
    AFW.View.call(this, p_styles);

    this.oninput = function() {if (p_oninput) p_oninput.bind(this)();}

    var htmlInput = document.createElement("input");
    htmlInput.type = "text"
    htmlInput.style.display="block";
    htmlInput.style.width="100%";
    htmlInput.style.height="100%";
    htmlInput.style.padding="5px";
    htmlInput.value = "";
    htmlInput.autocomplete="off";
    htmlInput.autocorrect="off";
    htmlInput.autocapitalize="off";
    htmlInput.spellcheck="false";
    htmlInput.style.background="transparent"

    htmlInput.placeholder=p_placeholder?p_placeholder:""

    this.getValue = function() {return htmlInput.value;}
    this.setValue = function(p_new_value) {htmlInput.value = p_new_value;}
    this.getHtmlDiv().appendChild(htmlInput);

    this.focus = function()  {
        window.setTimeout(function(){htmlInput.focus();}, 0);
    }
    
    htmlInput.oninput = function() {this.oninput();}.bind(this);
}


AFW.Button = function(p_bounds, p_action, p_onpress_action, p_onrelease_action) {
    AFW.View.call(this, p_bounds);
    
    var active = true;
    
    this.onpress = function() {if (active&&p_onpress_action) p_onpress_action.bind(this)();}
    this.onrelease = function() {if (active&&p_onrelease_action) p_onrelease_action.bind(this)();}
    this.on = function() {if (active&&p_action) p_action(this);}
    this.setActive = function(p_active)  {active = p_active;};
    this.setAction = function(p_new_action) {p_action = p_new_action;}
    
    this.addTouchStartListner(function(x,y){
         this.onpress();
    }.bind(this));

    this.addTouchMoveListner(function(x,y){
        if (this.isInside(x,y)) this.onpress(); else this.onrelease();
    }.bind(this));

    this.addTouchCancelListner(function(x,y){
        this.onrelease();
    }.bind(this));

    this.addTouchEndListner(function(x,y){
        if (this.isInside(x,y)) {
            window.setTimeout(function(){this.onrelease();this.on();}.bind(this), 1);
        }
    }.bind(this));
}

AFW.Canvas = function(p_bounds, bg_color) {
    AFW.View.call(this,p_bounds, bg_color);
    var htmlCanvas = document.createElement("canvas");
    htmlCanvas.style.display="block";
    htmlCanvas.style.height=p_bounds.width +"px"
    htmlCanvas.style.width= p_bounds.width +"px";
    htmlCanvas.width = p_bounds.width*window.devicePixelRatio;
    htmlCanvas.height = p_bounds.height*window.devicePixelRatio;
    this.getHtmlDiv().appendChild(htmlCanvas);
    var context = htmlCanvas.getContext('2d');
    context.scale(window.devicePixelRatio, window.devicePixelRatio);
    //context.arc(40,40,30,0,3);context.lineCap = 'round';context.lineWidth = 4;context.stroke(); // or context.fill()
    this.getCanvasContext = function() {return context;}
}

AFW.ScrollView = function() {
	AFW.View.call(this);
	this.getHtmlDiv().className="view scroll";
	this.getHtmlDiv().style.overflow="auto";
	this.addScrollListner = function(callback) {
			this.getHtmlDiv().addEventListener("scroll", function(e){
			  return false;
		});
	}
}
