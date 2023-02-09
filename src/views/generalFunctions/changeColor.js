export const changeColor = (elem) => {
  elem.addEventListener('pointerover', function () {
    elem.style.backgroundColor = '#C5C8CB';
  });
  elem.addEventListener('pointerout', function () {
    elem.style.backgroundColor = 'transparent';
  });
  elem.addEventListener('pointerdown', function () {
    elem.style.backgroundColor = '#8795A5';
  });
  elem.addEventListener('pointerup', function () {
    elem.style.backgroundColor = '#C5C8CB';
  });
};
