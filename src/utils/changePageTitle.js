const defaultTitle = document.getElementsByTagName('title')[0].innerHTML;

export default (title = defaultTitle) => {
  document.getElementsByTagName('title')[0].innerHTML = `${title} | Selli`;
};
