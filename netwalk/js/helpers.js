function mod(n, m) {
    var remain = n % m;
    return Math.floor(remain >= 0 ? remain : remain + m);
};
function rndIdx(max) {
	return Math.floor(Math.random()*(max+1))%(max+1);
}

//+ Jonas Raoni Soares Silva
//@ http://jsfromhell.com/array/shuffle [v1.0]
function shuffle(o){ //v1.0
    for(var j, x, i = o.length; i; j = Math.floor(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
    return o;
};