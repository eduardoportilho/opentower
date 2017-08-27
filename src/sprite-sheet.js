export default class SpriteSheet {
  constructor (spriteSheetImage, spriteSheetMap, tileWidth, tileHeight,) {
    this.image = spriteSheetImage
    this.spriteSheetMap = spriteSheetMap
    this.tileWidth = tileWidth
    this.tileHeight = tileHeight
  }

  draw (context, origin, spriteKey) {
    const sprite = this.spriteSheetMap[spriteKey]
    context.drawImage(
      this.image,
      sprite.x,
      sprite.y,
      sprite.width,
      sprite.height,
      origin.x,
      origin.y,
      this.tileWidth, // TODO: default values?
      this.tileHeight
    )
  }
}
