// 防抖函数
const debounce = <T extends unknown[]>(fn: (...args: T) => void, t: number) => {
    // 动态判断setTimeout在node环境和浏览器环境返回的类型
    let timer: ReturnType<typeof setTimeout> | null = null;
    return (...args: T) => {
      if (timer) clearTimeout(timer);
      timer = setTimeout(() => fn(...args), t);
    };
  };
  export default debounce