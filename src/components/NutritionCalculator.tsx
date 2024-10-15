"use client";

import { useState } from "react";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

const NutritionCalculator = () => {
	const [age, setAge] = useState("");
	const [weight, setWeight] = useState("");
	const [petType, setPetType] = useState("dog");

	const handleGeneratePDF = () => {
		const doc = new jsPDF();

		// Title
		doc.setFontSize(18);
		doc.text(
			`Nutrition Needs for Your ${
				petType.charAt(0).toUpperCase() + petType.slice(1)
			}`,
			14,
			20
		);
		doc.setFontSize(12);
		doc.text(`Age: ${age} years`, 14, 30);
		doc.text(`Weight: ${weight} kg`, 14, 35);

		// Nutrition table data
		const tableData = [
			[
				"Age (years)",
				"Weight (kg)",
				"Daily Protein (g)",
				"Daily Fat (g)",
				"Daily Fiber (g)",
			],
			[`0-1`, `< 5`, "20", "10", "5"],
			[`0-1`, `5-10`, "30", "15", "7"],
			[`1-5`, `< 5`, "25", "12", "5"],
			[`1-5`, `5-10`, "40", "20", "10"],
			[`5+`, `< 5`, "15", "8", "4"],
			[`5+`, `5-10`, "25", "12", "6"],
			// Add more age and weight ranges as needed
		];

		// Add the table to the PDF
		autoTable(doc, {
			head: [tableData[0]],
			body: tableData.slice(1),
			startY: 40,
			theme: "grid",
		});

		// Save the PDF
		doc.output("dataurlnewwindow");
		// doc.save(`Nutrition_Needs_${petType}.pdf`);
	};

	return (
		<div className="max-w-md mx-auto p-6">
			<h1 className="text-3xl font-bold mb-4">
				Pet Nutrition Calculator
			</h1>
			<div className="mb-4">
				<label className="block text-gray-700" htmlFor="petType">
					Select Pet Type
				</label>
				<select
					id="petType"
					className="mt-1 block w-full border border-gray-300 rounded-md p-2"
					value={petType}
					onChange={(e) => setPetType(e.target.value)}
				>
					<option value="dog">Dog</option>
					<option value="cat">Cat</option>
					{/* Add more pet types as needed */}
				</select>
			</div>
			<div className="mb-4">
				<label className="block text-gray-700" htmlFor="age">
					Age (years)
				</label>
				<input
					type="number"
					id="age"
					className="mt-1 block w-full border border-gray-300 rounded-md p-2"
					value={age}
					onChange={(e) => setAge(e.target.value)}
					required
				/>
			</div>
			<div className="mb-4">
				<label className="block text-gray-700" htmlFor="weight">
					Weight (kg)
				</label>
				<input
					type="number"
					id="weight"
					className="mt-1 block w-full border border-gray-300 rounded-md p-2"
					value={weight}
					onChange={(e) => setWeight(e.target.value)}
					required
				/>
			</div>
			<button
				onClick={handleGeneratePDF}
				className="bg-custom text-white font-bold py-2 px-4 rounded"
			>
				Generate Nutrition PDF
			</button>
		</div>
	);
};

export default NutritionCalculator;
