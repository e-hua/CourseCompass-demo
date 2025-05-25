import { TrendingUp } from "lucide-react";
import { Label, Pie, PieChart, Sector } from "recharts";
import type { PieSectorDataItem } from "recharts/types/polar/Pie";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import type {
    ChartConfig
} from "@/components/ui/chart";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

const chartData = [
    { comment: "Rated Courses", number: 400, fill: "var(--color-rated)" },
    { comment: "Waiting for Rating", number: 300, fill: "var(--color-notRated)" },
]

const chartConfig = {
  comments: {
    label: "Comments",
  },
  rated: {
    label: "Rated Courses",
    color: "hsl(359 2% 90%)",
  },
  notRated: {
    label: "Waiting for Ratings",
    color: "hsl(240 1% 74%)",
  },
} satisfies ChartConfig

interface UserProfileCardProps {
  user: {
    userName: string;
    email: string;
    createdAt: string;
    updatedAt: string;
    currentSemesterIndex: number;
  };
}

export default function Component({user}: UserProfileCardProps) {
  return (
    <Card className="flex flex-col">
      <CardHeader className="items-center pb-0">
        <CardTitle>Pie Chart - Course Rating</CardTitle>
        <CardDescription></CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[250px]"
        >
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Pie
              data={chartData}
              dataKey="number"
              nameKey="comment"
              innerRadius={60}
              strokeWidth={5}
              activeIndex={0}
              activeShape={({
                outerRadius = 0,
                ...props
              }: PieSectorDataItem) => (
                <Sector {...props} outerRadius={outerRadius + 10} />
              )}
            />
          </PieChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col gap-2 text-sm">
        <div className="flex items-center gap-2 font-medium leading-none">
          Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
        </div>
      </CardFooter>
    </Card>
  )
}