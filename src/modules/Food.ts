// 定义食物类
class Food {
  // 定义一个属性表示食物对应的元素
  element: HTMLElement;

  // 构造函数
  constructor() {
    // 获取食物元素
    this.element = document.querySelector('#food')!;
  }

  // 定义获取食物元素X轴坐标
  get X() {
    return this.element.offsetLeft;
  }

  // 获取Y轴坐标
  get Y() {
    return this.element.offsetTop;
  }

  // 修改食物位置
  change() {
    // 生成随机的位置
    // 食物位置最小为0 最大为290 蛇每次移动10 所以食物的位置应该为整10

    let top = Math.round(Math.random() * 29) * 10;
    let left = Math.round(Math.random() * 29) * 10;

    this.element.style.top = `${top}px`;
    this.element.style.left = `${left}px`;
  }
}

export default Food;
