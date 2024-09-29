"use client";
import ResultsArea from "@/components/ResultsArea";
import axios from "axios";
import React, { useState } from "react";

const PdfUploader = () => {
  const [pdf, setPdf] = useState(null);
  const [question, setQuestion] = useState("");
  const [responseText, setResponseText] = useState("");
  const [loading, setLoading] = useState(false);
  const [summariseBtnLoading, setSummariseBtnLoading] = useState(false);
  const [error, setError] = useState("");

  const [articleResults, setArticleResults] = useState([]);
  const [googleResults, setGoogleResults] = useState([]);

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
      setError("An error occurred. Please check the console for details.");
    } finally {
      setLoading(false);
    }
  };

  const handleSummarisePdf = async (event) => {
    event.preventDefault();

    if (!pdf) {
      setError("Please upload a file.");
      return;
    }
    let formData = new FormData();
    formData.append("pdf", pdf);
    formData.append("question", "summarise this pdf...");

    setSummariseBtnLoading(true);
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
      await handleSubmit2(result.answer);
      setResponseText(result.answer || `Error: ${result.error}`);

      console.log(result);
    } catch (error) {
      console.error("Error:", error);
      setError("An error occurred. Please check the console for details.");
    } finally {
      setSummariseBtnLoading(false);
    }
  };

  const handleSubmit2 = async (query) => {
    //    e.preventDefault();
    //    setIsLoading(true);
    //    setError(null);
    console.log(query);
    setArticleResults([]);
    setGoogleResults([]);

    try {
      // Search your API for articles
      const articleRes = await fetch(
        `https://commercial-court-api.onrender.com/find_similar_sections`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ query }),
        }
      );

      const articleData = await articleRes.json();
      console.log("API response:", articleData);

      // Ensure articleData is an array
      const resultsArray = articleData;
      console.log(articleData);
      setArticleResults(resultsArray);

      // Perform Google search using the article titles
      console.log("result array", resultsArray);
      if (resultsArray.length > 0) {
        const googleQuery = resultsArray
          .map((item) => {
            // Construct the query string for each item
            const title = item["chapter-title"];
            const section = item.Section;
            const chapter = item.chapter;

            return `India: commercial court act + ${title} + Section ${section} + Chapter ${chapter}`;
          })
          .filter(Boolean) // Ensure we only keep valid queries
          .join(" OR "); // Join the queries with "OR"

        // console.log('google',googleQuery);

        // Add keywords to restrict results to Indian rules and laws
        console.log("googlequery--------------------", googleQuery);

        const response = await axios.get(
          `https://www.googleapis.com/customsearch/v1?key=${
            process.env.NEXT_PUBLIC_GOOGLE_SEARCH_ENGINE_API_KEY
          }&cx=${
            process.env.NEXT_PUBLIC_GOOGLE_SEARCH_ENGINE_ID
          }&q=${encodeURIComponent(googleQuery)}`
        );

        console.log("response of google", response);
        console.log("response of google", response.data.items);

        console.log("googlequery--------------------");

        setGoogleResults(response.data.items);
      }
    } catch (error) {
      console.error("Error performing search:", error);
    //   setError("An error occurred while searching. Please try again.");
    } finally {
      //  setIsLoading(false);
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
        className="bg-white p-8 shadow-xl rounded-lg max-w-3xl mx-auto"
        style={{
          backgroundImage: "url('/background-search.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          borderRadius: "12px",
          boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
        }}
      >
        <h1 className="text-3xl font-semibold mb-6 text-gray-900 text-center">
          Upload and Ask
        </h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="w-full flex justify-between">
            <div className="flex  justify-between mr-5  ">
              <input
                type="file"
                accept="application/pdf"
                onChange={handleFileChange}
                className="p-2 border border-gray-300 text-gray-800 rounded-lg mt-4"
              />
            </div>
            <button
              onClick={handleSummarisePdf}
              className={`   bg-green-500 text-white font-bold  px-4 rounded-md hover:bg-green-600 transition duration-300 ml-1 ${
                summariseBtnLoading ? "opacity-50 cursor-not-allowed" : ""
              }`}
            >
              {summariseBtnLoading ? "Processing..." : "Summarise PDF"}
            </button>
          </div>

          {/* {error && <p className="text-red-500 text-center mt-2">{error}</p>} */}

          {/* Question Section */}
          <div className="text-gray-900">
            <label
              htmlFor="question"
              className="block text-lg font-medium mb-2 text-gray-700"
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
              className="w-full p-3 border border-gray-300 rounded-md shadow-sm hover:shadow-md transition-shadow duration-200 focus:border-blue-500"
              rows="5"
              placeholder="Enter your question..."
            />
          </div>

          {/* Submit Button */}
          <div className="flex justify-center">
            <button
              type="submit"
              className={`bg-gradient-to-r from-purple-400 via-blue-500 to-blue-600 text-white py-3 px-8 rounded-lg hover:from-purple-500 hover:to-blue-700 transition duration-200 shadow-md${
                loading ? "opacity-50 cursor-not-allowed" : ""
              }`}
            >
              {loading ? "Processing..." : "Submit"}
            </button>
          </div>
        </form>

        {/* Response Section */}
        <h2 className="text-2xl font-semibold text-gray-900 mt-8 text-center">
          Response:
        </h2>
        <div className="mt-4 bg-gray-100 p-5 rounded-lg text-gray-700 shadow-inner min-h-[40px] text-center">
          {responseText || "No response yet."}
        </div>
        {(articleResults.length || googleResults.length) && (
          <ResultsArea
            articleResults={articleResults}
            googleResults={googleResults}
          />
        )}
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
