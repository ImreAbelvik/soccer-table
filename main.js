//Kjører hovedfunksjonen som skal gjenomføres når kampen data blir registrert
var registreEl = document.querySelector("button");
registreEl.addEventListener("click", registrerKampData)

// Setter opp variablene som skal være med gjenom helle programet
var registrerteKamper = [];

// Setter opp lagene
let teams = [
    {
        "name": "milan",
        "nrMatches": 0,
        "nrWins": 0,
        "nrLoses": 0,
        "nrTie": 0,
        "goals": 0,
        "goalsAgeinst": 0,
        "goalDiff": 0,
        "points": 0
    },
    {
        "name": "roma",
        "nrMatches": 0,
        "nrWins": 0,
        "nrLoses": 0,
        "nrTie": 0,
        "goals": 0,
        "goalsAgeinst": 0,
        "goalDiff": 0,
        "points": 0
    },
    {
        "name": "inter",
        "nrMatches": 0,
        "nrWins": 0,
        "nrLoses": 0,
        "nrTie": 0,
        "goals": 0,
        "goalsAgeinst": 0,
        "goalDiff": 0,
        "points": 0
    }
]

// Hovedfunksjonen
function registrerKampData()  {
    // Henter inn kampdataen som er registret
    var teamOne = document.querySelector("#lagA").value;
    var teamTwo = document.querySelector("#lagB").value;
    var teamOneScore = document.querySelector("#maalLagA").value;
    var teamTwoScore = document.querySelector("#maalLagB").value;

    // Ser om kampen er spilt fra får av eller om brukeren prøver å registrere same lag
    var kamp = teamOne + teamTwo;
    if (teamOne === teamTwo) {
        alert("Et lag kan ikke spille i mot seg selv");
    } else if (registrerteKamper.includes(kamp)) {
        alert("Kamp er alerede registrert.");
    } else {
        // leger kampen til i listen for å huske at den er registrert
        registrerteKamper += kamp;

        // sjeker hvilket lag som spilte som lag 1
        if (teamOneScore > teamTwoScore) {
            addDataTeam(teamOne, teamOneScore, teamTwoScore, "win");
            addDataTeam(teamTwo, teamTwoScore, teamOneScore, "lose")
        } else if (teamOneScore === teamTwoScore) { // sjeker om det belei uavgjort
            addDataTeam(teamOne, teamOneScore, teamTwoScore, "tie");
            addDataTeam(teamTwo, teamTwoScore, teamOneScore, "tie");
        } else { // Hvis ikke de andre stemer så tapte de.
            addDataTeam(teamOne, teamOneScore, teamTwoScore, "lose");
            addDataTeam(teamTwo, teamTwoScore, teamOneScore, "win");
        }
        sortTable();
        createTableData();
    }
}

function addDataTeam(team, teamMatchGoals, matchGoalsAgeinst, result) {
    var teamIndex;
    for (var i = 0; i < teams.length; i++) {
        if (teams[i].name === team) {
            teamIndex = i;
        }
    }
    
    teamMatchGoals = Number(teamMatchGoals);
    teams[teamIndex].goals += teamMatchGoals;
    // team.updateGoals(goals);

    matchGoalsAgeinst = Number(matchGoalsAgeinst);
    teams[teamIndex].goalsAgeinst = matchGoalsAgeinst;
    //team.updateOwnGoals(goalsAgeinst);

    teams[teamIndex].goalDiff = teams[teamIndex].goals - teams[teamIndex].goalsAgeinst;
    //team.updateGoalDiff();

    teams[teamIndex].nrMatches += 1;
    switch(result) {
        case "win":
            teams[teamIndex].points += 3;
            teams[teamIndex].nrWins ++;
            break;
        case "tie":
            teams[teamIndex].points ++;
            teams[teamIndex].nrTie ++;
            break;
        case "lose":
            teams[teamIndex].points += 0;
            teams[teamIndex].nrLoses ++;
            break;
    }
    //team.updateTeamStats(result);

    console.log(teams[teamIndex]);
}


// sorter lagene etter plaseringen i turneringen
function sortTable() {
    teams.sort(function (a, b) {
        return b.points - a.points;
    })
    teams.sort(function (a, b) {
        return b.goals - a.goals;
    })
    teams.sort(function (a, b) {
        return b.goalDiff - a.goalDiff;
    })
}

// sett opp lagene i tabelen
function createTableData() {
    // Henter inn borde
    var tbodyEl = document.querySelector("tbody");

    // fjerner radene som alt er leget.
    tbodyEl.innerHTML = "";
    

    for (var f = 0; f < teams.length; f++) {
        // lager raden
        var trEl = document.createElement("tr");
        // lager alle radene
        var tdPositionEl = document.createElement("td")
        var tdTeamEl = document.createElement("td");
        var tdNrMatchesEl = document.createElement("td");
        var tdNrWinsEl = document.createElement("td");
        var tdNrLoseEl = document.createElement("td");
        var tdNrTieEl = document.createElement("td");
        var tdGoalsEl = document.createElement("td");
        var tdGoalsAgeinsEl = document.createElement("td");
        var tdGoalsDiffEl = document.createElement("td");
        var tdPointsEl = document.createElement("td");

        // legger infoen inn i td elementet
        tdPositionEl.innerHTML = f + 1;
        tdTeamEl.innerHTML = teams[f].name;
        tdNrMatchesEl.innerHTML = teams[f].nrMatches;
        tdNrWinsEl.innerHTML = teams[f].nrWins;
        tdNrLoseEl.innerHTML = teams[f].nrLoses;
        tdNrTieEl.innerHTML = teams[f].nrTie;
        tdGoalsEl.innerHTML = teams[f].goals;
        tdGoalsAgeinsEl.innerHTML = teams[f].goalsAgeinst;
        tdGoalsDiffEl.innerHTML = teams[f].goalDiff;
        tdPointsEl.innerHTML = teams[f].points;
  
        // apending child
        trEl.appendChild(tdPositionEl);
        trEl.appendChild(tdTeamEl);
        trEl.appendChild(tdNrMatchesEl);
        trEl.appendChild(tdNrWinsEl);
        trEl.appendChild(tdNrLoseEl);
        trEl.appendChild(tdNrTieEl);
        trEl.appendChild(tdGoalsEl);
        trEl.appendChild(tdGoalsAgeinsEl);
        trEl.appendChild(tdGoalsDiffEl);
        trEl.appendChild(tdPointsEl);

        tbodyEl.appendChild(trEl);
    }
}