let cellLength = 40;
let rows = 15;
let cols = 14;

let w = cellLength * cols * 2;
let h = cellLength * rows;

let maxProbLevel;

let leftGrid = [];
let rightGrid = [];

let cellWidth = w / rows;
let cellHeight = h / cols;

let player1,player2, player3, player4;
let p1HomePos, p2HomePos, p3HomePos, p4HomePos;
let p1Name, p2Name, p3Name, p4Name;
let gamemode, target;
let turn = 0;

let leftScore = 0;
let rightScore = 0;

function setup() {
	createCanvas(w, h);

	for (let i = 0; i < rows; i++) { // i -> y, j -> x
		leftGrid[i] = [];
		rightGrid[i] = [];

		for (let j = 0; j < cols; j++) {
			leftGrid[i].push(0);
			rightGrid[i].push(0);
		}
	}

	gamemode = prompt("gamemode: type '2' or '4'");
	maxProbLevel = floor(max(rows, cols) / 2);

	if (gamemode == "2") {
		player1 = new Player1(w/4, h/2);
		player2 = new Player2(w/4 + w/2, h/2);

		p1HomePos = new Target(w/4, h/2);
		p2HomePos = new Target(w/4 + w/2, h/2);

		p1Name = prompt("player 1 name:");
		p2Name = prompt("player 2 name:");
	}

	if (gamemode == "4") {
		player1 = new Player1(w/4, h/3);
		player2 = new Player2(w/4 + w/2, h/3);
		player3 = new Player3(w/4, 2*h/3);
		player4 = new Player4(w/4 + w/2, 2*h/3);

		p1HomePos = new Target(w/4, h/3);
		p2HomePos = new Target(w/4 + w/2, h/3);
		p3HomePos = new Target(w/4, 2*h/3);
		p4HomePos = new Target(w/4 + w/2, 2*h/3);

		p1Name = prompt("player 1 name:");
		p2Name = prompt("player 2 name:");
		p3Name = prompt("player 3 name:");
		p4Name = prompt("player 4 name:");
	}

	calcProbLevel();

	let randPosition = pickRandomPos(0);
	target = new Target(randPosition.x, randPosition.y);
}

function draw() {
	// DRAW THE FIELD
	background(50);
	stroke(200);
	strokeWeight(4);
	line(w/2, 0, w/2, h);
	/////////

	// DRAW GRID
	/*for (let i = 0; i < rows; i++) {
		for (let j = 0; j < cols; j++) {
			stroke(75);
			strokeWeight(2);
			noFill();
			rect(j * cellLength, i * cellLength, cellLength, cellLength);
			rect(j * cellLength + w/2, i * cellLength, cellLength, cellLength);
			
			textSize(20);
			text(leftGrid[i][j], j * cellLength + 5, (i+1) * cellLength);
			text(rightGrid[i][j], j * cellLength + w/2 + 5, (i+1) * cellLength);
		}
	}*/
	/////////

	calcProbLevel();

	if (gamemode == "2") {
		if (turn == 0) {
			player1.applyForce(player1.seek(target));
			player2.applyForce(player2.arrive(p2HomePos));

			let d = dist(player1.pos.x, player1.pos.y, target.pos.x, target.pos.y);
			if (d < player1.r + target.r) {
				turn = 1 - turn;
				let randPosition = pickRandomPos(turn);
				target = new Target(randPosition.x, randPosition.y);
			}

		} else {
			player2.applyForce(player2.seek(target));
			player1.applyForce(player1.arrive(p1HomePos));

			let d = dist(player2.pos.x, player2.pos.y, target.pos.x, target.pos.y);
			if (d < player2.r + target.r) {
				turn = 1 - turn;
				let randPosition = pickRandomPos(turn);
				target = new Target(randPosition.x, randPosition.y);
			}
		}
	} else {
		if (turn == 0) {
			player1.applyForce(player1.seek(target));
			player3.applyForce(player3.seek(target));
			player2.applyForce(player2.arrive(p2HomePos));
			player4.applyForce(player4.arrive(p4HomePos));

			let d1 = dist(player1.pos.x, player1.pos.y, target.pos.x, target.pos.y);
			let d3 = dist(player3.pos.x, player3.pos.y, target.pos.x, target.pos.y);
			if (d1 < player1.r + target.r || d3 < player3.r + target.r) {
				turn = 1 - turn;
				let randPosition = pickRandomPos(turn);
				target = new Target(randPosition.x, randPosition.y);
			}

		} else {
			player2.applyForce(player2.seek(target));
			player4.applyForce(player4.seek(target));
			player1.applyForce(player1.arrive(p1HomePos));
			player3.applyForce(player3.arrive(p3HomePos));

			let d2 = dist(player2.pos.x, player2.pos.y, target.pos.x, target.pos.y);
			let d4 = dist(player4.pos.x, player4.pos.y, target.pos.x, target.pos.y);
			if (d2 < player2.r + target.r || d4 < player4.r + target.r) {
				turn = 1 - turn;
				let randPosition = pickRandomPos(turn);
				target = new Target(randPosition.x, randPosition.y);
			}
		}
	}

	player1.update();
	player2.update();

	target.update();

	player1.show();
	player2.show();
	target.show();

	if (gamemode == "4") {
		player3.update();
		player4.update();
		player3.show();
		player4.show();
	}

	if (target.duration < target.r) {
		if (turn == 0) {
			rightScore++;
		} else {
			leftScore++;
		}
		resetState();

		if (rightScore + leftScore == 4 || rightScore == 3 || leftScore == 3) {
			let scoreParagraph = p1Name + "🔴 " + leftScore + "<br>" + p2Name + "🔵 " + rightScore;
			if (gamemode == "4") {
				scoreParagraph = p1Name + "🔴 " + "<br>" + p3Name + "🟠 " + leftScore + "<br>" + p2Name + "🔵 " + "<br>" + p4Name + "🟢 " + rightScore;
			}
			createP(scoreParagraph).style('font-size', '20px').position(w + 30, 250);
			noLoop();
		}
	}
}

function calcProbLevel() {
	for (let i = 0; i < rows; i++) {
		for (let j = 0; j < cols; j++) {

			let distArr0 = [i, j, rows-i-1, cols-j-1];
			leftGrid[i][j] = (maxProbLevel - min(distArr0));
			rightGrid[i][j] = (maxProbLevel - min(distArr0));

			if (gamemode == "2") {
				let p1Grid = posToGrid(player1, 0);
				let distToP1 = distTo(j, i, p1Grid, 0);

				let distArr1 = [i, j, rows-i-1, cols-j-1, distToP1];
				leftGrid[i][j] = (maxProbLevel - min(distArr1));

				let p2Grid = posToGrid(player2, 1);
				let distToP2 = distTo(j, i, p2Grid, 1);

				let distArr2 = [i, j, rows-i-1, cols-j-1, distToP2];
				rightGrid[i][j] = (maxProbLevel - min(distArr2));

			} else if (gamemode == "4") {
				let p1Grid = posToGrid(player1, 0);
				let distToP1 = distTo(j, i, p1Grid, 0);

				let p3Grid = posToGrid(player3, 0);
				let distToP3 = distTo(j, i, p3Grid, 0);

				let distArrT1 = [i, j, rows-i-1, cols-j-1, distToP1, distToP3];
				leftGrid[i][j] = (maxProbLevel - min(distArrT1));

				let p2Grid = posToGrid(player2, 1);
				let distToP2 = distTo(j, i, p2Grid, 1);

				let p4Grid = posToGrid(player4, 1);
				let distToP4 = distTo(j, i, p4Grid, 1);

				let distArrT2 = [i, j, rows-i-1, cols-j-1, distToP2, distToP4];
				rightGrid[i][j] = (maxProbLevel - min(distArrT2));
			}

			leftGrid[i][j] = maxProbLevel - leftGrid[i][j] + 1;
			rightGrid[i][j] = maxProbLevel - rightGrid[i][j] + 1;
		}
	}
}

function posToGrid(player, n) {
	let x = floor((player.pos.x - n*w/2) / cellLength);
	let y = floor(player.pos.y / cellLength);

	return {x, y};
}

function distTo(x, y, pGrid, n) {
	return round(dist(pGrid.x, pGrid.y, x, y));
}

function pickRandomPos(n) {
	let higherProb = [];
	let lowerProb = [];
	for (let i = 0; i < rows; i++) {
		for (let j = 0; j < cols; j++) {
			if (n == 0) {
				if (leftGrid[i][j] > 2) {
					higherProb.push({i, j});
				} else {
					lowerProb.push({i, j});
				}
			} else {
				if (rightGrid[i][j] > 2) {
					higherProb.push({i, j});
				} else {
					lowerProb.push({i, j});
				}
			}
		}
	}

	let rand1 = random(0, 1);
	if (rand1 < 0.7) {
		let rand2 = random(higherProb);
		let x = rand2.j * cellLength + cellLength * random(0, 1) + n * w/2;
		let y = rand2.i * cellLength + cellLength * random(0, 1);

		return {x, y};

	} else {
		let rand2 = random(lowerProb);
		let x = rand2.j * cellLength + cellLength * random(0, 1) + n * w/2;
		let y = rand2.i * cellLength + cellLength * random(0, 1);

		return {x, y};
	}
}

function resetState() {
	player1.pos.set(p1HomePos.pos.x, p1HomePos.pos.y);
	player1.vel.set(0, 0);
	player1.acc.set(0, 0);
	player2.pos.set(p2HomePos.pos.x, p2HomePos.pos.y);
	player2.vel.set(0, 0);
	player2.acc.set(0, 0);

	if (gamemode == "4") {
		player3.pos.set(p3HomePos.pos.x, p3HomePos.pos.y);
		player3.vel.set(0, 0);
		player3.acc.set(0, 0);
		player4.pos.set(p4HomePos.pos.x, p4HomePos.pos.y);
		player4.vel.set(0, 0);
		player4.acc.set(0, 0);
	}

	let randPosition = pickRandomPos((rightScore + leftScore) % 2);
	turn = (rightScore + leftScore) % 2;
	target = new Target(randPosition.x, randPosition.y);
}