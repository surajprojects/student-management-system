"use client";

import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';

export default function Chart({
    firstName = "First",
    firstValue = 75,
    firstColor = "00C49F",
    secondName = "Second",
    secondValue = 25,
    secondColor = "FF8042"
}) {
    const data = [
        { name: firstName, value: firstValue },
        { name: secondName, value: secondValue },
    ];
    const COLORS = [`#${firstColor}`, `#${secondColor}`];

    return (
        <div className="w-full h-full aspect-[1/1]"> {/* Ensures square chart */}
            <ResponsiveContainer>
                <PieChart>
                    <Pie
                        data={data}
                        cx="50%"
                        cy="50%"
                        outerRadius={150} // Reduced from 150                     
                        dataKey="value"
                        label={({ name, percent }) =>
                            `${name}: ${(percent * 100).toFixed(0)}%`
                        }
                        labelLine={false}
                    >
                        {data.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index]} />
                        ))}
                    </Pie>
                    <Tooltip formatter={(value: number) => [`₹${value.toLocaleString()}/-`, 'Amount']} />
                    <Legend />
                </PieChart>
            </ResponsiveContainer>
        </div>
    );
}
