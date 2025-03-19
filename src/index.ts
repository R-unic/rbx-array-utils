const { max, min, floor, random } = math;

export function randomElement<T extends defined>(array: T[]): T {
  return array[random(1, array.size()) - 1];
}

/** Fisher-Yates shuffle algorithm */
export function shuffle<T extends defined>(array: T[], reshuffleIfNoChanges = true): T[] {
  const shuffledArray = [...array];
  let isIdentical = true;

  for (let i = shuffledArray.size() - 1; i > 0; i--) {
    const j = math.floor(math.random() * (i + 1));
    if (shuffledArray[i] !== shuffledArray[j]) {
      isIdentical = false;
    }
    [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
  }

  return isIdentical && reshuffleIfNoChanges ? shuffle(array) : shuffledArray;
}

export function removeDuplicates<T extends defined>(array: T[]): T[] {
  const seen = new Set<T>;
  return array.filter((value) => {
    if (!seen.has(value)) {
      seen.add(value);
      return true;
    }
    return false;
  });
}

export function flatten<T extends defined>(array: (T | T[])[], deep = false): T[] {
  const result: T[] = [];
  const flattenHelper = (array: (T | T[])[], deep: boolean) => {
    for (const value of array) {
      if (typeOf(value) === "table") {
        if ((value as T[]).size() === 0 || (value as T[])[0] === undefined || !deep) {
          for (const subValue of value as T[])
            result.push(subValue);
        } else
          flattenHelper(value as T[], deep);
      } else
        result.push(value as T);
    }
  }

  flattenHelper(array, deep);
  return result;
}

export function reverse<T extends defined>(array: T[]): T[] {
  return array.map((_, i) => array[array.size() - 1 - i]);
}

export function slice<T extends defined>(array: T[], start: number, finish?: number): T[] {
  const length = array.size();
  const startIndex = start < 0 ? max(length + start, 0) : min(start, length);
  const endIndex = finish === undefined ? length : finish < 0 ? max(length + finish, 0) : min(finish, length);

  const slicedArray: T[] = [];
  for (let i = startIndex; i < endIndex; i++)
    slicedArray.push(array[i]);

  return slicedArray;
}