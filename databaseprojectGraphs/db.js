const mysql = require('mysql');

const express = require('express');
const app = express();
app.set('view engine', 'ejs');

/////////////////////////////////////////////////////////////////////////	
var con = mysql.createConnection({ 
	host: "localhost",
	user: "root",
	password: "MyNewPass",
	database: "football"
});

function getConnect() {
  con.connect(function(err){
		if(err) throw err;
		console.log("Connected.");
	});
}

function executeQuery(sql,callback){
	
	var clonedResult;
	
	con.query(sql, function (err,result,fields){
		if(err) throw err
		clonedResult = JSON.parse(JSON.stringify(result));
		
		return callback(clonedResult);				
	});
}
/////////////////////////////////////////////////////////////////////////////////

app.get('/', function(req,res){
	res.render('start');
})

app.get('/topscorers', function(req,res){
		
	var sql = 'SELECT Name, Goals/Games as ratio FROM maintable ORDER BY ratio DESC';
	executeQuery(sql,function(result){
		var data;
		data = result;
		
		var x;
		for (x in data) {
			//console.log(data[x].Name);
		}
		res.render('table1', {result: data, error: null});
	});
	
})

/////////////////////////////////////////////////////////////////////////////////////////////////////
//La Liga - countries
app.get('/table1', function(req,res){
	
	var sql = "select p.Country, count(p.PlayerID) as numPlayers from football.leagueclub l, football.player p where l.PlayerID = p.PlayerID and l.League = 'La Liga' group by p.Country order by numPlayers desc";
	executeQuery(sql,function(result){
		var data;
		data = result;
		
		var x;
		var other = 0;
		var sum = 0;
		for (x in data) {
			//console.log(data[x].numPlayers);
			sum+=data[x].numPlayers;
			if(x > 9){
				other += data[x].numPlayers;
			}
		}
		console.log(other);
		console.log(sum);
		res.render('table2', {result: data, error: null, otherP: other, sumP: sum});
	});
})

//Premier League - countries
app.get('/table2', function(req,res){
	
	var sql = "select p.Country, count(p.PlayerID) as numPlayers from football.leagueclub l, football.player p where l.PlayerID = p.PlayerID and l.League = 'Premier League' group by p.Country order by numPlayers desc";
	executeQuery(sql,function(result){
		var data;
		data = result;
		
		var x;
		var other = 0;
		var sum = 0;
		for (x in data) {
			//console.log(data[x].numPlayers);
			sum+=data[x].numPlayers;
			if(x > 9){
				other += data[x].numPlayers;
			}
		}
		console.log(other);
		console.log(sum);
		res.render('table3', {result: data, error: null, otherP: other, sumP: sum});
	});
})

//Ligue 1  - countries
app.get('/table3', function(req,res){
	
	var sql = "select p.Country, count(p.PlayerID) as numPlayers from football.leagueclub l, football.player p where l.PlayerID = p.PlayerID and l.League = 'Ligue 1' group by p.Country order by numPlayers desc";
	executeQuery(sql,function(result){
		var data;
		data = result;
		
		var x;
		var other = 0;
		var sum = 0;
		for (x in data) {
			//console.log(data[x].numPlayers);
			sum+=data[x].numPlayers;
			if(x > 9){
				other += data[x].numPlayers;
			}
		}
		console.log(other);
		console.log(sum);
		res.render('table4', {result: data, error: null, otherP: other, sumP: sum});
	});
})

//Bundesliga - countries
app.get('/table4', function(req,res){
	
	var sql = "select p.Country, count(p.PlayerID) as numPlayers from football.leagueclub l, football.player p where l.PlayerID = p.PlayerID and l.League = 'Bundesliga' group by p.Country order by numPlayers desc";
	executeQuery(sql,function(result){
		var data;
		data = result;
		
		var x;
		var other = 0;
		var sum = 0;
		for (x in data) {
			//console.log(data[x].numPlayers);
			sum+=data[x].numPlayers;
			if(x > 9){
				other += data[x].numPlayers;
			}
		}
		console.log(other);
		console.log(sum);
		res.render('table5', {result: data, error: null, otherP: other, sumP: sum});
	});
})
 
//Serie A - countries
app.get('/table5', function(req,res){
	
	var sql = "select p.Country, count(p.PlayerID) as numPlayers from football.leagueclub l, football.player p where l.PlayerID = p.PlayerID and l.League = 'Serie A' group by p.Country order by numPlayers desc";
	executeQuery(sql,function(result){
		var data;
		data = result;
		
		var x;
		var other = 0;
		var sum = 0;
		for (x in data) {
			//console.log(data[x].numPlayers);
			sum+=data[x].numPlayers;
			if(x > 9){
				other += data[x].numPlayers;
			}
		}
		console.log(other);
		console.log(sum);
		res.render('table6', {result: data, error: null, otherP: other, sumP: sum});
	});
})

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

//La Liga - Goals Per Country
app.get('/goal', function(req,res){
	
	var sql = "select Nationality, sum(Goals)/count(PlayerID) as ratio from football.maintable where League = 'La Liga' group by Nationality order by ratio desc";
	executeQuery(sql,function(result){
		var data;
		data = result;
		
		var x;
		var other = 0;
		var sum = 0;
		for (x in data) {
			//console.log(data[x].numPlayers);
			sum+=data[x].ratio;
			if(x > 9){
				other += data[x].ratio;
			}
		}
		//console.log(other);
		//console.log(sum);
		res.render('goals', {result: data, error: null, otherP: other, sumP: sum});
	});
})


//Premier League - Goals Per Country
app.get('/goal1', function(req,res){
	
	var sql = "select Nationality, sum(Goals)/count(PlayerID) as ratio from football.maintable where League = 'Premier League' group by Nationality order by ratio desc";
	executeQuery(sql,function(result){
		var data;
		data = result;
		
		var x;
		var other = 0;
		var sum = 0;
		for (x in data) {
			//console.log(data[x].numPlayers);
			sum+=data[x].ratio;
			if(x > 9){
				other += data[x].ratio;
			}
		}
		//console.log(other);
		//console.log(sum);
		res.render('goals1', {result: data, error: null, otherP: other, sumP: sum});
	});
})
//Ligue 1 - Goals Per Country
app.get('/goal2', function(req,res){
	
	var sql = "select Nationality, sum(Goals)/count(PlayerID) as ratio from football.maintable where League = 'Ligue 1' group by Nationality order by ratio desc";
	executeQuery(sql,function(result){
		var data;
		data = result;
		
		var x;
		var other = 0;
		var sum = 0;
		for (x in data) {
			//console.log(data[x].numPlayers);
			sum+=data[x].ratio;
			if(x > 9){
				other += data[x].ratio;
			}
		}
		//console.log(other);
		//console.log(sum);
		res.render('goals2', {result: data, error: null, otherP: other, sumP: sum});
	});
})

//Bundesliga - Goals Per Country
app.get('/goal3', function(req,res){
	
	var sql = "select Nationality, sum(Goals)/count(PlayerID) as ratio from football.maintable where League = 'Bundesliga' group by Nationality order by ratio desc";
	executeQuery(sql,function(result){
		var data;
		data = result;
		
		var x;
		var other = 0;
		var sum = 0;
		for (x in data) {
			//console.log(data[x].numPlayers);
			sum+=data[x].ratio;
			if(x > 9){
				other += data[x].ratio;
			}
		}
		//console.log(other);
		//console.log(sum);
		res.render('goals3', {result: data, error: null, otherP: other, sumP: sum});
	});
})

//Serie A - Goals Per Country
app.get('/goal4', function(req,res){
	
	var sql = "select Nationality, sum(Goals)/count(PlayerID) as ratio from football.maintable where League = 'Serie A' group by Nationality order by ratio desc";
	executeQuery(sql,function(result){
		var data;
		data = result;
		
		var x;
		var other = 0;
		var sum = 0;
		for (x in data) {
			//console.log(data[x].numPlayers);
			sum+=data[x].ratio;
			if(x > 9){
				other += data[x].ratio;
			}
		}
		//console.log(other);
		//console.log(sum);
		res.render('goals4', {result: data, error: null, otherP: other, sumP: sum});
	});
})

app.listen(3000, function (){
	console.log('Example app listening on port 3000!')
})






	