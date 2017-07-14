function DictMan(dict) {
    //var dict1 = dict;
    //var dict2 = dict.slice(0);
    var len = dict.length;
    
    function nrm(str) {
        str = str.toLowerCase();
        str = str.replace(new RegExp('ё', 'g'), 'е');
        str = str.replace(new RegExp('ö', 'g'), 'o');
        str = str.replace(new RegExp('ä', 'g'), 'a');
        str = str.replace(new RegExp('å', 'g'), 'a');
        return str;
    }
    
    
    this.isItemStartFrom = function(idx, tofind) {
        
        var item0 = nrm(this.getWordFrom(idx));
        var str = nrm(tofind);
        return item0.startsWith(str);
    }
    
    function compare(a,b) {
        a = nrm(a);
        b = nrm(b);
        if (a<b) return -1;
        else if (a>b) return 1;
        return 0;
    }
    
    this.getLength = function() {return len;}
    
    this.getWordFrom = function(idx) {
        //return dict2[idx][1];
        var s = dict[idx];
        
        
        
        var i1 = s.indexOf(" >> ");
        var i2 = s.indexOf(" << ");
        
        if (i1>0) {
            return s.substr(0,i1);
        } else {
            return s.substr(0,i2);
        }
    }
    
    this.getWordTo = function(idx) {
        var s = dict[idx];
        var i1 = s.indexOf(" >> ");
        var i2 = s.indexOf(" << ");
        
        if (i1>0) {
            return s.substr(i1+4);
        } else {
            return s.substr(i2+4);
        }
    }
    
    this.findFirstIdx = function(tofind) {
        if (tofind=="") return 0;
        tofind = nrm(tofind);
        //console.log("FINDING:"+tofind)
        var idx0 = 0;
        var idx1 = len-1;
        var idx = Math.floor(idx1/2);
        var cmp = compare(tofind, this.getWordFrom(idx));

        var i=0;
        while (!(idx==0 || idx==len-1 || (cmp<=0 && compare(tofind, this.getWordFrom(idx-1))>0))) {

            if (cmp>0) {
                if (idx==idx0) idx = idx1;
                idx0 = idx;
            } else {
                if (idx==idx1) idx = idx0;
                idx1 = idx;
                
            }
            idx = idx0+Math.floor((idx1-idx0)/2);
            if (idx==idx0) idx = idx1;
            
            cmp = compare(tofind, this.getWordFrom(idx));
            //console.log("find "+tofind+" ", idx0, idx, idx1);
            if (i > 50) break;
            i++;
        }
        
        //console.log("find "+tofind+" in "+i+" steps ", idx, len);
        //return 0;
        //console.log(dict[idx][1], tofind, dict[idx][1].startsWith(tofind));
        if (!nrm((this.getWordFrom(idx))).startsWith(tofind)) {
            //console.log("NOTHING?");
            //return len;
            return this.findFirstIdx(tofind.substr(0,tofind.length-1));
        }

        //console.log(idx + ">>" +dict[idx][1]+":"+cmp +": ("+idx0+","+idx+","+idx1+")");
        //if (idx>0) console.log(idx, this.getWordFrom(idx-1), this.getWordFrom(idx));
        //else console.log(idx, this.getWordFrom(idx));
        return idx;
        //console.log("------");
    }
    
    this.findFirstIdx('b')

}

