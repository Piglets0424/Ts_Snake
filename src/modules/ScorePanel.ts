// 定义记分牌的类
class ScorePanel {
  score = 0;
  level = 1;

  scoreEle: HTMLElement;
  levelEle: HTMLElement;

  // 限制最大等级变量
  maxLevel: number;
  // 设置变量表示多少分升级
  upScore: number;

  // 构造函数
  constructor(maxLevel: number = 10, upScore: number = 10) {
    this.scoreEle = document.querySelector('#score')!;
    this.levelEle = document.querySelector('#level')!;
    this.maxLevel = maxLevel;
    this.upScore = upScore;
  }

  // 设置一个加分的方法
  addScore() {
    // 每次自增1
    this.scoreEle.innerHTML = ++this.score + '';

    // 每增加10分等级提升1级
    if (this.score % this.upScore === 0) {
      this.levelUp();
    }
  }

  // 等级提升的方法
  levelUp() {
    // 等级不能无限提升
    if (this.level < this.maxLevel) {
      this.levelEle.innerHTML = ++this.level + '';
    }
  }
}

export default ScorePanel;
