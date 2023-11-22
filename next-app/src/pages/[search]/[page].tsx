import type { InferGetServerSidePropsType, GetServerSideProps, GetServerSidePropsContext } from 'next'
import { Resp } from '../../../types'
import ArticleList from '@/components/ArticleList'
import ArticleDetails from '@/components/ArticleDetails'


// This gets called on every request
export const getServerSideProps = (async (context: GetServerSidePropsContext): Promise<{props:{data: Resp}}> => {
  const { search, page, limit, id} = context.query

  const res = await fetch(`https://newsapi.org/v2/top-headlines?q=${search}&pageSize=${limit}&page=${page}&apiKey=a6748dc91b9e4f7a8af5cc41a1090947`)
  const data: Resp = await res.json()
 
  // Pass data to the page via props
  if(id) {
    data.id = id.toString();
  }
  return { props: { data: data } }
}) satisfies GetServerSideProps<{data:Resp}>

export default function ArticleListWrapper({data}: InferGetServerSidePropsType<typeof getServerSideProps> ) {
  // Render data...
  const articles = data.articles;
  console.log(articles)
  return <>
   <ArticleList results={articles}/>
   {data.id && <ArticleDetails article={articles[Number(data.id)]}/>}
  </>
 
}
 