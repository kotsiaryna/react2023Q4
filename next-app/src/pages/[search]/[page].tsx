import ArticleList from "@/components/ArticleList";
import ArticleDetails from "@/components/ArticleDetails";
import Pagination from "@/components/Pagination";
import { useRouter } from "next/router";
import { wrapper } from "@/redux/store";
import { getNews, getRunningQueriesThunk, useGetNewsQuery } from "@/redux/api";
import { skipToken } from "@reduxjs/toolkit/query";

export const getServerSideProps = wrapper.getServerSideProps(
  (store) => async (context) => {
    const { search, page, limit } = context.query;

    if (
      typeof search === "string" &&
      typeof page === "string" &&
      typeof limit === "string"
    ) {
      store.dispatch(getNews.initiate({ search, page, limit }));
    }
    await Promise.all(store.dispatch(getRunningQueriesThunk()));
    return {
      props: {},
    };
  },
);

export default function ArticleListWrapper() {
  const router = useRouter();
  const { search, page, limit, id } = router.query;

  const result = useGetNewsQuery(
    typeof search === "string" &&
      typeof page === "string" &&
      typeof limit === "string"
      ? { search, limit, page }
      : skipToken,
    { skip: router.isFallback },
  );

  const { data, isLoading } = result;
  const { articles, totalResults } = data;
  console.log(isLoading);

  return (
    <>
      {isLoading && <p>Loading....</p>}
      <Pagination totalAmount={totalResults} query={router.query} />
      <ArticleList results={articles} />
      {id && <ArticleDetails article={articles[Number(id)]} />}
    </>
  );
}
