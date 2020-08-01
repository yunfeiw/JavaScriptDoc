function deepClone(source) {
    let targetObj = undefined;
    if (typeof source === 'object') {
      targetObj = source.constructor === Array ? [] : {}; // 判断复制的目标是数组还是对象
      for (let keys in source) { // 遍历目标
        if (source.hasOwnProperty(keys)) {
          if (source[keys] && typeof source[keys] === 'object') { // 如果值是对象，就递归一下
            targetObj[keys] = source[keys].constructor === Array ? [] : {};
            targetObj[keys] = deepClone(source[keys]);
          } else { // 如果不是，就直接赋值
            targetObj[keys] = source[keys];
          }
        }
      }
    } else {
      targetObj = source;
    }
    return targetObj;
  }
  var a = [1, 2, 3, 4, null, function name(params) {
  }, { name: "yunfei" }];
  console.log(deepClone(a))