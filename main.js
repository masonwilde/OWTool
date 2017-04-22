/*
Retrieves and compiles overwatch data for players
*/

var listOfPlayers = [];
var listofPlayerData =[];

function updateData(){
	$("#users").empty();
	listofPlayerData.map((x) =>{
		$("#users").append("<li name=\"" +x.username + "\" rank=\"" + x.rank + "\">" + x.username + " : " + x.rank + "</li>");
	})
}

function addToData(data){
	console.log(data);
	listofPlayerData.push({username: data.username, rank: data.competitive.rank});
	listofPlayerData.sort(function(a,b){return b.rank - a.rank});
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
		$.get(
		"https://overwatch-api-ku.herokuapp.com/profile/pc/us/" + newPlayers[name],
  	 	addToData,
		"json")
		//console.log(sortedList)
	}
	listOfPlayers = listOfPlayers.concat(newPlayers);
	console.log(listOfPlayers);
	updateData();
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
