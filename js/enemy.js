class enemy extends element {
	constructor(x,y,id) {
		super(x,y,id);
	}

	initialize(x,y) {
		super.initialize(x,y,this.id);
	}

	move(x,y,en) {
		if (x > 0 && map[this.x+1][this.y] == 2) { //bas
			this.x++; 
			if (en == en1) en1.src="img/enemy1-1.gif";
			else if (en == en2) en2.src="img/enemy2-1.gif";
			else if (en == en3) en3.src="img/enemy3-1.gif";
			else if (en == en4) en4.src="img/enemy4-1.gif";
			else if (en == en5) en5.src="img/enemy3-1.gif";
		} else if (x < 0 && map[this.x-1][this.y] == 2) { //haut
			this.x--; 
			if (en == en1) en1.src="img/enemy1-4.gif";
			else if (en == en2) en2.src="img/enemy2-4.gif";
			else if (en == en3) en3.src="img/enemy3-4.gif";
			else if (en == en4) en4.src="img/enemy4-4.gif";
			else if (en == en5) en5.src="img/enemy3-4.gif";
		} else if (y > 0 && map[this.x][this.y+1] == 2) { //droite
			this.y++; 
			if (en == en1) en1.src="img/enemy1-3.gif";
			else if (en == en2) en2.src="img/enemy2-3.gif";
			else if (en == en3) en3.src="img/enemy3-3.gif";
			else if (en == en4) en4.src="img/enemy4-3.gif";
			else if (en == en5) en5.src="img/enemy3-3.gif";
		} else if (y < 0 && map[this.x][this.y-1] == 2) { //gauche
			this.y--; 
			if (en == en1) en1.src="img/enemy1-2.gif";
			else if (en == en2) en2.src="img/enemy2-2.gif";
			else if (en == en3) en3.src="img/enemy3-2.gif";
			else if (en == en4) en4.src="img/enemy4-2.gif";
			else if (en == en5) en5.src="img/enemy3-2.gif";
		}
		this.initialize(this.x,this.y,this.id);
	}
}