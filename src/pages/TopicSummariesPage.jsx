import React, { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
	AcademicCapIcon,
	ChartBarIcon,
	DocumentTextIcon,
	DocumentDuplicateIcon,
	CheckCircleIcon,
	BookOpenIcon,
	ClockIcon,
	Squares2X2Icon,
	Bars3BottomLeftIcon,
	MagnifyingGlassIcon,
	FunnelIcon,
	ArrowRightIcon,
} from '@heroicons/react/24/outline';

const TOPICS = [
	{
		id: 1,
		title: 'Growth and Development',
		sources: ['Contemporary Orthodontics', "Graber's Orthodontics", "Proffit's Orthodontics"],
		keyPoints: 12,
		readTimeMin: 15,
		difficulty: 'Medium',
		color: 'from-green-500 to-emerald-600',
	},
	{
		id: 2,
		title: 'Biomechanics in Orthodontics',
		sources: ['Orthodontic Materials', 'Clinical Orthodontics', 'Biomechanics in Clinical Practice'],
		keyPoints: 15,
		readTimeMin: 20,
		difficulty: 'Advanced',
		color: 'from-green-500 to-emerald-600',
	},
	{
		id: 3,
		title: 'Diagnosis and Treatment Planning',
		sources: ['Essential Orthodontics', 'Clinical Diagnosis', 'Treatment Strategies'],
		keyPoints: 18,
		readTimeMin: 25,
		difficulty: 'Intermediate',
		color: 'from-green-500 to-emerald-600',
	},
	{
		id: 4,
		title: 'Orthodontic Appliances',
		sources: ['Orthodontic Appliances', 'Contemporary Orthodontics', 'Appliance Design'],
		keyPoints: 10,
		readTimeMin: 18,
		difficulty: 'Intermediate',
		color: 'from-green-500 to-emerald-600',
	},
];

const DIFFICULTIES = ['All', 'Beginner', 'Intermediate', 'Medium', 'Advanced'];
const SORTS = [
	{ id: 'title-asc', label: 'Title A → Z' },
	{ id: 'title-desc', label: 'Title Z → A' },
	{ id: 'read-asc', label: 'Read time • Low → High' },
	{ id: 'read-desc', label: 'Read time • High → Low' },
	{ id: 'points-desc', label: 'Key points • High → Low' },
];

function GridCard({ t }) {
	return (
		<motion.div
			className="relative w-full"
			initial={{ opacity: 0, y: 12 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ duration: 0.3 }}
		>
			<div className="relative bg-white rounded-lg md:rounded-2xl p-4 md:p-6 shadow-lg border border-gray-100 h-full flex flex-col min-h-[320px] md:min-h-[340px]">
				<div className="flex items-start justify-between mb-3 md:mb-4">
					<div className={`p-2 md:p-3 rounded-lg md:rounded-xl bg-gradient-to-r ${t.color}`}>
						<DocumentDuplicateIcon className="w-5 h-5 md:w-6 md:h-6 text-white" />
					</div>
					<div className="text-xs md:text-sm text-gray-500">{t.readTimeMin} mins</div>
				</div>
				<h3 className="text-base md:text-lg font-semibold text-gray-900 line-clamp-1">{t.title}</h3>
				<p className="text-xs md:text-sm text-gray-500 mt-1">{t.sources.length} textbook sources</p>

				<div className="grid grid-cols-3 gap-2 md:gap-4 my-4 md:my-6 flex-1">
					<div className="text-center">
						<div className="text-xs md:text-sm text-gray-500">Key Points</div>
						<div className="text-sm md:text-base font-semibold text-gray-700">{t.keyPoints}</div>
					</div>
					<div className="text-center border-x border-gray-100">
						<div className="text-xs md:text-sm text-gray-500">Read Time</div>
						<div className="text-sm md:text-base font-semibold text-gray-700">{t.readTimeMin} min</div>
					</div>
					<div className="text-center">
						<div className="text-xs md:text-sm text-gray-500">Level</div>
						<div className="text-sm md:text-base font-semibold text-gray-700">{t.difficulty}</div>
					</div>
				</div>

				<Link
					to={`/summaries/${t.id}`}
					className={`group w-full inline-flex items-center justify-center px-4 py-2 md:px-6 md:py-3 text-xs md:text-sm font-medium rounded-lg md:rounded-xl text-white bg-gradient-to-r ${t.color}`}
				>
					Read Full Summary
					<ArrowRightIcon className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
				</Link>
			</div>
		</motion.div>
	);
}

function ListCard({ t }) {
	return (
		<motion.div
			className="w-full bg-white rounded-lg md:rounded-2xl p-4 md:p-6 shadow-lg border border-gray-100"
			initial={{ opacity: 0, y: 12 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ duration: 0.3 }}
		>
			<div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 md:gap-5">
				<div className="flex items-start gap-3 md:gap-4">
					<div className={`p-2 md:p-3 rounded-lg md:rounded-xl bg-gradient-to-r ${t.color} flex-shrink-0`}>
						<DocumentDuplicateIcon className="w-5 h-5 md:w-6 md:h-6 text-white" />
					</div>
					<div className="min-w-0">
						<h3 className="text-base md:text-lg font-semibold text-gray-900 line-clamp-1">{t.title}</h3>
						<p className="text-xs md:text-sm text-gray-500 line-clamp-1">{t.sources.length} textbook sources • {t.readTimeMin} min • {t.difficulty}</p>
						<div className="mt-2 md:mt-3 grid grid-cols-3 gap-2 md:gap-4 text-xs md:text-sm text-gray-600">
							<div className="inline-flex items-center gap-1 truncate"><BookOpenIcon className="w-3.5 h-3.5 md:w-4 md:h-4 flex-shrink-0" /> {t.sources[0]}</div>
							<div className="inline-flex items-center gap-1 truncate"><ChartBarIcon className="w-3.5 h-3.5 md:w-4 md:h-4 flex-shrink-0" /> {t.keyPoints} key points</div>
							<div className="inline-flex items-center gap-1 truncate"><ClockIcon className="w-3.5 h-3.5 md:w-4 md:h-4 flex-shrink-0" /> {t.readTimeMin} min</div>
						</div>
					</div>
				</div>
				<Link 
					to={`/summaries/${t.id}`} 
					className="inline-flex items-center gap-1.5 md:gap-2 text-green-600 hover:text-green-700 font-medium text-sm md:text-base"
				>
					Read Summary <ArrowRightIcon className="w-3.5 h-3.5 md:w-4 md:h-4" />
				</Link>
			</div>
		</motion.div>
	);
}

export default function TopicSummariesPage() {
	const [q, setQ] = useState('');
	const [difficulty, setDifficulty] = useState('All');
	const [sortBy, setSortBy] = useState('title-asc');
	const [view, setView] = useState('grid');
	const [visible, setVisible] = useState(12);

	const topics = useMemo(() => {
		let list = [...TOPICS];
		if (difficulty !== 'All') list = list.filter((t) => t.difficulty === difficulty);
		const s = q.trim().toLowerCase();
		if (s)
			list = list.filter(
				(t) => t.title.toLowerCase().includes(s) || t.sources.some((src) => src.toLowerCase().includes(s))
			);
		switch (sortBy) {
			case 'title-asc':
				list.sort((a, b) => a.title.localeCompare(b.title));
				break;
			case 'title-desc':
				list.sort((a, b) => b.title.localeCompare(a.title));
				break;
			case 'read-asc':
				list.sort((a, b) => a.readTimeMin - b.readTimeMin);
				break;
			case 'read-desc':
				list.sort((a, b) => b.readTimeMin - a.readTimeMin);
				break;
			case 'points-desc':
				list.sort((a, b) => b.keyPoints - a.keyPoints);
				break;
			default:
				break;
		}
		return list;
	}, [q, difficulty, sortBy]);

	const visibleList = topics.slice(0, visible);
	const canLoadMore = visible < topics.length;

	return (
		<div className="py-16 md:py-24 bg-gray-50/50">
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
				<div className="text-center mb-8 md:mb-14">
					<h1 className="text-2xl md:text-4xl font-medium text-gray-900 mb-2 md:mb-3">All Topic Summaries</h1>
					<p className="text-sm md:text-base text-gray-600 max-w-2xl mx-auto">
						Search summaries, filter by difficulty, sort by time or key points, and switch views to study your way.
					</p>
				</div>

				{/* Controls */}
				<div className="flex flex-col gap-3 md:gap-4 md:flex-row md:items-center md:justify-between mb-6 md:mb-8">
					<div className="w-full md:flex-1">
						<div className="relative">
							<MagnifyingGlassIcon className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
							<input
								type="text"
								value={q}
								onChange={(e) => setQ(e.target.value)}
								placeholder="Search topics or sources..."
								className="w-full pl-10 pr-4 py-2.5 md:py-3 text-sm md:text-base rounded-lg md:rounded-xl border border-gray-200 bg-white text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500"
							/>
						</div>
					</div>

					<div className="flex flex-col md:flex-row gap-3">
						{/* Difficulty filter */}
						<div className="flex flex-wrap gap-1.5 md:gap-2">
							{DIFFICULTIES.map((d) => (
								<button
									key={d}
									onClick={() => setDifficulty(d)}
									className={`px-2.5 md:px-3 py-1.5 rounded-lg md:rounded-full text-xs md:text-sm border transition-all ${
										difficulty === d
											? 'bg-green-50 text-green-700 border-green-200'
											: 'bg-white text-gray-700 border-gray-200 hover:border-gray-300'
									}`}
								>
									{d}
								</button>
							))}
						</div>

						{/* Sort */}
						<div className="relative flex-shrink-0">
							<FunnelIcon className="w-4 h-4 md:w-5 md:h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
							<select
								value={sortBy}
								onChange={(e) => setSortBy(e.target.value)}
								className="appearance-none w-full md:w-auto pl-9 md:pl-10 pr-8 py-2 text-sm rounded-lg md:rounded-xl border border-gray-200 bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-500"
							>
								{SORTS.map((o) => (
									<option key={o.id} value={o.id}>
										{o.label}
									</option>
								))}
							</select>
						</div>

						{/* View toggle */}
						<div className="inline-flex rounded-xl overflow-hidden border border-gray-200">
							<button
								className={`px-3 py-2 text-sm ${view === 'grid' ? 'bg-green-50 text-green-700' : 'bg-white text-gray-600'}`}
								onClick={() => setView('grid')}
								aria-label="Grid view"
							>
								<Squares2X2Icon className="w-5 h-5" />
							</button>
							<button
								className={`px-3 py-2 text-sm border-l border-gray-200 ${view === 'list' ? 'bg-green-50 text-green-700' : 'bg-white text-gray-600'}`}
								onClick={() => setView('list')}
								aria-label="List view"
							>
								<Bars3BottomLeftIcon className="w-5 h-5" />
							</button>
						</div>

						{/* Reset */}
						<button
							className="px-3 py-2 text-sm rounded-xl border border-gray-200 bg-white text-gray-600 hover:bg-gray-50"
							onClick={() => {
								setQ('');
								setDifficulty('All');
								setSortBy('title-asc');
							}}
						>
							Reset
						</button>
					</div>
				</div>

				<div className="mb-6 text-sm text-gray-500">{topics.length} topics</div>

				<AnimatePresence mode="popLayout">
					{view === 'grid' ? (
						<motion.div
							key="grid"
							initial={{ opacity: 0 }}
							animate={{ opacity: 1 }}
							exit={{ opacity: 0 }}
							className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
						>
							{visibleList.map((t) => (
								<GridCard key={t.id} t={t} />
							))}
						</motion.div>
					) : (
						<motion.div
							key="list"
							initial={{ opacity: 0 }}
							animate={{ opacity: 1 }}
							exit={{ opacity: 0 }}
							className="space-y-5"
						>
							{visibleList.map((t) => (
								<ListCard key={t.id} t={t} />
							))}
						</motion.div>
					)}
				</AnimatePresence>

				{topics.length === 0 && (
					<div className="text-center py-20">
						<p className="text-gray-600">No topics match your filters.</p>
					</div>
				)}

				{canLoadMore && (
					<div className="mt-10 text-center">
						<button
							onClick={() => setVisible((v) => v + 6)}
							className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-green-500 to-emerald-600 text-white font-medium hover:opacity-90"
						>
							Load more
							<ArrowRightIcon className="w-4 h-4" />
						</button>
					</div>
				)}
			</div>
		</div>
	);
}

