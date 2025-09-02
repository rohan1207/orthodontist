import React from "react";

const recommendedBlogs = [
	{
		title: "Smile Transformation: The Power of Modern Orthodontics",
		description:
			"Discover how advanced orthodontic treatments can enhance your confidence and oral health. Explore the latest trends and expert tips from our clinic.",
		image:
			"https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?auto=format&fit=crop&w=800&q=80",
	},
	{
		title: "Invisible Braces: Luxury Meets Comfort",
		description:
			"Experience the elegance of invisible aligners designed for premium results. Read our guide to discreet, effective orthodontic care for adults.",
		image:
			"https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80",
	},
];

const Recommended = () => {
	return (
		<section className="px-4 md:px-6 py-8 md:py-12 bg-white">
			<h2 className="text-3xl md:text-4xl font-light mb-6 md:mb-10 tracking-tight text-gray-900 px-2">Recommended</h2>
			<div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10">
				{recommendedBlogs.map((blog, idx) => (
					<div key={idx} className="flex flex-col bg-white rounded-lg shadow-lg overflow-hidden transform transition-transform duration-300 hover:scale-[1.02]">
						<div className="relative h-48 md:h-64 overflow-hidden">
							<img
								src={blog.image}
								alt={blog.title}
								className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
							/>
						</div>
						<div className="p-4 md:p-6">
							<h3 className="text-xl md:text-2xl font-medium text-gray-900 mb-2 md:mb-3 leading-snug">
								{blog.title}
							</h3>
							<p className="text-gray-600 text-sm md:text-base font-light">
								{blog.description}
							</p>
						</div>
					</div>
				))}
			</div>
		</section>
	);
};

export default Recommended;
