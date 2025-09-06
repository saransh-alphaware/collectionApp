const wrapText = (text, width) => {
  const words = text.split(" ");
  const lines = [];
  let currentLine = "";

  for (let word of words) {
    while (word.length > width) {
      if (currentLine) {
        lines.push(currentLine);
        currentLine = "";
      }
      lines.push(word.slice(0, width));
      word = word.slice(width);
    }

    if ((currentLine + (currentLine ? " " : "") + word).length <= width) {
      currentLine += (currentLine ? " " : "") + word;
    } else {
      if (currentLine) lines.push(currentLine);
      currentLine = word;
    }
  }

  if (currentLine) lines.push(currentLine);
  return lines;
};

const keyValueString = (key, value, KEY_WIDTH, VALUE_WIDTH) => {
  const trimmedKey = key?.toString().trim().replace(/\s+/g, " ") || "";
  const trimmedValue = value?.toString().trim().replace(/\s+/g, " ") || "";

  const keyLines = wrapText(trimmedKey, KEY_WIDTH);
  const valueLines = wrapText(trimmedValue, VALUE_WIDTH);
  const totalLines = Math.max(keyLines.length, valueLines.length);

  let resultString = "";

  for (let i = 0; i < totalLines; i++) {
    const keySegment = keyLines[i] || "";
    const keyPadding = " ".repeat(KEY_WIDTH - keySegment.length);

    const valueSegment = valueLines[i] || "";
    const valuePadding = " ".repeat(VALUE_WIDTH - valueSegment.length);

    if (i === 0) {
      resultString += `${keySegment}${keyPadding} : ${valueSegment}${valuePadding}`;
    } else {
      resultString += `${keySegment}${keyPadding}   ${valueSegment}${valuePadding}`;
    }

    resultString += "\n";
  }

  return resultString;
};

const dataString = (myData, nof) => {
  const myDataKeys = Object.keys(myData?.data);
  const maxKeyLength = Math.max(...myDataKeys.map((field) => field.length));

  let KEY_WIDTH, VALUE_WIDTH;

  if (nof % 2 === 0) {
    if (maxKeyLength > nof / 2 - 2) {
      KEY_WIDTH = nof / 2 - 2;
    } else {
      KEY_WIDTH = maxKeyLength;
    }
    VALUE_WIDTH = nof - KEY_WIDTH - 3;
  } else {
    if (maxKeyLength > nof / 2 - 1) {
      KEY_WIDTH = nof / 2 - 1;
    } else {
      KEY_WIDTH = maxKeyLength;
    }
    VALUE_WIDTH = nof - KEY_WIDTH - 3;
  }

  let formattedOutput = "";
  for (const [key, value] of Object.entries(myData?.data)) {
    formattedOutput += keyValueString(
      key,
      value,
      Math.floor(KEY_WIDTH),
      Math.floor(VALUE_WIDTH)
    );
  }

  return formattedOutput;
};

const nameString = (name, nof) => {
  const myString = name?.trim() || "";
  const lengthString = myString.length;
  const startSpaceLength = Math.floor((nof - lengthString) / 2);
  const endSpaceLength = nof - lengthString - startSpaceLength;

  return `${" ".repeat(startSpaceLength)}${myString}${" ".repeat(
    endSpaceLength
  )}`;
};

const createPrintString = (data, repeatCount) => {
  let result = "";

  if (data?.title?.upSymbol) {
    result += data.title.upSymbol.repeat(repeatCount) + "\n";
  }

  if (data?.title?.name) {
    result += nameString(data.title.name, repeatCount) + "\n";
  }

  if (data?.title?.downSymbol) {
    result += data.title.downSymbol.repeat(repeatCount) + "\n";
  }

  result += dataString(data, repeatCount);
  return result;
};

export { createPrintString };
