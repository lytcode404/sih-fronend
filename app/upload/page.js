"use client";
import React, { useState } from "react";

const PdfUploader = () => {
    const [pdf, setPdf] = useState(null);
    const [question, setQuestion] = useState("");
    const [responseText, setResponseText] = useState("");
    const [summary, setSummary] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleFileChange = (e) => {
        setPdf(e.target.files[0]);
        setResponseText(""); // Clear previous response when a new file is selected
        setError(""); // Clear any previous errors
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!pdf) {
            setError("Please upload a file.");
            return;
        }
        let formData = new FormData();
        formData.append("pdf", pdf);
        formData.append("question", question);

        setLoading(true);
        try {
            let response = await fetch(
                "https://ask-pdf-etif.onrender.com/process_pdf",
                {
                    method: "POST",
                    body: formData,
                }
            );

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            let result = await response.json();
            setResponseText(result.answer || `Error: ${result.error}`);

            console.log(result);
        } catch (error) {
            console.error("Error:", error);
            setError(
                "An error occurred. Please check the console for details."
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <div
            style={{
                backgroundColor: "white",
                minHeight: "100vh",
                backgroundImage: "url('/upload-background.jpeg')",
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundAttachment: "fixed",
            }}
        >
            <section
                className="bg-gray-100 p-8 shadow-md rounded-lg max-w-3xl mx-auto"
                style={{
                    backgroundImage: "url('/background-search.jpg')",
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                }}
            >
                <h1 className="text-2xl font-bold mb-6 text-black">
                    Upload PDF
                </h1>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="flex w-full justify-between mr-5">
                        <input
                            type="file"
                            accept="application/pdf"
                            onChange={handleFileChange}
                            className="p-2 border border-gray-300 text-gray-800 rounded-lg mt-4"
                        />
                    </div>
                    {error && <p className="text-red-500 mt-4">{error}</p>}

                    <div className=" text-gray-900">
                        <label
                            htmlFor="question"
                            className="block font-medium mb-1 text-gray-900"
                        >
                            Ask a question:
                        </label>
                        <textarea
                            type="text"
                            id="question"
                            name="question"
                            value={question}
                            onChange={(e) => setQuestion(e.target.value)}
                            required
                            className="w-full border border-gray-300 rounded-md col-span-5 p-2"
                        />
                    </div>
                    <div className="flex justify-end">
                        {" "}
                        <button
                            type="submit"
                            className={`max-w-fit col-span-1 bg-blue-500 text-white font-bold py-2 px-4 rounded-md hover:bg-blue-600 transition duration-300 ml-1 ${
                                loading ? "opacity-50 cursor-not-allowed" : ""
                            }`}
                        >
                            Submit
                        </button>
                    </div>
                </form>

                <h2 className="text-xl font-bold text-gray-900 ">Response:</h2>
                <div className="mt-3 bg-gray-100 p-3 rounded-md min-h-[30px] text-gray-700">
                    {responseText || "No response yet."}
                </div>
            </section>
        </div>
    );
};

export default PdfUploader;

// "use client";
// import axios from "axios";
// import { useState } from "react";
// import ResultsArea from "@/components/ResultsArea";

// export default function Upload() {
//   const [file, setFile] = useState(null);
//   const [fileURL, setFileURL] = useState(null);
//   const [summary, setSummary] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);

//   const [articleResults, setArticleResults] = useState([]);
//   const [googleResults, setGoogleResults] = useState([]);

//   const handleFileChange = (event) => {
//     const selectedFile = event.target.files[0];
//     if (selectedFile) {
//       setFile(selectedFile);
//       setFileURL(URL.createObjectURL(selectedFile)); // Create a URL for file preview
//       setError(null); // Clear any previous errors
//     }
//   };

//   const handleSubmit = async (event) => {
//     event.preventDefault();
//     if (!file) {
//       setError("Please upload a file.");
//       return;
//     }

//     const formData = new FormData();
//     formData.append("file", file);

//     const options = {
//       method: "POST",
//       url: "https://api.apyhub.com/ai/summarize-documents/file",
//       headers: {
//         "apy-token": process.env.NEXT_PUBLIC_MLTOKEN1,
//         "Content-Type": "multipart/form-data",
//       },
//       data: formData,
//     };

//     const options2 = {
//       method: "POST",
//       url: "https://api.apyhub.com/ai/summarize-documents/file",
//       headers: {
//         "apy-token": process.env.NEXT_PUBLIC_MLTOKEN2,
//         "Content-Type": "multipart/form-data",
//       },
//       data: formData,
//     };

//     setLoading(true);
//     setError(null);

//     try {
//       const response = await axios.request(options);
//       const summaryText = response.data.data.summary;
//       setSummary(summaryText);
//       handleFetchData(summaryText); // Pass the summary to the next function
//     } catch (err) {
//       try {
//         const response = await axios.request(options2);
//         const summaryText = response.data.data.summary;
//         setSummary(summaryText);
//         handleFetchData(summaryText); // Pass the summary to the next function
//       } catch (err) {
//         setError("Under Construction Meanwhile try Search Fucntionality! ");
//         console.error(err);
//       }
//     }
//   };

//   const handleFetchData = async (text) => {
//     setLoading(true);
//     setError(null);
//     setArticleResults([]);
//     setGoogleResults([]);

//     try {
//       // Search your API for articles
//       const articleRes = await fetch(`/api/search`, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({ query: text }),
//       });

//       const articleData = await articleRes.json();
//       const resultsArray = articleData.data || [];
//       setArticleResults(resultsArray);

//       // Perform Google search using article titles
//       if (resultsArray.length > 0) {
//         const googleQuery = resultsArray
//           .map((item) => (item.title ? `"${item.title}" "Indian "` : ""))
//           .filter(Boolean)
//           .join(" OR ");

//         const response = await axios.get(
//           `https://www.googleapis.com/customsearch/v1?key=${
//             process.env.NEXT_PUBLIC_GOOGLE_SEARCH_ENGINE_API_KEY
//           }&cx=${
//             process.env.NEXT_PUBLIC_GOOGLE_SEARCH_ENGINE_ID
//           }&q=${encodeURIComponent(googleQuery)}`
//         );

//         setGoogleResults(response.data.items || []);
//       }
//     } catch (error) {
//       setError("An error occurred while searching. Please try again.");
//       console.error(error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handlePreviewPdf = () => {
//     if (fileURL) {
//       window.open(fileURL, "_blank");
//     }
//   };

//   return (
//     <>
//       <div
//         style={{
//           backgroundColor: "white",
//           minHeight: "100vh",
//           backgroundImage: "url('/upload-background.jpeg')",
//           backgroundSize: "cover",
//           backgroundPosition: "center",
//           backgroundAttachment: "fixed",
//         }}
//       >
//         <section
//           className="bg-gray-100 p-8 shadow-md rounded-lg max-w-3xl mx-auto"
//           style={{
//             backgroundImage: "url('/background-search.jpg')",
//             backgroundSize: "cover",
//             backgroundPosition: "center",
//           }}
//         >
//           <h1 className="text-2xl font-bold mb-6 text-black">Upload PDF</h1>
//           <div className="flex w-full justify-between mr-5">
//             <input
//               type="file"
//               accept="application/pdf"
//               onChange={handleFileChange}
//               className="p-2 border border-gray-300 text-gray-800 rounded-lg mt-4"
//             />
//             {fileURL && (
//               <div>
//                 <button
//                   onClick={handlePreviewPdf}
//                   className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
//                 >
//                   View PDF
//                 </button>
//               </div>
//             )}
//           </div>

//           {error && <p className="text-red-500 mt-4">{error}</p>}

//           <button
//             onClick={handleSubmit}
//             className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded mt-4"
//           >
//             Summarize PDF
//           </button>

//           {summary && (
//             <div className="mt-6 text-black">
//               <h2 className="text-xl font-bold">Summary:</h2>
//               <p>{summary}</p>
//             </div>
//           )}

//           <div className={`text-white p-2 rounded-md px-6 bg-blue-600 my-5`}>
//             {loading ? "Fetching Results ( Wait 30 sec, Server is slow )..." : "Upload PDF to Search"}
//           </div>

//           {(articleResults.length || googleResults.length) && (
//             <ResultsArea
//               articleResults={articleResults}
//               googleResults={googleResults}
//             />
//           )}

//           {error && <p className="text-red-500 mb-4">{error}</p>}
//         </section>
//       </div>
//     </>
//   );
// }
