const https = require('https');
var colors = require('colors');

function getMovie(keyword) {
  const request = https.get(
    'https://yts.ag/api/v2/list_movies.json?query_term=${keyword}',
  resp => {
    let body = '';
    resp.on('data', data => {
      body += data.toString();
    });
    resp.on('end', () => {
      let movieData = JSON.parse(body);
      let movies = movieData.data.movies;

      for (let movie of movies) {
        nicePrint(movie.title, movie.year, movie.rating, movie.synopsis);
      }
    });
  });
}

function nicePrint(title, year, rating, synopsis) {

  const report = `
${colors.bold.underline.white(title)}
Year of Release: ${colors.bold.white(year)} - Rating: ${colors.bold.white(rating)}
Synopsis: ${colors.yellow(synopsis)}
`
  console.log(report);
}

const movies = process.argv.slice(2);

for (let i = 0; i < movies.length; i++) {
  getMovie(movies[i]);

}