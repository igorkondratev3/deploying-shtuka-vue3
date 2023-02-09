export const drawArrow = (arrow) => {
  arrow.beginPath();
  arrow.moveTo(0, 5);
  arrow.lineTo(20, 5);
  arrow.lineTo(10, 0);
  arrow.moveTo(20, 5);
  arrow.lineTo(10, 10);
  arrow.strokeStyle = '#0064A9';
  arrow.stroke();
};
