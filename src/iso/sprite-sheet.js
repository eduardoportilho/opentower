export default class SpriteSheet {
  constructor (spriteSheetImage, spriteSheetMap, tileWidth) {
    this.image = spriteSheetImage
    this.spriteSheetMap = spriteSheetMap

    const meta = this.spriteSheetMap['meta']
    const maxWidth = meta.maxWidth
    this.scale = tileWidth / maxWidth
  }

  draw (context, bottomPoint, spriteKey, verticalOffset = 0) {
    const sprite = this.spriteSheetMap[spriteKey]
    const dimensions = this.scaleToFit(sprite)

    const x = bottomPoint.x - Math.round(dimensions.width / 2)
    const y = bottomPoint.y - dimensions.height + verticalOffset
    context.drawImage(
      this.image,
      sprite.x,
      sprite.y,
      sprite.width,
      sprite.height,
      x,
      y,
      dimensions.width,
      dimensions.height
    )
    return dimensions
  }

  drawStacked (context, bottomPoint, spriteKeys, verticalOffset = 0) {
    let stackHeight = verticalOffset
    for (let spriteKey of spriteKeys) {
      let dimensions = this.draw(context, bottomPoint, spriteKey, stackHeight)
      stackHeight -= dimensions.offsetToTop
    }
  }

  scaleToFit (sprite) {
    let offsetToTop = sprite.offsetToTop || 0
    return {
      width: Math.round(sprite.width * this.scale),
      height: Math.round(sprite.height * this.scale),
      offsetToTop: Math.round(offsetToTop * this.scale)
    }
  }
}
