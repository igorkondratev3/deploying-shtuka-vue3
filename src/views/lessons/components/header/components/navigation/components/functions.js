export const drawArrowLeft = (left) => {
  left.beginPath();
  left.moveTo(3, 16);
  left.lineTo(15, 3);
  left.lineTo(15, 12);
  left.bezierCurveTo(16, 12, 27, 10, 31, 21);
  left.bezierCurveTo(30, 23, 30, 26, 27, 28);
  left.bezierCurveTo(25, 20, 16, 20, 15, 20);
  left.lineTo(15, 29);
  left.lineTo(3, 16);
  left.fillStyle = '#CAF2FE';
  left.fill();
  left.stroke();
};

export const drawArrowRight = (right) => {
  right.beginPath();
  right.moveTo(29, 16);
  right.lineTo(17, 3);
  right.lineTo(17, 12);
  right.bezierCurveTo(16, 12, 5, 10, 1, 21);
  right.bezierCurveTo(2, 23, 2, 26, 5, 28);
  right.bezierCurveTo(7, 20, 16, 20, 17, 20);
  right.lineTo(17, 29);
  right.lineTo(29, 16);
  right.fillStyle = '#CAF2FE';
  right.fill();
  right.stroke();
};
