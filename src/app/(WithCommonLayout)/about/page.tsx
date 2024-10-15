import React from "react";

const About = () => {
	return (
		<div className="max-w-7xl mx-auto p-6">
			<h1 className="text-4xl font-bold text-center mb-6">About Us</h1>

			<section className="mb-8">
				<h2 className="text-2xl font-semibold">Our Mission</h2>
				<p className="mt-2 text-lg">
					At <strong>Pet Care Tips & Stories</strong>, our mission is
					to enrich the lives of pets and their owners through a blend
					of practical advice and heartfelt narratives. We believe
					that every pet deserves the best care, love, and attention,
					and we aim to empower pet owners with the knowledge and
					inspiration they need to provide a happy, healthy life for
					their furry friends.
				</p>
			</section>

			<section className="mb-8">
				<h2 className="text-2xl font-semibold">Our Vision</h2>
				<p className="mt-2 text-lg">
					We envision a world where every pet is cherished and
					well-cared for. By sharing essential tips on nutrition,
					exercise, grooming, and veterinary care alongside touching
					stories of love and loyalty, we strive to deepen the
					connection between pets and their humans.
				</p>
			</section>

			<section className="mb-8">
				<h2 className="text-2xl font-semibold">What We Offer</h2>
				<ul className="mt-2 list-disc list-inside text-lg">
					<li>
						<strong>Practical Advice:</strong> Learn about proper
						nutrition, exercise routines, grooming tips, and the
						importance of regular veterinary visits to ensure your
						pets remain healthy and vibrant.
					</li>
					<li>
						<strong>Engaging Stories:</strong> Discover heartwarming
						tales of love, loyalty, and the inspiring journeys of
						adoption and rescue.
					</li>
				</ul>
			</section>

			<section className="mb-8">
				<h2 className="text-2xl font-semibold">Meet Our Team</h2>
				<p className="mt-2 text-lg">
					We are a dedicated group of pet lovers, veterinarians, and
					storytellers committed to fostering a community that
					prioritizes pet well-being.
				</p>
				<ul className="mt-4 space-y-4">
					<li>
						<strong>John Doe</strong> - <em>Founder & CEO</em>
						<br />
						With a lifelong passion for animals and 10 years of
						experience in the field, John launched this project to
						help pet owners make informed decisions and share their
						journeys.
					</li>
					<li>
						<strong>Alex Smith</strong> -{" "}
						<em>Veterinary Consultant</em>
						<br />A licensed veterinarian specializing in Pet
						Health, Alex ensures our content is grounded in the
						latest scientific research and best practices in pet
						care.
					</li>
					<li>
						<strong>Danial Rog</strong> -{" "}
						<em>Content Creator & Storyteller</em>
						<br />
						Danial weaves together captivating stories and practical
						advice that resonate with pet owners, fostering a sense
						of connection and community.
					</li>
					<li>
						<strong>Lisa Mo</strong> - <em>Community Manager</em>
						<br />
						Lisa is dedicated to building our community,
						facilitating discussions, and ensuring every pet owner
						feels welcomed and valued.
					</li>
				</ul>
			</section>

			<section>
				<h2 className="text-2xl font-semibold">Our Values</h2>
				<ul className="mt-2 list-disc list-inside text-lg">
					<li>
						<strong>Compassion:</strong> We prioritize the
						well-being of pets and advocate for their needs.
					</li>
					<li>
						<strong>Education:</strong> We believe in empowering pet
						owners through accurate, science-based information.
					</li>
					<li>
						<strong>Community:</strong> We value the power of
						sharing stories and experiences to learn from one
						another.
					</li>
					<li>
						<strong>Inspiration:</strong> We celebrate the
						extraordinary bonds between pets and their humans and
						encourage others to share their journeys.
					</li>
				</ul>
			</section>

			<section className="mt-8 text-center">
				<h2 className="text-2xl font-semibold">Join Us!</h2>
				<p className="mt-2 text-lg">
					We invite you to become part of our journey! Explore our
					resources, share your pet stories, and connect with fellow
					pet enthusiasts. Together, we can make a difference in the
					lives of our beloved companions.
				</p>
			</section>
		</div>
	);
};

export default About;
