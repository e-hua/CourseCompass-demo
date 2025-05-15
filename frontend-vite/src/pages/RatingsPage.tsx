import Layout from "@/components/Sidebar/layout";
import RatingCard from "@/components/my-components/RatingCard";

function SearchPage() {
  return (
    <Layout>
      <div>
        <RatingCard courseName={"CS2030S"} />
        <RatingCard courseName={"CS2040S"} />
        <RatingCard courseName={"CS2100"} />
      </div>
    </Layout>
  );
}

export default SearchPage;
