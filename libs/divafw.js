AFW = {}

AFW.appendChild = function(view) {
	var root_view = document.getElementById("viewport");
	root_view.appendChild(view.getHtmlDiv());
}

AFW.removeChild = function(view)  {
	var root_view = document.getElementById("viewport");
	root_view.removeChild(view.getHtmlDiv());
}
	
AFW.makeViewTouchable = function(view) {
	var last_y=0;
	var last_x=0;

	view.addTouchStartListner = function(callback) {
		//alert(this.getHtmlDiv())
			this.getHtmlDiv().addEventListener("touchstart", function(e){
			//alert(e.touches);
			//alert(e.pageY);
			last_y = e.touches?e.touches[0].pageY:e.pageY;
		  	last_x = e.touches?e.touches[0].pageX:e.pageX;
			var clientRect = this.getBoundingClientRect();
			callback.bind(view)(last_x-clientRect.left, last_y-clientRect.top)
			e.preventDefault();
			return false;
		});
	}
	
	view.addTouchMoveListner = function(callback) {
			this.getHtmlDiv().addEventListener("touchmove", function(e){
			last_y = e.touches[0].pageY;
		 	last_x = e.touches[0].pageX;
			var clientRect = this.getBoundingClientRect();
			callback.bind(view)(last_x-clientRect.left, last_y-clientRect.top)
			e.preventDefault();
			return false;
		});
	}
	
	view.addTouchEndListner = function(callback) {
			this.getHtmlDiv().addEventListener("touchend", function(e){
			var clientRect = this.getBoundingClientRect();
			callback.bind(view)(last_x-clientRect.left, last_y-clientRect.top)
			e.preventDefault();
			return false;
		});
	}
	
	view.addTouchCancelListner = function(callback) {
			this.getHtmlDiv().addEventListener("touchcancel", function(e){
			console.log("touchcanceled");
			callback.bind(view)(last_x-clientRect.left, last_y-clientRect.top)
			return false;
		});
	}
}

AFW.View = function(p_bounds, p_bgcolor) {
	var bounds_style_list = ["top", "left", "right", "bottom", "width", "height"];
	var htmlDiv = document.createElement("div");
	htmlDiv.className="view";
	
	function change_bounds_property(property, new_value) {
			htmlDiv.style[property] = new_value;
	}
	
	this.getHtmlDiv = function() {
		return htmlDiv;
	}
	
	this.getStyle = function() {
		return htmlDiv.style;
	}

	this.appendChild = function(view) {
		this.getHtmlDiv().appendChild(view.getHtmlDiv());
	}
	
	this.removeChild = function(view)  {
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
	
	this.setBounds = function(bounds) {
		if (!bounds) bounds = {};
		for(var i=0; i<bounds_style_list.length; i++) {
			var style_name = bounds_style_list[i];
			//if () 
			if (bounds.hasOwnProperty(style_name))  {
				var val = bounds[style_name];
				//console.log(parseFloat(val),val)
				if (parseFloat(val) == val) {
					val += "px";
				}
				htmlDiv.style[style_name] = val;
			}
			else {
				htmlDiv.style[style_name] = "auto";
			}
		}
		//change_bounds_property("background", "blue");
	}
	
	this.setBackground = function(bg_color) {
		htmlDiv.style["background"] = bg_color;
	}
	
	this.setForeground = function(fg_color) {
		htmlDiv.style["color"] = fg_color;
	}
	if (p_bounds) this.setBounds(p_bounds);
	if (p_bgcolor) this.setBackground(p_bgcolor);
	AFW.makeViewTouchable(this);
}

AFW.Label = function(p_bounds, p_size, p_fgcolor, p_align, p_html) {
	AFW.View.call(this,p_bounds);
	var htmlSpan = document.createElement("span");
	htmlSpan.style.display="block";
	htmlSpan.style.width="100%";
	htmlSpan.style.textOverflow="ellipsis";
	htmlSpan.style.whiteSpace="nowrap";
	htmlSpan.style.overflow="hidden";
  
	this.getHtmlDiv().appendChild(htmlSpan);
	
	this.setFontSize = function(size) {htmlSpan.style.fontSize=size+"px";}
	this.setFontFamily = function(family) {htmlSpan.style.fontFamily=family;}
	this.setHorizontalAlign = function(align) {htmlSpan.style.textAlign=align}
	this.setHtml = function(html) {htmlSpan.innerHTML = html;}

	if (p_fgcolor) this.setForeground(p_fgcolor);
	if (p_align) this.setHorizontalAlign(p_align);
	if (p_size) this.setFontSize(p_size);
	if (p_html) this.setHtml(p_html);
	
}

AFW.ScrollView = function() {
	AFW.View.call(this);
	this.getHtmlDiv().className="view scroll";
	this.getHtmlDiv().style.overflow="auto";
	
	this.addScrollListner = function(callback) {
			this.getHtmlDiv().addEventListener("scroll", function(e){
				//console.log(e);
			//var clientRect = this.getBoundingClientRect();
			//callback(last_x-clientRect.left, last_y-clientRect.top)
			  return false;
		});
	}
}

AFW.TextButton = function(p_bounds, p_text, p_size, p_align, p_fgcolor_normal, p_fgcolor_pressed) {
	AFW.View.call(this,p_bounds);
	var m_action = null;
	
	var htmlSpan = document.createElement("span");
	htmlSpan.style.display="block";
	htmlSpan.style.width="100%";
	htmlSpan.style.textOverflow="ellipsis";
	htmlSpan.style.whiteSpace="nowrap";
	//htmlSpan.style.overflow="hidden";
  
	this.getHtmlDiv().appendChild(htmlSpan);
	
	this.setFontSize = function(size) {htmlSpan.style.fontSize=size+"px";}
	this.setFontFamily = function(family) {htmlSpan.style.fontFamily=family;}
	this.setHorizontalAlign = function(align) {htmlSpan.style.textAlign=align}
	this.setHtml = function(html) {htmlSpan.innerHTML = html;}
	this.setAction = function(p_action) {m_action = p_action;}
	
	this.setHtml(p_text);

	if (p_fgcolor_normal) this.setForeground(p_fgcolor_normal);
	if (p_align) this.setHorizontalAlign(p_align);
	if (p_size) this.setFontSize(p_size);
	
	this.addTouchStartListner(function(x,y){
		this.setForeground(p_fgcolor_pressed)
	}.bind(this));
	
	this.addTouchMoveListner(function(x,y){
		this.setForeground(p_fgcolor_pressed)
	}.bind(this));
	
	this.addTouchEndListner(function(x,y){
		this.setForeground(p_fgcolor_normal);
		if (m_action) m_action();
	}.bind(this));
	
}

AFW.DigitLabel = function(p_bounds, p_font_size, p_bgcolor, p_fgcolor) {
	AFW.View.call(this, p_bounds, p_bgcolor);
	//this.getHtmlDiv().style.overflow="hidden";
	var lbl_from = new AFW.Label({top:0,bottom:0,right:0,left:0}, p_font_size, p_fgcolor, "center");
	var lbl_to = new AFW.Label({top:0,bottom:0,right:0,left:0}, p_font_size, p_fgcolor, "center");
	lbl_from.setHtml("0");
	lbl_to.setHtml("1");
	var m_value = 0;
	this.appendChild(lbl_from);
	this.appendChild(lbl_to);
	
	lbl_from.setTransform({y:"50%"});
	lbl_to.setTransform({y:"-50%"});
	
	this.setDigit = function(digit) {
		var val1 = Math.floor(digit);
		var shift1 = digit-val1;
		var shift2 = 1-shift1;
		
		lbl_from.setHtml(val1);
		lbl_to.setHtml((val1+1)%10);
		lbl_from.setTransform({y:""+(shift1*20)+"%"});
		lbl_to.setTransform({y:"-"+(shift2*20)+"%"});
		lbl_from.setOpacity(shift2);
		lbl_to.setOpacity(shift1);
		//console.log(shift1, shift2)
	}
	
	this.setDigit(0);
}

AFW.NumberLabel = function(p_bounds, p_font_size, p_fgcolor, p_nof_digits) {

	AFW.View.call(this, p_bounds);
	var m_number = 0;
	var digits = [];
	var size = p_font_size/3;//100.0/p_nof_digits;

	for (var i=0; i<p_nof_digits; i++) {
		digits[i] = new AFW.DigitLabel({top:0,bottom:0,right:(i*size)+"%", width:size+"%"}, p_font_size, "transparent", p_fgcolor);
		this.appendChild(digits[i]);
		digits[i].setDigit(i);
	}
	this.setNumber = function(number) {
		number = Math.abs(number);
		m_number = number;
		
		for (var i=0; i<p_nof_digits; i++) {
			
			if (number==0) digits[i].setOpacity(0.0); else digits[i].setOpacity(1);
			var dig = number%10;
			number = ((number-number%10)/10);
			if (dig>9) number+=(dig-9);
			digits[i].setDigit(dig);

			//if (number/10<10) digits[i].setOpacity(0.5);
			//else 
		}
	}
	this.getNumber = function() {return m_number;}
}
