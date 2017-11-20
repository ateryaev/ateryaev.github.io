
AFW.Textarea = function(p_styles, p_oninput) {
    AFW.View.call(this, p_styles);

    this.oninput = function() {if (p_oninput) p_oninput.bind(this)();}

    var htmlTextarea = document.createElement("textarea");
    
    htmlTextarea.autocomplete=false;
    htmlTextarea.autocorrect=false;
    htmlTextarea.autocapitalize="none";
    htmlTextarea.spellcheck=false;
    
    htmlTextarea.style.display="block";
    htmlTextarea.style.width="100%";
    htmlTextarea.style.height="100%";
    htmlTextarea.style.padding="10px";
    htmlTextarea.style.background="transparent"

    htmlTextarea.value = "";
    

    this.getValue = function() {return htmlTextarea.value;}
    this.setValue = function(p_new_value) {htmlTextarea.value = p_new_value;}
    this.getHtmlDiv().appendChild(htmlTextarea);

    
    function getIndent(txt, pos) {
        var txt = txt.substr(0, pos);
        txt = txt.substr(txt.lastIndexOf("\n")+1);
        var indent = "";
        for(var i=0;i<txt.length;i++) {
            if (txt[i] != ' ') break;
            indent += ' ';
        }
        
        if (txt.lastIndexOf("{")>-1) {
            indent += "  ";
        }
        //if (txt.lastIndexOf("}")>-1) {
        //    indent = indent.substr(2);
        //}
        return indent;
    }
    
    htmlTextarea.oninput = function() {this.oninput();}.bind(this);
    
    this.insertAt = function(pos, text) {
        htmlTextarea.selectionStart = pos;
        htmlTextarea.selectionEnd = pos;
        document.execCommand("insertText", false, text);
    };

    String.prototype.replaceAll = function(search, replacement) {
        var target = this;
        return target.split(search).join(replacement);
    };
    
    this.selectAll = function() {htmlTextarea.selectionStart=0;htmlTextarea.selectionEnd=htmlTextarea.value.length;}
    this.isSelectedAll = function() {return (htmlTextarea.selectionStart==0&&htmlTextarea.selectionEnd==htmlTextarea.value.length);}
    
    this.wrapAtCaret = function (text1, text2) {
        var startPos = htmlTextarea.selectionStart;
        var endPos = htmlTextarea.selectionEnd;
        var selectedTxt = htmlTextarea.value.substring(startPos, endPos);
        
        var indent = getIndent(htmlTextarea.value, htmlTextarea.selectionStart);
        text1 = text1.replaceAll("\n", "\n"+indent);
        text2 = text2.replaceAll("\n", "\n"+indent);
        selectedTxt = selectedTxt.replaceAll("\n", "\n  ");
        
        if (!text2) {
            document.execCommand("insertText", false, text1);
        } else {
            document.execCommand("insertText", false, text1 + selectedTxt + text2);
            htmlTextarea.selectionStart = startPos + text1.length;
            htmlTextarea.selectionEnd = startPos + text1.length + selectedTxt.length;
        }
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
    
    
    
    htmlTextarea.onkeypress = function(e) {
        if (e.keyCode == 13) {
            e.preventDefault();
            var indent = getIndent(htmlTextarea.value, htmlTextarea.selectionStart);
            document.execCommand("insertText", false, "\n"+indent);
        }
    }.bind(this);
}
