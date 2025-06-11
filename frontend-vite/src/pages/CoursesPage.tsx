import { Command, CommandInput } from "@/components/diy-ui/UnderlineCommand";
import Layout from "@/components/Sidebar/layout";

export default function CoursesPage() {
  return (
    <Layout>
      <div className="p-4">
        <Command>
          <CommandInput />
        </Command>
      </div>
    </Layout>
  );
}
