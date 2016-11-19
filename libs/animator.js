var ANIME = new function() {
	var last_id = 1;
	var animations = []; //{action:new function(progress) {}, duration: 100ms, age:44ms}
	var last_timestamp = null;
	this.ANIME_TICK = "ANIME_TICK";
	var anime_tick_obj = {delta_ms:0};
	
	function step(timestamp) {
	  if (!last_timestamp) last_timestamp = timestamp;
	  var delta = timestamp-last_timestamp;//miliseconds
	  anime_tick_obj.delta_ms = delta;
	  NC.postNotification(this.ANIME_TICK, anime_tick_obj);
	  for(var i in animations) {
	  	var anime = animations[i];
	  	anime.age += delta;
	  	var prg = anime.age/anime.duration;
	  	if (prg>=1) {
	  		prg=1;
	  		delete animations[i];
	  	}
	  	if (prg>0) anime.action(prg);

	  }
	  last_timestamp = timestamp;
	  window.requestAnimationFrame(step.bind(this));
	}
	
	window.requestAnimationFrame(step.bind(this));
	
	//animations.push({age:0, duration:1000, action:function(prg) {console.log(prg);}});
	this.createAnimation = function(duration_ms, action_func, delay) {
		if (!delay) delay =0;
		animations[last_id] = {age:-delay, duration:duration_ms, action:action_func};
		last_id++;
		return last_id-1;
	}
	
	this.isAnimationValid = function(anime_id)  {return animations[anime_id] !== undefined;}
	
	this.complete = function(anime_id) {
		if (this.isAnimationValid(anime_id)) {
			animations[anime_id].action(1);
			delete animations[anime_id];
		}
	}
	
	this.getProgress = function(anime_id) {
		if (!animations[anime_id]) return 1;
		return animations[anime_id].age/animations[anime_id].duration;
	}

	this.setProgress = function(anime_id, new_progress) {
		if (!animations[anime_id]) return;
		var a = animations[anime_id];
		a.age = a.duration * new_progress;
	}

}
