import { Helmet } from "react-helmet-async";
import seoConfig from "../config/seoConfig";

export default function SeoHelmet({ title, description }) {
  const pageTitle = title ? seoConfig.titleTemplate.replace("%s", title) : seoConfig.defaultTitle;

  return (
    <Helmet>
      <title>{pageTitle}</title>
      <meta name="description" content={description || seoConfig.description} />
    </Helmet>
  );
}
