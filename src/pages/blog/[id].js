// この部分に必要な部分をimportします😊
import { client } from "../../../libs/client";

// SSGでデータ取得の場合はNext独自のgetStaticPropsを使って取得します😊
export const getStaticProps = async (url) => {
  const id = url.params.id;
  const data = await client.get({
    endpoint: "blog",
    contentId: id,
  });

  return {
    props: {
      blog: data,
    },
  };
};

export const getStaticPaths = async () => {
    const data = await client.get({
        endpoint: "blog",
    });

    const paths = data.contents.map((content) => `/blog/${content.id}`);

    return {
        paths,
        fallback: false,
    };
};

export default function BlogId({ blog }) {
  return (
    <div>
          <h1>{blog.title}</h1>
          <p dangerouslySetInnerHTML={{ __html:`${blog.text}` }}></p>
    </div>
  );
}