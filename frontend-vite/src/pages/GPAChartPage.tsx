import Layout from "@/components/Sidebar/layout";

import { TrendingDown, TrendingUp } from "lucide-react";
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
import { useQuery } from "@tanstack/react-query";
import { fetchTakenCourses } from "@/apis/TakenCourseAPI";
import { computeChartData } from "@/lib/GPA/computeChartData";
import { useUserProfile } from "@/components/my-hooks/UserProfileContext";

const chartConfig = {
  SGPA: {
    label: "SGPA",
    color: "hsl(var(--chart-1))",
  },
} satisfies ChartConfig;

function formatSemester(index: number): string {
  const year = Math.floor((index - 1) / 2) + 1;
  const sem = index % 2 === 1 ? 1 : 2;
  return "Y" + year + "S" + sem;
}

export default function GPAChartPage() {
  const { data: takenCourses = [] } = useQuery({
    queryKey: ["takenCourses"],
    queryFn: fetchTakenCourses,
  });

  const chartData = computeChartData(takenCourses);

  const { userProfile } = useUserProfile();
  if (!userProfile) {
    return (
      <Layout>
        <div className="flex items-center justify-center h-screen">
          <Card className="p-6">
            <CardHeader>
              <CardTitle className="text-xl">You're not logged in</CardTitle>
            </CardHeader>
            <CardContent className="text-sm">
              Please log in to view your GPA chart.
            </CardContent>
          </Card>
        </div>
      </Layout>
    );
  }

  return (
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
                  tickFormatter={(value) => value.substring(0, 4)}
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
            {chartData.length >= 2 &&
              (() => {
                const current = chartData[chartData.length - 1];
                const prev = chartData[chartData.length - 2];
                const diff = current.SGPA - prev.SGPA;
                const percent = ((diff / prev.SGPA) * 100).toFixed(2);
                const isUp = diff >= 0;

                return (
                  <div className="grid gap-2">
                    <div className="flex items-center gap-2 font-medium leading-none">
                      {isUp ? "Trending up" : "Trending down"} by{" "}
                      {Math.abs(Number(percent))}% this Sem{" "}
                      {isUp ? (
                        <TrendingUp className="h-4 w-4 text-green-800" />
                      ) : (
                        <TrendingDown className="h-4 w-4 text-red-800" />
                      )}
                    </div>
                    <div className="text-xs flex items-center gap-2 text-muted-foreground">
                      {formatSemester(chartData.length - 1)} -{" "}
                      {formatSemester(chartData.length)}
                    </div>
                  </div>
                );
              })()}
          </CardFooter>
        </Card>
      </div>
    </Layout>
  );
}
