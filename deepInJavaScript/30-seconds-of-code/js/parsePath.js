function parsePath(path) {
    let partialPath = {};
  
    if (path) {
      let hashIndex = path.indexOf('#');
      if (hashIndex >= 0) {
        partialPath.hash = path.substr(hashIndex);
        path = path.substr(0, hashIndex);
      }
  
      let searchIndex = path.indexOf('?');
      if (searchIndex >= 0) {
        partialPath.search = path.substr(searchIndex);
        path = path.substr(0, searchIndex);
      }
  
      if (path) {
        partialPath.pathname = path;
      }
    }
  
    return partialPath;
}