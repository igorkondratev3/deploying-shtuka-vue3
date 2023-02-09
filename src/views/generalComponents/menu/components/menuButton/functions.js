export const drawLines = (lines, width, height) => {
  lines.clearRect(0, 0, width, height);
  lines.beginPath();
  lines.moveTo(6, 10);
  lines.lineWidth = 1;
  lines.lineTo(26, 10);
  lines.moveTo(6, 16);
  lines.lineTo(26, 16);
  lines.moveTo(6, 22);
  lines.lineTo(26, 22);
  lines.strokeStyle = 'black';
  lines.stroke();
};

export const drawCross = (cross, width, height) => {
  cross.clearRect(0, 0, width, height);
  cross.beginPath();
  cross.moveTo(7, 7);
  cross.lineWidth = 2;
  cross.lineTo(25, 25);
  cross.moveTo(7, 25);
  cross.lineTo(25, 7);
  cross.strokeStyle = 'black';
  cross.stroke();
};
