"use client";
import axios from "axios";
import React, { useEffect, useState } from "react";
import ResultsArea from "@/components/ResultsArea";

const UnifiedSearch = () => {
    // const { activeNavLink, setActiveNavLink } = useStore();

    // useEffect(() => {
    //     setActiveNavLink("search");
    // }, []);

    const [query, setQuery] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const [articleResults, setArticleResults] = useState([]);
    const [googleResults, setGoogleResults] = useState([]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setError(null);
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

                console.log(googleQuery);

                // Add keywords to restrict results to Indian rules and laws
                console.log("googlequery", googleQuery);

                const response = await axios.get(
                    `https://www.googleapis.com/customsearch/v1?key=${
                        process.env.NEXT_PUBLIC_GOOGLE_SEARCH_ENGINE_API_KEY
                    }&cx=${
                        process.env.NEXT_PUBLIC_GOOGLE_SEARCH_ENGINE_ID
                    }&q=${encodeURIComponent(googleQuery)}`
                );

                console.log("response of google", response.data.items);

                setGoogleResults(response.data.items);
            }
        } catch (error) {
            console.error("Error performing search:", error);
            setError("An error occurred while searching. Please try again.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <>
            <div
                style={{
                    backgroundColor: "white",
                    minHeight: "100vh",
                    backgroundImage: "url('justice-photo.jpg')", // Replace with your image path
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    backgroundAttachment: "fixed",
                }}
            >
                <section
                    className="bg-gray-100 p-8 shadow-md rounded-lg max-w-3xl mx-auto"
                    style={{
                        backgroundImage: "url('background-search.jpg')", // Ensure you have the correct path for the image
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                    }}
                >
                    <h1 className="text-2xl font-bold mb-6 text-black">
                        Unified Search
                    </h1>

                    <form onSubmit={handleSubmit} className="mb-6 space-y-4">
                        <div className="flex flex-col">
                            <textarea
                                className="w-full p-3 outline-none text-black resize-none h-32 border border-gray-300 rounded-lg"
                                value={query}
                                onChange={(e) => setQuery(e.target.value)}
                                placeholder="Search for articles..."
                            />
                        </div>
                        <div className="flex justify-end">
                            <button
                                type="submit"
                                className={`bg-gradient-to-r from-purple-400 via-blue-500 to-blue-600 text-white py-2 px-6 rounded-lg hover:from-purple-500 hover:to-blue-700 transition duration-200 shadow-md ${
                                    isLoading
                                        ? "opacity-50 cursor-not-allowed"
                                        : ""
                                }`}
                                disabled={isLoading}
                            >
                                {/* {isLoading ? "Searching..." : "Search"} */}
                                Search
                            </button>
                        </div>
                    </form>

                    {error && <p className="text-red-500 mb-4">{error}</p>}
                    <div
                        className={`text-white p-2 rounded-md px-6 bg-blue-600 my-5`}
                    >
                        {/* {isLoading
                            ? "Fetching Results..."
                            : (articleResults.length > 0 || googleResults.length > 0)
                            ? "Search Results"
                            : "Type the case details to search"} */}
                            Results
                    </div>
                    {(articleResults.length || googleResults.length) && (
                        <ResultsArea
                            articleResults={articleResults}
                            googleResults={googleResults}
                        />
                    )}
                </section>
            </div>
        </>
    );
};

export default UnifiedSearch;
