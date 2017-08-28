export default class SpriteSheet {
  constructor (spriteSheetImage, spriteSheetMap, tileWidth, tileHeight) {
    this.image = spriteSheetImage
    this.spriteSheetMap = spriteSheetMap
    this.tileWidth = tileWidth
    this.tileHeight = tileHeight
  }

  draw (context, origin, spriteKey) {
    const sprite = this.spriteSheetMap[spriteKey]
    const dimensions = this.scaleToFitWidth({
      width: sprite.width,
      height: sprite.height
    }, {
      width: this.tileWidth,
      height: this.tileHeight
    })
    const x = origin.x - Math.round(dimensions.width / 2)
    context.drawImage(
      this.image,
      sprite.x,
      sprite.y,
      sprite.width,
      sprite.height,
      x,
      origin.y,
      dimensions.width,
      dimensions.height
    )
  }

  scaleToFitWidth (currentDimension, targetDimension) {
    const ratio = currentDimension.height / currentDimension.width
    return {
      width: targetDimension.width,
      height: targetDimension.width * ratio
    }
  }
}
