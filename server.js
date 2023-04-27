//where the oscar winners, title search, and year search are
//put the data from a csv file into a mongodb database
//use require instead of import
import mongoose from 'mongoose';
import { mongodbcredentials } from './secret.js';
//create connection string to MongoDB 
const connectionString = 'mongodb+srv://' + mongodbcredentials + '.nkgfuzj.mongodb.net/?retryWrites=true&w=majority';
//Defines the "OscarNominiesSchema" which defines the structure of the documents in the oscar nominies collection. 
//This Schema has 4 fields type string. 
const OscarNominiesSchema = new mongoose.Schema({
	year: String,
	category: String,
	winner: String,
	entity: String,
});

//Defines the structure of the documents in the oscarwinner collection. This schema has 6 fields type string. 
const OscarWinnerSchema = new mongoose.Schema({
	year_film: String,
	year_cermony: String,
	ceromony: String,
	name : String,
	film : String,
	winner : String
    
});

//Create a Mongoose model for the Oscar data
//Using the schemas defined above, OscarWinner is associated with the Oscar_Winners, the OscarWinnerSchema isused to define the structure of the documents in the oscar winners collection. 
//Similar with OscarNominies. 
//Once they are defined, they can be used to performed CRUD operations on the respective MongoDB collections using Mongooes's API 

const OscarWinner = mongoose.model('Oscar_Winners', OscarWinnerSchema, 'the_oscar_award');
const OscarNominies = mongoose.model('Oscar_Nominies', OscarNominiesSchema, 'oscar_nominies');

//This is an asynchronous function getWinnerByYear accepts a year parameter. It performs a MongoDB database query to find all the films that won an Oscar award for the specified year 
async function getWinnerByYear(year) {
	try{
	await mongoose.connect(connectionString, { useNewUrlParser: true, useUnifiedTopology: true });
	const winners = await OscarWinner.find({year_film: year, winner: "True"}, {film: 1, _id: 0});
	return winners;
	}
	catch(err){
		console.log('Error finding winners by year:', err);
		return [];
	}
	finally{
		await mongoose.disconnect(); 
	}

}
async function getWinnerByActor(actor) {
	try {
	  await mongoose.connect(connectionString, { useNewUrlParser: true, useUnifiedTopology: true });
	  const actors = await OscarWinner.find({ name: actor, winner: "True", category: "ACTOR" }, { name: 1, _id: 0 });
	  return actors;
	} catch (err) {
	  console.log('Error finding winners by actor:', err);
	  return [];
	} finally {
	  await mongoose.disconnect();
	}
  }
async function getNominesByYear(year) {
	try{
	await mongoose.connect(connectionString, { useNewUrlParser: true, useUnifiedTopology: true });
	const nominies = await OscarNominies.find({year: year, winner: "True", category: "ACTRESS"}, {entity: 1, _id: 0});
	return nominies;
	}
	catch(err){
		console.log('Error finding nominies by year:', err);
		return [];
	}
	finally{
		await mongoose.disconnect();
	}}
async function getWinnerByYear(year){
	try{
		await mongoose.connect(connectionString, { useNewUrlParser: true, useUnifiedTopology: true });
		const actors = await OscarWinner.find({year: year, winner: "True"}, {name:1, _id: 0});
		return actors;
	}
	catch(err){
		console.log("Error finding name", err);
		return []
	}
	finally{
		await mongoose.disconnect();
	}
}










//call the function
// getWinnerByYear('2015').then(winners => console.log(winners));
// getWinnerByActor('Janet Gaynor').then(actors => console.log(actors));
// getNominesByYear('2022').then(nominies => console.log(nominies));
getNominesByYear('1927').then(nominies => console.log(nominies));


























