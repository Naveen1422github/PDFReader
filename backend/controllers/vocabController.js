import Vocab from "../models/vocabModel.js";

export const getWordbyId = async (req, res) => {
	const id = req.params.id;
	try {
		const vocab = await Vocab.findById(id);	
		res.status(200).json({ success: true, data: vocab });
	} catch (error) {
		console.error("Error in Fetching data:", error.message);
		res.status(500).json({ success: false, message: "Server Error" });
	}
};

export const getAllWords = async (req, res) => {
	try {
		const vocab = await Vocab.find();
		res.status(200).json({ success: true, data: vocab });
	} catch (error) {
		console.error("Error in Fetching data:", error.message);
		res.status(500).json({ success: false, message: "Server Error" });
	}
};

export const updateWord = async (req, res) => {
	const id = req.params.id;
	const vocab = req.body;
	if (Object.keys(vocab).length < 1) {
		return res.status(400).json({ success: false, message: "Please provide some data" });
	}

	try {
		const updatedWord = await Vocab.findByIdAndUpdate(id, vocab, { new: true });
		res.status(200).json({ success: true, data: updatedWord });
	} catch (error) {
		console.error("Error in Updating data:", error.message);
		res.status(500).json({ success: false, message: "Server Error" });
	}
};

export const addWord = async (req, res) => {
	const vocab = req.body;
	if (vocab.length < 1) {
		return res.status(400).json({ success: false, message: "Please provide some data" });
	}


	const newWord = new Vocab(vocab)

	try {
		await newWord.save();
		res.status(201).json({ success: true, data: newWord });
	} catch (error) {
		console.error("Error in Create data:", error.message);
		res.status(500).json({ success: false, message: "Server Error" });
	}
};


export const deleteWord = async (req, res) => {
	const id = req.params.id;
	try {
		const vocab = await Vocab.findByIdAndDelete(id);
		res.status(200).json({ success: true, data: "word deleted" });
	} catch (error) {
		res.status(404).json({ success: false, message: "word not found" });
	}
};