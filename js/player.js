class player extends element {
	constructor(x,y) {
		super(x,y,"perso");
		this.moyenne = 10;
	}

	initialize(x,y) {
		super.initialize(x,y,"perso");
	}

	get moy() {
		return this.moyenne.toFixed(1);
	}

	move(x,y) {
		if (this.x+x >= 0 && this.x+x <= 14 && this.y+y >= 0 && this.y+y <= 14) {
			if (x > 0 && (map[this.x+1][this.y] != 1)) this.x++; //bas
			else if (x < 0 && (map[this.x-1][this.y] != 1)) this.x--; //haut
			else if (y > 0 && (map[this.x][this.y+1] != 1)) this.y++; //droite
			else if (y < 0 && (map[this.x][this.y-1] != 1)) this.y--; //gauche
		}
		this.initialize(this.x,this.y);
		// this.note++;
		// var note = document.getElementById("note");
		// note.innerHTML = this.note + " / 20";
	}
}
