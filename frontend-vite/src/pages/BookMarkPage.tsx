import Layout from "@/components/Sidebar/layout";
import SearchBar from "@/components/diy-ui/SearchBar";

function BookmarkPage() {
  return (
    <Layout>
      <SearchBar />
      <div className="flex-1 flex justify-center items-center">
        <h5 className="text-xl font-bold text-center">
          Please Choose among the courses you bookmarked!
        </h5>
      </div>
    </Layout>
  );
}

export default BookmarkPage;
