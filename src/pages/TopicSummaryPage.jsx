import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Worker, Viewer } from '@react-pdf-viewer/core';
import { defaultLayoutPlugin } from '@react-pdf-viewer/default-layout';
import '@react-pdf-viewer/core/lib/styles/index.css';
import '@react-pdf-viewer/default-layout/lib/styles/index.css';

const TopicSummaryPage = () => {
    const { id } = useParams();
    const [summary, setSummary] = useState(null);
    const [loading, setLoading] = useState(true);
    const [viewerLoading, setViewerLoading] = useState(true);
    const [viewUrl, setViewUrl] = useState(null);
    const [viewFileType, setViewFileType] = useState(null);
    const defaultLayoutPluginInstance = defaultLayoutPlugin();

    useEffect(() => {
        const fetchSummary = async () => {
            try {
                // This endpoint needs to be created in the backend
                const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/topicsummaries/${id}`);
                setSummary(response.data);
                // Try to get a time-limited signed URL for robust access
                try {
                    const signed = await axios.get(`${import.meta.env.VITE_API_URL}/api/topicsummaries/${id}/signed-url`);
                    setViewUrl(signed.data.url);
                    setViewFileType(signed.data.fileType);
                } catch (signErr) {
                    console.error('Error fetching signed URL:', signErr);
                }
            } catch (error) {
                console.error('Error fetching topic summary:', error);
            }
            setLoading(false);
        };

        fetchSummary();
    }, [id]);

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-[60vh]">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#006D5B] mx-auto mb-4"></div>
                    <p className="text-gray-600">Loading document...</p>
                </div>
            </div>
        );
    }

    if (!summary) {
        return (
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="bg-white rounded-xl shadow-sm p-8 text-center">
                    <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <h3 className="mt-2 text-lg font-medium text-gray-900">Topic summary not found</h3>
                    <p className="mt-1 text-sm text-gray-500">The requested document could not be found or you don't have permission to view it.</p>
                    <div className="mt-6">
                        <a
                            href="/topic-summaries"
                            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-[#006D5B] hover:bg-[#005548] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#006D5B] transition-colors"
                        >
                            <svg className="-ml-1 mr-2 h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
                            </svg>
                            Back to all summaries
                        </a>
                    </div>
                </div>
            </div>
        );
    }

    // Prefer signed URL when available; fallback to stored URL
    const fileUrl = viewUrl || summary.fileUrl || summary.pdfUrl;
    const inferredType = viewFileType || summary.fileType || (summary.pdfUrl ? 'application/pdf' : '');
    const isPdf = inferredType === 'application/pdf' || (fileUrl && fileUrl.toLowerCase().endsWith('.pdf'));
    const isDocx = inferredType === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' || (fileUrl && fileUrl.toLowerCase().endsWith('.docx'));

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 mt-16">
            <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
                <div className="flex flex-col space-y-4">
                    <div>
                        <h1 className="text-2xl sm:text-3xl font-bold text-[#006D5B] mb-2 break-words">
                            {summary.title}
                        </h1>
                        {summary.description && (
                            <p className="text-[#006D5B] text-sm sm:text-base leading-relaxed">
                                {summary.description}
                            </p>
                        )}
                    </div>
                    
                    {/* {fileUrl && (
                        <div className="pt-2 border-t border-[#006D5B]/10">
                            <a
                                href={fileUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center text-sm sm:text-base text-[#006D5B] hover:text-[#005548] font-medium transition-colors"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                                </svg>
                                Download or open in new tab
                            </a>
                        </div>
                    )} */}
                </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm overflow-hidden" style={{ height: 'calc(100vh - 220px)' }}>
                {viewerLoading && (
                    <div className="flex items-center justify-center h-full">
                        <div className="text-center">
                            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#006D5B] mx-auto mb-4"></div>
                            <p className="text-gray-600 text-lg font-medium">Preparing your document...</p>
                            <p className="text-gray-500 text-sm mt-2">This will just take a moment</p>
                        </div>
                    </div>
                )}
                {isPdf ? (
                    <div className={`h-full ${viewerLoading ? 'hidden' : ''}`}>
                        <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.4.120/build/pdf.worker.min.js">
                            <Viewer 
                                fileUrl={fileUrl} 
                                plugins={[defaultLayoutPluginInstance]}
                                onDocumentLoad={() => setViewerLoading(false)}
                                theme={{
                                    theme: 'light',
                                }}
                            />
                        </Worker>
                    </div>
                ) : isDocx ? (
                    <iframe
                        title={summary.title}
                        className={`w-full h-full border-0 ${viewerLoading ? 'hidden' : ''}`}
                        src={`https://view.officeapps.live.com/op/embed.aspx?src=${encodeURIComponent(fileUrl)}`}
                        onLoad={() => setViewerLoading(false)}
                    />
                ) : (
                    <div className="w-full h-full flex flex-col items-center justify-center p-8 text-center">
                        <svg className="h-12 w-12 text-gray-400 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                        <h3 className="text-lg font-medium text-gray-900 mb-1">Preview not available</h3>
                        <p className="text-gray-500 text-sm">This file type cannot be previewed. Please download the file to view its contents.</p>
                        {fileUrl && (
                            <a
                                href={fileUrl}
                                download
                                className="mt-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-[#006D5B] hover:bg-[#005548] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#006D5B] transition-colors"
                            >
                                <svg className="-ml-1 mr-2 h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                                </svg>
                                Download File
                            </a>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default TopicSummaryPage;