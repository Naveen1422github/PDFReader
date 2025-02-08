import mongoose from 'mongoose';

const vocabSchema = new mongoose.Schema(
 {
	word:{
		type:String,
		required: true
	},
	meaning:{
		type: String,
		required: true
	},
	parent:{
		type: String
	},
	category:{
		type: String
	},
 }, 
 {timestamps: true}
		
);

const Vocab = mongoose.model('vocab', vocabSchema);

export default Vocab;

