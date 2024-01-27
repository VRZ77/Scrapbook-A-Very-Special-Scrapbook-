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
