import React, { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
	MagnifyingGlassIcon,
	Squares2X2Icon,
	Bars3BottomLeftIcon,
	FunnelIcon,
	ArrowRightIcon,
	BookOpenIcon
} from '@heroicons/react/24/outline';

// Safe image with fallback to avoid broken covers
function SafeImage({ src, alt, className }) {
	const [img, setImg] = useState(src);
	const fallback = 'https://placehold.co/640x900?text=Book+Cover';
	return (
		<img
			src={img}
			alt={alt}
			loading="lazy"
			onError={() => img !== fallback && setImg(fallback)}
			className={className}
		/>
	);
}

// Master list of books (can be sourced from API later)
const BOOKS = [
	{
		id: 1,
		title: 'Handbook of  Orthodontics',
		author: 'William R. Proffit',
		description:
			'The definitive guide covering diagnosis, treatment planning, and mechanics. A must-have for every orthodontic resident.',
		coverImage: '/book1.webp',
	},
	{
		id: 2,
		title: 'Handbook of Orthodontics',
		author: 'Robert E. Moyers',
		description:
			'A foundational text focusing on growth and development, and the biological basis of orthodontic treatment.',
		coverImage: '/book2.jpg',
	},
	{
		id: 3,
		title: 'Orthodontics: Current Principles and Techniques',
		author: 'Lee W. Graber',
		description:
			'An in-depth resource on advanced techniques, new technologies, and evidence-based practices in the field.',
		coverImage: '/book3.jpeg',
	},
	{
		id: 4,
		title: 'Systemized Orthodontic Treatment Mechanics',
		author: "R. G. 'Wick' Alexander",
		description:
			'A practical guide to applying the Alexander Discipline, focusing on efficient and predictable treatment mechanics.',
		coverImage: '/book4.jpeg',
	},
	// Additional entries (placeholders to populate the page)
	{
		id: 5,
		title: 'Biomechanics in Orthodontics',
		author: 'Charles J. Burstone',
		description:
			'Core principles of force systems, anchorage, and controlled tooth movement explained with clarity.',
		coverImage: '/book5.jpg',
	},
	{
		id: 6,
		title: 'Cephalometrics in Orthodontics',
		author: 'William B. Downs',
		description:
			'A friendly walkthrough of cephalometric landmarks, analyses, and interpretation for clinicians.',
		coverImage: '/book6.jpg',
	},
	{
		id: 7,
		title: 'Contemporary Orthodontics',
		author: 'William R. Proffit',
		description:
			'Widely used modern text blending fundamentals with clinical applications and evidence-based updates.',
		coverImage: '/book7.jpg',
	},
	{
		id: 8,
		title: 'Orthodontic Diagnosis and Planning',
		author: 'Ravindra Nanda',
		description:
			'Structured approaches to diagnostic synthesis and treatment planning across various malocclusions.',
		coverImage: '/book8.jpg',
	},
	{
		id: 9,
		title: 'Essentials of Facial Growth',
		author: 'Donald H. Enlow',
		description:
			'Understanding craniofacial growth patterns and their implications for orthodontic interventions.',
		coverImage: '/book9.jpg',
	},
	{
		id: 10,
		title: 'Advanced Anchorage Concepts',
		author: 'Pancherz & Sugawara',
		description:
			'Mini-implants and biomechanics strategies to achieve reliable anchorage and treatment efficiency.',
		coverImage: '/book10.jpg',
	},
	{
		id: 11,
		title: 'Aligner Orthodontics Handbook',
		author: 'Tarek El-Bialy',
		description:
			'Digital planning, staging, and clinical protocols for effective clear aligner treatments.',
		coverImage: '/book11.jpg',
	},
	{
		id: 12,
		title: 'Fixed Appliance Therapy – A Practical Guide',
		author: 'P. S. Fleming',
		description:
			'Step-by-step brackets to finishing protocols, with practical tips for everyday clinical use.',
		coverImage: '/book12.jpg',
	},
];

const SORTS = [
	{ id: 'title-asc', label: 'Title A → Z' },
	{ id: 'title-desc', label: 'Title Z → A' },
	{ id: 'author-asc', label: 'Author A → Z' },
	{ id: 'author-desc', label: 'Author Z → A' },
];

function GridCard({ book }) {
	return (
		<motion.div
			className="relative w-full aspect-[3/4]"
			initial={{ opacity: 0, y: 12 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ duration: 0.3 }}
		>
			<div className="absolute inset-0 bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100">
				<div className="relative h-2/3">
					<SafeImage src={book.coverImage} alt={book.title} className="w-full h-full object-cover" />
					<div className="absolute top-3 left-3">
						<span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-green-500/90 text-white text-xs font-medium">
							<BookOpenIcon className="w-4 h-4" /> Book
						</span>
					</div>
				</div>
				<div className="p-4">
					<h3 className="text-lg font-semibold text-gray-900 line-clamp-2">{book.title}</h3>
					<p className="mt-1 text-sm text-gray-500">{book.author}</p>
					<div className="mt-4">
						<Link
							to={`/book-summary/${book.id}`}
							className="inline-block w-full py-3 text-center rounded-xl bg-gradient-to-r from-green-500 to-emerald-600 text-white text-sm font-medium transition-transform hover:scale-[1.02] active:scale-[0.98]"
						>
							Read Summary
						</Link>
					</div>
				</div>
			</div>
		</motion.div>
	);
}

function ListCard({ book }) {
	return (
		<motion.div
			className="w-full bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm"
			initial={{ opacity: 0, y: 12 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ duration: 0.3 }}
		>
			<div className="grid grid-cols-1 md:grid-cols-[220px_1fr]">
				<div className="relative h-44 md:h-full">
					<SafeImage src={book.coverImage} alt={book.title} className="w-full h-full object-cover" />
				</div>
				<div className="p-5">
					<h3 className="text-lg md:text-xl font-semibold text-gray-900">{book.title}</h3>
					<p className="text-sm text-gray-500">{book.author}</p>
					<p className="mt-3 text-sm md:text-base text-gray-600 line-clamp-3">{book.description}</p>
					<div className="mt-4">
						<Link
							to={`/book-summary/${book.id}`}
							className="inline-flex items-center gap-2 text-green-600 hover:text-green-700 font-medium"
						>
							Read Summary
							<ArrowRightIcon className="w-4 h-4" />
						</Link>
					</div>
				</div>
			</div>
		</motion.div>
	);
}

export default function TopBooksPage() {
	const [q, setQ] = useState('');
	const [author, setAuthor] = useState('All');
	const [sortBy, setSortBy] = useState('title-asc');
	const [view, setView] = useState('grid');
	const [visible, setVisible] = useState(12);

	const authors = useMemo(() => ['All', ...Array.from(new Set(BOOKS.map((b) => b.author)))], []);

	const filtered = useMemo(() => {
		let list = [...BOOKS];

		if (author !== 'All') list = list.filter((b) => b.author === author);

		const s = q.trim().toLowerCase();
		if (s) {
			list = list.filter(
				(b) => b.title.toLowerCase().includes(s) || b.author.toLowerCase().includes(s) || b.description.toLowerCase().includes(s)
			);
		}

		switch (sortBy) {
			case 'title-asc':
				list.sort((a, b) => a.title.localeCompare(b.title));
				break;
			case 'title-desc':
				list.sort((a, b) => b.title.localeCompare(a.title));
				break;
			case 'author-asc':
				list.sort((a, b) => a.author.localeCompare(b.author));
				break;
			case 'author-desc':
				list.sort((a, b) => b.author.localeCompare(a.author));
				break;
			default:
				break;
		}

		return list;
	}, [q, author, sortBy]);

	const visibleList = filtered.slice(0, visible);
	const canLoadMore = visible < filtered.length;

	return (
		<div className="py-16 md:py-24 bg-gray-50/50">
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
				{/* Header */}
				<div className="text-center mb-10 md:mb-14">
					<h1 className="text-3xl md:text-4xl font-medium text-gray-900 mb-3 flex items-center justify-center gap-3">
						<BookOpenIcon className="w-8 h-8 text-green-500" /> All Books
					</h1>
					<p className="text-gray-600 max-w-2xl mx-auto">
						Explore our curated orthodontics library. Use search, author filters, sorting, and view options to find the perfect resource.
					</p>
				</div>

				{/* Controls */}
				<div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between mb-8">
					<div className="flex-1">
						<div className="relative">
							<MagnifyingGlassIcon className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
							<input
								type="text"
								value={q}
								onChange={(e) => setQ(e.target.value)}
								placeholder="Search by title, author, or topic..."
								className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 bg-white text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500"
							/>
						</div>
					</div>

					<div className="flex flex-wrap items-center gap-3">
						{/* Author chips */}
						<div className="flex flex-wrap gap-2 max-w-[60ch]">
							{authors.map((a) => (
								<button
									key={a}
									onClick={() => setAuthor(a)}
									className={`px-3 py-1.5 rounded-full text-sm border transition-all ${
										author === a
											? 'bg-green-50 text-green-700 border-green-200'
											: 'bg-white text-gray-700 border-gray-200 hover:border-gray-300'
									}`}
								>
									{a}
								</button>
							))}
						</div>

						{/* Sort */}
						<div className="relative">
							<FunnelIcon className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
							<select
								value={sortBy}
								onChange={(e) => setSortBy(e.target.value)}
								className="appearance-none pl-10 pr-8 py-2 rounded-xl border border-gray-200 bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-500"
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
								setAuthor('All');
								setSortBy('title-asc');
							}}
						>
							Reset
						</button>
					</div>
				</div>

				{/* Result count */}
				<div className="mb-6 text-sm text-gray-500">{filtered.length} books</div>

				<AnimatePresence mode="popLayout">
					{view === 'grid' ? (
						<motion.div
							key="grid"
							initial={{ opacity: 0 }}
							animate={{ opacity: 1 }}
							exit={{ opacity: 0 }}
							className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8"
						>
							{visibleList.map((book) => (
								<GridCard key={book.id} book={book} />
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
							{visibleList.map((book) => (
								<ListCard key={book.id} book={book} />
							))}
						</motion.div>
					)}
				</AnimatePresence>

				{/* Empty state */}
				{filtered.length === 0 && (
					<div className="text-center py-20">
						<p className="text-gray-600">No books match your filters. Try adjusting your search or author selection.</p>
					</div>
				)}

				{/* Load more */}
				{canLoadMore && (
					<div className="mt-10 text-center">
						<button
							onClick={() => setVisible((v) => v + 8)}
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

