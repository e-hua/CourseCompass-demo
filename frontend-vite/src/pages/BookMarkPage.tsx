import Layout from "@/components/Sidebar/layout";
import SearchBar from "@/components/diy-ui/SearchBar";

function BookmarkPage() {
  return (
    <Layout>
      <SearchBar />
      <div className="flex flex-col items-center mt-4">
        <h5 className="text-xl font-bold text-center">
          Please Choose among the courses you bookmarked!
        </h5>
      </div>
    </Layout>
  );
}

export default BookmarkPage;
