//put the data from a csv file into a mongodb database
//use require instead of import
import mongoose from 'mongoose';
import { mongodbcredentials } from './secret.js';

const connectionString = 'mongodb+srv://' + mongodbcredentials + '.nkgfuzj.mongodb.net/?retryWrites=true&w=majority';

// Define the Mongoose schema for the Oscar data
const OscarWinnerSchema = new mongoose.Schema({
	year_film: String,
	year_cermony: String,
	ceromony: String,
	name : String,
	film : String,
	winner : String
    
});

// Create a Mongoose model for the Oscar data
const OscarWinner = mongoose.model('Oscar_Winners', OscarWinnerSchema, 'the_oscar_award');

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
	  const actors = await OscarWinner.find({ name: actor, winner: "True" }, { name: 1, _id: 0 });
	  return actors;
	} catch (err) {
	  console.log('Error finding winners by actor:', err);
	  return [];
	} finally {
	  await mongoose.disconnect();
	}
  }
 

//call the function
getWinnerByYear('2015').then(winners => console.log(winners));
getWinnerByActor('Janet Gaynor').then(actors => console.log(actors));


























