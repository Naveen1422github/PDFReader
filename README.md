# 📖 PDFReader

PDFReader is a web-based application designed to provide a seamless reading experience with features like text search, annotations, translation, and more.

## 🚀 Getting Started
Follow these steps to set up and run the project locally.

### 📂 Clone the Repository
```sh
git clone <repository-url>
cd PDFReader
```

### 🏗️ Install and Run the Frontend
```sh
cd frontend
npm install
npm run dev
```
The frontend will start at `http://localhost:3000` (or as specified in the terminal).

### 🏗️ Install and Run the Backend
Open a new terminal and navigate to the backend directory:
```sh
cd ..
cd backend
npm install
npm run dev
```
The backend will start at `http://localhost:5000` (or as specified in the terminal).

### 🛠️ Setup Environment Variables
Before running the backend, create a `.env` file in the `backend` directory and add the following variables:
```sh
MONGO_URI=your_mongodb_connection_string
PORT=5000
GEMINI_API_KEY=your_gemini_api_key
```
Replace `your_mongodb_connection_string` and `your_gemini_api_key` with your actual credentials.

## 🎯 Features
- 🔍 **Text Search**: Quickly find words or phrases in your PDF.
- ✍ **Annotations**: Add text notes, drawings, and highlights.
- 🌙 **Dark Mode**: A comfortable reading experience in low-light environments.
- 🌎 **Translation**: Integrated with Google Translate API.
- 📖 **Word Lookup**: Get definitions using the Gemini API.
- 📜 **Table of Contents Navigation**: Easily browse through document sections.
- ✏️ **Drawing & Highlighter Tools**: Mark up PDFs with ease.

## 📌 Additional Notes
- Ensure you have **Node.js** installed before running the commands.
- Update environment variables if required (e.g., API keys for translation and word lookup services).

## 🤝 Contributing
Feel free to submit issues or pull requests to improve the project.

Happy Reading! 📚🚀

