import Layout from "@/components/Sidebar/layout";

import { TrendingUp } from "lucide-react";
import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  type ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

const chartData = [
  { Semester: "Y1S1", SGPA: 4.0 },
  { Semester: "Y1S2", SGPA: 4.5 },
  { Semester: "Y2S1", SGPA: 4.8 },
  { Semester: "Y2S2", SGPA: 4.3 },
  { Semester: "Y3S1", SGPA: 4.5 },
  { Semester: "Y3S2", SGPA: 4.85 },
];

const chartConfig = {
  SGPA: {
    label: "SGPA",
    color: "hsl(var(--chart-1))",
  },
} satisfies ChartConfig;

export default function GPAChartPage() {
  return (
    /*
     */
    <Layout>
      <div className="p-6 mx-8 space-y-10">
        <Card>
          <CardHeader>
            <CardTitle>GPA Chart - Linear</CardTitle>
            <CardDescription>Showing the SGPA from Y1S1</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig}>
              <AreaChart
                accessibilityLayer
                data={chartData}
                margin={{
                  left: 15,
                  right: 20,
                  top: 15,
                }}
              >
                <CartesianGrid vertical={true} />
                <XAxis
                  dataKey="Semester"
                  tickLine={false}
                  axisLine={false}
                  tickFormatter={(value) => value}
                />
                <YAxis
                  tickLine={false}
                  axisLine={false}
                  tickFormatter={(value) => value.toFixed(2)} // Show 2 decimal places
                  domain={[2.0, 5.0]} // Adjust the range as per your data
                />
                <ChartTooltip
                  cursor={false}
                  content={<ChartTooltipContent indicator="dot" />}
                />
                <Area
                  dataKey="SGPA"
                  type="linear"
                  fill="var(--color-SGPA)"
                  fillOpacity={0.4}
                  stroke="var(--color-SGPA)"
                />
              </AreaChart>
            </ChartContainer>
          </CardContent>
          <CardFooter>
            <div className="flex w-full items-start gap-2 text-sm">
              <div className="grid gap-2">
                <div className="flex items-center gap-2 font-medium leading-none">
                  Trending up by 7.78% this Sem{" "}
                  <TrendingUp className="h-4 w-4" />
                </div>
                <div className="flex items-center gap-2 leading-none text-muted-foreground">
                  Y3S1 - Y3S2
                </div>
              </div>
            </div>
          </CardFooter>
        </Card>
      </div>
    </Layout>
  );
}
