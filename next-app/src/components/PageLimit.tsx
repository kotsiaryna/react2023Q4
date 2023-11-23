import { useRouter } from "next/router";
import React, { ChangeEvent } from "react";

const PageLimit = () => {
  const router = useRouter();
  const { search, limit } = router.query;

  const changeLimit = (e: ChangeEvent<HTMLSelectElement>) => {
    const limit = e.target.value;

    router.push({
      pathname: `/${search}/1`,
      query: { limit },
    });
  };

  return (
    <section className="limit">
      <label htmlFor="limit">Results per page</label>
      <select
        name="limit"
        id="limit"
        onChange={changeLimit}
        defaultValue={limit || 10}
      >
        <option value={10}>10</option>
        <option value={5}>5</option>
        <option value={20}>20</option>
      </select>
    </section>
  );
};

export default PageLimit;
