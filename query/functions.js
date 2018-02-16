module.exports.addZeroToId = function (id){
  if(id >= 0 && id <= 9){
    id = "00"+id;
  }else if (id >=10 && id <= 99 ) {
    id = "0"+id;
  }else{
    id = id;
  }
  return id;
}

module.exports.getObjectKeyIndex = function (obj, keyToFind) {
  var key;
  for (key in obj) {
    if (key == keyToFind)
      return true
  }
  return null;
}
