exports = function(payload) {
    const collection = context.services.get("mongodb-atlas").db("sample_mflix").collection("movies");
    let arg = payload.query.arg;
    return collection.aggregate([
        { $search: {
                       text: {
                          query: arg,
                          path:'fullplot',
                          fuzzy: {
                            maxEdits: 2
                          }
                        },
                        highlight: { path: 'fullplot' }
                }},
                { $project: {
                       title: 1,
                       _id:0,
                       year:1,
                       fullplot:1,
                       score: { $meta: 'searchScore'},
                       highlight: {$meta: 'searchHighlights'}
                }},
                { $limit: 10}
        ]).toArray();
  };