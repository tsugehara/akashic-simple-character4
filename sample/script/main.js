const lib = require("akashic-simple-character4");

function main(param) {
	const scene = new g.Scene({
		game: g.game,
		assetPaths: [
			"/image/player1.png",
			"/image/player2.png",
			"/image/player3.png",
		],
	});
	scene.onLoad.add(() => {
		// 1～3に変えると、キャラクターが変わります
		const playerId = 1;
		const chara4 = new lib.Character4({
			scene: scene,
			src: scene.asset.getImage(`/image/player${playerId}.png`),
			animationFrameCount: 3,
			interval: 200,
			width: 32,
			height: 32,
			parent: scene,
			x: g.game.width / 2,
			y: g.game.height / 2,
		});
		chara4.start();
		scene.onPointDownCapture.add((e) => {
			chara4.animationMoveTo(
				Math.floor(e.point.x / 32) * 32,
				Math.floor(e.point.y / 32) * 32
			);
		});
	});
	g.game.pushScene(scene);
}
module.exports = main;
