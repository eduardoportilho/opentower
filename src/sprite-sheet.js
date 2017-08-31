export default class SpriteSheet {
  constructor (spriteSheetImage, spriteSheetMap, tileWidth, tileHeight) {
    this.image = spriteSheetImage
    this.spriteSheetMap = spriteSheetMap
    this.tileWidth = tileWidth
    this.tileHeight = tileHeight
  }

  draw (context, bottomPoint, spriteKey, verticalOffset = 0) {
    const sprite = this.spriteSheetMap[spriteKey]
    const dimensions = this.scaleToFit(sprite, {
      width: this.tileWidth,
      height: this.tileHeight
    })
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

  scaleToFit (sprite, targetDimension) {
    const spriteRatio = sprite.height / sprite.width
    const newHeight = Math.round(targetDimension.width * spriteRatio)
    const scaleRatio = newHeight / sprite.height
    let newOffsetToTop = 0
    if (sprite.offsetToTop) {
      newOffsetToTop = sprite.offsetToTop * scaleRatio
    }
    return {
      width: targetDimension.width,
      height: newHeight,
      offsetToTop: newOffsetToTop
    }
  }
}
