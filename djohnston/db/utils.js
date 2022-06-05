const getPermalink = (title) => {
  return title
    .toLowerCase()
    .replace(/[\s',\/?\+]/g, '-')
    .replace(/(-)(?=\1)/gi, '')
    .replace('&', 'and')
    .replace(/[\(\)\!]/g, '')
}

module.exports = {
  getPermalink,
}
