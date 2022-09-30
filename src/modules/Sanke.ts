// 蛇的类
class Snake {
  // 获取蛇容器
  element: HTMLElement;
  // 表示蛇头元素
  head: HTMLElement;
  // 蛇的身体包括蛇头
  bodies: HTMLCollection;

  // 构造函数
  constructor() {
    this.element = document.querySelector('#snake')!;
    this.head = document.querySelector('#snake > div')!;
    // this.bodies = document.querySelectorAll('#sanke div')!
    // querySelectorAll返回的是节点列表属于是死的
    this.bodies = this.element.getElementsByTagName('div')!;
  }

  // 获取蛇的坐标(蛇头)
  get X() {
    return this.head.offsetLeft;
  }

  get Y() {
    return this.head.offsetTop;
  }

  // 设置蛇的坐标
  set X(value: number) {
    if (this.X === value) return;
    // X 的合法值为0-290超出即撞墙
    if (value < 0 || value > 290) {
      // 抛出异常 程序停止
      throw new Error('蛇撞墙了!');
    }
    // 蛇在移动的时候不能掉头 蛇在向移动时不能向左
    // 判断蛇头的X坐标是否等于第二节身体X轴坐标 相等 则不能掉头
    if (
      this.bodies[1] &&
      (this.bodies[1] as HTMLElement).offsetLeft === value
    ) {
      // console.log('发生水平方向掉头了');
      // 如果发生掉头 让蛇继续移动 不掉头
      if (value > this.X) {
        // 玩家想向右移动 发生掉头 应该继续向左
        value = this.X - 10;
      } else {
        value = this.X + 10;
      }
    }
    // 移动身体
    this.moveBody();
    this.head.style.left = `${value}px`;
    // 检查是否撞到自己
    this.checkHeadBody();
  }

  set Y(value: number) {
    if (this.Y === value) return;
    if (value < 0 || value > 290) {
      throw new Error('蛇撞墙了!');
    }
    if (this.bodies[1] && (this.bodies[1] as HTMLElement).offsetTop === value) {
      if (value > this.Y) {
        value = this.Y - 10;
      } else {
        value = this.Y + 10;
      }
    }
    this.moveBody();
    this.head.style.top = `${value}px`;
    this.checkHeadBody();
  }

  // 设置蛇增加身体的方法
  addBody() {
    // 创建div
    let tempDiv = document.createElement('div');
    // 向蛇容器中添加身体
    this.element.insertAdjacentElement('beforeend', tempDiv);
  }

  // 设置蛇身体移动的方法
  moveBody() {
    /*  先移动后边的  将靠后的位置设置为前一个的位置 
    第四节=第三节
    第三节=第二节
    第二节=第一节(舌头)
     */
    // 遍历所有身体(从后往前)
    for (let i = this.bodies.length - 1; i > 0; i--) {
      // 获取前一节的位置
      let X = (this.bodies[i - 1] as HTMLElement).offsetLeft;
      let Y = (this.bodies[i - 1] as HTMLElement).offsetTop;

      // 将前一节位置设置到当前身体
      (this.bodies[i] as HTMLElement).style.left = `${X}px`;
      (this.bodies[i] as HTMLElement).style.top = `${Y}px`;
    }
  }

  // 检查头撞身体
  checkHeadBody() {
    // 获取所有身体坐标 检查是否与蛇头坐标相等
    for (let i = 1; i < this.bodies.length; i++) {
      let bd = this.bodies[i] as HTMLElement;
      if (this.X === bd.offsetLeft && this.Y === bd.offsetTop) {
        // 蛇头与身体发生碰撞了
        throw new Error('撞到自己了!');
      }
    }
  }
}

export default Snake;
