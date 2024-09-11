import React from 'react';

const Feature = () => {
    const feedbacks = [
        {
            highlight: "Legal Research Optimization",
            points: [
                "Automated Case Law Retrieval: Quickly retrieves relevant articles, legal rules, and precedents from an extensive database based on the case context.",
                "Contextual Recommendations: Provides relevant sections from legal literature, rules, and judgments tailored to commercial court cases.",
                "Keyword and Citation Analysis: Analyzes key phrases and citations in a legal document to offer focused insights and related cases."
            ],
            imageSrc: "Pre-An.jpeg", 
            altText: "Feedback Image 1"
        },
        {
            highlight: "Predictive Analytics for Case Outcomes",
            points: [
                "Historical Data Modeling: Leverages machine learning to predict potential case outcomes based on patterns from past commercial court rulings.",
                "Probability Scoring: Assigns probability scores to potential outcomes, offering judicial officers a data-backed perspective without replacing their judgment.",
                "Outcome Scenario Simulation: Simulates various legal outcomes by altering key variables, helping to foresee possible decisions."
            ],
            imageSrc: "eth-comp.jpeg", 
            altText: "Feedback Image 2"
        },
        {
            highlight: "Integration and User Experience",
            points: [
                "Proven technologies ensure reliability",
                "Compatible with common legal research platforms, allowing easy adoption by judicial officers.",
            ],
            imageSrc: "Tech-feas.jpeg", 
            altText: "Feedback Image 3"
        }
    ];

    return (
        <>
            <section id="feature" className="text-center py-12 bg-white">
                <h2 className="text-4xl font-bold mb-4 text-gray-600">Features</h2>
                <div className="grid gap-8 md:grid-cols-3 px-4 md:px-0">
                    {feedbacks.map((feedback, index) => (
                        <div key={index} className="bg-gray-50 rounded-lg p-6 shadow-lg">
                            <img
                                className="rounded-lg w-full mb-4"
                                src={feedback.imageSrc}
                                alt={feedback.altText}
                            />
                            <p className="text-blue-600 underline text-lg font-semibold mb-2">
                                {feedback.highlight}
                            </p>
                            <ul className="list-disc list-inside text-lg text-gray-600">
                                {feedback.points.map((point, idx) => (
                                    <li key={idx} className="mb-2">
                                        {point}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
            </section>
        </>
    );
};

export default Feature;

