import React from 'react';

const HomePage = () => {
    return (
        <>
            <div id="home" className="bg-gray-50">
                <section className="pt-12 pb-12 sm:pb-16 lg:pt-8">
                    <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
                        <div className="grid max-w-lg grid-cols-1 mx-auto lg:max-w-full lg:items-center lg:grid-cols-2 gap-y-12 lg:gap-x-16">
                            <div>
                                <div className="text-center lg:text-left">
                                    <h1 className="text-4xl font-bold leading-tight text-gray-900 sm:text-5xl sm:leading-tight lg:leading-tight lg:text-6xl font-pj">
                                        AI-Driven Research Engine for Commercial Courts
                                    </h1>
                                    <p className="mt-4 text-lg text-gray-600 sm:mt-6 font-inter">
                                        To speed up commercial dispute resolution in India, an AI-Driven Research Engine is needed for commercial courts. This engine will assist judges by:
                                    </p>
                                    <ul className="list-disc list-inside mt-4 text-lg text-gray-600 sm:mt-6 font-inter">
                                        <li>Aggregating legal data</li>
                                        <li>Providing customized insights</li>
                                        <li>Predicting case outcomes</li>
                                    </ul>
                                </div>

                                {/* View PDF and Search buttons with improved spacing and styling */}
                                <div className="mt-12 flex flex-col items-center lg:items-start space-y-12">
                                    {/* Upload Docs Section */}
                                    <div className="w-full space-y-4 text-center lg:text-left">
                                        
                                        <a
                                            href="/upload"
                                            className="px-4 py-3 text-lg font-bold text-white bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg hover:bg-gradient-to-r hover:from-purple-500 hover:to-blue-500 shadow-lg transition-all ease-in-out duration-300"
                                        >
                                            Upload Docs
                                        </a>
                                        <p className="text-sm text-gray-500">
                                            (You will receive applicable legal Acts and supporting materials based on the documents uploaded.)
                                        </p>
                                    </div>

                                    {/* Unified Search Section */}
                                    <div className="w-full space-y-4 text-center lg:text-left">
                                        
                                        <a
                                            href="/search"
                                            className="px-4 py-3  text-lg font-bold text-white bg-gradient-to-r from-green-500 to-teal-500 rounded-lg hover:bg-gradient-to-r hover:from-teal-500 hover:to-green-500 shadow-lg transition-all ease-in-out duration-300"
                                        >
                                            Unified Search
                                        </a>
                                        <p className="text-sm text-gray-500">
                                            (Enter the details of the crime or incident, and get articles and resources to help with your research.)
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div>
                                <img className="w-full" src="/hero-img.png" alt="Illustration" />
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </>
    );
};

export default HomePage;





