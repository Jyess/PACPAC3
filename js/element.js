class element {
	constructor(x,y,id) {
		this.x = x;
		this.y = y;
		this.id = id;
	}

	initialize(x,y,id) {
		//pour changer la position
		this.x = x;
		this.y = y;
		this.id = id;
		this.set_element();
	}

	set_element() {
		var el = document.getElementById(this.id);
		el.style.left = 418 + this.y*46.44 + "px";
		el.style.top = 0 + this.x*46.44 + "px";
	}
}