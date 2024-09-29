import React from "react";

const ResultsArea = ({ articleResults, googleResults }) => {
    console.log("first", articleResults);
    console.log("second", googleResults);

    return (
        <section
            className="bg-gray-100 p-8 shadow-md rounded-lg max-w-3xl mx-auto"
            style={{
                backgroundImage: "background-search.jpg", // Replace with your image path
                backgroundSize: "cover",
                backgroundPosition: "center",
            }}
        >
            {" "}
            {articleResults && articleResults.length > 0 && (
                <div className="mb-6">
                    <h2 className="text-xl font-semibold mb-4 text-black">
                        Article Results ( Results are under improvement):
                    </h2>
                    <div className="grid gap-4">
                        {articleResults.map((result, index) => (
                            <div
                                key={index}
                                className="border border-gray-200 p-4 rounded-lg shadow-sm bg-white"
                            >
                                <h3 className="font-bold text-lg text-black">
                                    {result["chapter-title"] || "Untitled"}
                                </h3>

                                {Object.entries(result).map(
                                    ([key, value]) =>
                                        ![
                                            "title",
                                            "article_number",
                                            "similarity_score",
                                        ].includes(key) && (
                                            <p key={key} className="text-black">
                                                {key}: {JSON.stringify(value)}
                                            </p>
                                        )
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            )}
            {googleResults && googleResults.length > 0 && (
                <div className="mb-6">
                    <h2 className="text-xl font-semibold mb-4 text-black">
                        Related Google Results:
                    </h2>
                    <ul className="list-disc pl-5">
                        {googleResults.map((item, index) => (
                            <li
                                key={index}
                                className="mb-4 p-4 border border-gray-200 rounded-lg shadow-sm bg-white hover:bg-gray-50 transition duration-200"
                            >
                                <a
                                    href={item.link}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-blue-600 hover:underline"
                                >
                                    <h3 className="font-bold mb-1 text-black">
                                        {item.title}
                                    </h3>
                                    <p className="text-gray-700">
                                        {item.snippet}
                                    </p>
                                </a>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </section>
    );
};

export default ResultsArea;
