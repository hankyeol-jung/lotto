let already = numbers;

let alreadyCombination = [];

already.forEach((combination) => {
  let bValue = Object.values(combination[6])[0];
  let remainingNumbers = combination
    .slice(0, 6)
    .filter((num) => num !== bValue);
  let bCombinations = generateBCombinations(remainingNumbers, bValue);
  alreadyCombination.push(...bCombinations);
});

// 조합하지 않은 숫자
let notUsedNumbers = already.map((combination) => combination.slice(0, 6));
alreadyCombination.push(...notUsedNumbers);

function generateBCombinations(numbers, bValue) {
  let bCombinations = [];

  for (let i = 0; i < numbers.length; i++) {
    for (let j = i + 1; j < numbers.length; j++) {
      for (let k = j + 1; k < numbers.length; k++) {
        for (let l = k + 1; l < numbers.length; l++) {
          for (let m = l + 1; m < numbers.length; m++) {
            bCombinations.push([
              numbers[i],
              numbers[j],
              numbers[k],
              numbers[l],
              numbers[m],
              bValue,
            ]);
          }
        }
      }
    }
  }

  return bCombinations;
}

function generateRandomCombination() {
  let combination = [];

  while (combination.length < 6) {
    let randomNumber = Math.floor(Math.random() * 45) + 1;

    if (!combination.includes(randomNumber)) {
      combination.push(randomNumber);
    }
  }

  return combination.sort((a, b) => a - b);
}

function generateUniqueCombinations(numCombinations) {
  let uniqueCombinations = [];

  while (uniqueCombinations.length < numCombinations) {
    let randomCombination = generateRandomCombination();

    if (
      !alreadyCombination.some(
        (arr) => JSON.stringify(arr) === JSON.stringify(randomCombination)
      )
    ) {
      uniqueCombinations.push(randomCombination);
      alreadyCombination.push(randomCombination);
    }
  }

  return uniqueCombinations;
}

function displayCombinations(combinations) {
  $(".lotteryNumber").empty();

  combinations.forEach((combination) => {
    let combinationDiv = $("<div class='combination'></div>").appendTo(
      ".lotteryNumber"
    );

    combination.forEach((number) => {
      let numberSpan = $("<span class='number'></span>").text(number);

      // 숫자에 따라 적절한 클래스 추가
      if (number >= 1 && number <= 10) {
        numberSpan.addClass("yellow");
      } else if (number >= 11 && number <= 20) {
        numberSpan.addClass("blue");
      } else if (number >= 21 && number <= 30) {
        numberSpan.addClass("red");
      } else if (number >= 31 && number <= 40) {
        numberSpan.addClass("gray");
      } else {
        numberSpan.addClass("green");
      }

      numberSpan.appendTo(combinationDiv);
    });
  });
}

$(".combinationBtn").click(function () {
  let numCombinationsToShow = 5;
  let combinations = generateUniqueCombinations(numCombinationsToShow);
  displayCombinations(combinations);
});
