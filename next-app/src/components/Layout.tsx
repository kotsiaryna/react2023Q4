import { JSXElementConstructor, ReactElement } from "react";
import Search from "./Search";
 
export default function Layout({children} ) {
  return (
    <>
      <Search />
      <main>{children}</main>
    </>
  )
}

