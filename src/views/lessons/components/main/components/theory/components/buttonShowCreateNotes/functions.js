export const drawPen = (pen) => {
  pen.beginPath();
  pen.moveTo(26, 4);
  pen.lineWidth = 0.5;
  pen.bezierCurveTo(18, 6, 3, 24, 7, 26);
  pen.bezierCurveTo(12, 27, 34, 6, 26, 4);
  pen.fillStyle = '#CAF2FE';
  pen.fill();
  pen.strokeStyle = 'black';
  pen.stroke();

  pen.beginPath();
  pen.moveTo(7, 26);
  pen.lineTo(5, 28);
  pen.moveTo(8, 20);
  pen.lineTo(13, 24);
  pen.moveTo(23, 6);
  pen.lineTo(27, 9);
  pen.strokeStyle = 'black';
  pen.stroke();

  pen.beginPath();
  pen.moveTo(23, 6);
  pen.bezierCurveTo(21, 2, 14, 6, 12, 12);
  pen.bezierCurveTo(11, 16, 10, 16, 9, 14);
  pen.strokeStyle = 'black';
  pen.stroke();
};
