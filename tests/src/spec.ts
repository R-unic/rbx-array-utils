import { Assert, Fact, InlineData, Theory } from "@rbxts/runit";
import { flatten, removeDuplicates, reverse, shuffle, slice } from "../../src";

function assertArrayEquals<T extends defined>(expected: T[], array: T[], inverse = false): void {
  for (const [index, value] of pairs(array)) {
    const expectedValue = expected[index - 1];
    Assert.isCheckableType(value, typeOf(expectedValue));
    if (typeOf(value) === "table")
      assertArrayEquals(<defined[]><unknown>expectedValue, <defined[]><unknown>value);
    else
      Assert[inverse ? "notEqual" : "equal"](expectedValue, value);
  }
}

class ArrayUtilsTest {
  @Fact
  public removesDuplicateElements(): void {
    const cleaned = removeDuplicates([1, 1, 2, 2, 3, 3]);
    Assert.equal(3, cleaned.size());
    assertArrayEquals([1, 2, 3], cleaned);
  }

  @Fact
  public reversesElements(): void {
    assertArrayEquals([4, 3, 2, 1], reverse([1, 2, 3, 4]));
  }

  @Fact
  public shufflesElements(): void {
    const array = [1, 2, 3, 4];
    Assert.true(shuffle(array).some((v, i) => v !== array[i]));
  }

  @Theory
  @InlineData([1, [2, 3], 4], [1, 2, 3, 4], false)
  @InlineData([1, [2, [3, 4]], 5], [1, 2, 3, 4, 5], true)
  @InlineData([1, 2, 3], [1, 2, 3], false)
  @InlineData([1, [], 2, [], 3], [1, 2, 3], true)
  @InlineData([1, [], 2, [], 3], [1, 2, 3], false)
  @InlineData([1, [2, [3, 4]], 5], [1, 2, [3, 4], 5], false)
  @InlineData([1, [2, [3, [4, 5]]], 6], [1, 2, 3, 4, 5, 6], true)
  @InlineData([1, ["a", true], 3.14], [1, "a", true, 3.14], false)
  @InlineData([1, ["a", [true, [3.14]]], 2], [1, "a", true, 3.14, 2], true)
  @InlineData([], [], true)
  @InlineData([], [], false)
  public flattensArrays(input: defined[], expectedArray: defined[], recursive: boolean): void {
    assertArrayEquals(expectedArray, flatten(input, recursive));
  }

  @Theory
  @InlineData([2, 3, 4], 1, 4)
  @InlineData([3, 4, 5], 2)
  @InlineData([], 3, 2)
  @InlineData([3, 4], -3, -1)
  @InlineData([], 10)
  @InlineData([3, 4, 5], 2, 10)
  @InlineData([3, 4, 5], 2, 10)
  @InlineData([], -10, -8)
  public slicesArray(expectedArray: defined[], startIndex: number, endIndex?: number) {
    assertArrayEquals(expectedArray, slice([1, 2, 3, 4, 5], startIndex, endIndex));
  }
}

export = ArrayUtilsTest;