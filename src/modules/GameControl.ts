// 引入类
import Food from './Food';
import Snake from './Sanke';
import ScorePanel from './ScorePanel';

// 游戏控制器
class GameControl {
  // 食物
  food: Food;
  // 蛇
  snake: Snake;
  // 记分牌
  scorePanel: ScorePanel;

  // 创建一个存储蛇的移动方向 (按键方向)
  direction: String = '';
  // 游戏是否开始  false表示游戏结束
  isLive = true;

  constructor() {
    this.food = new Food();
    this.snake = new Snake();
    this.scorePanel = new ScorePanel();

    this.init();
  }

  // 游戏初始化方法 调用后游戏开始
  init() {
    document.addEventListener('keydown', this.keyDownHandler.bind(this));
    // 调用run方法
    this.run();
  }

  // 键盘按下响应函数 ArrowUp ArrowDown ArrowLeft ArrowRight
  keyDownHandler(event: KeyboardEvent) {
    // console.log(event.key);
    // 修改移动方向
    this.direction = event.key;
  }

  // 蛇移动的方法
  run() {
    // 根据反向来改变位置 向上top减小  向右left值增加
    // 获取蛇现在的位置
    let X = this.snake.X;
    let Y = this.snake.Y;

    // 根据按键修改XY的值
    switch (this.direction) {
      case 'ArrowUp':
        // 向上
        Y -= 10;
        break;
      case 'ArrowDown':
        // 向下
        Y += 10;
        break;
      case 'ArrowLeft':
        // 向左
        X -= 10;
        break;
      case 'ArrowRight':
        // 向右
        X += 10;
        break;
    }

    // 是否吃到食物
     this.checkEat(X, Y)
    

    // 修改蛇的位置
    try {
      this.snake.X = X;
      this.snake.Y = Y;
    } catch (error: any) {
      // 进入catch则说明出现异常  游戏结束
      alert(error.message + 'GAME OVER!');
      // 结束游戏
      this.isLive = false;
    }

    // 开启一个定时器   每升一级定时器减小30ms  速度加快
    this.isLive &&
      setTimeout(this.run.bind(this), 300 - (this.scorePanel.level - 1) * 30);
  }

  // 检查蛇是否吃到食物
  checkEat(X: number, Y: number) {
    if (X === this.food.X && Y === this.food.Y) {
      // 吃到食物食物的位置改变
      this.food.change();
      // 分数增加
      this.scorePanel.addScore();
      // 蛇增加一节
      this.snake.addBody();
    }
  }
}

export default GameControl;
