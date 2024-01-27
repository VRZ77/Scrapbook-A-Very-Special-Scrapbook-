<script src="https://cdnjs.cloudflare.com/ajax/libs/draggable/1.0.0-beta.11/draggable.min.js"></script>

let highestZ = 1;

class Paper {
  constructor(paper) {
    this.paper = paper;
    this.init();
  }

  init() {
    this.draggable = new Draggable(this.paper, {
      onDragStart: (event) => {
        this.paper.style.zIndex = highestZ++;
        this.rotation = Math.random() * 30 - 15;
      },
      onDrag: (event) => {
        const { x, y } = event.source;
        this.paper.style.transform = `translate(${x}px, ${y}px) rotateZ(${this.rotation}deg)`;
      },
    });
  }
}

const papers = Array.from(document.querySelectorAll('.paper'));

papers.forEach((paper) => {
  new Paper(paper);
});

let highestZ = 1;

class Paper {
  holdingPaper = false;
  touchStartX = 0;
  touchStartY = 0;
  prevTouchX = 0;
  prevTouchY = 0;
  velX = 0;
  velY = 0;
  rotation = Math.random() * 30 - 15;
  currentPaperX = 0;
  currentPaperY = 0;

  init(paper) {
    paper.addEventListener('pointermove', (e) => {
      e.preventDefault();
      if (this.holdingPaper) {
        this.touchMoveX = e.clientX || e.touches[0].clientX;
        this.touchMoveY = e.clientY || e.touches[0].clientY;

        this.velX = this.touchMoveX - this.prevTouchX;
        this.velY = this.touchMoveY - this.prevTouchY;

        this.currentPaperX += this.velX;
        this.currentPaperY += this.velY;

        paper.style.transform = `translateX(${this.currentPaperX}px) translateY(${this.currentPaperY}px) rotateZ(${this.rotation}deg)`;
      }

      this.prevTouchX = this.touchMoveX;
      this.prevTouchY = this.touchMoveY;
    });

    paper.addEventListener('pointerdown', (e) => {
      if (this.holdingPaper) return;
      this.holdingPaper = true;

      paper.style.zIndex = highestZ;
      highestZ += 1;

      this.touchStartX = e.clientX || e.touches[0].clientX;
      this.touchStartY = e.clientY || e.touches[0].clientY;
      this.prevTouchX = this.touchStartX;
      this.prevTouchY = this.touchStartY;
    });

    paper.addEventListener('pointerup', () => {
      this.holdingPaper = false;
    });
  }
}

const papers = Array.from(document.querySelectorAll('.paper'));

papers.forEach(paper => {
  const p = new Paper();
  p.init(paper);
});
