import React from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeftIcon } from "@heroicons/react/24/outline";
import { sampleTopics } from "../components/TopicSummaries.jsx";

export default function TopicSummariesTemplate() {
  const { topicId } = useParams();
  const topic = sampleTopics.find((t) => t.id === Number(topicId));

  if (!topic) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center mt-12">
        <h2 className="text-2xl font-bold text-red-600 mb-4">
          Topic not found
        </h2>
        <Link to="/summaries" className="text-[#006D5B] underline">
          Back to Summaries
        </Link>
      </div>
    );
  }

  return (
    <section className="py-8 md:py-16 bg-[#E6F0E6] min-h-screen mt-12">
      {/* Sticky back bar */}
      <div className="sticky top-0 z-20 bg-[#E6F0E6] py-4 px-4 flex items-center gap-2 border-b border-[#006D5B]/10 shadow-sm">
        <Link
          to="/summaries"
          className="inline-flex items-center gap-2 text-[#006D5B] font-semibold text-base hover:underline"
        >
          <ArrowLeftIcon className="w-5 h-5" />
          Back to Summaries
        </Link>
        <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#006D5B]/10 text-[#006D5B] text-sm font-medium ml-2">
          {topic.title}
        </span>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mt-8 mb-10">
          <h2 className="text-3xl md:text-4xl font-extrabold text-[#006D5B] mb-2">
            Concept Capsules
          </h2>
          <p className="text-[#4B4B4B] text-lg md:text-xl mb-2">
            {topic.teaser}
          </p>
        </div>

        {/* Highlights */}
        <div className="flex flex-wrap gap-2 mb-6 justify-center">
          {topic.highlights.map((tag, idx) => (
            <span
              key={idx}
              className="px-3 py-1 text-xs font-medium rounded-full bg-[#DCE6D5]/60 text-[#006D5B] border border-[#006D5B]/10"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Preview points */}
        {topic.preview && (
          <div className="mb-8">
            <h3 className="text-xl font-semibold text-[#006D5B] mb-4">
              Key Points
            </h3>
            <ul className="space-y-3 bg-[#DCE6D5]/20 p-4 rounded-xl">
              {topic.preview.map((point, index) => (
                <li
                  key={index}
                  className="flex items-center space-x-3 text-[#4B4B4B]"
                >
                  <span className="text-base">{point}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Sources */}
        <div className="mb-8">
          <h3 className="text-xl font-semibold text-[#006D5B] mb-4">
            Source Textbooks
          </h3>
          <ul className="space-y-2 bg-[#DCE6D5]/20 p-4 rounded-xl">
            {topic.sources.map((source, index) => (
              <li key={index} className="text-base text-[#4B4B4B]">
                {source}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
