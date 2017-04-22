/*
Retrieves and compiles overwatch data for players
*/

var listOfPlayers = [];
var listofPlayerData =[];

function updateData(){
	$("#users").empty();
	
	var counter = 1;
	listofPlayerData.map((x) =>{
		rankTier="bronze";
		rank = x.rank;
		if(rank>=4000){rankTier = "grandmaster";}
		else if(rank>=3500){rankTier = "master";}
		else if(rank>=3000){rankTier = "diamond";}
		else if(rank>=2500){rankTier = "platinum";}
		else if(rank>=2000){rankTier = "gold";}
		else if(rank>=1500){rankTier = "silver";}
		$("#users").append("<li class=\"playerblock\">" + "<div class=\"" + rankTier + " playerblock\">" + "#" + counter + " " + x.username + " : " + x.rank + "</div></li>");
		counter++;
	});
}

function addToData(data){
	console.log(data);
	listofPlayerData.push({username: data.username, rank: data.competitive.rank});
	listofPlayerData.sort(function(a,b){return b.rank - a.rank});
	updateData();
}

function addUser(){
	newName = document.getElementById('textbox').value;
	document.getElementById('textbox').value = '';
	console.log(newName);
	newName = newName.replace('#', '-');
	if(listOfPlayers.indexOf(newName == -1)){
		$.get(
		"https://overwatch-api-ku.herokuapp.com/profile/pc/us/" + newName,
		addToData,
		"json").done(listOfPlayers.push(newName));
	}
	else{
		console.log("User " + newPlayers[name] + " is already present in the list");
	}

	updateData();

}

function addMany(string){
	string = "" + string;
	console.log(string);
	newPlayers = string.split('\n');
	newPlayers = cleanup(newPlayers);
	for (var name in newPlayers){
		//var string = "<p>" + newList[name] + "</p>\n";
		//$("#table").append(string);
		if(listOfPlayers.indexOf(newPlayers[name] == -1)){
			$.get(
			"https://overwatch-api-ku.herokuapp.com/profile/pc/us/" + newPlayers[name],
	  	 	addToData,
			"json").done(listOfPlayers.push(newPlayers[name]));
			//console.log(sortedList)
		}
		else{
			console.log("User " + newPlayers[name] + " is already present in the list");
		}
	}
	//listOfPlayers = listOfPlayers.concat(newPlayers);
	//console.log(listOfPlayers);
}

function cleanup(list){
	list = list.map((x)=>{
		console.log(x.replace('#','-'));
		return x.replace('#', '-');
		});
	list.splice(list.length-1,1);
	console.log(list);
	return list;
}
