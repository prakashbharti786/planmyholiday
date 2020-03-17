const processImage = itemList => {
  itemList.forEach(function(item) {
    if (item.media_content.length < 1) {
      // if there is no image provided in the feed item just add '#' there
      item.img = process.env.assetsUrl + 'img/state/not-found/no-image.png'
      item.isvisual = false
    } else if (
      'duration' in item.media_content[0] &&
      'url' in item.media_content[0]
    ) {
      item.video_url = item.media_content[0].url
      item.img = process.env.assetsUrl + 'img/state/not-found/no-image.png'
      item.isvisual = true
    } else if ('url' in item.media_content[0]) {
      if (
        item.media_content[0].url.indexOf('/') === 0 &&
        item.media_content[0].url.indexOf('//') !== 0
      ) {
        const sourceDomain = item.source_url
          .split('/')
          .splice(0, 3)
          .join('/')
        item.img = sourceDomain + item.media_content[0].url
        item.isvisual = true
      } else {
        item.img = item.media_content[0].url
        item.isvisual = true
      }
    } else if (Object.keys(item.media_content[0])[0]) {
      item.img = item.media_content[0][Object.keys(item.media_content[0])[0]]
    } else {
      item.img = process.env.assetsUrl + 'img/state/not-found/no-image.png'
      item.isvisual = false
    }
  })
  return itemList
}

export default processImage
