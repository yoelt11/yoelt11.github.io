
import { getCollection } from "astro:content";
const ps = await getCollection("projects");
console.log("count:", ps.length);
if (ps[0]) {
  console.log("keys:", Object.keys(ps[0]).join(","));
  console.log("id:", JSON.stringify(ps[0].id));
  console.log("slug:", JSON.stringify(ps[0].slug));
  console.log("filePath:", JSON.stringify(ps[0].filePath));
}
const bs = await getCollection("blog");
