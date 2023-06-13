class Feed {
  constructor(data, formatDate = false) {
    this.title = data.title;
    this.description = data.description || data.content;
    this.link = data.link;
    this.origin = this.hostName(data.link);
    this.pubDate = formatDate ? this.formatDate(data.pubDate) : data.pubDate;
    this.enclosure = data.enclosure?.url || data.enclosure;
  }

  formatDate(dateString) {
    const date = new Date(dateString);
    return `${date.getDate().toString().padStart(2, "0")}.${(date.getMonth() + 1).toString().padStart(2, "0")}.${date.getFullYear()}`;
  }

  hostName(url) {
    return new URL(url).hostname;
  }

  toPlainObject() {
    return {
      title: this.title,
      description: this.description,
      link: this.link,
      origin: this.origin,
      pubDate: this.pubDate,
      enclosure: this.enclosure,
    };
  }
}

module.exports = Feed

// {
//   title: feed?.title,
//   description: feed?.description || feed?.content,
//   link: feed?.link,
//   pubDate: new Date(feed?.pubDate),
//   enclosure: feed?.enclosure?.url
// }
