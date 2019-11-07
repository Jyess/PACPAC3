//fonctions raccourcis
function create_element(parent,tag,html,id,cl,src) {
	var id_parent = document.getElementById(parent);
	var el = document.createElement(tag);
	el.innerHTML = html;
	el.id = id;
	el.setAttribute("class",cl);
	el.src = "img/" + src;
	id_parent.appendChild(el);
}

function update() {
	var moy = document.getElementById("note");
	if (moy == undefined) {
		return "<span>" + p.moy + "</span> / 20";
	} else {
		moy.innerHTML = "<span>" + p.moy + "</span> / 20";
		return moy.innerHTML;
	}
}

create_element("body","h1","PACPAC 3","logo","");
create_element("body","div","START","start","btn");
create_element("body","div","QUIT","quit","btn");
create_element("body","img","","sound","","sound.png");
create_element("body","p","Turn sound on","txtsound","","sound.png");
start.addEventListener("click", story);
quit.addEventListener("click", quit_game);

function generate_mob() {
	//perso
	create_element("body","img","","perso","el","bas.gif");

	//enemies
	create_element("body","img","","en1","el","enemy1-1.gif");
	create_element("body","img","","en2","el","enemy2-1.gif");
	create_element("body","img","","en3","el","enemy3-1.gif");
	create_element("body","img","","en4","el","enemy4-1.gif");
	create_element("body","img","","en5","el","enemy3-1.gif");

	create_element("body","div","","notes","");

	create_element("body","img","","portal1","el","portal.gif");
	create_element("body","img","","portal2","el","portal.gif");

	p = new player(0,0);
	p.initialize(11,0);

	e1 = new enemy(0,0,"en1");
	e1.initialize(2,2);

	e2 = new enemy(0,0,"en2");
	e2.initialize(2,7);

	e3 = new enemy(0,0,"en3");
	e3.initialize(12,2);

	e4 = new enemy(0,0,"en4");
	e4.initialize(12,12);

	e5 = new enemy(0,0,"en5");
	e5.initialize(2,12);
}

function generate_map() {
	//map
	create_element("body","img","","map","","map.png");

	var portal1 = new element(0,0,"portal1");
	portal1.initialize(5,0,"portal1");

	var portal2 = new element(0,0,"portal2");
	portal2.initialize(7,14,"portal2");
}

function anim() {
	closeTuto.style.animation = "";
	setTimeout(function() {
		closeTuto.style.animation = "shake .2s"
	},10);
}

tuto = true;
function generate_ui() {
	//background tuto
	create_element("body","div","","tuto_bkg","");

	if (tuto) {
		create_element("body","img","","tuto","","tuto.png");
		create_element("body","img","","closeTuto","","close.png");
		closeTuto.addEventListener("click", quit_tuto);
		document.addEventListener("click",anim);
	}

	//barre latéral gauche
	create_element("body","div","","sidebar","");
	
	//Titre : moyenne
	create_element("sidebar","h1","Moyenne","title","");

	//moyenne
	create_element("sidebar","p",update(),"note","");

	//info moyenne
	create_element("sidebar","p","Meh","info","");

	//Titre : avertissement
	create_element("sidebar","h1","Avertissements","title2","");

	//avertissements
	create_element("sidebar","div","","avertDIV","");
	for (var i = 0; i < 3; i++) {
		create_element("avertDIV","img","","avert","","avertissement_off.png");
	}

	//Titre : bonus
	create_element("sidebar","h1","Bonus","title","");

	//bonus 1
	create_element("sidebar","img","","bonus1","","invisible.png");
	bonus1.addEventListener("click",invisible);
	bonus1.addEventListener("mouseover",function() {info_bonus(1)});
	bonus1.addEventListener("mouseout",function() {info_bonus(info_bonus1)});

	//press A
	create_element("body","img","","pressA","","a.svg");

	//cooldown bonus 1
	create_element("body","div","","bar","");
}

function quit_tuto() {
	var a = document.getElementById("tuto");
	var b = document.getElementById("closeTuto");
	var c = document.getElementById("tuto_bkg");
	document.body.removeChild(a);
	document.body.removeChild(b);
	document.body.removeChild(c);
	document.removeEventListener("click",anim);
	document.addEventListener('keyup', control);
}


inv = false;
wait_bonus = false;
function invisible() {
	bonus1.removeEventListener("click",invisible);
	inv = true;
	wait_bonus = true;
	var bonus = document.getElementById("bonus1");
	bonus.style.filter = "saturate(0)";
	bonus.style.opacity = "0.3";
	bonus.style.cursor = "not-allowed";
	document.body.removeChild(bar);
	perso.style.opacity = "0.3";
	create_element("body","p",5,"timer","");
	var i = 4;
	var Timer = setInterval(function() {
		if (i >= 0) timer.innerHTML = i--; else {clearInterval(Timer); document.body.removeChild(timer);}
	}, 1000);
	setTimeout(function() {
		inv = false;
		perso.style.opacity = "1";
		create_element("body","div","","bar","");
		bar.style.animation = "cooldown ease-in 10s";
	}, 5000);
	setTimeout(function() {
		bonus.style.filter = "saturate(1)";
		bonus.style.opacity = "1";
		bonus.style.cursor = "pointer";
		perso.style.opacity = "1";
		bonus1.addEventListener("click",invisible);
		wait_bonus = false;
	}, 15000);
}

function info_bonus(a) {
	if (a == 1) create_element("sidebar","p","Cet item permet de vous rendre invisible et donc intouchable pendant <b>5 secondes</b>.","info_bonus1","");
	else document.getElementById("sidebar").removeChild(a); 
}

activeNotes = new Array();
alreadyExists = new Array();
function generate_note() {
	//crée trois notes
	var notes = document.getElementById("notes");
	for (var i = 1; i < 4; i++) {
		var z = Math.floor(Math.random()*tabX.length);
		while (alreadyExists.includes(z)) var z = Math.floor(Math.random()*tabX.length); //pour éviter note sur note
		alreadyExists.push(z);
		var cX = tabX[z];
		var cY = tabY[z];
		var a = document.createElement("p");
		a.id = "n" + i;
		notes.appendChild(a);
		var n = new note(cX,cY,a.id);
		n.initialize(cX,cY,a.id);
		activeNotes.push(n);
		a.innerHTML = n.note;
	}
	alreadyExists = new Array();
}

function rand_move() {
	var m = [-1,1];
	var x = m[Math.floor(Math.random()*m.length)];
	return x;
}

function rand_pos() {
	var pos = new Array();
	for (var i = 0; i < 15; i++) pos.push(i);
	var x = pos[Math.floor(Math.random()*pos.length)];
	return x;
}

function rand_note() {
	var notes = new Array();
	for (var i = 5; i < 18; i++) notes.push(i);
	var x = notes[Math.floor(Math.random()*notes.length)];
	return x;
}

function win(n) {
	if (((p.moyenne + n.note)/2) < p.moyenne) {
		info.style.color = "#c0392b"; 
		info.innerHTML = "Bad !" ;
		p.moyenne = (p.moyenne + n.note)/2; 
		update();
		var audio = new Audio("sounds/wrong.mp3"); 
		audio.play();
	}
	else if (((p.moyenne + n.note)/2) > p.moyenne) {
		info.style.color = "#2ecc71"; 
		info.innerHTML = "Good !" ;
		p.moyenne = (p.moyenne + n.note)/2; 
		update();
		var audio = new Audio("sounds/good.mp3"); 
		audio.play();
	}
	else if (((p.moyenne + n.note)/2) == p.moyenne) {
		info.style.color = "grey"; 
		info.innerHTML = "Meh";
		p.moyenne = (p.moyenne + n.note)/2; 
		update();
		var audio = new Audio("sounds/meh.mp3"); 
		audio.play();
	}

	if (p.moyenne < 8) death();
	if (p.moyenne >= 15) end();

	document.getElementById("notes").removeChild(document.getElementById(n.id));
	for (var i = 0; i < activeNotes.length; i++) {
		if (activeNotes[i].id == n.id) {
			activeNotes.splice(i,1);
		}
	}

}

warning = 0;
function lose() {
	var avert = avertDIV.children[warning];
	avert.src = "img/avertissement_on.png";

	var audio = new Audio("sounds/oof.mp3"); 
	audio.play();
	update();
	warning++;

	if (warning == 3) {
		warning = 0; 
		death();
	}
}

function teleport() {
	if (p.y == 0) p.initialize(7,14); else p.initialize(5,0);
	var audio = new Audio("sounds/teleport.mp3"); 
	audio.play();
	audio.volume = 0.07;
}

function death() {
	//arrêt ennemis/notes + clavier
	clearInterval(interval_enemies);
	document.removeEventListener('keyup', control);
	clearInterval(interval_notes);

	var audio = new Audio("sounds/death.mp3"); 
	audio.play();

	music.pause();
	
	//fond noir
	var deathbkg = document.createElement("div");
	deathbkg.id = "death_bkg";
	
	//msg game over
	var death = document.createElement("p");
	death.id = "death";
	death.innerHTML = "VOUS REDOUBLEZ";

	deathbkg.appendChild(death);
	document.body.appendChild(deathbkg);

	//bouton main menu
	setTimeout(function(){ 
		var score = document.createElement("p");
		score.id = "scorefin";
		if (p.moyenne < 8) {
			score.innerHTML = "Votre moyenne est de <span>" + p.moy + "</span> / 20, vous n'obtenez pas votre semestre.<br>";
		} else {
			score.innerHTML = "Vous avez été pris en flagrant délit de triche.";
		}
		deathbkg.appendChild(score);

		var restart = document.createElement("div");
		restart.id = "restart";
		restart.setAttribute("class","btn");
		restart.innerHTML = "Recommencer";
		deathbkg.appendChild(restart);

		var mainmenu = document.createElement("div");
		mainmenu.id = "mainmenu";
		mainmenu.setAttribute("class","btn");
		mainmenu.innerHTML = "Menu principal";
		deathbkg.appendChild(mainmenu);

		restart.addEventListener("click", function() {
			tuto = false;
			while (document.body.firstChild) document.body.removeChild(document.body.firstChild);
			start_game();
			var a = document.getElementById("tuto_bkg");
			document.body.removeChild(a);
			document.addEventListener('keyup', control);
		});
		mainmenu.addEventListener("click", function() {window.location.href = "index.html"});
	}, 3000);
}

function end() {
	//arrêt ennemis/notes + clavier
	clearInterval(interval_enemies);
	document.removeEventListener('keyup', control);
	clearInterval(interval_notes);

	music.pause();
	var audio = new Audio("sounds/win.mp3"); 
	audio.play();

	
	//fond noir
	var deathbkg = document.createElement("div");
	deathbkg.id = "win_bkg";
	
	//msg game over
	var death = document.createElement("p");
	death.id = "death";
	death.innerHTML = "FELICITATIONS";

	deathbkg.appendChild(death);
	document.body.appendChild(deathbkg);

	//mob removal
	document.body.removeChild(en1);
	document.body.removeChild(en2);
	document.body.removeChild(en3);
	document.body.removeChild(perso);

	//bouton main menu
	setTimeout(function(){ 
		var score = document.createElement("p");
		score.id = "scorewin";
		score.innerHTML = "Vous avez votre semestre avec <span>" + p.moy + "</span> / 20 de moyenne. Mais vous redoublez quand même, désolé.<br>Allez travailler, maintenant.";
		deathbkg.appendChild(score);

		var restart = document.createElement("div");
		restart.id = "restart";
		restart.setAttribute("class","btn");
		restart.innerHTML = "Recommencer";
		deathbkg.appendChild(restart);

		var mainmenu = document.createElement("div");
		mainmenu.id = "mainmenu";
		mainmenu.setAttribute("class","btn");
		mainmenu.innerHTML = "Menu principal";
		deathbkg.appendChild(mainmenu);

		restart.addEventListener("click", function() {
			tuto = false;
			while (document.body.firstChild) document.body.removeChild(document.body.firstChild);
			start_game();
			var a = document.getElementById("tuto_bkg");
			document.body.removeChild(a);
			document.addEventListener('keyup', control);
		});
		mainmenu.addEventListener("click", function() {window.location.href = "index.html"});
	}, 3000);
}

story = false;
function story() {
	document.addEventListener("keydown",control);
	story = true;
	document.body.removeChild(start);
	document.body.removeChild(quit);
	document.body.removeChild(logo);
	document.body.removeChild(sound);
	document.body.removeChild(txtsound);

	create_element("body","p","Appuyez sur la barre espace pour passer.","skip","");

	var linesArray = ["Vous avez raté vos trois premiers semestres.","Il ne faut pas que vous redoubliez.","Mais comment éviter ça ?"];
	create_element("body","div","","lines","");
	str = linesArray[0]; 	
	letter = 0;
	typing();
	setTimeout(function() {document.body.removeChild(lines)}, 2900)

	var i = 1;
	line = setInterval(function() { 
		create_element("body","div","","lines","");
		letter = 0;
		str = linesArray[i]; 
		typing();
		setTimeout(function() {document.body.removeChild(lines)}, 2900)
		i++;
		if (i == linesArray.length) clearInterval(line);
	}, 3000);
	begin_game = setTimeout(function() {
		start_game();
		story=false
		document.removeEventListener("keydown",control);
}, 9000);
}

function skip_story() {
	story = false;
	clearInterval(line);
	clearInterval(type);
	clearTimeout(begin_game);
	document.body.removeChild(skip);
	start_game();
	document.removeEventListener("keydown",control);
}


function typing() {
	if (letter < str.length) document.getElementById("lines").innerHTML += str.charAt(letter); letter++; type = setTimeout(typing,50)
}

hasStarted = false;
function start_game() {
	hasStarted = true;
	music = new Audio("sounds/music.mp3"); 
	music.volume = 0.5;
	music.play();
	music.loop = true;

	generate_mob();
	generate_map();
	generate_ui();

	//déplacement ennemis
	interval_enemies = setInterval(function() { 
		e1.move(rand_move(),rand_move(),en1);
		e2.move(rand_move(),rand_move(),en2);
		e3.move(rand_move(),rand_move(),en3);
		e4.move(rand_move(),rand_move(),en4);
		e5.move(rand_move(),rand_move(),en5);
		if (e1.x == p.x && e1.y == p.y && !inv) lose();
		if (e2.x == p.x && e2.y == p.y && !inv) lose();
		if (e3.x == p.x && e3.y == p.y && !inv) lose();
		if (e4.x == p.x && e4.y == p.y && !inv) lose();
		if (e5.x == p.x && e5.y == p.y && !inv) lose();
	}, 600);

	//apparition notes
	interval_notes = setInterval(function() { 
		//on
		generate_note();

		//off
		setTimeout(function(){ 
			activeNotes = new Array();
			var notes = document.getElementById("notes");
			if (notes.childNodes.length > 0) while (notes.firstChild) notes.removeChild(notes.firstChild);
		}, 5900);
	}, 6000);
}

function quit_game() {
	if (confirm("La page va se fermer.")) window.close();
}

// start_game()