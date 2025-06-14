import { zodResolver } from "@hookform/resolvers/zod";
import { Check, ChevronsUpDown } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

const majors = [
{ value: "CS", label: "👩‍💻 Computer Science" },
{ value: "BAIS", label: "💻 Business Artificial Intelligence Systems" },
{ value: "CEG", label: "🔧 Computer Engineering" },
{ value: "AI", label: "🤖 Artificial Intelligence" },
{ value: "BZA", label: "💼 Business Analytics" },
{ value: "IS", label: "🔐 Information Security" },
{ value: "DS", label: "📊 Data Science" },
{ value: "BBA", label: "💰 Business Administration" },
{ value: "PHY", label: "🧲 Physics" },
{ value: "CHEM", label: "⚗️ Chemistry" },
{ value: "BIO", label: "🧬 Life Science" },
{ value: "MA", label: "➗ Mathematics" },
{ value: "STAT", label: "📈 Statistics" },
{ value: "ENV", label: "🌱 Environmental Studies" },
{ value: "PHI", label: "📚 Philosophy" },
{ value: "ECON", label: "💹 Economics" },
{ value: "GEO", label: "🌏 Geography" },
{ value: "ARCHI", label: "🏛️ Architecture" },
{ value: "ID", label: "🪑 Industrial Design" },
{ value: "MED", label: "🩺 Medicine" },
{ value: "DENT", label: "🦷 Dentistry" },
{ value: "LAW", label: "⚖️ Law" },
{ value: "NUR", label: "🏥 Nursing" },
{ value: "MU", label: "🎼 Music" },
{ value: "CNM", label: "📢 Communications & New Media" },
{ value: "CIVIL", label: "🏗️ Civil Engineering" },
{ value: "EE", label: "🔌 Electrical Engineering" },
{ value: "ENGSCI", label: "📐 Engineering Science" },
{ value: "ISE", label: "🏭 Industrial & Systems Engineering" },
{ value: "LSARCH", label: "🌳 Landscape Architecture" },
{ value: "MSE", label: "🔬 Materials Science & Engineering" },
{ value: "FST", label: "🍜 Food Science & Technology" },
{ value: "PHARM", label: "💊 Pharmacy" },
{ value: "PHARMSCI", label: "🧪 Pharmaceutical Science" },
{ value: "CHI_LANG", label: "🀄 Chinese Language" },
{ value: "CHI_STUD", label: "📜 Chinese Studies" },
{ value: "ELL", label: "🗣️ English Language & Linguistics" },
{ value: "ELIT", label: "📖 English Literature" },
{ value: "GLOBAL", label: "🌐 Global Studies" },
{ value: "JPN", label: "🗾 Japanese Studies" },
{ value: "MALAY", label: "🏝️ Malay Studies" },
{ value: "THEATRE", label: "🎭 Theatre & Performance Studies" },
{ value: "ANTH", label: "👥 Anthropology" },
{ value: "SOCWORK", label: "🤝 Social Work" },
{ value: "POLI", label: "💬 Political Science"},
{ value: "BME", label: "🧻 Biomedical Engineering" }, 
{ value: "CHE", label: "🧫 Chemical Engineering" },
{ value: "ENVENG", label: "🏞️ Environmental & Sustainability Engineering" },
{ value: "IPM", label: "📋 Infrastructure & Project Management" },
{ value: "ME", label: "🔩 Mechanical Engineering" },
{ value: "RMI", label: "🦾 Robotics & Machine Intelligence" },
{ value: "HIST", label: "🗿 History" },
{ value: "DSE", label: "🖥️ Data Science & Economics" },
{ value: "SAST", label: "🕌 South Asian Studies" },
{ value: "SEAST", label: "🛕 Southeast Asian Studies" },
{ value: "PSY", label: "🧠‍ Psychology" },
{ value: "SOC", label: "🫂 Sociology" },
{ value: "QF", label: "💸 Quantitative Finance" },
];

const FormSchema = z.object({
  major: z.string({
    required_error: "Please select a major.",
  }),
});

interface MajorSelectFormProps {
  onChange?: (value: string) => void;
  defaultValue?: string;
}

export default function MajorSelectForm({onChange, defaultValue} : MajorSelectFormProps) {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      major: defaultValue || "",
    },
  });

  return (
    <Form {...form}>
      <form className="space-y-6">
        <FormField
          control={form.control}
          name="major"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant="outline"
                      role="combobox"
                      className={cn(
                        "w-[500px] justify-between",
                        !field.value && "text-muted-foreground"
                      )}
                    >
                      {field.value
                        ? majors.find((m) => m.value === field.value)?.label
                        : defaultValue || "Select a major"}
                      <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-[500px] p-0">
                  <Command>
                    <CommandInput
                      placeholder="Search major..."
                      className="h-9"
                    />
                    <CommandList>
                      <CommandEmpty>No major found.</CommandEmpty>
                      <CommandGroup>
                        {majors.map((m) => (
                          <CommandItem
                            key={m.value}
                            value={m.label}
                            onSelect={() => {
                              form.setValue("major", m.value);
                              onChange?.(m.value);
                            }}
                          >
                            {m.label}
                            <Check
                              className={cn(
                                "ml-auto h-4 w-4",
                                m.value === field.value
                                  ? "opacity-100"
                                  : "opacity-0"
                              )}
                            />
                          </CommandItem>
                        ))}
                      </CommandGroup>
                    </CommandList>
                  </Command>
                </PopoverContent>
              </Popover>
              <FormDescription>
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
      </form>
    </Form>
  );
}
