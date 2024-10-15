import React from "react";

const Contact = () => {
	return (
		<div className="max-w-7xl mx-auto p-6">
			<h1 className="text-4xl font-bold text-center mb-6">Contact Us</h1>

			<section className="mb-8">
				<h2 className="text-2xl font-semibold">
					We&apos;d Love to Hear from You!
				</h2>
				<p className="mt-2 text-lg">
					If you have any questions, comments, or need support, please
					fill out the form below or reach out to us using the contact
					details provided.
				</p>
			</section>

			<form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
				<div className="mb-4">
					<label
						className="block text-gray-700 text-sm font-bold mb-2"
						htmlFor="name"
					>
						Name
					</label>
					<input
						type="text"
						id="name"
						placeholder="Your Name"
						className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
						required
					/>
				</div>

				<div className="mb-4">
					<label
						className="block text-gray-700 text-sm font-bold mb-2"
						htmlFor="email"
					>
						Email
					</label>
					<input
						type="email"
						id="email"
						placeholder="Your Email"
						className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
						required
					/>
				</div>

				<div className="mb-4">
					<label
						className="block text-gray-700 text-sm font-bold mb-2"
						htmlFor="message"
					>
						Message
					</label>
					<textarea
						id="message"
						placeholder="Your Message"
						className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
						rows={5}
						required
					></textarea>
				</div>

				<div className="flex items-center justify-between">
					<button
						type="submit"
						className="bg-custom text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
					>
						Send Message
					</button>
				</div>
			</form>

			<section>
				<h2 className="text-2xl font-semibold">
					Other Ways to Reach Us
				</h2>
				<p className="mt-2 text-lg">You can also contact us via:</p>
				<ul className="mt-2 list-disc list-inside text-lg">
					<li>
						Email:{" "}
						<a
							href="mailto:support@example.com"
							className="text-blue-600"
						>
							support@example.com
						</a>
					</li>
					<li>
						Phone:{" "}
						<a href="tel:+1234567890" className="text-blue-600">
							+1 (234) 567-890
						</a>
					</li>
					<li>
						Follow us on social media:{" "}
						<a href="#" className="text-blue-600">
							Facebook
						</a>
						,{" "}
						<a href="#" className="text-blue-600">
							Twitter
						</a>
						,{" "}
						<a href="#" className="text-blue-600">
							Instagram
						</a>
					</li>
				</ul>
			</section>
		</div>
	);
};

export default Contact;
