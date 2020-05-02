// 封装防抖函数 debounce   delay ：给定的时间	
export function debounce(func, delay) {
	let timer = null
	return function(...args) {
		// 判断 timer 是否有值，有的话就把 之前的timer 清除掉 clearTimeout； 
		if(timer) clearTimeout(timer)
		// 重新计时：setTimeout
		timer = setTimeout(() => {
			func.apply(this, args)
		}, delay)
	}
}

// 封装 ：对时间进行格式化
export function formatDate(date, fmt) {
  // 1.获取年份
	if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length));
  }
  let o = {
    'M+': date.getMonth() + 1,
    'd+': date.getDate(),
    'h+': date.getHours(),
    'm+': date.getMinutes(),
    's+': date.getSeconds()
  };
  for (let k in o) {
    if (new RegExp(`(${k})`).test(fmt)) {
      let str = o[k] + '';
      fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? str : padLeftZero(str));
    }
  }
  return fmt;
};

function padLeftZero (str) {
  return ('00' + str).substr(str.length);
};

