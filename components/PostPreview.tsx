import Link from "next/link";
import { PostMetadata } from "./PostMetadata";

const PostPreview = (props: PostMetadata) => {
  const titleStyle = {
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
  };

  return (
    <p style={titleStyle}>
      {props.date} <Link href={`/blog/posts/${props.slug}`}>{props.title}</Link>
    </p>
  );
};

export default PostPreview;
