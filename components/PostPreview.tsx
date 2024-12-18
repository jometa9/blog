import Link from "next/link";
import { PostMetadata } from "./PostMetadata";

const PostPreview = (props: PostMetadata) => {
  const isQuote = props.quote;

  return !isQuote ? (
    <p className="postPreview">
      <Link href={`/blog/posts/${props.slug}`} className="postPreviewTitle">
        {props.title}
      </Link>
      <span>{props.date}</span>
    </p>
  ) : (
    <p className="quoteView">
        {props.title}
      <span>{props.date}</span>
    </p>
  );
};

export default PostPreview;
