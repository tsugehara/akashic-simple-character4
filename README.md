# akashic-simple-character4

**akashic-simple-character4**は [Akashic Engine](https://akashic-games.github.io/)のためのシンプルなキャラクターエンティティです。

4方向のキャラセットに対応しています。

足踏みしたり、方向転換をしたりします。

## 利用方法

`akashic install akashic-simple-character4` で利用してください。

`g.FrameSprite` と使い勝手は大体同じですが、以下の拡張があります。

1. 初期値にanimationFrameCountがある
	- キャラクターが足踏みするフレーム数を指定してください
2. animationMoveTo, animationMoveByがある
	- キャラクターを一定時間かけて移動させます
3. moveがある
	- 方向を指定してキャラクターを移動させることができます

足踏みをさせるには、`g.FrameSprite` 同様 `start` を呼び出してください。以下のように使います。

```typescript
const chara4 = new entities.Character4({
	scene: this,
	src: this.asset.getImage("/assets/characters/pipo-charachip001.png"),
	animationFrameCount: 3,
	interval: 200,
	width: 32,
	height: 32,
	parent: this,
	x: g.game.width / 2,
	y: g.game.height / 2,
});
chara4.start();
this.onPointDownCapture.add((e) => {
	chara4.animationMoveTo(
		Math.floor(e.point.x / 32) * 32,
		Math.floor(e.point.y / 32) * 32,
	);
});
```

## LICENSE

[MIT License](./LICENSE)
