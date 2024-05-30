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
        color="rgb(255, 209, 93)"
        height={"20%"}
        width={"20%"}
        className="loading"
      />
    </div>
  );
}