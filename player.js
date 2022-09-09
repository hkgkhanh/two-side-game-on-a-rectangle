class Player {
	constructor(x, y) {
		this.pos = createVector(x, y);
		this.vel = createVector(0, 0);
		this.acc = createVector(0, 0);
		this.maxSpeed = 6;
		this.maxForce = 0.4;
		this.r = 16;
	}

	seek(target, arrival = false) {
		let force = p5.Vector.sub(target.pos, this.pos);
		let desiredSpeed = this.maxSpeed;
		if (arrival) {
			let slowRadius = 150;
			let distance = force.mag();
			if (distance < slowRadius) {
				desiredSpeed = map(distance, 0, slowRadius, 0, this.maxSpeed);
			}
			//noFill();
			//circle(target.pos.x, target.pos.y, slowRadius*2);
		}
		force.setMag(desiredSpeed);
		force.sub(this.vel);
		force.limit(this.maxForce);
		return force;
	}

	arrive(target) {
		return this.seek(target, true);
	}

	applyForce(force) {
		this.acc.add(force);
	}

	update() {
		this.vel.add(this.acc);
		this.vel.limit(this.maxSpeed);
		this.pos.add(this.vel);
		this.acc.set(0, 0);
	}

	show() {
		fill(255, 0, 0);
		stroke(0);
		strokeWeight(1);
		push();
		translate(this.pos.x, this.pos.y);
		rotate(this.vel.heading());
		triangle(-this.r, -this.r/2, -this.r, this.r/2, this.r, 0);
		pop();
	}
}

class Player1 extends Player {
	constructor(x, y) {
		super(x, y);
	}

	show() {
		push();
		fill(255, 0, 0);
		stroke(0);
		strokeWeight(1);
		translate(this.pos.x, this.pos.y);
		rotate(this.vel.heading());
		triangle(-this.r, -this.r/2, -this.r, this.r/2, this.r, 0);
		pop();

		push();
		translate(this.pos.x, this.pos.y - 25);
		fill(200);
		strokeWeight(1);
		text(p1Name, 0, 0);
		pop();
	}
}

class Player2 extends Player {
	constructor(x, y) {
		super(x, y);
	}

	show() {
		push();
		fill(0, 0, 255);
		stroke(0);
		strokeWeight(1);
		translate(this.pos.x, this.pos.y);
		rotate(this.vel.heading());
		triangle(-this.r, -this.r/2, -this.r, this.r/2, this.r, 0);
		pop();

		push();
		translate(this.pos.x, this.pos.y - 25);
		fill(200);
		strokeWeight(1);
		text(p2Name, 0, 0);
		pop();
	}
}

class Player3 extends Player {
	constructor(x, y) {
		super(x, y);
	}

	show() {
		push();
		fill(255, 153, 0);
		stroke(0);
		strokeWeight(1);
		translate(this.pos.x, this.pos.y);
		rotate(this.vel.heading());
		triangle(-this.r, -this.r/2, -this.r, this.r/2, this.r, 0);
		pop();

		push();
		translate(this.pos.x, this.pos.y - 25);
		fill(200);
		strokeWeight(1);
		text(p3Name, 0, 0);
		pop();
	}
}

class Player4 extends Player {
	constructor(x, y) {
		super(x, y);
	}

	show() {
		push();
		fill(0, 230, 0);
		stroke(0);
		strokeWeight(1);
		translate(this.pos.x, this.pos.y);
		rotate(this.vel.heading());
		triangle(-this.r, -this.r/2, -this.r, this.r/2, this.r, 0);
		pop();

		push();
		translate(this.pos.x, this.pos.y - 25);
		fill(200);
		strokeWeight(1);
		text(p4Name, 0, 0);
		pop();
	}
}