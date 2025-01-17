"use client"

import { TrendingUp } from "lucide-react"
import { RadialBar, RadialBarChart } from "recharts"

import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import {
    ChartConfig,
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
} from "@/components/ui/chart"
const chartData = [
    { browser: "facebook", visitors: 275, fill: "var(--color-facebook)" },
    { browser: "WhatsApp", visitors: 200, fill: "var(--color-WhatsApp)" },
    { browser: "YouTube", visitors: 173, fill: "var(--color-YouTube)" },
    { browser: "Instagram", visitors: 90, fill: "var(--color-Instagram)" },
]

const chartConfig = {
    facebook: {
        label: "Facebook",
        color: "hsl(var(--chart-1))",
    },
    WhatsApp: {
        label: "WhatsApp",
        color: "hsl(var(--chart-2))",
    },
    YouTube: {
        label: "YouTube",
        color: "hsl(var(--chart-4))",
    },
    Instagram: {
        label: "Instagram",
        color: "hsl(var(--chart-5))",
    },
} satisfies ChartConfig

const legendsData = Object.keys(chartConfig).map((key) => ({
    key,
    label: chartConfig[key as keyof typeof chartConfig].label,
    color: chartConfig[key as keyof typeof chartConfig].color,
}))

export function TrendingChart() {
    return (
        <Card className="flex flex-col">
            <CardHeader className="items-center pb-0">
                <CardTitle>Trending 🔥</CardTitle>
                <CardDescription>January - June 2024</CardDescription>
            </CardHeader>
            <CardContent className="flex-1 pb-0">
                <ChartContainer
                    config={chartConfig}
                    className="mx-auto aspect-square max-h-[250px]"
                >
                    <RadialBarChart data={chartData} innerRadius={30} outerRadius={110}>
                        <ChartTooltip
                            cursor={false}
                            content={<ChartTooltipContent hideLabel nameKey="browser" />}
                        />
                        <RadialBar dataKey="visitors" background />
                    </RadialBarChart>
                </ChartContainer>
            </CardContent>
            <CardFooter className="flex-col gap-2 text-sm">
                <div className="flex items-center gap-2 font-medium leading-none">
                    Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
                </div>
                <div className="leading-none text-muted-foreground">
                    Showing total visitors for the last 6 months
                </div>
                <div className="flex flex-row items-center justify-center space-x-2">
                    {legendsData.map((data, index) => (
                        <div
                            key={index}
                            className="flex flex-row items-center justify-center gap-2">
                            <div
                                className="w-3 h-3 rounded-full"
                                style={{ backgroundColor: data.color }}
                            />
                            <div>{data.label}</div>
                        </div>
                    ))}
                </div>
            </CardFooter>
        </Card>
    )
}
