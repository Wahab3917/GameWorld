// Rock Paper Scissors

function rpsGame(yourChoice) {
  console.log(yourChoice);
  var humanChoice, botChoice;
  humanChoice = yourChoice.id;

  botChoice = numberToChoice(randToRpsInt());
  console.log("computerChoice:", botChoice);
  
  results = decideWinner(humanChoice, botChoice);
  console.log(results);

  message = finalMessage(results);
  console.log(message);
  rpsFrontEnd(yourChoice.id, botChoice, message);
}

function randToRpsInt() {
  return Math.floor(Math.random() * 3);
}

function numberToChoice(number) {
  return ["rock", "paper", "scissor"][number]
}

function decideWinner(yourChoice, computerChoice) {
  var rpsDataBase = {
    "rock": {"scissor": 1, "rock": 0.5, "paper": 0},
    "paper": {"rock": 1, "paper": 0.5, "scissor": 0},
    "scissor": {"paper": 1, "scissor": 0.5, "rock": 0}
  };

  var yourScore = rpsDataBase[yourChoice][computerChoice];
  var computerScore = rpsDataBase[computerChoice][yourChoice];

  return [yourScore, computerScore];
}

function finalMessage([yourScore, computerScore]) {
  if (yourScore === 0) {
    return {"message": "You lost!", "color": "red"};
  }
  else if (yourScore === 0.5) {
    return {"message": "You tied!", "color": "yellow"};
  }
  else {
    return {"message": "You won!", "color": "green"};
  }
}

function rpsFrontEnd(humanImageChoice, botImageChoice, finalMessage) {
  var imagesDataBase = {
    "rock": document.getElementById("rock").src,
    "paper": document.getElementById("paper").src,
    "scissor": document.getElementById("scissor").src
  };

  // Removing all the images
  document.getElementById("rock").remove();
  document.getElementById("paper").remove();
  document.getElementById("scissor").remove();

  var humanDiv = document.createElement("div");
  var botDiv = document.createElement("div");
  var messageDiv = document.createElement("div");

  humanDiv.innerHTML = "<img src='" + imagesDataBase[humanImageChoice] + "' style='box-shadow: 0px 0px 15px rgba(37, 50, 233, 0.7)'>";
  document.getElementById("flexbox-rps-div").appendChild(humanDiv);
  
  messageDiv.innerHTML = "<h2 style='color: " + finalMessage['color'] + "; font-size: 60px; padding: 0; margin: 0; '>" + finalMessage['message'] + "</h2>";
  document.getElementById("flexbox-rps-div").appendChild(messageDiv);
  
  botDiv.innerHTML = "<img src='" + imagesDataBase[botImageChoice] + "' style='box-shadow: 0px 0px 15px rgba(243, 38, 24, 0.7)'>";
  document.getElementById("flexbox-rps-div").appendChild(botDiv);

}


