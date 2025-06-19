interface HomeLinksProps {
  totalPosts?: number;
}

export default function HomeLinks({ totalPosts = 0 }: HomeLinksProps) {
  return (
    <div className="homeLinksContainer">
      <img src="/images/503594213_18282697036265318_1350656707529109940_n.jpg" alt="jometa" className="homeLinksImage" />
    </div>
  );
}
