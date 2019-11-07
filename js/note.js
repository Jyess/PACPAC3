class note extends element {
	constructor(x,y,id) {
		super(x,y,id);
		this.note = rand_note();
	}

	initialize(x,y,id) {
		super.initialize(x,y,id);
	}
}