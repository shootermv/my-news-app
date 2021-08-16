// just replace all the spaces by hyphens
export default (item) => item.title.toLowerCase().replace(/\s+/g, "-");
