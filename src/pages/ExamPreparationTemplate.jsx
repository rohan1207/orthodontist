// import React from "react";
// import { useParams, Link } from "react-router-dom";
// import { motion } from "framer-motion";
// import {
//   DocumentTextIcon,
//   CheckCircleIcon,
//   ArrowLeftIcon,
// } from "@heroicons/react/24/outline";
// import { AcademicCapIcon } from "@heroicons/react/24/outline";
// import { examTopics } from "../components/ExamPreparation.jsx";



// // Helper to get topic by id



//  function getTopicById(id) {
//   return examTopics.find((t) => t.id === id);
// }


// export default function ExamPreparationTemplate() {
//   const { topicId } = useParams();
//   const topic = getTopicById(topicId);

//   if (!topic) {
//     return (
//       <div className="min-h-screen flex flex-col items-center justify-center mt-12">
//         <h2 className="text-2xl font-bold text-red-600 mb-4">Topic not found</h2>
//         <Link to="/exam-prep" className="text-[#006D5B] underline">Back to Exam Preparation</Link>
//       </div>
//     );
//   }

//   return (
//     <section className="py-8 md:py-16 bg-[#E6F0E6] min-h-screen mt-12">
//       {/* Sticky back bar */}
//       <div className="sticky top-0 z-20 bg-[#E6F0E6] py-4 px-4 flex items-center gap-2 border-b border-[#006D5B]/10 shadow-sm">
//         <Link to="/exam-prep" className="inline-flex items-center gap-2 text-[#006D5B] font-semibold text-base hover:underline">
//           <ArrowLeftIcon className="w-5 h-5" />
//           Back to Exam Preparation
//         </Link>
//         <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#006D5B]/10 text-[#006D5B] text-sm font-medium ml-2">
//           <AcademicCapIcon className="w-5 h-5" />
//           {topic.name}
//         </span>
//       </div>

//       <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
//         {/* Header */}
//         <div className="text-center mt-8 mb-10">
//           <h2 className="text-3xl md:text-4xl font-extrabold text-[#006D5B] mb-2">Year-wise Papers & Answers</h2>
//           <p className="text-[#4B4B4B] text-lg md:text-xl mb-2">{topic.description}</p>
//         </div>

//         {/* Year-wise download grid */}
//         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
//           {topic.years.map((y) => (
//             <motion.div
//               key={y.year}
//               initial={{ opacity: 0, y: 20 }}
//               whileInView={{ opacity: 1, y: 0 }}
//               viewport={{ once: true, margin: "-100px" }}
//               className="bg-white rounded-2xl p-6 shadow-lg border border-[#006D5B]/10 flex flex-col gap-4 items-center hover:shadow-xl transition-all duration-200"
//             >
//               <div className="flex items-center gap-2 mb-3">
//                 <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-[#006D5B]/10 text-[#006D5B] text-base font-semibold border border-[#006D5B]/10">
//                   <DocumentTextIcon className="w-5 h-5" />
//                   {y.year}
//                 </span>
//               </div>
//               <div className="flex flex-col gap-3 w-full">
//                 <a
//                   href={y.questionPaperUrl}
//                   target="_blank"
//                   rel="noopener noreferrer"
//                   className="flex items-center justify-between gap-4 w-full px-4 py-3 rounded-xl border border-[#006D5B]/15 bg-[#E6F0E6] hover:bg-[#DCE6D5] transition-colors font-medium text-[#006D5B]"
//                 >
//                   <span className="flex items-center gap-2">
//                     <DocumentTextIcon className="w-5 h-5" />
//                     Question Paper
//                   </span>
//                   <span className="text-[#4B4B4B] text-sm font-normal">Download</span>
//                 </a>
//                 <a
//                   href={y.answerSheetUrl}
//                   target="_blank"
//                   rel="noopener noreferrer"
//                   className="flex items-center justify-between gap-4 w-full px-4 py-3 rounded-xl border border-[#006D5B]/15 bg-[#E6F0E6] hover:bg-[#DCE6D5] transition-colors font-medium text-[#006D5B]"
//                 >
//                   <span className="flex items-center gap-2">
//                     <CheckCircleIcon className="w-5 h-5" />
//                     Answer Sheet
//                   </span>
//                   <span className="text-[#4B4B4B] text-sm font-normal">Download</span>
//                 </a>
//               </div>
//             </motion.div>
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// }
