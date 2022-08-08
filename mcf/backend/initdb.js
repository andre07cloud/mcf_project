

const User = require('./src/models/users');
const Categorie = require('./src/models/categorie');
const Formation = require('./src/models/formations');
const Exercice = require('./src/models/exercices');
const Question = require('./src/models/questions');
const Cour = require('./src/models/cours');

exports.createUserInit =function () {

	var data=[
		{
			"firstName":"JOSEPH",
			"lastName":"LAGLOIRE",
			"email":"joseph@gmail.com",
			"username":"joseph",
			"password":"allmyghtyGod@01",
		},
		{
			"firstName":"BERTRAND",
			"lastName":"LEROIS",
			"email":"bertrand@gmail.com",
			"username":"bertrand",
			"password":"allmyghtyGod@02",
		},
		{
			"firstName":"ESTEBANE",
			"lastName":"KAMBIASSO",
			"email":"estebane@gmail.com",
			"username":"estebane",
			"password":"allmyghtyGod@03",
		}

	];

	User.countDocuments({}, function (err, count) {
		if (err){
			console.log(err)
		}else{
			console.log("Count :", count)
			if(count<3){
				for (var element of data) {
					if(count<3){
						var user = new User(element);	

					// Then save the user
					user.save(function(err) {
						if (err) {
							console.log(err);
						} else {
							console.log('1 User inserted');
						}
					});
					}
				
				  }
			}
			else{
				console.log('more than 3 Users already exits');
			}
		}
	});

};

exports.createFormationInit =function () {

	var data=[
		{
			"designation":"Programmation C",
			"description":"Programmation C pour les nulls",
			"niveau":"Niveau 1",
			"categorie":"62750e936443a5e551f25093"
		},
		{
			"designation":"Programmation Python",
			"description":"Programmation Python pour les nulls",
			"niveau":"Niveau 2",
			"categorie":"62750e936443a5e551f25094"
		},
		{
			"designation":"Programmation R",
			"description":"Programmation R pour les nulls",
			"niveau":"Niveau 2",
			"categorie":"62750e936443a5e551f25095"
		}

	];
	Formation.countDocuments({}, function (err, count) {
		if (err){
			console.log(err)
		}else{
			console.log("Count :", count)
			if(count<3){
				for (var element of data) {
					
				var categorie = new Formation(element);	

					// Then save the user
					categorie.save(function(err) {
						if (err) {
							console.log(err);
						} else {
							console.log('1 Category inserted');
						}
					});
				  }
			}
			else{
				console.log('more than 3 Categories already exits');
			}
		}
	});

};

exports.createCategorieInit =function () {

	var data=[
		{
			"designation":"Informatique",
			"description":"Categorie Informatique"
		},
		{
			"designation":"Gestion de projet",
			"description":"Categorie Gestion de projet"
		},
		{
			"designation":"Langue etrangere",
			"description":"Categorie Langue"
		}

	];
	Categorie.countDocuments({}, function (err, count) {
		if (err){
			console.log(err)
		}else{
			console.log("Count :", count)
			if(count<3){
				for (var element of data) {
					
				var categorie = new Categorie(element);	

					// Then save the user
					categorie.save(function(err) {
						if (err) {
							console.log(err);
						} else {
							console.log('1 Category inserted');
						}
					});
				  }
			}
			else{
				console.log('more than 3 Categories already exits');
			}
		}
	});

};

exports.createExerciceInit =function () {

	var data=[
		{
			"designation":"Informatique",
			"description":"Exercice Informatique"
		},
		{
			"designation":"Gestion de projet",
			"description":"Exercice Gestion de projet"
		},
		{
			"designation":"Langue etrangere",
			"description":"Exercice Langue"
		}

	];
	Exercice.countDocuments({}, function (err, count) {
		if (err){
			console.log(err)
		}else{
			console.log("Count :", count)
			if(count<3){
				for (var element of data) {
					
				var exercice = new Exercice(element);	

					// Then save the user
					exercice.save(function(err) {
						if (err) {
							console.log(err);
						} else {
							console.log('1 Category inserted');
						}
					});
				  }
			}
			else{
				console.log('more than 3 Categories already exits');
			}
		}
	});

};

exports.createQuestionInit =function () {

	var data=[
		{
			"designation":"Informatique",
			"point":12
		},
		{
			"designation":"Gestion de projet",
			"point":15
		},
		{
			"designation":"Langue etrangere",
			"point":17
		}

	];
	Question.countDocuments({}, function (err, count) {
		if (err){
			console.log(err)
		}else{
			console.log("Count :", count)
			if(count<3){
				for (var element of data) {
					
				var question = new Question(element);	

					// Then save the user
					question.save(function(err) {
						if (err) {
							console.log(err);
						} else {
							console.log('1 Category inserted');
						}
					});
				  }
			}
			else{
				console.log('more than 3 Categories already exits');
			}
		}
	});

};

exports.createCourInit =function () {

	var data=[
		{
			"designation":"Informatique",
			"fichiers":"cour1.pdf",
			"formation":"62ab0805057b36b032368425"
		},
		{
			"designation":"Gestion de projet",
			"fichiers":"cour2.pdf",
			"formation":"62ab0805057b36b032368425"
		},
		{
			"designation":"Langue etrangere",
			"fichiers":"cour3.pdf",
			"formation":"62ab0805057b36b032368426"
		}

	];
	Cour.countDocuments({}, function (err, count) {
		if (err){
			console.log(err)
		}else{
			console.log("Count :", count)
			if(count<3){
				for (var element of data) {
					
				var cour = new Cour(element);	

					// Then save the user
					cour.save(function(err) {
						if (err) {
							console.log(err);
						} else {
							console.log('1 Category inserted');
						}
					});
				  }
			}
			else{
				console.log('more than 3 Categories already exits');
			}
		}
	});

};