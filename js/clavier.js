function control(event) {
	var k = event.keyCode;
	var personnage = document.getElementById("perso");
	// var activeNotes = document.getElementById("notes").childNodes;
	if (hasStarted) switch(k) {
		case 37 : //touche gauche
	    	// personnage.style.transform = "rotate(180deg)";
    		personnage.src = "img/gauche.gif";
	    	p.move(0,-1);
			if (activeNotes.length != 0) {
				for (var i = 0; i < activeNotes.length; i++) {
					if (activeNotes[i].x == p.x && activeNotes[i].y == p.y) win(activeNotes[i]);
				}
			}
			if (e1.x == p.x && e1.y == p.y && !inv) lose();
			if (e2.x == p.x && e2.y == p.y && !inv) lose();
			if (e3.x == p.x && e3.y == p.y && !inv) lose();
			if (e4.x == p.x && e4.y == p.y && !inv) lose();
			if (e5.x == p.x && e5.y == p.y && !inv) lose();
			if (map[p.x][p.y] == 3) teleport();
	    	break;
		case 38 : // touche haut
    		personnage.src = "img/haut.gif";
	    	p.move(-1,0);
			if (activeNotes.length != 0) {
				for (var i = 0; i < activeNotes.length; i++) {
					if (activeNotes[i].x == p.x && activeNotes[i].y == p.y) win(activeNotes[i]);
				}
			}
			if (e1.x == p.x && e1.y == p.y && !inv) lose();
			if (e2.x == p.x && e2.y == p.y && !inv) lose();
			if (e3.x == p.x && e3.y == p.y && !inv) lose();
			if (e4.x == p.x && e4.y == p.y && !inv) lose();
			if (e5.x == p.x && e5.y == p.y && !inv) lose();
			if (map[p.x][p.y] == 3) teleport();
			break;
		case 39 : // touche droite
			// personnage.style.transform = "rotate(0deg)";
			personnage.src = "img/droite.gif";
			p.move(0,1);
			if (activeNotes.length != 0) {
				for (var i = 0; i < activeNotes.length; i++) {
					if (activeNotes[i].x == p.x && activeNotes[i].y == p.y) win(activeNotes[i]);
				}
			}
			if (e1.x == p.x && e1.y == p.y && !inv) lose();
			if (e2.x == p.x && e2.y == p.y && !inv) lose();
			if (e3.x == p.x && e3.y == p.y && !inv) lose();
			if (e4.x == p.x && e4.y == p.y && !inv) lose();
			if (e5.x == p.x && e5.y == p.y && !inv) lose();
			if (map[p.x][p.y] == 3) teleport();
			break;
		case 40 : // touche bas
		  	personnage.src = "img/bas.gif";
	    	p.move(1,0);
			if (activeNotes.length != 0) {
				for (var i = 0; i < activeNotes.length; i++) {
					if (activeNotes[i].x == p.x && activeNotes[i].y == p.y) win(activeNotes[i]);
				}
			}
			if (e1.x == p.x && e1.y == p.y && !inv) lose();
			if (e2.x == p.x && e2.y == p.y && !inv) lose();
			if (e3.x == p.x && e3.y == p.y && !inv) lose();
			if (e4.x == p.x && e4.y == p.y && !inv) lose();
			if (e5.x == p.x && e5.y == p.y && !inv) lose();
			if (map[p.x][p.y] == 3) teleport();
			break;
		case 65 : //touche a
			if (!wait_bonus) invisible();
		default :
	} else if (story) {
		switch(k) {
			case 32 : //touche espace
				skip_story();
				break;
			default :
		}
	}
}

