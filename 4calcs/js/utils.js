function LOG() {
    for(var a of arguments) {
        console.log(a);
    }
}

var RestApi = new function() {
    
    this.get = function (args, okHandler, errorHandler) {
        
        var xhr = new XMLHttpRequest();
        var url = "https://ahotoha.000webhostapp.com/kanobu/restapi";
        
        for (var param of args) url += "/"+param;
        LOG("RestApi.get "+url);

        xhr.open("GET", url);
        
        xhr.onreadystatechange = function () {
            if (xhr.readyState === XMLHttpRequest.DONE) {
                if (xhr.status === 200) {
                  try {
                    obj = JSON.parse(xhr.responseText);
                    if (okHandler) okHandler(obj);
                    return;
                  } catch(ex) {
                    
                  }
                } 
              
                {
                    if (errorHandler) errorHandler(xhr.status);
                    else if (okHandler) okHandler(xhr.status);
                }
            };
        };
        
        xhr.send();
        
    }
}

function AUTO_VIEWPORT(renderWidth, renderHeight, viewport) {

    var USING_META_VIEWPORT = (('ontouchstart' in window) || window.DocumentTouch && document instanceof DocumentTouch);
    //var viewport = document.querySelector("body>div");// window.document.getElementById("screen");
    var metaElement = document.querySelector("meta[name=viewport]");
    var curentZoom = 1.0;
    viewport.style.width = renderWidth+"px";
    viewport.style.height = renderHeight+"px";
    viewport.style.margin="auto";
    viewport.style.right="0";
    viewport.style.left="0";
    viewport.style.top="0";
    viewport.style.bottom="0";
    viewport.style.position="fixed"
    
    //var output = document.querySelector("#output");
    //output.innerHTML = (screen.width + " % " + document.documentElement.clientWidth);
    window.onresize = function() {
        
        var deviceWidth = Math.round(document.documentElement.clientWidth*curentZoom);
        var deviceHeight = Math.round(document.documentElement.clientHeight*curentZoom);
        var needScaleW= (deviceWidth/renderWidth);
        var needScaleH= (deviceHeight/renderHeight);
        var needScale = Math.min(needScaleW, needScaleH);

        if (USING_META_VIEWPORT) {
            curentZoom = needScale;
            metaElement.content = "initial-scale="+(Math.round(needScale*10000)/10000.0)+", user-scalable=no,maximum-scale=100.0";
        }
        else {
            //viewport.style.transform = "scale("+needScale+")";
            if (needScale>1) {
                needScale = Math.floor(needScale);
            }
            document.querySelector("body").style.zoom = needScale;
            
            //document.querySelector("body").style.transformOrigin = "50% 50%";
            //document.querySelector("body").style.transform = "scale("+needScale+")";
        }
    }

    window.onresize();   
}

function rebind(model) {
    var binds = document.querySelectorAll("[bind]");
    for (var obj of binds) {
        var val = obj.getAttribute("bind").split(":");
        if (val.length == 1) {
            obj.textContent = eval(val[0]);
        } else {
            obj[val[0]] = eval(val[1]);
        }
        
    }
}

function normalizeString(str) {
    var validChars = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ_=-";
    var nrm = "";
    for (var i=0; i<str.length;i++) {
        if (validChars.indexOf(str[i])>=0) {
            nrm += str[i];
        }
    }
    return nrm;
}


function getLocalStorageValue(key) {
    if (!window.localStorage || !window.localStorage.getItem(key)) return null;
    try {
        return JSON.parse(window.localStorage.getItem(key));
    } catch(ex) {
        return null;
    }
    
}

function setLocalStorageValue(key, val) {
    if (!window.localStorage || !window.localStorage.setItem) return;
    window.localStorage.setItem(key, JSON.stringify(val));
}