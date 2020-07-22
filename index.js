const md = require("markdown-it")({
  html: true, // Enable HTML tags in source
  breaks: true, // Convert '\n' in paragraphs into <br>
  linkify: true, // Autoconvert URL-like text to links
});
const emoji = require('markdown-it-emoji');
const fs = require("fs");
const Parser = require("rss-parser");

const parser = new Parser();

const feedUrl = "https://www.sylvainmoingeon.fr/feed.xml";
const websiteUrl = "https://www.sylvainmoingeon.fr/";
const twitterUrl = "https://www.twitter.com/sylvainmoingeon";
const linkedInUrl = "https://www.linkedin.com/in/sylvainmoingeon/";
const devToUrl = "https://dev.to/sylvainmoingeon";
const maltUrl = "https://malt.fr/profile/sylvainmoingeon";
const blogPostLimit = 5;
const badgeHeight = "25";

md.use(emoji);

(async () => {
  let blogPosts = "";
  try {
    blogPosts = await loadBlogPosts();
  } catch (e) {
    console.error(`Failed to load blog posts from ${websiteUrl}`, e);
  }

  const twitterBadge = `[<img src="https://img.shields.io/badge/twitter-%231DA1F2.svg?&style=for-the-badge&logo=twitter&logoColor=white" height=${badgeHeight}>](${twitterUrl})`;
  const linkedInBadge = `[<img src="https://img.shields.io/badge/linkedin-%230077B5.svg?&style=for-the-badge&logo=linkedin&logoColor=white" height=${badgeHeight}>](${linkedInUrl})`;
  const instagramBadge = `[<img src="https://img.shields.io/badge/instagram-%23E4405F.svg?&style=for-the-badge&logo=instagram&logoColor=white" height=${badgeHeight}>](${instagramUrl})`;
  const mediumBadge = `[<img src="https://img.shields.io/badge/medium-%2312100E.svg?&style=for-the-badge&logo=medium&logoColor=white" height=${badgeHeight}>](${mediumUrl})`;
  const devToBadge = `[<img src="https://img.shields.io/badge/DEV.TO-%230A0A0A.svg?&style=for-the-badge&logo=dev-dot-to&logoColor=white" height=${badgeHeight}>](${devToUrl})`;
  const maltBadge = `[<img src="https://img.shields.io/badge/malt-%230A0A0A.svg?&style=for-the-badge&logoColor=white" height=${badgeHeight}>](${maltUrl})`;

  text = `# Sylvain Moingeon - @SylvainMoingeon\nBonjour à tous,\n\nDéveloppeur indépendant (.Net C#), je confectionne principalement des applications mobiles sous [Xamarin.Forms](https://xamarin.com/forms). Mes expériences passées m'ont également apportée quelques compétences sur WPF et UWP.\n\n  Retrouvez plus en détails mon approche et mes compétences sur [mon site web](${websiteUrl}/a-propos), ainsi que mon parcours sur [mon profil Malt](https://www.malt.fr/profile/sylvainmoingeon)\n\n  # Travaillons ensemble 👯\nDisponible à partir du mois de septembre 2020, en télétravail de préférence.\n\n# Contactez moi 📫${twitterBadge} ${linkedInBadge} ${devToBadge}\n\n* Site web : ${websiteUrl}/contact/\n* LinkedIn : ${linkedInUrl}\n* Malt : ${maltUrl}\n* Dev.To : ${devToUrl}\n`
  
  # Latest Blog Posts\n${blogPosts}`;

  const result = md.render(text);

  fs.writeFile("README.md", result, function (err) {
    if (err) return console.log(err);
    console.log(`${result} > README.md`);
  });
})();

async function loadBlogPosts() {
  const feed = await parser.parseURL(feedUrl);

  let links = "";

  feed.items.slice(0, blogPostLimit).forEach((item) => {
    links += `<li><a href=${item.link}>${item.title}</a></li>`;
  });

  return `
  <ul>
    ${links}
  </ul>\n
  [:arrow_right: Plus d'articles : ](${websiteUrl})
  `;
}
