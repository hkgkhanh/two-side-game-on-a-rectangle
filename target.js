class Target {
	constructor(x, y) {
		this.pos = createVector(x, y);
		this.r = 8;

		this.duration = 80;
	}

	update() {
		this.duration--;
	}

	show() {
		fill(204, 204, 0);
		stroke(0);
		strokeWeight(1);
		circle(this.pos.x, this.pos.y, this.r*2);

		noFill();
		stroke(204, 204, 0);
		strokeWeight(1);
		circle(this.pos.x, this.pos.y, this.duration*2);
	}
}

class P1HomePos extends Target {
	constructor() {
		super(x, y);
	}

	show() {

	}
}