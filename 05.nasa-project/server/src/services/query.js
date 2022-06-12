/**
 * Creting this query file we allow us make use
 * of pagination in any endpoint we deem fit
 * { limit: '50', page: '1' }
 */

const DEFAULT_PAGE_LIMIT = 0;
const DEFAULT_PAGE_NUM = 1; //Infinity Page Limit

function getPagination(query) {
  const page = Math.abs(query.page) || DEFAULT_PAGE_NUM;
  const limit = Math.abs(query.limit) || DEFAULT_PAGE_LIMIT;

  //skip = 0   = (1 - 1) * 50    -- for page one
  //skip = 50   = (2 - 1) * 50    -- for page two
  //skip = 100   = (3 - 1) * 50    -- for page three
  //skip = 150   = (4 - 1) * 50    -- for page four.....
  const skip = (page - 1) * limit;

  return {
    skip,
    limit,
  };
}

module.exports = {
  getPagination,
};
