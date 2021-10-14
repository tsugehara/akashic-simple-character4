export type Character4Direction = "left" | "right" | "top" | "down";

export interface Character4ParameterObject extends g.FrameSpriteParameterObject {
	animationFrameCount: number;
	initialAngle?: Character4Direction;
}

const angleFrameIndex = {
	left: 1,
	down: 0,
	top: 3,
	right: 2,
};

export class Character4 extends g.FrameSprite {
	destinationPos?: g.CommonOffset & { time: number };

	animationFrameCount: number;

	animationInterval: number;

	currentDirection: Character4Direction;

	moveSpeed: number;

	constructor(params: Character4ParameterObject) {
		super(params);
		this.animationFrameCount = params.animationFrameCount;
		this.currentDirection = params.initialAngle ?? "down";
		this.frames = [];
		this.destinationPos = null;
		for (let i = 0; i < this.animationFrameCount; i++) {
			this.frames.push(0);
		}
		this._changeFramesByDirection();
		this.onUpdate.add(this._handleCharacterUpdate, this);
		this.moveSpeed = 0.003 * 1000 / g.game.fps;
	}

	_changeFramesByDirection() {
		const offset = this.animationFrameCount * angleFrameIndex[this.currentDirection];
		this.frames = this.frames.map((_, index) => offset + index);
		this.modified();
	}

	_changeAngleByDestination() {
		const xDiff = this.destinationPos.x - this.x;
		const yDiff = this.destinationPos.y - this.y;
		if (Math.abs(xDiff) < Math.abs(yDiff)) {
			if (yDiff < 0) {
				this.changeDirection("top");
			} else {
				this.changeDirection("down");
			}
		} else if (Math.abs(xDiff) > Math.abs(yDiff)) {
			if (xDiff < 0) {
				this.changeDirection("left");
			} else {
				this.changeDirection("right");
			}
		}
	}

	_handleCharacterUpdate() {
		if (this.destinationPos != null) {
			let diff = 1000 / g.game.fps;
			if (diff > this.destinationPos.time) {
				diff = this.destinationPos.time;
			}
			const x = (this.destinationPos.x - this.x) * (diff / this.destinationPos.time);
			const y = (this.destinationPos.y - this.y) * (diff / this.destinationPos.time);
			this.destinationPos.time -= diff;
			if (this.destinationPos.time === 0) {
				this.moveTo(this.destinationPos.x, this.destinationPos.y);
				this.destinationPos = null;
			} else {
				this.moveBy(x, y);
			}
			this.modified();
		}
	}

	changeDirection(direction: Character4Direction) {
		if (this.currentDirection === direction) return;
		this.currentDirection = direction;
		this._changeFramesByDirection();
	}

	move(angle: Character4Direction, distance: number) {
		switch (angle) {
		case "left":
			this.changeDirection(angle);
			this.x -= distance;
			break;
		case "right":
			this.changeDirection(angle);
			this.x += distance;
			break;
		case "top":
			this.changeDirection(angle);
			this.y -= distance;
			break;
		case "down":
			this.changeDirection(angle);
			this.y += distance;
			break;
		default:
			throw new Error(`Invalid angle: ${angle}`);
		}
	}

	animationMoveTo(x: number, y: number, time?: number) {
		this.destinationPos = {x, y,
			time: time == null ? Math.max(Math.abs(x - this.x), Math.abs(y - this.y)) / this.moveSpeed : time,
		};
		this._changeAngleByDestination();
	}

	animationMoveBy(x: number, y: number, time?: number) {
		this.destinationPos = {
			x: this.x + x,
			y: this.y + y,
			time,
		};
		this._changeAngleByDestination();
	}
}
