export const closeListOfPararmeterValues = (parameterTuningValues) => {
  parameterTuningValues.listOfValuesSeen = false;
  parameterTuningValues.choosenValueSeen = true;
  parameterTuningValues.arrowOpenListOfValues = true;
  parameterTuningValues.borderValue = '0.5px solid black';
};

export const changeSeenOfListOfParameterValues = (
  parameterTuningValues
) => {
  if (!parameterTuningValues.listOfValuesSeen) {
    const clickEvent = new Event('click');
    document.dispatchEvent(clickEvent);
  }

  parameterTuningValues.listOfValuesSeen =
    !parameterTuningValues.listOfValuesSeen;
  parameterTuningValues.choosenValueSeen =
    !parameterTuningValues.choosenValueSeen;
  parameterTuningValues.arrowOpenListOfValues =
    !parameterTuningValues.arrowOpenListOfValues;

  if (parameterTuningValues.listOfValuesSeen)
    parameterTuningValues.borderValue = 'none';
  else
    parameterTuningValues.borderValue = '0.5px solid black';
};

export const changeListParameterValue = (
  parameterTuningValues,
  eventChangeParameter
) => {
  parameterTuningValues.choosenValueText =
    eventChangeParameter.target.textContent;
  changeSeenOfListOfParameterValues(parameterTuningValues);
  switch (eventChangeParameter.target.textContent) {
    case '-размер-':
      return {
        fontSize: '16px',
      };
    case '8pt':
      return {
        fontSize: 8 * 1.338307 + 'px',
      };
    case '10pt':
      return {
        fontSize: 10 * 1.338307 + 'px',
      };
    case '12pt':
      return {
        fontSize: 12 * 1.338307 + 'px',
      };
    case '14pt':
      return {
        fontSize: 14 * 1.338307 + 'px',
      };
    case '16pt':
      return {
        fontSize: 16 * 1.338307 + 'px',
      };
    case '18pt':
      return {
        fontSize: 18 * 1.338307 + 'px',
      };
    case '20pt':
      return {
        fontSize: 20 * 1.338307 + 'px',
      };
    case '22pt':
      return {
        fontSize: 22 * 1.338307 + 'px',
      };
    case '24pt':
      return {
        fontSize: 24 * 1.338307 + 'px',
      };
    case '-шрифт-':
      return { fontFamily: 'Times New Roman' };
    case 'Times New Roman':
      return { fontFamily: 'Times New Roman' };
    case 'Arial':
      return { fontFamily: 'Arial' };
    case 'Calibri':
      return { fontFamily: 'Calibri' };
    case 'Cambria':
      return { fontFamily: 'Cambria' };
  }
};

export const letterParameterDefinition = (parameter) => {
  switch (parameter) {
    case 'fontWeight':
      return 'ж';
    case 'fontStyle':
      return 'к';
    case 'textDecoration':
      return 'ч';
  }
};

export const drawArrowDown = (arrow) => {
  arrow.beginPath();
  arrow.moveTo(6, 11);
  arrow.lineTo(10, 7);
  arrow.moveTo(6, 11);
  arrow.lineTo(2, 7);
  arrow.moveTo(6, 10);
  arrow.lineTo(6, 3);
  arrow.strokeStyle = 'black';
  arrow.stroke();
};

export const parameterOver = (parameterTuningValues, parameterPressed) => {
  if (parameterPressed) {
    parameterTuningValues.backgroundColor = '#C5C8CB';
  } else {
    parameterTuningValues.backgroundColor = '#8795A5';
  }
};

export const parameterOut = (parameterTuningValues, parameterPressed) => {
  if (parameterPressed) {
    parameterTuningValues.backgroundColor = '#8795A5';
  } else {
    parameterTuningValues.backgroundColor = '#C5C8CB';
  }
};

export function changeButtonParameterValue(
  parameter,
  parameterTuningValues,
  parameterPressed
) {
  parameterPressed.value = !parameterPressed.value;
  if (parameterPressed.value) {
    parameterTuningValues.value.backgroundColor = '#C5C8CB';
    parameterTuningValues.value.boxShadow = 'none';
  } else {
    parameterTuningValues.value.backgroundColor = '#8795A5';
    parameterTuningValues.value.boxShadow = '2px 0px 1px #454B4E';
  }
  switch (parameter) {
    case 'fontWeight': {
      if (parameterPressed.value) {
        parameterTuningValues.value.fontWeight = 'bold';
      } else {
        parameterTuningValues.value.fontWeight = 'normal';
      }
      return { fontWeight: parameterTuningValues.value.fontWeight };
    }
    case 'fontStyle': {
      if (parameterPressed.value) {
        parameterTuningValues.value.fontStyle = 'oblique';
      } else {
        parameterTuningValues.value.fontStyle = 'normal';
      }
      return { fontStyle: parameterTuningValues.value.fontStyle };
    }
    case 'textDecoration': {
      if (parameterPressed.value) {
        parameterTuningValues.value.textDecoration = 'underline';
      } else {
        parameterTuningValues.value.textDecoration = 'none';
      }
      return { textDecoration: parameterTuningValues.value.textDecoration };
    }
  }
}

export const translateParameter = (parameterValue) => {
  switch (parameterValue) {
    case '10.706456px':
      return '8pt';
    case '13.38307px':
      return '10pt';
    case '16.059683999999997px':
      return '12pt';
    case '18.736297999999998px':
      return '14pt';
    case '24.089526px':
      return '18pt';
    case '26.76614px':
      return '20pt';
    case '29.442753999999997px':
      return '22pt';
    case '32.119367999999994px':
      return '24pt';
    case 'Times New Roman':
      return 'Times New Roman';
    case 'Arial':
      return 'Arial';
    case 'Calibri':
      return 'Calibri';
    case 'Cambria':
      return 'Cambria';
    default:
      return undefined;
  }
};

export const drawClip = (clip) => {
  clip.moveTo(11, 2);
  clip.lineTo(2, 11);
  clip.bezierCurveTo(1, 17, 6, 17, 9, 15);
  clip.lineTo(18, 6);
  clip.bezierCurveTo(17, 0, 14, 2, 13, 3);
  clip.lineTo(5, 11);
  clip.bezierCurveTo(4, 16, 9, 13, 11, 10);
  clip.lineTo(15, 6);
  clip.strokeStyle = 'black';
  clip.stroke();
};
