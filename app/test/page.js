"use client";
import { useState } from "react";
import axios from "axios";

export default function Home() {
  const [file, setFile] = useState(null);
  const [summary, setSummary] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!file) {
      setError("Please upload a file.");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    const options = {
      method: "POST",
      url: "https://api.apyhub.com/ai/summarize-documents/file",
      headers: {
        "apy-token":
          "APY0ZQ1tdQuqwkRVGx5tBtWAO0tuG0h8NAg1Z78pp7Uxwtvebzy14B5DvlUfboeDww5D",
        "Content-Type": "multipart/form-data",
      },
      data: formData,
    };

    setLoading(true);
    setError(null);

    try {
      const response = await axios.request(options);
      setSummary(response.data.data.summary);
    } catch (err) {
      setError("Error summarizing the document");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Summarize Your PDF</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="file"
          accept=".pdf"
          onChange={handleFileChange}
          className="border p-2 mb-4"
        />
        <button
          type="submit"
          className="bg-blue-500 text-white p-2 rounded"
          disabled={loading}
        >
          {loading ? "Summarizing..." : "Summarize PDF"}
        </button>
      </form>

      {error && <p className="text-red-500 mt-4">{error}</p>}
      {summary && (
        <div className="mt-6">
          <h2 className="text-xl font-bold">Summary:</h2>
          <p>{summary}</p> {/* Rendering the summary string */}
        </div>
      )}
    </div>
  );
}
