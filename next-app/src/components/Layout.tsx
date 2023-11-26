import { ReactElement } from 'react';
import Search from './Search';

export default function Layout({ children }: { children: ReactElement }) {
  return (
    <>
      <Search />
      <main>{children}</main>
    </>
  );
}
