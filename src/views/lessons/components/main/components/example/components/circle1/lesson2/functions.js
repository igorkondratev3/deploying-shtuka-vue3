export const drawDeception = (deception) => {
  deception.beginPath();
  deception.moveTo(30, 30);
  deception.lineWidth = 4;
  deception.lineTo(230, 100);
  deception.lineTo(215, 75);
  deception.moveTo(230, 100);
  deception.lineTo(200, 110);
  deception.moveTo(30, 30);
  deception.lineTo(63, 20);
  deception.moveTo(30, 30);
  deception.lineTo(47, 59);
  deception.strokeStyle = 'red';
  deception.stroke();

  deception.beginPath();
  deception.moveTo(230, 170);
  deception.lineWidth = 4;
  deception.lineTo(30, 240);
  deception.lineTo(0, 230);
  deception.moveTo(30, 240);
  deception.lineTo(10, 265);
  deception.moveTo(230, 170);
  deception.lineTo(249, 142);
  deception.moveTo(230, 170);
  deception.lineTo(260, 183);
  deception.strokeStyle = '#0064A9';
  deception.stroke();

  deception.font = 'oblique 16px Times New Roman';
  deception.fillStyle = 'black';
  deception.fillText('Длина данных отрезков одинакова, хотя', 3, 300);
  deception.fillText('синий отрезок кажется длиннее. В этом', 3, 315);
  deception.fillText('легко убедиться с помощью линейки', 3, 330);
  deception.fillText('(экспериментальное исследование).', 3, 345);
};
