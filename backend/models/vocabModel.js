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
	topic:{
		type: String
	},
	user:{
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User',
	},
 }, 
 {timestamps: true}
		
);

const Vocab = mongoose.model('vocab', vocabSchema);

export default Vocab;

