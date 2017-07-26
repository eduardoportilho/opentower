/* global Image */

/**
 * List of images to load.
 * @type {Object}
 */
const imageUrls = {
  'tower-1': '../images/tower-1.png',
  'goon-1': '../images/goon-1.png'
}

/**
 * Global image cache.
 * @type {Object}
 */
export const imageCache = {}

/**
 * Load the images on the cache and call the callback when ready.
 * @param  {function} onLoadComplete
 */
export function loadImageCache (onLoadComplete) {
  for (let key in imageUrls) {
    let url = imageUrls[key]
    let img = new Image()
    img.onload = () => {
      imageCache[key] = img
      if (Object.keys(imageCache).length === Object.keys(imageUrls).length) {
        onLoadComplete()
      }
    }
    img.src = url
  }
}
