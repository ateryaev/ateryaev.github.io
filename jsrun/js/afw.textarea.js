
AFW.Textarea = function(p_styles, p_oninput) {
    AFW.View.call(this, p_styles);

    this.oninput = function() {if (p_oninput) p_oninput.bind(this)();}

    var htmlTextarea = document.createElement("textarea");
    
    //getCodeElement().onblur = function() {AFW.removeChild(view_wrappers);}
    //getCodeElement().onfocus = function() {AFW.appendChild(view_wrappers);}
    
    htmlTextarea.autocomplete="off";
    htmlTextarea.autocorrect="off";
    htmlTextarea.autocapitalize="off";
    htmlTextarea.spellcheck="false";
    
    htmlTextarea.style.display="block";
    htmlTextarea.style.width="100%";
    htmlTextarea.style.height="100%";
    htmlTextarea.style.padding="10px";
    htmlTextarea.style.background="transparent"

    htmlTextarea.value = "";
    

    this.getValue = function() {return htmlTextarea.value;}
    this.setValue = function(p_new_value) {htmlTextarea.value = p_new_value;}
    this.getHtmlDiv().appendChild(htmlTextarea);

    
    
    htmlTextarea.oninput = function() {this.oninput();}.bind(this);
    
    this.insertAt = function(pos, text) {
        htmlTextarea.selectionStart = pos;
        htmlTextarea.selectionEnd = pos;
        document.execCommand("insertText", false, text);
    };

    this.wrapAtCaret = function (text1, text2) {
        var startPos = htmlTextarea.selectionStart;
        var endPos = htmlTextarea.selectionEnd;
        document.execCommand("insertText", false, text1 + htmlTextarea.value.substring(startPos, endPos) + text2);
        htmlTextarea.selectionStart = startPos + text1.length;
        htmlTextarea.selectionEnd = startPos + text1.length + endPos-startPos;
    };
    
    this.setReadonly = function(readonly) {
        htmlTextarea.readOnly = readonly;
    }
    
    this.blur = function() {htmlTextarea.blur();}
    this.focus = function() {htmlTextarea.blur();htmlTextarea.focus();}
    
    this.scrollBottom = function() {htmlTextarea.scrollTop = htmlTextarea.scrollHeight;}
    this.scrollTop = function() {htmlTextarea.scrollTop = 0; htmlTextarea.selectionStart=0; htmlTextarea.selectionEnd=0;}
    
    
    htmlTextarea.onblur = function() {if (this.onblur) this.onblur();}.bind(this);
    htmlTextarea.onfocus = function() {if (this.onfocus) this.onfocus();}.bind(this);
}
