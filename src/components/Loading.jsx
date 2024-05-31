import ReactLoading from "react-loading";

export default function Loading() {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "10vh",
        width: '60vw'
      }}
    >
      <ReactLoading
        type={"spinningBubbles"}
        color="rgba(255, 221, 18, 1)"
        height={"20%"}
        width={"20%"}
        className="loading"
      />
    </div>
  );
}