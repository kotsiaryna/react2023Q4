import type { InferGetServerSidePropsType, GetServerSideProps, GetServerSidePropsContext } from 'next'
import { Resp } from '../../../types'
import ArticleList from '@/components/ArticleList'
import ArticleDetails from '@/components/ArticleDetails'
import Pagination from '@/components/Pagination'
import { useRouter } from 'next/router'
import { wrapper } from '@/redux/store'
import { Content } from 'next/font/google'
import { getNews, getRunningQueriesThunk, useGetNewsQuery } from '@/redux/api'
import { skipToken } from '@reduxjs/toolkit/query'
import Loader from '@/components/Loader'


export const getServerSideProps = wrapper.getServerSideProps((store) => async (context) => {
  const { search, page, limit, id} = context.query; 
 
  if(typeof search === 'string' && typeof page === 'string' && typeof limit === 'string') {
    store.dispatch(getNews.initiate({search, page, limit}))
  }
  await Promise.all(store.dispatch(getRunningQueriesThunk()));
  return {
    props: {},
  };
  
})

export default function ArticleListWrapper() { 
  const router = useRouter()
  const { search, page, limit, id} = router.query; 

  const result = useGetNewsQuery((typeof search === 'string' && typeof page === 'string' && typeof limit === 'string' ) ? {search, limit, page} : skipToken, {skip: router.isFallback})

  const {data, isLoading, error } = result
  const {articles, totalResults } = data;
  console.log(isLoading)

  return <>
  {isLoading && <p>Loading....</p> }
   <Pagination totalAmount={totalResults} query={router.query} />
   <ArticleList results={articles}/>
   {id && <ArticleDetails article={articles[Number(id)]}/>}
  </>
 
}

 